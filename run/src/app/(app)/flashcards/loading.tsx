// Loading state for /flashcards.

export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--medq-bg-deep, #0a0e1a)',
        color: 'var(--medq-accent, #00e5a0)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: '3px solid var(--medq-accent, #00e5a0)',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <div style={{ fontSize: 14, color: 'var(--medq-text-muted, #8b95a8)' }}>
        Loading flashcards…
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
