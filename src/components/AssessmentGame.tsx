import React, { useState } from 'react';
import ResultsScreen from './ResultsScreen';
import './AssessmentGame.css';

interface Question {
  id: number;
  text: string;
  options: string[];
  category: string;
}

interface AssessmentGameProps {
  onBackToQuestSelection: () => void;
}

const AssessmentGame: React.FC<AssessmentGameProps> = ({ onBackToQuestSelection }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);
  const [answers, setAnswers] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(true);
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      text: "Tell me about your oldest friend. What makes that relationship special?",
      options: [
        "We understand each other without saying much",
        "We've been through everything together",
        "They challenge me to be better",
        "We have fun no matter what we're doing"
      ],
      category: "Empathy & Relationships"
    },
    {
      id: 2,
      text: "Describe a stressful time in your life. How did you handle it?",
      options: [
        "I took time to think and plan my next steps",
        "I talked to people I trust for advice",
        "I focused on what I could control",
        "I used it as motivation to grow stronger"
      ],
      category: "Security & Stability"
    },
    {
      id: 3,
      text: "Share an experience where you learned a life lesson.",
      options: [
        "Through making a difficult decision",
        "By helping someone else solve a problem",
        "When I had to adapt to unexpected change",
        "Through honest feedback from others"
      ],
      category: "Purpose & Alignment"
    },
    {
      id: 4,
      text: "Tell me about a time when you told someone 'no'.",
      options: [
        "I explained my reasoning clearly",
        "I offered an alternative solution",
        "I stood firm on my principles",
        "I made sure they understood my perspective"
      ],
      category: "Communication & Expression"
    },
    {
      id: 5,
      text: "Describe a moment when you had to think creatively.",
      options: [
        "I combined ideas from different sources",
        "I approached the problem from a new angle",
        "I experimented until I found a solution",
        "I trusted my intuition to guide me"
      ],
      category: "Creativity & Adaptability"
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    setScore(score + (answerIndex + 1) * 10);
    setExperience(experience + 100);
    
    if (experience >= 500) {
      setLevel(level + 1);
      setExperience(0);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setExperience(0);
    setLevel(1);
    setAnswers([]);
    setGameStarted(true);
    setShowResults(false);
  };

  if (!gameStarted) {
    return (
      <div className="assessment-container">
        {/* Fixed Back Button */}
        <button className="fixed-back-btn" onClick={onBackToQuestSelection} title="Back to Quest Selection">
          ← Choose Quest
        </button>
        
        <div className="game-intro">
          <div className="intro-header">
            <h1 className="game-title">🎮 COG Assessment Quest</h1>
            <p className="game-subtitle">Discover Your Inner Powers</p>
          </div>
          
          <div className="game-features">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Level Up System</h3>
              <p>Gain experience with each answer</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Score Points</h3>
              <p>Earn points based on your responses</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Unlock Insights</h3>
              <p>Discover your cognitive patterns</p>
            </div>
          </div>

          <button className="start-quest-btn" onClick={startGame}>
            🚀 Start Quest
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <ResultsScreen
        score={score}
        level={level}
        questionsCompleted={questions.length}
        assessmentType="traditional"
        onRestart={resetGame}
        onBackToHome={onBackToQuestSelection}
      />
    );
  }

  return (
    <div className="assessment-container">
      {/* Fixed Back Button */}
      <button className="fixed-back-btn" onClick={onBackToQuestSelection} title="Back to Quest Selection">
        ← Choose Quest
      </button>
      
      {/* Game HUD */}
      <div className="game-hud">
        <div className="hud-left">
          <div className="level-indicator">
            <span className="level-text">LVL {level}</span>
          </div>
          <div className="experience-bar">
            <div className="exp-fill" style={{ width: `${(experience / 500) * 100}%` }}></div>
            <span className="exp-text">{experience}/500 XP</span>
          </div>
        </div>
        
        <div className="hud-center">
          <div className="question-progress">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
        
        <div className="hud-right">
          <div className="score-display">
            <span className="score-label">Score</span>
            <span className="score-value">{score}</span>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="game-main">
        <div className="question-container">
          <div className="question-category">
            {questions[currentQuestion].category}
          </div>
          
          <h2 className="question-text">
            {questions[currentQuestion].text}
          </h2>
          
          <div className="options-grid">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="option-card"
                onClick={() => handleAnswer(index)}
              >
                <div className="option-letter">{String.fromCharCode(65 + index)}</div>
                <div className="option-text">{option}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>
    </div>
  );
};

export default AssessmentGame;
