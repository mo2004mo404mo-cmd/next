/**
 * MedQ chat socket service — port 3004.
 *
 * Reconstructed from the MedQ client/server protocol:
 *   - Browser: io('/?XTransformPort=3004') → engine.io path is "/" (the URL
 *     path becomes the socket.io path option), query carries XTransformPort
 *     for the platform gateway.
 *   - Next.js API routes: POST http://localhost:3004/emit
 *     { event, room, data } → broadcast to that room.
 *
 * Because the engine path is "/", engine.io's attach() check
 * (path === req.url.slice(0, path.length)) would swallow EVERY request,
 * including POST /emit. So we attach with a never-matching dummy path and
 * route engine.io traffic manually via engine.handleRequest/handleUpgrade.
 */

import http from 'node:http';
import { Server } from 'socket.io';

const PORT = 3004;
const HOST = '127.0.0.1';

const io = new Server({
  cors: { origin: true, methods: ['GET', 'POST'] },
  transports: ['websocket', 'polling'],
  pingInterval: 20000,
  pingTimeout: 25000,
});

/** userId → connected socket ids (a user may have several tabs). */
const userSockets = new Map<string, Set<string>>();

/* ── Presence ──────────────────────────────────────────────────────────────
 * Which members of a room currently have a live socket. Computed from the
 * server-side room membership (socket.io adapter) + each socket's identified
 * userId, then broadcast to the room as `presence:update` so clients can
 * show "N members, M online" headers and live online dots.
 *
 * Broadcast triggers: join:room, identify (a late identify flips the socket's
 * userId from unknown → known, changing the room's online set), leave:room
 * and disconnect (a member going offline). Multi-tab users stay "online" as
 * long as any one of their sockets remains in the room — the set is computed
 * from live sockets each time, never incremented/decremented. */
function roomOnlineUserIds(roomId: string): string[] {
  const members = io.sockets.adapter.rooms.get(roomId);
  if (!members) return [];
  const ids = new Set<string>();
  for (const sid of members) {
    const uid = io.sockets.sockets.get(sid)?.data?.userId;
    if (typeof uid === 'string' && uid) ids.add(uid);
  }
  return [...ids];
}

function broadcastRoomPresence(roomId: unknown) {
  if (typeof roomId !== 'string' || !roomId) return;
  io.to(roomId).emit('presence:update', { roomId, onlineUserIds: roomOnlineUserIds(roomId) });
}

function socketsFor(userId: string): Set<string> {
  let s = userSockets.get(userId);
  if (!s) { s = new Set(); userSockets.set(userId, s); }
  return s;
}

/** Events carrying a targetUserId are delivered to that user's sockets only. */
const TARGETED_EVENTS = new Set([
  'call:offer', 'call:answer', 'call:ice-candidate', 'call:ringing', 'call:hangup',
  // LiveKit call lifecycle — routed to the caller (or callee) directly:
  //   call:accept  callee picked up            → caller stops ringback
  //   call:decline callee rejected              → caller shows "declined"
  //   call:busy    callee already in a call     → caller shows "busy"
  //   call:cancel  caller gave up before answer → callee stops ringing
  'call:accept', 'call:decline', 'call:cancel', 'call:busy',
]);
/** Room events that must NOT be echoed back to the sending socket. */
const EXCLUDE_SENDER_EVENTS = new Set(['user:typing', 'user:stop-typing', 'wb:cursor-move', 'wb:cursor-leave', 'wb:laser', 'group-call:invite', 'group-call:cancel', 'call:invite']);

/** How long a call invite keeps ringing for late joiners (ms). */
const INVITE_TTL_MS = 45_000;

/** How long to wait after a user's last socket disconnects before considering
 *  their call abandoned and cleaning up + notifying the peer (ms). */
const RECONNECT_GRACE_MS = 30_000;

/* ── Active call registry (server-side source of truth) ────────────────────
 * Map<userId, { roomId, callType, peerId?, peerName?, role, startedAt }>
 *
 * The server is the single source of truth for who is in a call. On page
 * refresh, the client's React state is lost — but the server still knows.
 * When the client reconnects, it emits `call:sync` and the server responds
 * with the active call (if any), so the client can rejoin the LiveKit room.
 *
 * Registered on:
 *   - call:invite  (caller starts dialing)
 *   - call:accept  (callee picks up)
 * Unregistered on:
 *   - call:hangup / call:cancel / call:decline (call ends)
 *   - disconnect grace timeout (user didn't reconnect within 30s) */
