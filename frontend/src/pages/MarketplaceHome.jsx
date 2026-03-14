import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AgentCard from '../components/marketplace/AgentCard';
import CategoryFilter from '../components/marketplace/CategoryFilter';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function MarketplaceHome() {
  const [agents, setAgents] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [view, setView] = useState('all'); // 'all', 'recommended', 'trending'
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgents();
    if (user) {
      fetchRecommended();
    }
    fetchTrending();
  }, [category, search, user]);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (search) params.append('search', search);
      const { data } = await api.get(`/agents/?${params}`);
      setAgents(data || []);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommended = async () => {
    try {
      const { data } = await api.get('/agents/recommended/');
      setRecommended(data || []);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      setRecommended([]);
    }
  };

  const fetchTrending = async () => {
    try {
      const { data } = await api.get('/agents/trending/');
      setTrending(data || []);
    } catch (error) {
      console.error('Failed to fetch trending:', error);
      setTrending([]);
    }
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice search is only supported in Chrome browser');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      alert('Voice recognition failed. Please try again.');
    };

    recognition.start();
  };

  const trackInteraction = async (agent) => {
    if (user) {
      try {
        await api.post('/interactions/track/', { 
          agent_id: agent.id, 
          interaction_type: 'view' 
        });
      } catch (error) {
        console.error('Failed to track interaction:', error);
      }
    }
    navigate(`/agent/${agent.id}`);
  };

  const displayAgents = view === 'recommended' ? recommended : 
                        view === 'trending' ? trending : agents;

  return (
    <div style={styles.page}>
      <div className="container">
        {/* Header */}
        <div style={styles.header} className="slide-in-up">
          <h1 style={styles.title} className="gradient-text">Discover AI Agents</h1>
          <p style={styles.subtitle}>
            {user ? `Welcome back, ${user.username}!` : 'Find the perfect AI agent for your needs'}
          </p>
          
          {/* Search Bar */}
          <div style={styles.searchBar} className="fade-in-scale">
            <div style={styles.searchWrapper}>
              <svg style={styles.searchIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="input"
                placeholder="Search agents by name or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <button 
              onClick={handleVoiceSearch} 
              className={`btn ${isListening ? 'btn-primary' : 'btn-secondary'}`}
              style={styles.voiceBtn}
              disabled={isListening}
            >
              <svg style={styles.voiceIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              {isListening ? 'Listening...' : 'Voice Search'}
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="slide-in-left">
          <CategoryFilter value={category} onChange={setCategory} />
        </div>

        {/* View Tabs */}
        <div style={styles.tabs} className="slide-in-right">
          <button 
            className={`btn ${view === 'all' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setView('all')}
            style={styles.tab}
          >
            All Agents ({agents.length})
          </button>
          {user && (
            <button 
              className={`btn ${view === 'recommended' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setView('recommended')}
              style={styles.tab}
            >
              Recommended ({recommended.length})
            </button>
          )}
          <button 
            className={`btn ${view === 'trending' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setView('trending')}
            style={styles.tab}
          >
            Trending ({trending.length})
          </button>
        </div>

        {/* Agents Grid */}
        <div style={styles.section}>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p className="loading-text">Loading agents...</p>
            </div>
          ) : displayAgents.length === 0 ? (
            <div style={styles.empty} className="card fade-in-scale">
              <svg style={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p style={styles.emptyText}>No agents found</p>
              <p style={styles.emptySubtext}>
                {search ? 'Try adjusting your search query' : 
                 category ? 'Try selecting a different category' : 
                 'No agents available yet'}
              </p>
            </div>
          ) : (
            <div className="grid grid-3">
              {displayAgents.map((agent, index) => (
                <div 
                  key={agent.id} 
                  className="fade-in" 
                  style={{ 
                    animationDelay: `${index * 0.08}s`,
                    opacity: 0,
                    animation: `fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s forwards`
                  }}
                >
                  <AgentCard agent={agent} onSelect={trackInteraction} />
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
  subtitle: { fontSize: '18px', color: 'var(--gray)', marginBottom: '32px' },
  searchBar: { display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap' },
  searchWrapper: { flex: 1, minWidth: '300px', position: 'relative' },
  searchIcon: { position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: 'var(--gray)' },
  searchInput: { paddingLeft: '48px' },
  voiceBtn: { display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' },
  voiceIcon: { width: '20px', height: '20px' },
  tabs: { display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' },
  tab: { fontSize: '14px', padding: '10px 20px' },
  section: { marginTop: '32px' },
  empty: { textAlign: 'center', padding: '80px 20px' },
  emptyIcon: { width: '64px', height: '64px', margin: '0 auto 16px', color: 'var(--gray-light)' },
  emptyText: { fontSize: '20px', color: 'var(--dark)', fontWeight: '600', marginBottom: '8px' },
  emptySubtext: { fontSize: '15px', color: 'var(--gray)' }
};
