import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

export default function LoginForm({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      console.log('LoginForm: Attempting login...');
      await login(username, password);
      console.log('LoginForm: Login successful');
      onSuccess();
    } catch (err) {
      console.error('LoginForm: Login failed', err);
      const errorMessage = err.response?.data?.detail || err.message || 'Invalid credentials. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Welcome Back</h2>
      <p style={styles.subtitle}>Sign in to access the marketplace</p>
      
      {error && (
        <div className="alert alert-error error-shake">
          {error}
        </div>
      )}
      
      <div className="fade-in" style={{animationDelay: '0.1s'}}>
        <label style={styles.label}>Username</label>
        <input
          className="input"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
          autoComplete="username"
        />
      </div>

      <div className="fade-in" style={{animationDelay: '0.2s'}}>
        <label style={styles.label}>Password</label>
        <input
          className="input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          autoComplete="current-password"
        />
      </div>

      <div className="fade-in" style={{animationDelay: '0.3s'}}>
        <Button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </div>
    </form>
  );
}

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  title: { fontSize: '32px', fontWeight: '800', color: 'var(--dark)', marginBottom: '8px' },
  subtitle: { fontSize: '15px', color: 'var(--gray)', marginBottom: '16px' },
  label: { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: 'var(--dark)' }
};