interface ActiveCallEntry {
  roomId: string;
  joinUrl: string;
  callType: 'voice' | 'video';
  peerId?: string;
  peerName?: string;
  role: 'caller' | 'callee';
  startedAt: number;
}
const activeCalls = new Map<string, ActiveCallEntry>();
/** Disconnect grace timers: userId → timeout handle. */
const reconnectTimers = new Map<string, ReturnType<typeof setTimeout>>();

function registerActiveCall(userId: string, entry: ActiveCallEntry) {
  activeCalls.set(userId, entry);
  // Cancel any pending grace timer — the user is back.
  const timer = reconnectTimers.get(userId);
  if (timer) { clearTimeout(timer); reconnectTimers.delete(userId); }
}

function unregisterActiveCall(userId: string): ActiveCallEntry | undefined {
  const entry = activeCalls.get(userId);
  activeCalls.delete(userId);
  return entry;
}

/** When a user's last socket disconnects and they have an active call,
 *  start a grace timer. If they don't reconnect within RECONNECT_GRACE_MS,
 *  clean up the call and notify the peer so they're not stuck "busy". */
function startReconnectGrace(userId: string) {
  const entry = activeCalls.get(userId);
  if (!entry) return; // not in a call — nothing to grace
  if (reconnectTimers.has(userId)) return; // timer already running
  const timer = setTimeout(() => {
    reconnectTimers.delete(userId);
    const cur = activeCalls.get(userId);
    if (!cur) return;
    // User didn't reconnect — clean up and notify the peer.
    activeCalls.delete(userId);
    if (cur.peerId) {
      const targets = userSockets.get(cur.peerId);
      if (targets) for (const sid of targets) io.to(sid).emit('call:hangup', {
        roomId: cur.roomId, fromUserId: userId, reason: 'completed',
      });
    }
    clearPendingInvite(cur.roomId);
    console.log(`[call] grace expired for ${userId.slice(-8)} — cleaned up call in room ${cur.roomId.slice(-8)}`);
  }, RECONNECT_GRACE_MS);
  reconnectTimers.set(userId, timer);
}

/** Cancel the grace timer — called when the user reconnects (identifies). */
function cancelReconnectGrace(userId: string) {
  const timer = reconnectTimers.get(userId);
  if (timer) { clearTimeout(timer); reconnectTimers.delete(userId); }
}

/**
 * Pending call invites: roomId → { invite, expiresAt }.
 *
 * A `call:invite` is normally lost if the callee has no socket connected
 * (app closed / tab navigating). We keep the invite server-side for its ring
 * window so that when a socket joins the room late — most commonly after the
 * callee taps the web-push notification — the ring still fires. Cleared on
 * accept/decline/cancel/hangup and by the TTL sweep.
 */
const pendingCalls = new Map<string, { invite: Record<string, unknown>; expiresAt: number }>();

function storePendingInvite(data: Record<string, unknown>) {
  const roomId = data?.roomId;
  if (typeof roomId !== 'string' || !roomId) return;
  pendingCalls.set(roomId, { invite: data, expiresAt: Date.now() + INVITE_TTL_MS });
}

function clearPendingInvite(roomId: unknown) {
  if (typeof roomId === 'string' && roomId) pendingCalls.delete(roomId);
}

/** Drop expired invites (lazy sweep — runs on every store/join). */
function sweepPendingInvites() {
  if (pendingCalls.size === 0) return;
  const now = Date.now();
  for (const [roomId, entry] of pendingCalls) {
    if (entry.expiresAt <= now) pendingCalls.delete(roomId);
  }
}

/**
 * Replay an un-expired invite to a socket that just joined the room, unless
 * this socket belongs to the caller or already saw the replay.
 */
function replayPendingInvite(socket: { id: string; data: { userId?: string; replayedRooms?: Set<string> } }, roomId: string) {
  sweepPendingInvites();
  const entry = pendingCalls.get(roomId);
  if (!entry) return;
  const callerUserId = entry.invite?.callerUserId;
  if (callerUserId && socket.data.userId === callerUserId) return;
  socket.data.replayedRooms ??= new Set<string>();
  if (socket.data.replayedRooms.has(roomId)) return;
  socket.data.replayedRooms.add(roomId);
  socket.emit('call:invite', entry.invite);
  console.log('[dbg] replay invite', socket.id.slice(0, 6), 'room', roomId.slice(-8));
}

