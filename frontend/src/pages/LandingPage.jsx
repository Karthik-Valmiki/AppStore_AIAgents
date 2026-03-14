import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: 'AI-Powered Discovery',
      description: 'Intelligent recommendations that learn from your preferences and usage patterns',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Voice-Enabled Search',
      description: 'Find agents instantly using natural language and voice commands',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      title: 'Developer Platform',
      description: 'Comprehensive tools for building, deploying, and monetizing AI agents',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: 'Real-Time Analytics',
      description: 'Track performance, engagement, and user interactions with detailed insights',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Secure & Scalable',
      description: 'Enterprise-grade security with infrastructure that scales with your needs',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Collaborative Ecosystem',
      description: 'Connect with developers and users in a thriving AI community',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Active Users', suffix: '' },
    { value: '5,000+', label: 'AI Agents', suffix: '' },
    { value: '1M+', label: 'Interactions', suffix: '/month' },
    { value: '99.9%', label: 'Uptime', suffix: '' }
  ];

  const useCases = [
    {
      title: 'For Businesses',
      description: 'Automate workflows, enhance customer service, and boost productivity with AI agents',
      items: ['Customer Support', 'Data Analysis', 'Process Automation']
    },
    {
      title: 'For Developers',
      description: 'Build, deploy, and monetize AI agents with our comprehensive developer platform',
      items: ['Easy Integration', 'API Access', 'Revenue Sharing']
    },
    {
      title: 'For Individuals',
      description: 'Discover AI agents that help you work smarter, learn faster, and achieve more',
      items: ['Personal Assistant', 'Learning Tools', 'Productivity Boost']
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="grid-overlay"></div>
        </div>
        
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge fade-in">🚀 Welcome to the Future of AI</div>
            <h1 className="hero-title slide-in-up">
              Discover, Deploy, and
              <span className="gradient-text-animated"> Transform with AI</span>
            </h1>
            <p className="hero-description fade-in" style={{animationDelay: '0.2s'}}>
              The premier marketplace for AI-powered agents. Connect with cutting-edge AI solutions
              that revolutionize how you work, create, and innovate.
            </p>
            <div className="hero-buttons fade-in" style={{animationDelay: '0.4s'}}>
              {user ? (
                <button className="btn-hero btn-primary" onClick={() => navigate('/marketplace')}>
                  <span>Explore Marketplace</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              ) : (
                <>
                  <button className="btn-hero btn-primary" onClick={() => navigate('/login')}>
                    <span>Get Started Free</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                  <button className="btn-hero btn-secondary" onClick={() => navigate('/login')}>
                    <span>Sign In</span>
                  </button>
                </>
              )}
            </div>
            <div className="hero-stats fade-in" style={{animationDelay: '0.6s'}}>
              <div className="stat-item">
                <div className="stat-value">10K+</div>
                <div className="stat-label">Users</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-value">5K+</div>
                <div className="stat-label">Agents</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-value">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Features</div>
            <h2 className="section-title">Everything you need to succeed</h2>
            <p className="section-description">
              Powerful features designed to help you discover, deploy, and manage AI agents effortlessly
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="use-cases-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Use Cases</div>
            <h2 className="section-title">Built for everyone</h2>
            <p className="section-description">
              Whether you're a business, developer, or individual, we have the perfect solution
            </p>
          </div>

          <div className="use-cases-grid">
            {useCases.map((useCase, index) => (
              <div 
                key={index} 
                className="use-case-card"
                style={{
                  animationDelay: `${index * 0.15}s`
                }}
              >
                <h3 className="use-case-title">{useCase.title}</h3>
                <p className="use-case-description">{useCase.description}</p>
                <ul className="use-case-list">
                  {useCase.items.map((item, i) => (
                    <li key={i}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-card"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="stat-card-value">{stat.value}</div>
                <div className="stat-card-label">{stat.label}{stat.suffix}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to get started?</h2>
            <p className="cta-description">
              Join thousands of users and developers building the future with AI agents
            </p>
            <div className="cta-buttons">
              <button className="btn-hero btn-primary" onClick={() => navigate('/login')}>
                <span>Start for Free</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="btn-hero btn-secondary" onClick={() => navigate('/marketplace')}>
                <span>View Marketplace</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 100%);
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.6;
          animation: float 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent);
          top: -250px;
          left: -250px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent);
          top: 50%;
          right: -200px;
          animation-delay: 5s;
        }

        .orb-3 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent);
          bottom: -300px;
          left: 50%;
          animation-delay: 10s;
        }

        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        .hero-container {
          position: relative;
          z-index: 1;
        }

        .hero-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          padding: 40px 20px;
        }

        .hero-badge {
          display: inline-block;
          padding: 8px 20px;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 50px;
          color: #818cf8;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
        }

        .hero-title {
          font-size: 72px;
          font-weight: 900;
          line-height: 1.1;
          color: #ffffff;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .gradient-text-animated {
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .hero-description {
          font-size: 20px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 40px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 60px;
        }

        .btn-hero {
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .btn-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .btn-hero:hover::before {
          transform: translateX(0);
        }

        .btn-hero span {
          position: relative;
          z-index: 1;
        }

        .btn-hero svg {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .btn-hero:hover svg {
          transform: translateX(4px);
        }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          padding: 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          max-width: 600px;
          margin: 0 auto;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 800;
          color: white;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
        }

        .mouse {
          width: 26px;
          height: 40px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 13px;
          position: relative;
        }

        .wheel {
          width: 4px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 2px;
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          animation: scroll 1.5s infinite;
        }

        @keyframes scroll {
          0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(12px);
          }
        }

        /* Features Section */
        .features-section {
          padding: 120px 0;
          background: #ffffff;
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-badge {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 48px;
          font-weight: 800;
          color: #0a0a0f;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .section-description {
          font-size: 18px;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
        }

        .feature-card {
          padding: 40px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border-color: #6366f1;
        }

        .feature-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          color: white;
        }

        .feature-icon svg {
          width: 28px;
          height: 28px;
        }

        .feature-title {
          font-size: 22px;
          font-weight: 700;
          color: #0a0a0f;
          margin-bottom: 12px;
        }

        .feature-description {
          font-size: 15px;
          color: #64748b;
          line-height: 1.6;
        }

        /* Use Cases Section */
        .use-cases-section {
          padding: 120px 0;
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
        }

        .use-cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
        }

        .use-case-card {
          padding: 40px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          transition: all 0.4s ease;
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .use-case-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .use-case-title {
          font-size: 24px;
          font-weight: 700;
          color: #0a0a0f;
          margin-bottom: 16px;
        }

        .use-case-description {
          font-size: 15px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .use-case-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .use-case-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          color: #0a0a0f;
          font-weight: 500;
        }

        .use-case-list svg {
          color: #10b981;
          flex-shrink: 0;
        }

        /* Stats Section */
        .stats-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
        }

        .stat-card {
          text-align: center;
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .stat-card-value {
          font-size: 56px;
          font-weight: 900;
          color: white;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .stat-card-label {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        /* CTA Section */
        .cta-section {
          padding: 120px 0;
          background: linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 100%);
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1), transparent 70%);
        }

        .cta-content {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .cta-title {
          font-size: 56px;
          font-weight: 900;
          color: white;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .cta-description {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 48px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 48px;
          }

          .hero-description {
            font-size: 18px;
          }

          .hero-stats {
            flex-direction: column;
            gap: 24px;
          }

          .stat-divider {
            width: 100%;
            height: 1px;
          }

          .section-title {
            font-size: 36px;
          }

          .cta-title {
            font-size: 40px;
          }

          .features-grid,
          .use-cases-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
