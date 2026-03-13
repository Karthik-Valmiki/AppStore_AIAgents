import { useState, useEffect } from 'react';
import AgentPublishForm from '../components/dashboard/AgentPublishForm';
import UsageStats from '../components/dashboard/UsageStats';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function DeveloperDashboard() {
  const [myAgents, setMyAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchMyAgents();
  }, []);

  const fetchMyAgents = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/agents/');
      const filtered = data.filter(agent => agent.developer_id === user.id);
      setMyAgents(filtered);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div className="container">
        <div style={styles.header} className="slide-in-up">
          <h1 style={styles.title} className="gradient-text">Developer Dashboard</h1>
          <p style={styles.subtitle}>Manage your AI agents and track performance</p>
        </div>
        
        <div style={styles.section} className="fade-in" style={{animationDelay: '0.1s'}}>
          <h2 style={styles.sectionTitle}>Statistics</h2>
          <UsageStats />
        </div>

        <div style={styles.section} className="fade-in" style={{animationDelay: '0.2s'}}>
          <h2 style={styles.sectionTitle}>Publish New Agent</h2>
          <AgentPublishForm onSuccess={fetchMyAgents} />
        </div>

        <div style={styles.section} className="fade-in" style={{animationDelay: '0.3s'}}>
          <h2 style={styles.sectionTitle}>Your Published Agents</h2>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p className="loading-text">Loading your agents...</p>
            </div>
          ) : myAgents.length === 0 ? (
            <div className="card fade-in-scale" style={styles.empty}>
              <svg style={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p style={styles.emptyText}>No agents published yet</p>
              <p style={styles.emptySubtext}>Use the form above to publish your first agent</p>
            </div>
          ) : (
            <div className="grid grid-3">
              {myAgents.map((agent, index) => (
                <div 
                  key={agent.id} 
                  className="card hover-lift" 
                  style={{
                    ...styles.agentCard,
                    animationDelay: `${index * 0.08}s`,
                    opacity: 0,
                    animation: `fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s forwards`
                  }}
                >
                  <div style={styles.agentHeader}>
                    <h3 style={styles.agentName}>{agent.name}</h3>
                    <span className={`badge ${agent.is_active ? 'badge-success' : ''}`}>
                      {agent.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p style={styles.agentDesc}>{agent.description}</p>
                  <div style={styles.agentMeta}>
                    <div style={styles.metaItem}>
                      <svg style={styles.metaIcon} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {agent.average_rating.toFixed(1)}
                    </div>
                    <div style={styles.metaItem}>
                      <svg style={styles.metaIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {agent.downloads}
                    </div>
                    <div style={styles.metaItem}>v{agent.version}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f8fafc', paddingTop: '40px', paddingBottom: '80px' },
  header: { marginBottom: '40px' },
  title: { fontSize: '48px', fontWeight: '800', color: 'var(--dark)', marginBottom: '12px' },
  subtitle: { fontSize: '18px', color: 'var(--gray)' },
  section: { marginTop: '64px' },
  sectionTitle: { fontSize: '28px', fontWeight: '700', color: 'var(--dark)', marginBottom: '24px' },
  empty: { textAlign: 'center', padding: '64px 24px' },
  emptyIcon: { width: '64px', height: '64px', margin: '0 auto 16px', color: 'var(--gray-light)' },
  emptyText: { fontSize: '18px', color: 'var(--dark)', fontWeight: '600', marginBottom: '8px' },
  emptySubtext: { fontSize: '14px', color: 'var(--gray)' },
  agentCard: { display: 'flex', flexDirection: 'column', gap: '16px' },
  agentHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '12px' },
  agentName: { fontSize: '20px', fontWeight: '700', color: 'var(--dark)', flex: 1 },
  agentDesc: { fontSize: '14px', color: 'var(--gray)', lineHeight: '1.6' },
  agentMeta: { display: 'flex', gap: '16px', fontSize: '14px', color: 'var(--gray)', fontWeight: '600', paddingTop: '16px', borderTop: '1px solid var(--gray-light)' },
  metaItem: { display: 'flex', alignItems: 'center', gap: '6px' },
  metaIcon: { width: '16px', height: '16px' }
};
