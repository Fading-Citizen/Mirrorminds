import React from 'react';
import styled from 'styled-components';

interface ResultsScreenProps {
  score?: number;
  level?: number;
  questionsCompleted: number;
  assessmentType: 'traditional' | 'ai-chat';
  onRestart: () => void;
  onBackToHome: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score = 0,
  level = 1,
  questionsCompleted,
  assessmentType,
  onRestart,
  onBackToHome
}) => {
  return (
    <StyledWrapper>
      <div className="results-container">
        {/* Fixed Back Button */}
        <button className="fixed-back-btn" onClick={onBackToHome} title="Back to Quest Selection">
          ← Choose Quest
        </button>
        
        <div className="results-screen">
          <h1 className="results-title">🏆 Quest Complete!</h1>
          <div className="final-stats">
            {assessmentType === 'traditional' && (
              <>
                <div className="stat-item">
                  <span className="stat-label">Final Score</span>
                  <span className="stat-value">{score}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Level Reached</span>
                  <span className="stat-value">{level}</span>
                </div>
              </>
            )}
            <div className="stat-item">
              <span className="stat-label">Questions Completed</span>
              <span className="stat-value">{questionsCompleted}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Assessment Type</span>
              <span className="stat-value">{assessmentType === 'traditional' ? 'Traditional' : 'AI Chat'}</span>
            </div>
          </div>
          
          <div className="cog-results">
            <h2>Your COG Profile</h2>
            <div className="cog-bars">
              {['Empathy', 'Purpose', 'Communication', 'Creativity', 'Security', 'Confidence', 'Insights'].map((cog) => (
                <div key={cog} className="cog-bar">
                  <span className="cog-name">{cog}</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${Math.random() * 80 + 20}%` }}
                    ></div>
                  </div>
                  <span className="cog-percentage">{Math.floor(Math.random() * 80 + 20)}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="results-actions">
            <button className="restart-btn" onClick={onRestart}>
              🔄 Take Quest Again
            </button>
            <button className="back-btn" onClick={onBackToHome}>
              ← Choose New Quest
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .results-container {
    min-height: 100vh;
    background: var(--gradient-primary);
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
  }

  .fixed-back-btn {
    position: fixed;
    top: 20px;
    left: 20px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s ease;
    font-size: 0.9rem;
  }

  .fixed-back-btn:hover {
    background: var(--bg-hover);
  }

  .results-screen {
    background: var(--bg-card);
    border-radius: 20px;
    padding: 3rem;
    max-width: 600px;
    width: 100%;
    text-align: center;
    border: 1px solid var(--border-color);
  }

  .results-title {
    font-size: 2.5rem;
    margin: 0 0 2rem 0;
    background: linear-gradient(45deg, var(--accent-purple), var(--primary-cyan));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .final-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .stat-item {
    background: var(--bg-secondary);
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
  }

  .stat-label {
    display: block;
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .stat-value {
    display: block;
    color: var(--text-primary);
    font-size: 1.5rem;
    font-weight: bold;
  }

  .cog-results {
    margin: 2rem 0;
  }

  .cog-results h2 {
    margin: 0 0 1.5rem 0;
    color: var(--text-primary);
    font-size: 1.5rem;
  }

  .cog-bars {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .cog-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .cog-name {
    min-width: 100px;
    text-align: left;
    color: var(--text-accent);
    font-size: 0.9rem;
  }

  .progress-bar {
    flex: 1;
    height: 10px;
    background: var(--bg-secondary);
    border-radius: 5px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(45deg, var(--accent-purple), var(--primary-cyan));
    border-radius: 5px;
    transition: width 0.3s ease;
  }

  .cog-percentage {
    min-width: 40px;
    text-align: right;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  .results-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
  }

  .restart-btn, .back-btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .restart-btn {
    background: linear-gradient(45deg, #ff2288, #387ef0);
    color: white;
  }

  .back-btn {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .restart-btn:hover, .back-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .results-screen {
      padding: 2rem;
      margin: 1rem;
    }

    .results-title {
      font-size: 2rem;
    }

    .final-stats {
      grid-template-columns: repeat(2, 1fr);
    }

    .results-actions {
      flex-direction: column;
    }

    .cog-bar {
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
    }

    .cog-name {
      min-width: auto;
    }

    .progress-bar {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .results-screen {
      padding: 1.5rem;
    }

    .final-stats {
      grid-template-columns: 1fr;
    }
  }
`;

export default ResultsScreen;
