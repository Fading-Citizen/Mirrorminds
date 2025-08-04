import React from 'react';
import styled from 'styled-components';
import GlobalHeader from './GlobalHeader';

interface QuestSelectionProps {
  onSelectTraditional: () => void;
  onSelectAIChat: () => void;
  onBackToLanding: () => void;
}

const QuestSelection: React.FC<QuestSelectionProps> = ({ 
  onSelectTraditional, 
  onSelectAIChat, 
  onBackToLanding 
}) => {
  return (
    <StyledWrapper>
      <GlobalHeader showLogo={true} showHomeLink={false} onHomeClick={onBackToLanding} />
      <div className="quest-selection-container">
        <header className="quest-header">
          <h1>Choose Your COG Assessment Journey</h1>
          <p>Select the type of assessment that resonates with you</p>
        </header>

        <div className="quest-options">
          <div className="quest-card traditional" onClick={onSelectTraditional}>
            <div className="quest-icon">🎮</div>
            <h2>Traditional Assessment</h2>
            <p className="quest-subtitle">COG Assessment Quest - Discover Your Inner Powers</p>
            <p>Structured questions with multiple choice answers. Perfect for those who prefer clear, organized assessments.</p>
            <div className="quest-features">
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <div className="feature-content">
                  <span className="feature-title">Level Up System</span>
                  <span className="feature-desc">Gain experience with each answer</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🏆</span>
                <div className="feature-content">
                  <span className="feature-title">Score Points</span>
                  <span className="feature-desc">Earn points based on your responses</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🧠</span>
                <div className="feature-content">
                  <span className="feature-title">Unlock Insights</span>
                  <span className="feature-desc">Discover your cognitive patterns</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <div className="feature-content">
                  <span className="feature-title">Quick Completion</span>
                  <span className="feature-desc">Efficient multiple choice format</span>
                </div>
              </div>
            </div>
            <button className="quest-button">🚀 Start Traditional Quest</button>
          </div>

          <div className="quest-card ai-chat" onClick={onSelectAIChat}>
            <div className="quest-icon">🤖</div>
            <h2>AI Chat Assessment</h2>
            <p className="quest-subtitle">Conversational COG Discovery - Adaptive & Personalized</p>
            <p>Natural conversation with an AI that adapts to your responses. Ideal for those who prefer open dialogue.</p>
            <div className="quest-features">
              <div className="feature-item">
                <span className="feature-icon">💬</span>
                <div className="feature-content">
                  <span className="feature-title">Natural Conversation</span>
                  <span className="feature-desc">Chat naturally like with a friend</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🧩</span>
                <div className="feature-content">
                  <span className="feature-title">Adaptive Questioning</span>
                  <span className="feature-desc">AI adapts based on your responses</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔍</span>
                <div className="feature-content">
                  <span className="feature-title">Deep Insights</span>
                  <span className="feature-desc">Discover nuanced patterns in thinking</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✨</span>
                <div className="feature-content">
                  <span className="feature-title">Personalized Experience</span>
                  <span className="feature-desc">Tailored conversation flow</span>
                </div>
              </div>
            </div>
            <button className="quest-button">🚀 Start AI Chat Quest</button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .quest-selection-container {
    min-height: 100vh;
    background: var(--gradient-primary);
    color: var(--text-primary);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .quest-header {
    text-align: center;
    margin-bottom: 3rem;
    max-width: 600px;
  }

  .back-button {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 2rem;
    transition: all 0.3s ease;
    font-size: 0.9rem;
  }

  .back-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-2px);
  }

  .quest-header h1 {
    font-size: 2.5rem;
    margin: 0 0 1rem 0;
    background: linear-gradient(45deg, #ff2288, #387ef0);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .quest-header p {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin: 0;
  }

  .quest-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    max-width: 1000px;
    width: 100%;
  }

  .quest-card {
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: 20px;
    padding: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-card);
  }

  .quest-card::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    background: linear-gradient(45deg, #ff2288, #387ef0);
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .quest-card:hover::before {
    opacity: 1;
  }

  .quest-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .quest-icon {
    font-size: 4rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  .quest-card h2 {
    font-size: 1.8rem;
    margin: 0 0 0.5rem 0;
    text-align: center;
  }

  .quest-subtitle {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 1rem 0 !important;
    text-align: center;
    color: var(--text-accent) !important;
    line-height: 1.3;
  }

  .traditional h2 {
    color: #387ef0;
  }

  .ai-chat h2 {
    color: #ff2288;
  }

  .quest-card p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .quest-features {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
    flex: 1;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.75rem;
    background: var(--bg-secondary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
  }

  .feature-item:hover {
    background: var(--bg-hover);
    border-color: var(--border-hover);
  }

  .feature-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-accent);
    border-radius: 10px;
  }

  .feature-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }

  .feature-title {
    color: var(--text-primary);
    font-weight: 600;
    font-size: 0.95rem;
    line-height: 1.2;
  }

  .feature-desc {
    color: var(--text-secondary);
    font-size: 0.85rem;
    line-height: 1.3;
  }

  .traditional .feature-icon {
    background: rgba(56, 126, 240, 0.2);
    border: 1px solid rgba(56, 126, 240, 0.3);
  }

  .ai-chat .feature-icon {
    background: rgba(255, 34, 136, 0.2);
    border: 1px solid rgba(255, 34, 136, 0.3);
  }

  .quest-button {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: auto;
  }

  .traditional .quest-button {
    background: linear-gradient(45deg, #387ef0, #4f46e5);
    color: white;
  }

  .ai-chat .quest-button {
    background: linear-gradient(45deg, #ff2288, #ff6b6b);
    color: white;
  }

  .quest-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .quest-options {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .quest-card {
      padding: 1.5rem;
      min-height: auto;
    }

    .quest-header h1 {
      font-size: 2rem;
    }

    .quest-header p {
      font-size: 1rem;
    }

    .quest-icon {
      font-size: 3rem;
    }

    .feature-item {
      padding: 0.5rem;
    }

    .feature-icon {
      width: 35px;
      height: 35px;
      font-size: 1.3rem;
    }

    .feature-title {
      font-size: 0.9rem;
    }

    .feature-desc {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    .quest-selection-container {
      padding: 1rem;
    }

    .quest-card {
      padding: 1rem;
    }

    .quest-header h1 {
      font-size: 1.8rem;
    }
  }
`;

export default QuestSelection;
