import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import Button from './Button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo} className="hover-scale">
          <svg style={styles.logoIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="gradient-text">AI Agent Store</span>
        </Link>
        <div style={styles.links}>
          {user ? (
            <>
              <Link to="/marketplace" style={styles.link} className="transition-all">Marketplace</Link>
              {user.role === 'developer' && (
                <Link to="/dashboard" style={styles.link} className="transition-all">Dashboard</Link>
              )}
              <div style={styles.userInfo} className="glass" style={{...styles.userInfo, ...styles.glass}}>
                <span style={styles.username}>{user.username}</span>
                <span style={styles.role} className="badge badge-primary">{user.role}</span>
              </div>
              <Button variant="ghost" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/" style={styles.link} className="transition-all">Home</Link>
              <Link to="/login"><Button>Sign In</Button></Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { 
    fontSize: '24px', 
    fontWeight: '800', 
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s ease'
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    color: 'var(--primary)'
  },
  links: { display: 'flex', gap: '28px', alignItems: 'center' },
  link: { 
    color: 'var(--dark)', 
    textDecoration: 'none', 
    fontWeight: '600',
    fontSize: '15px',
    position: 'relative',
    padding: '8px 0'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
    padding: '12px 20px',
    borderRadius: '12px',
    background: 'rgba(99, 102, 241, 0.05)',
    border: '1px solid rgba(99, 102, 241, 0.1)'
  },
  username: { 
    color: 'var(--dark)', 
    fontSize: '14px', 
    fontWeight: '700' 
  },
  role: {
    fontSize: '12px',
    textTransform: 'capitalize'
  },
  glass: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  }
};
