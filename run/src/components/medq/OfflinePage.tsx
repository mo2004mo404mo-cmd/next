// Distinct UI for "you are offline, app shell chunk couldn't load" —
  // shown when navigator.onLine === false AND the dynamic import failed.
  // Previously this case fell through to the "server restarting" screen,
  // which was misleading offline (the user thinks the server is down
  // when in fact their network is).
 
const OfflinePage = () => {
    return (
    <div style={{
      background: 'var(--medq-bg, #0c0e14)',
      color: 'var(--medq-text, #e8ecf4)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <div style={{
        width: 80,
        height: 80,
        borderRadius: 20,
        background: 'rgba(0, 229, 160, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00e5a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="2" y1="2" x2="22" y2="22" />
          <line x1="1" y1="12" x2="5" y2="12" />
          <line x1="17" y1="12" x2="23" y2="12" />
          <line x1="12" y1="17" x2="12" y2="23" />
          <path d="M6.34 17.66a8 8 0 0 1 11.32-11.32" />
        </svg>
      </div>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
        Med<span style={{ color: '#00e5a0' }}>Q</span> Offline
      </h1>
      <p style={{ color: 'var(--medq-text-faint, #5a6478)', fontSize: 16, maxWidth: 400, lineHeight: 1.6, marginBottom: 24 }}>
        You are currently offline. Your saved questions and exams are still accessible from the Question Bank and Exams tabs.
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          background: '#00e5a0',
          color: '#0c0e14',
          padding: '12px 32px',
          borderRadius: 12,
          border: 'none',
          fontSize: 14,
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        Try Again
      </button>
    </div>

    
  );
}

export default OfflinePage