io.on('connection', (socket) => {
  let userId: string | null = null;

  socket.on('identify', (id: string) => {
    if (typeof id !== 'string' || !id) return;
    userId = id;
    socketsFor(id).add(socket.id);
    socket.data.userId = id;
    console.log('[dbg] identify', socket.id.slice(0,6), id.slice(-8));
    // Cancel any reconnect grace timer — the user is back online.
    cancelReconnectGrace(id);
    // The socket may have joined rooms BEFORE identifying (socket.io-client
    // flushes its buffered join:room emits before the connect handler's
    // identify). Those rooms' presence snapshots missed this userId — rebroadcast
    // for every room this socket is in now that we know who it is.
    for (const roomId of socket.data.rooms ?? []) broadcastRoomPresence(roomId);
  });

  // ── Call sync: client asks "am I in a call?" on reconnect ──
  // The server responds with the active call entry (if any) so the client
  // can restore its call UI and rejoin the LiveKit room. This is the
  // server-side source-of-truth replacement for localStorage persistence.
  socket.on('call:sync', () => {
    if (!userId) return;
    const entry = activeCalls.get(userId);
    if (entry) {
      socket.emit('call:sync-response', { ...entry });
      console.log(`[call] sync-response → ${userId.slice(-8)}: active call in room ${entry.roomId.slice(-8)}`);
    } else {
      socket.emit('call:sync-response', null);
    }
  });

  socket.on('join:room', (roomId: string) => {
    if (typeof roomId === 'string' && roomId) {
      socket.join(roomId);
      socket.data.rooms ??= new Set<string>();
      socket.data.rooms.add(roomId);
      console.log('[dbg] join', socket.id.slice(0, 6), roomId.slice(-8));
      // Late joiner (e.g. tapped the push notification): ring them if the
      // call invite is still within its window.
      replayPendingInvite(socket as never, roomId);
      // Tell everyone in the room who is online now (including this joiner).
      broadcastRoomPresence(roomId);
    }
  });

  socket.on('leave:room', (roomId: string) => {
    if (typeof roomId === 'string' && roomId) {
      socket.leave(roomId);
      socket.data.rooms?.delete(roomId);
      broadcastRoomPresence(roomId);
    }
  });

  // Read receipts: broadcast to the room (including the reader's other tabs).
  socket.on('message:read', (data: { roomId?: string; userId?: string }) => {
    if (!data?.roomId) return;
    io.to(data.roomId).emit('message:read', { roomId: data.roomId, userId: data.userId });
  });

  // Typing indicators → everyone in the room except the sender.
  socket.on('user:typing', (data: { roomId?: string; userId?: string; userName?: string }) => {
    if (!data?.roomId) return;
    socket.to(data.roomId).emit('user:typing', { roomId: data.roomId, userId: data.userId, userName: data.userName });
  });

  socket.on('user:stop-typing', (data: { roomId?: string; userId?: string }) => {
    if (!data?.roomId) return;
    socket.to(data.roomId).emit('user:stop-typing', { roomId: data.roomId, userId: data.userId });
  });

  // LiveKit call invite → everyone in the chat room except the caller
  // (their own client filters by callerUserId as a second guard). Stored as a
  // pending invite so late joiners still ring.
  socket.on('call:invite', (data: { roomId?: string; joinUrl?: string; callerUserId?: string; callerName?: string; callType?: 'voice' | 'video' }) => {
    if (!data?.roomId || !data.joinUrl) return;
    storePendingInvite(data as Record<string, unknown>);
    sweepPendingInvites();
    // Register the caller's active call server-side.
    if (data.callerUserId && data.callType) {
      registerActiveCall(data.callerUserId, {
        roomId: data.roomId,
        joinUrl: data.joinUrl,
        callType: data.callType,
        peerName: undefined, // unknown until the callee accepts
        role: 'caller',
        startedAt: Date.now(),
      });
    }
    socket.to(data.roomId).emit('call:invite', {
      roomId: data.roomId,
      callerUserId: data.callerUserId,
      callerName: data.callerName,
      callType: data.callType,
      joinUrl: data.joinUrl,
    });
  });

  // Legacy raw-WebRTC 1:1 call signaling + MiroTalk call lifecycle → routed to
  // the target user's sockets only. Lifecycle events also clear the room's
  // pending invite (that call is no longer ringing for late joiners) and
  // unregister both sides' active call entries.
  for (const ev of TARGETED_EVENTS) {
    socket.on(ev, (data: { targetUserId?: string; roomId?: string; fromUserId?: string; [k: string]: unknown }) => {
      if (!data?.targetUserId) return;
      if (ev === 'call:accept' || ev === 'call:decline' || ev === 'call:cancel' || ev === 'call:busy' || ev === 'call:hangup') {
        clearPendingInvite(data.roomId);
      }
      // On accept: register the callee's active call so they also survive refresh.
      if (ev === 'call:accept' && userId && data.roomId) {
        // The caller's entry already exists — update it with the callee's id.
        const callerEntry = activeCalls.get(data.targetUserId ?? '');
        if (callerEntry) {
          callerEntry.peerId = userId;
          activeCalls.set(data.targetUserId ?? '', callerEntry);
        }
        // Register the callee's entry.
        const callType = callerEntry?.callType ?? 'voice';
        registerActiveCall(userId, {
          roomId: data.roomId,
          joinUrl: String(data.joinUrl ?? callerEntry?.joinUrl ?? ''),
          callType,
          peerId: data.fromUserId,
          role: 'callee',
          startedAt: Date.now(),
        });
      }
      // On hangup/cancel/decline/busy: unregister both sides.
      if (ev === 'call:hangup' || ev === 'call:cancel' || ev === 'call:decline' || ev === 'call:busy') {
        if (userId) unregisterActiveCall(userId);
        if (data.fromUserId) unregisterActiveCall(data.fromUserId as string);
        if (data.targetUserId) unregisterActiveCall(data.targetUserId);
      }
      const targets = userSockets.get(data.targetUserId);
      if (!targets || targets.size === 0) return;
      for (const sid of targets) io.to(sid).emit(ev, data);
    });
  }

  // Whiteboard collaboration → room except sender.
  for (const ev of ['wb:cursor-move', 'wb:cursor-leave', 'wb:laser']) {
    socket.on(ev, (data: { roomId?: string; [k: string]: unknown }) => {
      if (!data?.roomId) return;
      socket.to(data.roomId).emit(ev, data);
    });
  }

  // Group calls: host invites the room / cancels.
  socket.on('group-call:invite', (data: { roomId?: string; meetingId?: string; hostId?: string; hostName?: string; title?: string }) => {
    if (!data?.roomId || !data.meetingId) return;
    socket.to(data.roomId).emit('group-call:incoming', data);
  });

  socket.on('group-call:cancel', (data: { roomId?: string; meetingId?: string }) => {
    if (!data?.roomId || !data.meetingId) return;
    socket.to(data.roomId).emit('group-call:cancelled', data);
  });

  socket.on('disconnect', () => {
    // Presence: rooms this socket was in lose a connection — tell the
    // remaining members the updated online set (a multi-tab user stays
    // online if another socket of theirs is still in the room).
    const rooms = [...(socket.data.rooms ?? [])];
    let hasOtherSockets = false;
    if (userId) {
      const s = userSockets.get(userId);
      if (s) { s.delete(socket.id); if (s.size === 0) { userSockets.delete(userId); } else { hasOtherSockets = true; } }
    }
    socket.data.rooms = new Set();
    for (const roomId of rooms) broadcastRoomPresence(roomId);
    // If this was the user's last socket and they have an active call,
    // start the reconnect grace timer — if they don't come back within
    // 30s, clean up the call and notify the peer.
    if (userId && !hasOtherSockets) {
      startReconnectGrace(userId);
    }
  });
});

