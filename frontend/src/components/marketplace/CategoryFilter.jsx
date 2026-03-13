const categories = [
  { value: '', label: 'All Categories' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'customer_service', label: 'Customer Service' },
  { value: 'content', label: 'Content Creation' },
  { value: 'automation', label: 'Automation' },
  { value: 'other', label: 'Other' },
];

export default function CategoryFilter({ value, onChange }) {
  return (
    <div style={styles.container}>
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`btn ${value === cat.value ? 'btn-primary' : 'btn-ghost'}`}
          style={styles.button}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

const styles = {
  container: { display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' },
  button: { fontSize: '14px', padding: '10px 20px' }
};
