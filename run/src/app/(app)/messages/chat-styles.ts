const STYLE_ID = 'advanced-chat-styles';

export function injectChatStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes msgAppear { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
    @keyframes typingDot { 0%,60%,100% { opacity:.3; transform:translateY(0); } 30% { opacity:1; transform:translateY(-4px); } }
    @keyframes recPulse { 0%,100% { opacity:1; } 50% { opacity:.5; } }
    @keyframes receiptPop { from { transform:scale(.7); opacity:0; } to { transform:scale(1); opacity:1; } }
    @keyframes onlinePulse { 0%,100% { box-shadow:0 0 0 0 rgba(0,229,160,0.4); } 50% { box-shadow:0 0 0 4px rgba(0,229,160,0); } }
    /* Pinned-message highlight — fired by scrollToMessage() every time the
       pin bar is tapped. Combines THREE effects so the feedback is
       unmistakable even when the message is already centered:
       1. A thick bright-green outline (4px, with offset so it clears the bubble)
       2. A green background flash that fades from 18% → 0%
       3. A slight scale-up (1.0 → 1.005 → 1.0) for a subtle "pop"
       The animation runs 2.8s; the class is removed + re-added (with a
       forced reflow) on every click so it always replays. */
    @keyframes msgFlashHighlight {
      0%   { outline: 4px solid rgba(0,229,160,0.9); outline-offset: 3px; background-color: rgba(0,229,160,0.18); transform: scale(1); }
      15%  { outline: 4px solid rgba(0,229,160,0.9); outline-offset: 3px; background-color: rgba(0,229,160,0.18); transform: scale(1.005); }
      40%  { outline: 4px solid rgba(0,229,160,0.7); outline-offset: 3px; background-color: rgba(0,229,160,0.08); transform: scale(1); }
      100% { outline: 4px solid transparent; outline-offset: 3px; background-color: transparent; transform: scale(1); }
    }
    .msg-flash-highlight { animation: msgFlashHighlight 2.8s ease-out !important; border-radius: 10px; }
    .msg-appear { animation: msgAppear .2s ease-out; }
    .typing-dot { animation: typingDot 1.4s infinite; }
    .typing-dot:nth-child(2) { animation-delay: .2s; }
    .typing-dot:nth-child(3) { animation-delay: .4s; }
    .rec-pulse { animation: recPulse 1s infinite; }
    .receipt-pop { animation: receiptPop .3s ease-out; }
    .online-pulse { animation: onlinePulse 2s ease-in-out infinite; }
    .chat-scrollbar::-webkit-scrollbar { width: 5px; height: 3px; }
    .chat-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .chat-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
    .chat-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
    .folder-tabs-scroll::-webkit-scrollbar { display: none; }
    .folder-tabs-scroll { -ms-overflow-style: none; scrollbar-width: none; }
    .drag-over-indicator { box-shadow: inset 0 2px 0 0 #00e5a0; }
    .dragging-item { opacity: 0.4; transform: scale(0.97); transition: all 0.15s ease; }
    @keyframes heartPop { 0% { transform:scale(0); opacity:0; } 50% { transform:scale(1.3); opacity:1; } 100% { transform:scale(1); opacity:0; } }
    .heart-pop { animation: heartPop .6s ease-out forwards; pointer-events: none; }
    @keyframes checkOverlay { from { transform:scale(0.5); opacity:0; } to { transform:scale(1); opacity:1; } }
    .check-overlay { animation: checkOverlay .15s ease-out; }
    @keyframes slideInUp { from { transform:translateY(100%); opacity:0; } to { transform:translateY(0); opacity:1; } }
    .slide-in-up { animation: slideInUp .2s ease-out; }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    .fade-in { animation: fadeIn .15s ease-out; }
    .swipe-action-btn { transition: all 0.15s ease; }
    .swipe-action-btn:hover { filter: brightness(1.2); }
    .chat-room-item { transition: transform 0.15s ease; }
    .floating-date { transition: opacity 0.2s ease, transform 0.2s ease; }
    .sidebar-slide-enter { animation: sidebarSlideIn 0.25s ease-out; }
    @keyframes sidebarSlideIn { from { transform:translateX(-100%); opacity:0; } to { transform:translateX(0); opacity:1; } }
    .sidebar-slide-exit { animation: sidebarSlideOut 0.2s ease-in forwards; }
    @keyframes sidebarSlideOut { from { transform:translateX(0); opacity:1; } to { transform:translateX(-100%); opacity:0; } }
    @keyframes emojiBounce { 0% { transform: scale(0.5); opacity: 0; } 50% { transform: scale(1.2); } 70% { transform: scale(0.9); } 100% { transform: scale(1); opacity: 1; } }
    .emoji-bounce { animation: emojiBounce 0.4s ease-out; }
    @keyframes reactionPop { 0% { transform: scale(0); } 70% { transform: scale(1.15); } 100% { transform: scale(1); } }
    .reaction-pop { animation: reactionPop 0.2s ease-out; }
    @keyframes callRipple { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(2.5); opacity: 0; } }
    .call-ripple { animation: callRipple 2s ease-out infinite; }
    .call-ripple-delay-1 { animation: callRipple 2s ease-out 0.6s infinite; }
    .call-ripple-delay-2 { animation: callRipple 2s ease-out 1.2s infinite; }
    @keyframes pollBarGrow { from { width: 0%; } to { width: var(--poll-width); } }
    .poll-bar-animate { animation: pollBarGrow 0.6s ease-out forwards; }
    @keyframes incomingCallPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(0,229,160,0.5); } 50% { box-shadow: 0 0 0 12px rgba(0,229,160,0); } }
    .incoming-call-pulse { animation: incomingCallPulse 1.5s ease-in-out infinite; }
    @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .slide-down { animation: slideDown 0.3s ease-out; }
    @keyframes callCountdown { from { width: 100%; } to { width: 0%; } }
    .call-countdown { animation: callCountdown linear forwards; }
  `;
  document.head.appendChild(style);
}
