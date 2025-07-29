import React from 'react';
import COGCard from './COGCard';
import RotatingLogo from './RotatingLogo';
import './LandingPage.css';

interface LandingPageProps {
  onStartAssessment: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartAssessment }) => {
  const cogs = [
    {
      id: 1,
      title: "Empathy & Relationships",
      description: "Emotional understanding and connection",
      manifestation: "Ability to maintain trust and stay emotionally connected"
    },
    {
      id: 2,
      title: "Purpose & Alignment",
      description: "Personal values and inner direction",
      manifestation: "Meaningful decisions aligned with purpose"
    },
    {
      id: 3,
      title: "Communication & Expression",
      description: "Clarity and active listening",
      manifestation: "Clear expression and feeling understood"
    },
    {
      id: 4,
      title: "Creativity & Adaptability",
      description: "Flexibility and innovation",
      manifestation: "Emotionally balanced during change"
    },
    {
      id: 5,
      title: "Security & Stability",
      description: "Groundedness and emotional regulation",
      manifestation: "Feeling safe and calm under stress"
    },
    {
      id: 6,
      title: "Confidence & Leadership",
      description: "Initiative and presence",
      manifestation: "Expressing opinions confidently"
    },
    {
      id: 7,
      title: "Insights & Strategic Thinking",
      description: "Intuition and long-term vision",
      manifestation: "Clarity in decisions and trusting inner guidance"
    }
  ];

  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="hero-section">
          <div className="rotating-logo-container">
            <RotatingLogo />
          </div>
          <h1 className="hero-title">MirrorMinds</h1>
          <p className="hero-subtitle">Discover Your Core Operating Gifts (COGs)</p>
          <p className="hero-description">
            Unlock the power of self-awareness through AI-powered personality analysis
          </p>
        </div>
      </header>

      <main className="landing-main">
        <section className="intro-section">
          <h2>🔍 What Are Core Operating Gifts?</h2>
          <p className="intro-text">
            COGs are your innate personal traits that determine how you:
          </p>
          <div className="traits-grid">
            <div className="trait-card">
              <span className="trait-emoji">🧭</span>
              <h3>Process Information</h3>
            </div>
            <div className="trait-card">
              <span className="trait-emoji">💫</span>
              <h3>Experience Emotions</h3>
            </div>
            <div className="trait-card">
              <span className="trait-emoji">🤝</span>
              <h3>Interact with Others</h3>
            </div>
          </div>
        </section>

        <section className="cogs-section">
          <h2>The Seven Core Operating Gifts</h2>
          <div className="cogs-grid">
            {cogs.map((cog) => (
              <COGCard
                key={cog.id}
                id={cog.id}
                title={cog.title}
                description={cog.description}
                manifestation={cog.manifestation}
              />
            ))}
          </div>
        </section>

        <section className="process-section">
          <h2>🔬 How It Works</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>AI Conversation</h3>
              <p>Answer personal, open-ended questions</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Voice Analysis</h3>
              <p>Our AI evaluates tone and emotional intensity</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Visual Assessment</h3>
              <p>Facial expressions and body language analysis</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>COG Mapping</h3>
              <p>Get your personalized profile with visual feedback</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Discover Your Gifts?</h2>
            <p>Start your journey of self-discovery today</p>
            <button className="cta-button" onClick={onStartAssessment}>
              🚀 Start Your Discovery
            </button>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2025 MirrorMinds. Empowering self-awareness through innovation.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
