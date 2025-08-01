import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ResultsScreen from './ResultsScreen';

interface Message {
  id: number;
  text: string;
  sender: 'ai' | 'user';
  timestamp: Date;
}

interface AIChatAssessmentProps {
  onBackToQuests: () => void;
}

const AIChatAssessment: React.FC<AIChatAssessmentProps> = ({ 
  onBackToQuests
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assessment companion. I'm here to help you discover your Core Operating Gifts through natural conversation. Let's start with something simple - what's your name, and what brings you here today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample AI responses for demo (replace with actual API calls later)
  const sampleResponses = [
    "That's interesting! Tell me about a recent situation where you had to make an important decision. How did you approach it?",
    "I can see you put thought into your responses. When you're feeling stressed or overwhelmed, what helps you regain your balance?",
    "Your approach to challenges is revealing. Can you describe a relationship in your life that's particularly meaningful to you? What makes it special?",
    "Thank you for sharing that. When you're in a group setting, do you find yourself naturally taking charge, supporting others, or observing and analyzing?",
    "That gives me great insight. One more question - think about your ideal work environment. What conditions help you perform at your best?",
    "Based on our conversation, I'm starting to see patterns in how you process information and interact with the world. Let me ask you this: when you learn something new, do you prefer hands-on experience, detailed explanations, or seeing examples?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      if (questionCount >= sampleResponses.length - 1) {
        // Complete the assessment
        const aiMessage: Message = {
          id: Date.now() + 1,
          text: "Thank you for this wonderful conversation! I've gathered enough insights to analyze your Core Operating Gifts. You've been very thoughtful with your responses. Let me process this information and provide you with your personalized COG profile.",
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
        
        // Complete the assessment after a delay
        setTimeout(() => {
          setShowResults(true);
        }, 3000);
      } else {
        // Continue with next question
        const aiMessage: Message = {
          id: Date.now() + 1,
          text: sampleResponses[questionCount],
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setQuestionCount(prev => prev + 1);
        setIsTyping(false);
      }
    }, 1500 + Math.random() * 1000); // Random delay for realism
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetAssessment = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI assessment companion. I'm here to help you discover your Core Operating Gifts through natural conversation. Let's start with something simple - what's your name, and what brings you here today?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
    setInputText('');
    setIsTyping(false);
    setQuestionCount(0);
    setShowResults(false);
  };

  const navigateToHome = () => {
    onBackToQuests();
  };

  if (showResults) {
    return (
      <ResultsScreen
        questionsCompleted={6}
        assessmentType="ai-chat"
        onRestart={resetAssessment}
        onBackToHome={navigateToHome}
      />
    );
  }

  return (
    <StyledWrapper>
      <div className="chat-assessment-container">
        {/* Sidebar Progress */}
        <div className="progress-sidebar">
          <div className="sidebar-header">
            <h3>Assessment Progress</h3>
            <button className="back-button" onClick={onBackToQuests}>
              ← Back
            </button>
          </div>
          
          <div className="progress-section">
            <div className="progress-circle">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(questionCount / 6) * 314} 314`}
                  transform="rotate(-90 60 60)"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff2288" />
                    <stop offset="100%" stopColor="#387ef0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="progress-text">
                <span className="progress-number">{questionCount}</span>
                <span className="progress-total">/ 6</span>
              </div>
            </div>
            
            <div className="progress-steps">
              {Array.from({ length: 6 }, (_, i) => (
                <div 
                  key={i} 
                  className={`step ${i < questionCount ? 'completed' : i === questionCount ? 'current' : 'pending'}`}
                >
                  <div className="step-circle">
                    {i < questionCount ? '✓' : i + 1}
                  </div>
                  <span className="step-label">
                    {i === 0 && 'Introduction'}
                    {i === 1 && 'Decision Making'}
                    {i === 2 && 'Stress Response'}
                    {i === 3 && 'Relationships'}
                    {i === 4 && 'Group Dynamics'}
                    {i === 5 && 'Learning Style'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="insights-preview">
            <h4>Insights Discovered</h4>
            <div className="insight-tags">
              {questionCount > 0 && <span className="tag">Decision Style</span>}
              {questionCount > 1 && <span className="tag">Stress Management</span>}
              {questionCount > 2 && <span className="tag">Social Patterns</span>}
              {questionCount > 3 && <span className="tag">Leadership Traits</span>}
              {questionCount > 4 && <span className="tag">Learning Preferences</span>}
            </div>
          </div>
        </div>

        {/* Main Chat Box */}
        <div className="chat-box">
          <div className="chat-header">
            <h1>AI Chat Assessment</h1>
            <p>Natural conversation to discover your COGs</p>
          </div>

          <div className="messages-container">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-bubble">
                  <p>{message.text}</p>
                  <span className="timestamp">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message ai">
                <div className="message-bubble typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-container">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts..."
              disabled={isTyping}
              rows={3}
            />
            <button 
              onClick={handleSendMessage} 
              disabled={!inputText.trim() || isTyping}
              className="send-button"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .chat-assessment-container {
    height: 100vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    color: white;
    display: flex;
    overflow: hidden;
  }

  /* Sidebar Progress */
  .progress-sidebar {
    width: 320px;
    background: rgba(23, 23, 23, 0.9);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar-header {
    margin-bottom: 1.5rem;
    flex-shrink: 0;
  }

  .sidebar-header h3 {
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    color: white;
  }

  .back-button {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    width: 100%;
  }

  .back-button:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .progress-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .progress-circle {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
    flex-shrink: 0;
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .progress-number {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    color: white;
  }

  .progress-total {
    color: #a1a1aa;
    font-size: 1rem;
  }

  .progress-steps {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
    overflow-y: auto;
    padding-right: 0.5rem;
    margin-right: -0.5rem;
  }

  .progress-steps::-webkit-scrollbar {
    width: 4px;
  }

  .progress-steps::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }

  .progress-steps::-webkit-scrollbar-thumb {
    background: rgba(255, 34, 136, 0.5);
    border-radius: 2px;
  }

  .progress-steps::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 34, 136, 0.7);
  }

  .step {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .step-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  .step.completed .step-circle {
    background: linear-gradient(45deg, #ff2288, #387ef0);
    color: white;
  }

  .step.current .step-circle {
    background: rgba(255, 34, 136, 0.2);
    border: 2px solid #ff2288;
    color: #ff2288;
  }

  .step.pending .step-circle {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #666;
  }

  .step-label {
    font-size: 0.9rem;
    color: #a1a1aa;
  }

  .step.completed .step-label {
    color: white;
  }

  .step.current .step-label {
    color: #ff2288;
    font-weight: 600;
  }

  .insights-preview {
    margin-top: 1.5rem;
    flex-shrink: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1.5rem;
  }

  .insights-preview h4 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    color: white;
  }

  .insight-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    background: rgba(255, 34, 136, 0.2);
    color: #ff2288;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    border: 1px solid rgba(255, 34, 136, 0.3);
  }

  /* Main Chat Box */
  .chat-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: rgba(15, 15, 15, 0.8);
    margin: 1rem;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
  }

  .chat-header {
    padding: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(23, 23, 23, 0.8);
    text-align: center;
  }

  .chat-header h1 {
    margin: 0 0 0.5rem 0;
    font-size: 1.8rem;
    background: linear-gradient(45deg, #ff2288, #387ef0);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .chat-header p {
    margin: 0;
    color: #a1a1aa;
    font-size: 0.9rem;
  }

  .messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .message {
    display: flex;
    max-width: 80%;
  }

  .message.ai {
    align-self: flex-start;
  }

  .message.user {
    align-self: flex-end;
  }

  .message-bubble {
    padding: 1rem 1.5rem;
    border-radius: 20px;
    position: relative;
  }

  .message.ai .message-bubble {
    background: rgba(255, 34, 136, 0.1);
    border: 1px solid rgba(255, 34, 136, 0.2);
  }

  .message.user .message-bubble {
    background: rgba(56, 126, 240, 0.1);
    border: 1px solid rgba(56, 126, 240, 0.2);
  }

  .message-bubble p {
    margin: 0 0 0.5rem 0;
    line-height: 1.5;
  }

  .timestamp {
    font-size: 0.75rem;
    color: #666;
  }

  .typing-indicator {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .typing-indicator span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ff2288;
    animation: typing 1.4s infinite ease-in-out;
  }

  .typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typing {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .input-container {
    padding: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(23, 23, 23, 0.8);
    display: flex;
    gap: 1rem;
    align-items: flex-end;
  }

  .input-container textarea {
    flex: 1;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    padding: 1rem;
    color: white;
    resize: none;
    font-family: inherit;
    font-size: 1rem;
    min-height: 60px;
    max-height: 120px;
  }

  .input-container textarea:focus {
    outline: none;
    border-color: #ff2288;
    box-shadow: 0 0 0 2px rgba(255, 34, 136, 0.2);
  }

  .input-container textarea::placeholder {
    color: #666;
  }

  .send-button {
    background: linear-gradient(45deg, #ff2288, #387ef0);
    border: none;
    border-radius: 12px;
    padding: 1rem 2rem;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    height: 60px;
  }

  .send-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 34, 136, 0.3);
  }

  .send-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .progress-sidebar {
      width: 280px;
      padding: 1.5rem;
    }

    .progress-circle {
      margin-bottom: 1rem;
    }

    .progress-steps {
      gap: 0.75rem;
    }
  }

  @media (max-width: 768px) {
    .chat-assessment-container {
      flex-direction: column;
    }

    .progress-sidebar {
      width: 100%;
      height: auto;
      max-height: 200px;
      padding: 1rem;
    }

    .progress-circle {
      display: none;
    }

    .progress-steps {
      flex-direction: row;
      overflow-x: auto;
      gap: 0.5rem;
    }

    .step {
      flex-direction: column;
      align-items: center;
      min-width: 80px;
      text-align: center;
    }

    .step-label {
      font-size: 0.7rem;
    }

    .insights-preview {
      display: none;
    }

    .chat-box {
      margin: 0.5rem;
      flex: 1;
    }

    .chat-header {
      padding: 1rem;
    }

    .messages-container {
      padding: 1rem;
    }

    .input-container {
      padding: 1rem;
    }

    .message {
      max-width: 90%;
    }

    .message-bubble {
      padding: 0.75rem 1rem;
    }
  }

  @media (max-width: 480px) {
    .progress-sidebar {
      padding: 0.5rem;
    }

    .chat-box {
      margin: 0.25rem;
    }
  }
`;

export default AIChatAssessment;
