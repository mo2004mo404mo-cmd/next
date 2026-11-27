import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { db } from '../../db';
import type { MedQToolContext } from '../types';
import { digestUnreadMessages } from '../../chat/digest';

/**
 * Messaging tools — the agent's bridge into the Messages tab.
 *
 * The chat system (ChatRoom / ChatRoomMember / ChatMessage) backs the
 * Telegram-style Messages tab; these tools expose the same capabilities the
 * tab has to the assistant:
 *
 *   list_chat_rooms          read   rooms + unread counts + members
 *   read_chat_messages       read   recent messages (never marks read)
 *   summarize_unread_messages read  AI digest of a busy room (map-reduce on the
 *                                   fast model) with event extraction
 *   send_chat_message        write  post to a room (HITL-gated)
 *   start_direct_message     write  find-or-create a DM + first message (gated)
 *   create_chat_group        write  new group with members (gated)
 *   send_push_notification   write  web push to the user's devices (gated)
 *
 * Writes replicate the REST routes' logic exactly (same DB writes + the
 * best-effort socket broadcast to localhost:3004) so online Messages tabs
 * update live, and reading NEVER bumps ChatRoomMember.lastReadAt — the user's
 * unread badge is theirs to clear, not the agent's.
 */

/** Best-effort socket broadcast (identical to the REST send route). */
async function broadcastChat(event: string, roomId: string, data: unknown): Promise<void> {
  try {
    await fetch('http://localhost:3004/emit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, room: roomId, data }),
    });
  } catch {
    // chat service not running — DB write stands, clients refresh on focus
  }
}

/** Unread count for one membership (same query as the rooms REST route). */
function unreadCountWhere(roomId: string, userId: string, lastReadAt: Date) {
  return {
    roomId,
    senderId: { not: userId },
    isDeleted: false,
    createdAt: { gt: lastReadAt },
  };
}

