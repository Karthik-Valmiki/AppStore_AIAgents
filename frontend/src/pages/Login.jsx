import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RoleSelector from '../components/auth/RoleSelector';
import Button from '../components/common/Button';
import { authService } from '../services/authService';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'consumer' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);
    
    try {
      if (!formData.username || !formData.email || !formData.password) {
        throw new Error('All fields are required');
      }
      
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      console.log('Registration: Attempting to register...');
      await authService.register(formData);
      console.log('Registration: Success!');
      setSuccess(true);
      setFormData({ username: '', email: '', password: '', role: 'consumer' });
      setTimeout(() => {
        setIsRegister(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Registration: Failed', err);
      const errorMessage = err.response?.data?.detail || err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel} className="slide-in-left">
        <div style={styles.brandSection}>
          <h1 style={styles.brandTitle} className="float">AI Agent Store</h1>
          <p style={styles.brandSubtitle}>
            The premier marketplace for AI-powered agents. Discover, deploy, and manage intelligent solutions.
          </p>
          <div style={styles.features}>
            <div style={styles.feature} className="fade-in" style={{animationDelay: '0.2s'}}>
              <svg style={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Smart AI Recommendations</span>
            </div>
            <div style={styles.feature} className="fade-in" style={{animationDelay: '0.4s'}}>
              <svg style={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Voice Search Enabled</span>
            </div>
            <div style={styles.feature} className="fade-in" style={{animationDelay: '0.6s'}}>
              <svg style={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Real-time Analytics</span>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.rightPanel} className="slide-in-right">
        <div className="card fade-in-scale" style={styles.card}>
          {!isRegister ? (
            <>
              <LoginForm onSuccess={() => navigate('/marketplace')} />
              <p style={styles.toggle}>
                Don't have an account?{' '}
                <span style={styles.link} onClick={() => setIsRegister(true)}>Create one</span>
              </p>
            </>
          ) : (
            <>
              <form onSubmit={handleRegister} style={styles.form}>
                <h2 style={styles.title}>Create Account</h2>
                <p style={styles.subtitle}>Join the AI Agent Marketplace</p>
                
                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">Registration successful! Redirecting to login...</div>}
                
                <div className="fade-in" style={{animationDelay: '0.1s'}}>
                  <label style={styles.label}>Username</label>
                  <input
                    className="input"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    disabled={loading}
                    autoComplete="username"
                  />
                </div>

                <div className="fade-in" style={{animationDelay: '0.2s'}}>
                  <label style={styles.label}>Email</label>
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>

                <div className="fade-in" style={{animationDelay: '0.3s'}}>
                  <label style={styles.label}>Password</label>
                  <input
                    className="input"
                    type="password"
                    placeholder="Create a password (min 6 characters)"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength="6"
                    disabled={loading}
                    autoComplete="new-password"
                  />
                </div>

                <div className="fade-in" style={{animationDelay: '0.4s'}}>
                  <RoleSelector value={formData.role} onChange={(role) => setFormData({ ...formData, role })} />
                </div>
                
                <Button type="submit" disabled={loading} style={{ width: '100%' }}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
              <p style={styles.toggle}>
                Already have an account?{' '}
                <span style={styles.link} onClick={() => setIsRegister(false)}>Sign in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    minHeight: '100vh', 
    display: 'flex',
    background: 'var(--white)'
  },
  leftPanel: {
    flex: 1,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '80px 60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    position: 'relative',
    overflow: 'hidden'
  },
  brandSection: {
    maxWidth: '500px',
    position: 'relative',
    zIndex: 1
  },
  brandTitle: {
    fontSize: '48px',
    fontWeight: '800',
    marginBottom: '24px',
    lineHeight: 1.2
  },
  brandSubtitle: {
    fontSize: '18px',
    lineHeight: 1.6,
    marginBottom: '48px',
    opacity: 0.95
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '16px',
    fontWeight: '500'
  },
  featureIcon: {
    width: '24px',
    height: '24px'
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px'
  },
  card: { 
    width: '100%', 
    maxWidth: '480px',
    padding: '48px'
  },
  form: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '20px' 
  },
  title: { 
    fontSize: '32px', 
    fontWeight: '800', 
    color: 'var(--dark)', 
    marginBottom: '8px' 
  },
  subtitle: { 
    fontSize: '15px', 
    color: 'var(--gray)', 
    marginBottom: '16px' 
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--dark)'
  },
  toggle: { 
    textAlign: 'center', 
    marginTop: '24px', 
    fontSize: '14px', 
    color: 'var(--gray)' 
  },
  link: { 
    color: 'var(--primary)', 
    cursor: 'pointer', 
    fontWeight: '600',
    textDecoration: 'underline'
  }
};
