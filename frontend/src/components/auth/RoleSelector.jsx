export default function RoleSelector({ value, onChange }) {
  return (
    <div style={styles.container}>
      <label style={styles.label}>Select Your Role</label>
      <div style={styles.options}>
        <div
          style={{ ...styles.option, ...(value === 'consumer' ? styles.selected : {}) }}
          onClick={() => onChange('consumer')}
        >
          <svg style={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 style={styles.title}>Consumer</h3>
          <p style={styles.desc}>Browse and use AI agents</p>
        </div>
        <div
          style={{ ...styles.option, ...(value === 'developer' ? styles.selected : {}) }}
          onClick={() => onChange('developer')}
        >
          <svg style={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <h3 style={styles.title}>Developer</h3>
          <p style={styles.desc}>Publish and manage agents</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { marginBottom: '8px' },
  label: { display: 'block', marginBottom: '12px', fontWeight: '600', fontSize: '14px', color: 'var(--dark)' },
  options: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  option: {
    padding: '24px 16px',
    border: '2px solid var(--gray-light)',
    borderRadius: '12px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    background: 'var(--white)',
  },
  selected: { 
    borderColor: 'var(--primary)', 
    background: 'rgba(99, 102, 241, 0.05)',
    transform: 'scale(1.02)'
  },
  icon: { 
    width: '32px', 
    height: '32px', 
    margin: '0 auto 12px',
    color: 'var(--primary)'
  },
  title: { fontSize: '16px', marginBottom: '4px', color: 'var(--dark)', fontWeight: '700' },
  desc: { fontSize: '13px', color: 'var(--gray)' },
};