export function createMessagingTools(
  ctx: MedQToolContext,
  options: { fastModel?: BaseChatModel | null } = {},
) {
  // ── list_chat_rooms ──────────────────────────────────────────────────────
  const listChatRooms = new DynamicStructuredTool({
    name: 'list_chat_rooms',
    description:
      'List the learner\'s chat rooms (the Messages tab conversations): group chats and direct messages, each with its unread count, participants and last message preview. Use this FIRST whenever the learner asks anything about their messages, groups or DMs.',
    schema: z.object({}),
    func: async () => {
      try {
        const memberships = await db.chatRoomMember.findMany({
          where: { userId: ctx.userId },
          include: {
            room: {
              include: {
                members: {
                  include: { user: { select: { id: true, name: true, image: true } } },
                },
              },
            },
          },
          orderBy: { role: 'asc' },
          take: 50,
        });

        // Newest activity first.
        memberships.sort((a, b) => b.room.lastMessageAt.getTime() - a.room.lastMessageAt.getTime());

        const rooms = await Promise.all(
          memberships.map(async (membership) => {
            const room = membership.room;
            const [unreadCount, lastMessage] = await Promise.all([
              db.chatMessage.count({ where: unreadCountWhere(room.id, ctx.userId, membership.lastReadAt) }),
              db.chatMessage.findFirst({
                where: { roomId: room.id, isDeleted: false },
                orderBy: { createdAt: 'desc' },
                select: { content: true, senderId: true, createdAt: true, type: true },
              }),
            ]);
            const otherMembers = room.members
              .filter((member) => member.userId !== ctx.userId)
              .map((member) => ({ id: member.user.id, name: member.user.name }));
            const label = room.type === 'group'
              ? room.name || 'Unnamed group'
              : otherMembers[0]?.name ?? 'Direct message';
            return {
              roomId: room.id,
              type: room.type,
              name: label,
              unreadCount,
              isMuted: membership.isMuted,
              members: room.type === 'group' ? otherMembers : otherMembers.slice(0, 1),
              lastMessage: lastMessage
                ? {
                    preview: (lastMessage.content || `[${lastMessage.type}]`).slice(0, 80),
                    fromSelf: lastMessage.senderId === ctx.userId,
                    at: lastMessage.createdAt.toISOString(),
                  }
                : null,
            };
          }),
        );

        return JSON.stringify({
          rooms,
          hint: 'Room names/ids come from here. Use summarize_unread_messages for rooms with many unread messages; read_chat_messages for the latest messages of a room.',
        });
      } catch (error) {
        return JSON.stringify({ error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  // ── read_chat_messages ───────────────────────────────────────────────────
  const readChatMessages = new DynamicStructuredTool({
    name: 'read_chat_messages',
    description:
      'Read the most recent messages of one chat room (Messages tab). Does NOT mark the room as read — the learner\'s unread badge is untouched.',
    schema: z.object({
      roomId: z.string().min(5).describe('Room id from list_chat_rooms'),
      limit: z.number().int().min(1).max(80).optional().describe('How many recent messages (default 25)'),
    }),
    func: async ({ roomId, limit }) => {
      try {
        const membership = await db.chatRoomMember.findUnique({
          where: { roomId_userId: { roomId, userId: ctx.userId } },
        });
        if (!membership) return JSON.stringify({ error: 'Not a member of that room' });

        const take = limit ?? 25;
        const rows = await db.chatMessage.findMany({
          where: { roomId, isDeleted: false },
          include: { sender: { select: { id: true, name: true } } },
          orderBy: { createdAt: 'desc' },
          take,
        });
        rows.reverse();
        return JSON.stringify({
          roomId,
          messages: rows.map((row) => ({
            id: row.id,
            sender: row.sender.name,
            fromSelf: row.senderId === ctx.userId,
            content: row.content.slice(0, 1500),
            type: row.type,
            at: row.createdAt.toISOString(),
          })),
        });
      } catch (error) {
        return JSON.stringify({ error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  // ── summarize_unread_messages ────────────────────────────────────────────
  const summarizeUnread = new DynamicStructuredTool({
    name: 'summarize_unread_messages',
    description:
      'AI-digest the UNREAD messages of one chat room — built for the "thousands of unread" case: messages are chunk-summarized on a fast model, then merged into one digest with extracted events (meetings, exam schedules, deadlines, announcements). Returns the digest plus a structured events list you can turn into push notifications with send_push_notification.',
    schema: z.object({
      roomId: z.string().min(5).describe('Room id from list_chat_rooms'),
      maxMessages: z.number().int().min(20).max(1000).optional().describe('Cap on messages analyzed (default 600, oldest beyond the cap are skipped and reported)'),
    }),
    func: async ({ roomId, maxMessages }) => {
      try {
        const digest = await digestUnreadMessages({
          userId: ctx.userId,
          roomId,
          maxMessages: maxMessages ?? 600,
          model: options.fastModel ?? undefined,
        });
        return JSON.stringify(digest);
      } catch (error) {
        return JSON.stringify({ error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  // ── send_chat_message (HITL-gated in the registry) ───────────────────────
  const sendChatMessage = new DynamicStructuredTool({
    name: 'send_chat_message',
    description:
      'Send a message to one of the learner\'s chat rooms (group or direct) on their behalf, exactly as if typed in the Messages tab. ALWAYS confirm the room with list_chat_rooms first, and draft the message from the learner\'s intent — never invent content they did not ask for.',
    schema: z.object({
      roomId: z.string().min(5).describe('Room id from list_chat_rooms'),
      content: z.string().min(1).max(4000).describe('Message text to send'),
      replyToId: z.string().optional().describe('Message id being replied to, when replying'),
    }),
    func: async ({ roomId, content, replyToId }) => {
      try {
        const membership = await db.chatRoomMember.findUnique({
          where: { roomId_userId: { roomId, userId: ctx.userId } },
        });
        if (!membership) return JSON.stringify({ sent: false, error: 'Not a member of that room' });

        if (replyToId) {
          const target = await db.chatMessage.findUnique({ where: { id: replyToId } });
          if (!target || target.roomId !== roomId) {
            return JSON.stringify({ sent: false, error: 'Reply message not found in this room' });
          }
        }

        const message = await db.chatMessage.create({
          data: {
            roomId,
            senderId: ctx.userId,
            content: content.trim(),
            type: 'text',
            metadata: JSON.stringify({ via: 'medq-agent' }),
            replyToId: replyToId || null,
          },
          include: {
            sender: { select: { id: true, name: true, image: true } },
            replyTo: {
              select: { id: true, content: true, senderId: true, sender: { select: { id: true, name: true } } },
            },
          },
        });
        await db.chatRoom.update({ where: { id: roomId }, data: { lastMessageAt: new Date() } });
        await broadcastChat('new:message', roomId, message);

        return JSON.stringify({
          sent: true,
          roomId,
          messageId: message.id,
          roomRefreshed: true,
          note: 'Message delivered (the Messages tab updates automatically).',
        });
      } catch (error) {
        return JSON.stringify({ sent: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  // ── start_direct_message (HITL-gated) ────────────────────────────────────
  const startDirectMessage = new DynamicStructuredTool({
    name: 'start_direct_message',
    description:
      'Open (or reuse) a direct-message room with another MedQ user and optionally send the first message. Resolve the target by name via list_chat_rooms (existing DMs) or the learner\'s statement; only users sharing a room with the learner can be reached.',
    schema: z.object({
      targetUserName: z.string().min(2).max(80).describe('Exact user name of the recipient'),
      content: z.string().max(4000).optional().describe('Optional first message to send'),
    }),
    func: async ({ targetUserName, content }) => {
      try {
        // Resolve candidate users: anyone sharing a room with the learner.
        const myRoomIds = await db.chatRoomMember.findMany({
          where: { userId: ctx.userId },
          select: { roomId: true },
        });
        const roomIds = myRoomIds.map((row) => row.roomId);
        const candidates = roomIds.length
          ? await db.user.findMany({
              where: {
                name: { equals: targetUserName, mode: 'insensitive' },
                chatRoomMembers: { some: { roomId: { in: roomIds } } },
              },
              select: { id: true, name: true },
              take: 5,
            })
          : [];
        if (candidates.length === 0) {
          return JSON.stringify({
            started: false,
            error: `No reachable user named "${targetUserName}". They must share a chat room with the learner first.`,
          });
        }
        if (candidates.length > 1) {
          return JSON.stringify({
            started: false,
            ambiguous: true,
            candidates: candidates.map((candidate) => candidate.name),
            hint: 'Ask the learner which person they mean.',
          });
        }
        const target = candidates[0];
        if (target.id === ctx.userId) {
          return JSON.stringify({ started: false, error: 'That is the learner themselves.' });
        }

        // Find-or-create the direct room (same rule as /api/chat/direct).
        const existing = await db.chatRoom.findFirst({
          where: {
            type: 'direct',
            AND: [
              { members: { some: { userId: ctx.userId } } },
              { members: { some: { userId: target.id } } },
            ],
          },
          include: { members: true },
        });
        let roomId: string;
        if (existing) {
          roomId = existing.id;
        } else {
          const room = await db.chatRoom.create({
            data: {
              type: 'direct',
              createdBy: ctx.userId,
              members: {
                create: [
                  { userId: ctx.userId, role: 'member' },
                  { userId: target.id, role: 'member' },
                ],
              },
            },
          });
          roomId = room.id;
        }

        let messageId: string | undefined;
        if (content?.trim()) {
          const message = await db.chatMessage.create({
            data: {
              roomId,
              senderId: ctx.userId,
              content: content.trim(),
              type: 'text',
              metadata: JSON.stringify({ via: 'medq-agent' }),
            },
            include: { sender: { select: { id: true, name: true, image: true } } },
          });
          await db.chatRoom.update({ where: { id: roomId }, data: { lastMessageAt: new Date() } });
          await broadcastChat('new:message', roomId, message);
          messageId = message.id;
        }

        return JSON.stringify({
          started: true,
          roomId,
          to: target.name,
          messageId,
          roomRefreshed: true,
        });
      } catch (error) {
        return JSON.stringify({ started: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  // ── create_chat_group (HITL-gated) ───────────────────────────────────────
  const createChatGroup = new DynamicStructuredTool({
    name: 'create_chat_group',
    description:
      'Create a new group chat in the Messages tab with the learner as admin, add members by exact user name (they must share a room with the learner), and optionally post the first message.',
    schema: z.object({
      name: z.string().min(2).max(60).describe('Group name'),
      memberNames: z.array(z.string().min(2).max(80)).min(1).max(20).describe('Exact user names to add'),
      description: z.string().max(200).optional().describe('Optional group description'),
      firstMessage: z.string().max(2000).optional().describe('Optional first message to post'),
    }),
    func: async ({ name, memberNames, description, firstMessage }) => {
      try {
        const myRoomIds = await db.chatRoomMember.findMany({
          where: { userId: ctx.userId },
          select: { roomId: true },
        });
        const roomIds = myRoomIds.map((row) => row.roomId);
        const resolved: Array<{ id: string; name: string | null }> = [];
        const missing: string[] = [];
        for (const memberName of memberNames) {
          const found = roomIds.length
            ? await db.user.findFirst({
                where: {
                  name: { equals: memberName, mode: 'insensitive' },
                  chatRoomMembers: { some: { roomId: { in: roomIds } } },
                },
                select: { id: true, name: true },
              })
            : null;
          if (found && found.id !== ctx.userId) resolved.push(found);
          else missing.push(memberName);
        }
        if (resolved.length === 0) {
          return JSON.stringify({
            created: false,
            error: 'None of the member names could be resolved (they must share a chat room with the learner).',
            missing,
          });
        }

        const room = await db.chatRoom.create({
          data: {
            type: 'group',
            name: name.trim(),
            description: description?.trim() ?? '',
            createdBy: ctx.userId,
            members: {
              create: [
                { userId: ctx.userId, role: 'admin' },
                ...resolved.map((member) => ({ userId: member.id, role: 'member' as const })),
              ],
            },
          },
        });

        let messageId: string | undefined;
        if (firstMessage?.trim()) {
          const message = await db.chatMessage.create({
            data: {
              roomId: room.id,
              senderId: ctx.userId,
              content: firstMessage.trim(),
              type: 'text',
              metadata: JSON.stringify({ via: 'medq-agent' }),
            },
            include: { sender: { select: { id: true, name: true, image: true } } },
          });
          await db.chatRoom.update({ where: { id: room.id }, data: { lastMessageAt: new Date() } });
          await broadcastChat('new:message', room.id, message);
          messageId = message.id;
        }

        return JSON.stringify({
          created: true,
          roomId: room.id,
          name: room.name,
          added: resolved.map((member) => member.name),
          missing,
          messageId,
          roomRefreshed: true,
        });
      } catch (error) {
        return JSON.stringify({ created: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  // ── send_push_notification (HITL-gated) ──────────────────────────────────
  const sendPushNotification = new DynamicStructuredTool({
    name: 'send_push_notification',
    description:
      'Send a push notification to the learner\'s subscribed devices (phone/desktop, even when MedQ is closed) and add it to their in-app notification bell. Use for things they must not miss — extracted meetings, exam schedules, deadlines — typically right after summarize_unread_messages. Keep it short; one notification per event.',
    schema: z.object({
      title: z.string().min(3).max(80).describe('Notification title, e.g. "Team meeting tomorrow 10:00"'),
      body: z.string().min(3).max(300).describe('One-line body with the key detail'),
      roomId: z.string().optional().describe('Room id to deep-link when tapped (from the digest)'),
      messageId: z.string().optional().describe('Message id to deep-link to the exact message'),
    }),
    func: async ({ title, body, roomId, messageId }) => {
      try {
        const created = await db.notification.create({
          data: {
            userId: ctx.userId,
            type: roomId ? 'chat_mention' : 'system',
            title: title.trim(),
            message: body.trim(),
            referenceId: roomId && messageId ? `${roomId}:${messageId}` : (roomId ?? ''),
          },
        });
        // sendPushToUser returns real delivery stats (sendPushForNotification
        // is void); the deep-link mirrors the "roomId:msgId" format the
        // in-app bell uses for chat notifications.
        const { sendPushToUser } = await import('../../server/push');
        const push = await sendPushToUser(ctx.userId, {
          title: title.trim(),
          body: body.trim(),
          url: roomId && messageId
            ? `/messages?room=${roomId}&msg=${messageId}`
            : roomId ? `/messages?room=${roomId}` : '/',
          tag: 'medq-chat-event',
          data: { notificationId: created.id },
        }).catch(() => ({ sent: 0, failed: 0, total: 0, disabled: true }));
        return JSON.stringify({
          sent: true,
          notificationId: created.id,
          push,
          note: push.disabled
            ? 'In-app notification created (web push not configured on this server).'
            : `In-app notification created; push attempted on ${push.total} device(s), ${push.sent} delivered.`,
        });
      } catch (error) {
        return JSON.stringify({ sent: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  return [
    listChatRooms,
    readChatMessages,
    summarizeUnread,
    sendChatMessage,
    startDirectMessage,
    createChatGroup,
    sendPushNotification,
  ];
}
