export default function AgentInterface() {
  return (
    <div style={styles.page}>
      <div className="container">
        <div className="card" style={styles.container}>
          <h2 style={styles.title}>Agent Interface</h2>
          <p style={styles.subtitle}>This feature is coming soon</p>
          <div style={styles.placeholder}>
            <svg style={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p>Agent interaction interface will be available here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f8fafc', paddingTop: '40px', paddingBottom: '80px' },
  container: { maxWidth: '900px', margin: '0 auto' },
  title: { fontSize: '32px', fontWeight: '800', color: 'var(--dark)', marginBottom: '8px' },
  subtitle: { fontSize: '16px', color: 'var(--gray)', marginBottom: '32px' },
  placeholder: { textAlign: 'center', padding: '80px 20px', background: '#f8fafc', borderRadius: '12px' },
  icon: { width: '64px', height: '64px', margin: '0 auto 16px', color: 'var(--gray-light)' }
};
