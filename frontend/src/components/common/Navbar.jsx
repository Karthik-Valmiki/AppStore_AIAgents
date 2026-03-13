import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo}>
          <svg style={styles.logoIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          AI Agent Store
        </Link>
        <div style={styles.links}>
          {user ? (
            <>
              <Link to="/marketplace" style={styles.link}>Marketplace</Link>
              {user.role === 'developer' && (
                <Link to="/dashboard" style={styles.link}>Dashboard</Link>
              )}
              <div style={styles.userInfo}>
                <span style={styles.username}>{user.username}</span>
                <span style={styles.role}>{user.role}</span>
              </div>
              <Button variant="ghost" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/" style={styles.link}>Home</Link>
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
    color: 'var(--primary)', 
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  logoIcon: {
    width: '28px',
    height: '28px'
  },
  links: { display: 'flex', gap: '24px', alignItems: 'center' },
  link: { 
    color: 'var(--dark)', 
    textDecoration: 'none', 
    fontWeight: '600',
    fontSize: '15px',
    transition: 'color 0.3s ease'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '2px'
  },
  username: { 
    color: 'var(--dark)', 
    fontSize: '14px', 
    fontWeight: '600' 
  },
  role: {
    fontSize: '12px',
    color: 'var(--gray)',
    textTransform: 'capitalize'
  }
};
