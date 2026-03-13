import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      title: 'Smart Recommendations',
      description: 'AI-powered recommendations based on your usage patterns and preferences',
      icon: (
        <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Voice Search',
      description: 'Find agents instantly using natural voice commands and queries',
      icon: (
        <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      title: 'Developer Tools',
      description: 'Comprehensive dashboard for publishing and managing your AI agents',
      icon: (
        <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: 'Analytics & Insights',
      description: 'Track performance metrics, downloads, and user engagement in real-time',
      icon: (
        <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Active Users' },
    { value: '5,000+', label: 'AI Agents' },
    { value: '50,000+', label: 'Daily Interactions' },
    { value: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title">
              Discover the Future of
              <span className="gradient-text"> AI Agents</span>
            </h1>
            <p className="hero-subtitle">
              The premier marketplace for AI-powered agents. Find, deploy, and manage 
              intelligent solutions tailored to your needs.
            </p>
            <div className="hero-actions">
              {user ? (
                <button className="btn btn-primary" onClick={() => navigate('/marketplace')}>
                  Browse Marketplace
                </button>
              ) : (
                <>
                  <button className="btn btn-primary" onClick={() => navigate('/login')}>
                    Get Started
                  </button>
                  <button className="btn btn-secondary" onClick={() => navigate('/login')}>
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="hero-visual slide-in-right">
            <div className="floating-card card-1"></div>
            <div className="floating-card card-2"></div>
            <div className="floating-card card-3"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">
              Everything you need to discover, deploy, and manage AI agents
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Join thousands of users and developers building the future with AI agents
            </p>
            <button className="btn btn-primary btn-large" onClick={() => navigate('/login')}>
              Create Your Account
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
        }

        .hero-section {
          min-height: 90vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.05"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>');
          opacity: 0.3;
        }

        .hero-content {
          flex: 1;
          color: white;
          position: relative;
          z-index: 1;
        }

        .hero-title {
          font-size: 64px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 20px;
          line-height: 1.6;
          margin-bottom: 40px;
          opacity: 0.95;
          max-width: 600px;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero-visual {
          flex: 1;
          position: relative;
          height: 500px;
        }

        .floating-card {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          animation: float 6s ease-in-out infinite;
        }

        .card-1 {
          width: 200px;
          height: 200px;
          top: 50px;
          right: 100px;
        }

        .card-2 {
          width: 150px;
          height: 150px;
          top: 200px;
          right: 50px;
          animation-delay: 1s;
        }

        .card-3 {
          width: 180px;
          height: 180px;
          top: 300px;
          right: 200px;
          animation-delay: 2s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .stats-section {
          padding: 80px 0;
          background: white;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 48px;
          text-align: center;
        }

        .stat-value {
          font-size: 48px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 16px;
          color: var(--gray);
          font-weight: 600;
        }

        .features-section {
          padding: 100px 0;
          background: #f8fafc;
        }

        .section-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .section-title {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 16px;
          color: var(--dark);
        }

        .section-subtitle {
          font-size: 18px;
          color: var(--gray);
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .feature-card {
          text-align: center;
          padding: 40px 24px;
        }

        .feature-icon-wrapper {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          color: white;
        }

        .feature-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--dark);
        }

        .feature-description {
          font-size: 15px;
          color: var(--gray);
          line-height: 1.6;
        }

        .cta-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          text-align: center;
          color: white;
        }

        .cta-title {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .cta-subtitle {
          font-size: 20px;
          margin-bottom: 40px;
          opacity: 0.95;
        }

        .btn-large {
          padding: 16px 48px;
          font-size: 18px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 40px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .hero-visual {
            display: none;
          }

          .section-title {
            font-size: 32px;
          }

          .cta-title {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
  );
}
