import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function UsageStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/interactions/stats')
      .then(({ data }) => setStats(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    { 
      label: 'Agents Published', 
      value: stats.agents_published || 0,
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: '#6366f1'
    },
    { 
      label: 'Total Downloads', 
      value: stats.total_downloads || 0,
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
      color: '#8b5cf6'
    },
    { 
      label: 'Interactions', 
      value: stats.interactions || 0,
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: '#10b981'
    },
    { 
      label: 'Ratings Given', 
      value: stats.ratings_given || 0,
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      color: '#f59e0b'
    },
  ];

  return (
    <div className="grid grid-4">
      {statCards.map((stat, index) => (
        <div key={index} className="card" style={styles.stat}>
          <div style={{ ...styles.iconWrapper, background: stat.color }}>
            <div style={styles.icon}>{stat.icon}</div>
          </div>
          <h3 style={styles.number}>{stat.value.toLocaleString()}</h3>
          <p style={styles.label}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  stat: { textAlign: 'center', padding: '32px 20px' },
  iconWrapper: { 
    width: '56px', 
    height: '56px', 
    borderRadius: '12px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    margin: '0 auto 16px' 
  },
  icon: { width: '28px', height: '28px', color: 'white' },
  number: { fontSize: '32px', fontWeight: '800', color: 'var(--dark)', marginBottom: '8px' },
  label: { color: 'var(--gray)', fontSize: '14px', fontWeight: '600' }
};