/* ── HTTP layer ─────────────────────────────────────────────────────────── */

function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (c) => { body += c; if (body.length > 5_000_000) req.destroy(); });
    req.on('end', () => resolve(body));
    req.on('error', () => resolve(body));
  });
}

async function handleEmit(req: http.IncomingMessage, res: http.ServerResponse) {
  try {
    const body = await readBody(req);
    const payload = JSON.parse(body || '{}');
    const { event, room, data } = payload;
    if (typeof event !== 'string' || !event) { res.writeHead(400); res.end(JSON.stringify({ error: 'event is required' })); return; }
    if (TARGETED_EVENTS.has(event) && data?.targetUserId) {
      const targets = userSockets.get(data.targetUserId);
      let n = 0;
      if (targets) for (const sid of targets) { io.to(sid).emit(event, data); n++; }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, delivered: n }));
      return;
    }
    if (typeof room === 'string' && room) {
      // Room-scoped call invites arriving over HTTP (the call-notify route)
      // are tracked for late-joiner replay; lifecycle events stop the ring
      // and unregister both sides' active call entries.
      if (event === 'call:invite' && data && typeof data === 'object') {
        storePendingInvite(data as Record<string, unknown>);
        // Register the caller's active call server-side.
        const cu = (data as any)?.callerUserId;
        const ct = (data as any)?.callType;
        const joinUrl = (data as any)?.joinUrl;
        if (cu && ct && typeof joinUrl === 'string') {
          registerActiveCall(cu, { roomId: room, joinUrl, callType: ct, role: 'caller', startedAt: Date.now() });
        }
      }
      if (event === 'call:hangup' || event === 'call:cancel' || event === 'call:decline' || event === 'call:busy') {
        clearPendingInvite(data?.roomId ?? room);
        const fromUid = (data as any)?.fromUserId;
        const targetUid = (data as any)?.targetUserId;
        if (fromUid) unregisterActiveCall(fromUid);
        if (targetUid) unregisterActiveCall(targetUid);
      }
      const members = io.sockets.adapter.rooms.get(room);
      console.log('[dbg] /emit', event, 'room', room.slice(-8), 'members:', members ? [...members].map(s => s.slice(0, 6)) : []);
      io.to(room).emit(event, data ?? null);
    } else {
      io.emit(event, data ?? null);
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
  } catch (e: any) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: e?.message || 'bad request' }));
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${HOST}:${PORT}`);
  const isEngine = url.searchParams.has('EIO') || url.searchParams.has('transport');
  if (isEngine) {
    io.engine.handleRequest(req, res);
    return;
  }
  // CORS: browsers on a different origin (e.g. localhost:3000 dev/e2e) POST
  // here directly when no gateway proxies /emit for them. The preflight
  // OPTIONS must be answered — a bare 404 makes the browser block the POST
  // (observed: hangup broadcasts silently failing cross-origin).
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }
  for (const [k, v] of Object.entries(corsHeaders)) res.setHeader(k, v);
  if (req.method === 'POST' && (url.pathname === '/emit' || url.pathname === '/')) {
    handleEmit(req, res);
    return;
  }
  if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/healthz')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      ok: true,
      service: 'medq-chat-socket',
      clients: io.engine?.clientsCount ?? 0,
      identifiedUsers: userSockets.size,
    }));
    return;
  }
  // Which of the given users currently have a live socket? Used by the
  // call-notify route to send web-push ONLY to members who are not connected
  // to the app right now ("receive the call even when not in the app").
  if (req.method === 'GET' && url.pathname === '/online') {
    const ids = (url.searchParams.get('ids') || '').split(',').map((s) => s.trim()).filter(Boolean);
    sweepPendingInvites();
    const online = ids.filter((id) => (userSockets.get(id)?.size ?? 0) > 0);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ online, pendingCalls: [...pendingCalls.keys()] }));
    return;
  }
  // Introspection: calls that are still inside their ring window.
  if (req.method === 'GET' && url.pathname === '/calls/pending') {
    sweepPendingInvites();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ calls: [...pendingCalls.entries()].map(([roomId, entry]) => ({ roomId, ...(entry.invite as Record<string, unknown>) })) }));
    return;
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

// WebSocket upgrades: engine.io only (the sole WS consumer on this port).
server.on('upgrade', (req, socket, head) => {
  try { io.engine.handleUpgrade(req, socket as any, head); }
  catch (e: any) { console.error('[chat-service] upgrade error:', e?.stack || e); (socket as any).destroy(); }
});

// Attach with a path that never matches so our own request handler above
// stays in charge of routing (engine path would otherwise swallow /emit).
io.attach(server, { path: '/__engine_disabled__' });
io.engine.on('connection_error', (err: any) => {
  console.error('[chat-service] connection_error:', err?.req?.url, err?.code, err?.message);
});

server.listen(PORT, HOST, () => {
  console.log(`[chat-service] listening on http://${HOST}:${PORT} (socket.io path "/", POST /emit)`);
});

process.on('SIGTERM', () => { server.close(() => process.exit(0)); setTimeout(() => process.exit(0), 2000); });
process.on('SIGINT', () => { server.close(() => process.exit(0)); setTimeout(() => process.exit(0), 2000); });
