const categories = [
  { value: '', label: 'All Categories', icon: '🎯' },
  { value: 'productivity', label: 'Productivity', icon: '⚡' },
  { value: 'analytics', label: 'Analytics', icon: '📊' },
  { value: 'customer_service', label: 'Customer Service', icon: '💬' },
  { value: 'content', label: 'Content Creation', icon: '✍️' },
  { value: 'automation', label: 'Automation', icon: '🤖' },
  { value: 'other', label: 'Other', icon: '📦' },
];

export default function CategoryFilter({ value, onChange }) {
  return (
    <div style={styles.container}>
      {categories.map((cat, index) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`btn transition-all ${value === cat.value ? 'btn-primary' : 'btn-ghost'}`}
          style={{
            ...styles.button,
            animationDelay: `${index * 0.05}s`,
            opacity: 0,
            animation: `fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s forwards`
          }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

const styles = {
  container: { 
    display: 'flex', 
    gap: '12px', 
    flexWrap: 'wrap', 
    marginBottom: '32px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  },
  button: { 
    fontSize: '14px', 
    padding: '12px 24px',
    fontWeight: '600'
  }
};
