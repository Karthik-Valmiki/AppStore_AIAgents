import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AgentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [agent, setAgent] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAgent();
    fetchRatings();
  }, [id]);

  const fetchAgent = async () => {
    try {
      const { data } = await api.get(`/agents/${id}/`);
      setAgent(data);
    } catch (error) {
      console.error('Failed to fetch agent:', error);
      alert('Agent not found');
      navigate('/marketplace');
    } finally {
      setLoading(false);
    }
  };

  const fetchRatings = async () => {
    try {
      const { data } = await api.get(`/interactions/ratings/?agent_id=${id}`);
      setRatings(data || []);
    } catch (error) {
      console.error('Failed to fetch ratings:', error);
    }
  };

  const handleDownload = async () => {
    if (!user) {
      alert('Please login to download agents');
      navigate('/login');
      return;
    }

    try {
      await api.post('/interactions/track/', {
        agent_id: parseInt(id),
        interaction_type: 'download'
      });
      alert('Agent downloaded successfully!');
      fetchAgent();
    } catch (error) {
      console.error('Failed to track download:', error);
      alert('Download tracking failed');
    }
  };

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to rate agents');
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/interactions/ratings/', {
        agent_id: parseInt(id),
        score: rating,
        review: review
      });
      alert('Rating submitted successfully!');
      setShowRatingForm(false);
      setReview('');
      setRating(5);
      fetchAgent();
      fetchRatings();
    } catch (error) {
      console.error('Failed to submit rating:', error);
      alert(error.response?.data?.detail || 'Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p style={{ marginTop: '16px' }}>Loading agent details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!agent) return null;

  return (
    <div style={styles.page}>
      <div className="container">
        {/* Back Button */}
        <button 
          className="btn btn-ghost" 
          onClick={() => navigate('/marketplace')}
          style={styles.backBtn}
        >
          <svg style={styles.backIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Marketplace
        </button>

        <div style={styles.content}>
          {/* Main Info */}
          <div className="card" style={styles.mainCard}>
            <div style={styles.header}>
              <div>
                <div style={styles.categoryBadge}>
                  {agent.category.replace('_', ' ')}
                </div>
                <h1 style={styles.title}>{agent.name}</h1>
                <p style={styles.developer}>by {agent.developer_name}</p>
              </div>
              <div style={styles.stats}>
                <div style={styles.stat}>
                  <svg style={styles.statIcon} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span style={styles.statValue}>{agent.average_rating.toFixed(1)}</span>
                </div>
                <div style={styles.stat}>
                  <svg style={styles.statIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span style={styles.statValue}>{agent.downloads}</span>
                </div>
              </div>
            </div>

            <p style={styles.description}>{agent.description}</p>

            <div style={styles.details}>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Version:</span>
                <span style={styles.detailValue}>{agent.version}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>API Endpoint:</span>
                <span style={styles.detailValue}>{agent.api_endpoint}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Status:</span>
                <span className={`badge ${agent.is_active ? 'badge-success' : ''}`}>
                  {agent.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <div style={styles.actions}>
              <Button onClick={handleDownload} style={{ flex: 1 }}>
                Download Agent
              </Button>
              {user && (
                <Button 
                  variant="secondary" 
                  onClick={() => setShowRatingForm(!showRatingForm)}
                  style={{ flex: 1 }}
                >
                  {showRatingForm ? 'Cancel Rating' : 'Rate Agent'}
                </Button>
              )}
            </div>

            {/* Rating Form */}
            {showRatingForm && (
              <form onSubmit={handleSubmitRating} style={styles.ratingForm} className="card">
                <h3 style={styles.formTitle}>Rate this Agent</h3>
                <div>
                  <label style={styles.label}>Rating (1-5 stars)</label>
                  <div style={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        style={{ ...styles.star, ...(star <= rating ? styles.starFilled : {}) }}
                        fill={star <= rating ? 'currentColor' : 'none'}
                        viewBox="0 0 20 20"
                        onClick={() => setRating(star)}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={styles.label}>Review (optional)</label>
                  <textarea
                    className="input"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Share your experience with this agent..."
                    rows="4"
                  />
                </div>
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Rating'}
                </Button>
              </form>
            )}
          </div>

          {/* Ratings Section */}
          <div className="card" style={styles.ratingsCard}>
            <h2 style={styles.sectionTitle}>User Reviews ({ratings.length})</h2>
            {ratings.length === 0 ? (
              <p style={styles.noRatings}>No reviews yet. Be the first to rate this agent!</p>
            ) : (
              <div style={styles.ratingsList}>
                {ratings.map((r) => (
                  <div key={r.id} style={styles.ratingItem}>
                    <div style={styles.ratingHeader}>
                      <span style={styles.ratingUser}>{r.user_name || 'Anonymous'}</span>
                      <div style={styles.ratingStars}>
                        {[...Array(r.score)].map((_, i) => (
                          <svg key={i} style={styles.smallStar} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    {r.review && <p style={styles.ratingReview}>{r.review}</p>}
                    <p style={styles.ratingDate}>
                      {new Date(r.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f8fafc', paddingTop: '40px', paddingBottom: '80px' },
  backBtn: { marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' },
  backIcon: { width: '20px', height: '20px' },
  content: { display: 'grid', gap: '24px' },
  mainCard: { padding: '40px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px', flexWrap: 'wrap', gap: '20px' },
  categoryBadge: { fontSize: '12px', padding: '6px 12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '6px', color: 'var(--primary)', fontWeight: '600', textTransform: 'capitalize', display: 'inline-block', marginBottom: '12px' },
  title: { fontSize: '36px', fontWeight: '800', color: 'var(--dark)', marginBottom: '8px' },
  developer: { fontSize: '16px', color: 'var(--gray)', fontWeight: '500' },
  stats: { display: 'flex', gap: '24px' },
  stat: { display: 'flex', alignItems: 'center', gap: '8px' },
  statIcon: { width: '24px', height: '24px', color: 'var(--warning)' },
  statValue: { fontSize: '24px', fontWeight: '700', color: 'var(--dark)' },
  description: { fontSize: '16px', lineHeight: '1.8', color: 'var(--gray)', marginBottom: '32px' },
  details: { display: 'grid', gap: '16px', marginBottom: '32px', padding: '24px', background: '#f8fafc', borderRadius: '12px' },
  detailItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  detailLabel: { fontSize: '14px', fontWeight: '600', color: 'var(--gray)' },
  detailValue: { fontSize: '14px', color: 'var(--dark)', fontWeight: '500' },
  actions: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  ratingForm: { marginTop: '24px', padding: '24px', background: '#f8fafc' },
  formTitle: { fontSize: '20px', fontWeight: '700', marginBottom: '20px' },
  label: { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--dark)' },
  stars: { display: 'flex', gap: '8px', marginBottom: '20px' },
  star: { width: '32px', height: '32px', cursor: 'pointer', color: 'var(--gray-light)', transition: 'all 0.2s' },
  starFilled: { color: 'var(--warning)' },
  ratingsCard: { padding: '32px' },
  sectionTitle: { fontSize: '24px', fontWeight: '700', marginBottom: '24px' },
  noRatings: { textAlign: 'center', padding: '40px', color: 'var(--gray)' },
  ratingsList: { display: 'grid', gap: '20px' },
  ratingItem: { padding: '20px', background: '#f8fafc', borderRadius: '12px' },
  ratingHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  ratingUser: { fontSize: '15px', fontWeight: '600', color: 'var(--dark)' },
  ratingStars: { display: 'flex', gap: '4px' },
  smallStar: { width: '16px', height: '16px', color: 'var(--warning)' },
  ratingReview: { fontSize: '14px', lineHeight: '1.6', color: 'var(--gray)', marginBottom: '8px' },
  ratingDate: { fontSize: '12px', color: 'var(--gray)' }
};
