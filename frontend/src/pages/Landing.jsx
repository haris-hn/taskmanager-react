import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Zap, Shield, ArrowRight } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section text-center" style={{ padding: '6rem 1rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Organize your work <br /> and life, finally.
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
          The world's most elegant task management tool. Simplify your workflow, stay organized, and achieve more every day.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => navigate('/register')} style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
            Get Started Free <ArrowRight size={18} />
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('/login')} style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
            Sign In
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', width: 'fit-content', padding: '0.75rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
            <Zap style={{ color: 'var(--accent-primary)' }} />
          </div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Fast & Intuitive</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your tasks with lightning speed. Designed for maximum productivity with zero clutter.</p>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: 'fit-content', padding: '0.75rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
            <CheckCircle style={{ color: 'var(--success)' }} />
          </div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Stay Organized</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Categorize, prioritize, and track your tasks effortlessly. Never lose sight of what's important.</p>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', width: 'fit-content', padding: '0.75rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
            <Shield style={{ color: 'var(--danger)' }} />
          </div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Secure by Default</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Your data is encrypted and secure. We prioritize your privacy so you can focus on your work.</p>
        </div>
      </section>

      <footer style={{ marginTop: '8rem', paddingBottom: '4rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
        <p>© 2026 TaskManager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
