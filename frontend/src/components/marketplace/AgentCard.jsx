import Button from '../common/Button';

export default function AgentCard({ agent, onSelect }) {
  return (
    <div className="card hover-lift" style={styles.card}>
      <div style={styles.header}>
        <div style={styles.categoryBadge} className="badge-primary">
          {agent.category.replace('_', ' ')}
        </div>
        <div style={styles.rating}>
          <svg style={styles.starIcon} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {agent.average_rating.toFixed(1)}
        </div>
      </div>
      
      <h3 style={styles.name}>{agent.name}</h3>
      <p style={styles.description}>{agent.description}</p>
      
      <div style={styles.meta}>
        <div style={styles.metaItem}>
          <svg style={styles.metaIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span style={styles.metaValue}>{agent.downloads} downloads</span>
        </div>
        <div style={styles.metaItem}>
          <svg style={styles.metaIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span style={styles.metaValue}>v{agent.version}</span>
        </div>
      </div>
      
      <div style={styles.footer}>
        <span style={styles.developer}>by {agent.developer_name}</span>
        <Button onClick={() => onSelect(agent)} style={{ padding: '10px 20px', fontSize: '14px' }}>
          View Details
        </Button>
      </div>
    </div>
  );
}

const styles = {
  card: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '16px', 
    height: '100%',
    cursor: 'pointer'
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  categoryBadge: { 
    fontSize: '12px', 
    padding: '6px 14px', 
    borderRadius: '20px', 
    fontWeight: '600',
    textTransform: 'capitalize',
    transition: 'all 0.3s ease'
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '15px',
    fontWeight: '700',
    color: 'var(--warning)'
  },
  starIcon: {
    width: '18px',
    height: '18px'
  },
  name: { 
    fontSize: '22px', 
    fontWeight: '800', 
    color: 'var(--dark)', 
    margin: '8px 0',
    lineHeight: '1.3'
  },
  description: { 
    fontSize: '14px', 
    color: 'var(--gray)', 
    lineHeight: '1.7', 
    flex: 1,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  meta: { 
    display: 'flex', 
    gap: '20px', 
    fontSize: '13px', 
    color: 'var(--gray)', 
    fontWeight: '600',
    paddingTop: '12px',
    borderTop: '1px solid rgba(0,0,0,0.05)'
  },
  metaItem: { display: 'flex', alignItems: 'center', gap: '6px' },
  metaIcon: { width: '18px', height: '18px', color: 'var(--primary)' },
  metaValue: { fontSize: '13px' },
  footer: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 'auto', 
    paddingTop: '16px'
  },
  developer: { fontSize: '13px', color: 'var(--gray)', fontWeight: '600' }
};
