import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ResultsScreen from './ResultsScreen';
import { AIChatService } from '../services/aiChatService';
import { UserManager } from '../utils/userManager';

interface Message {
  id: number;
  text: string;
  sender: 'ai' | 'user';
  timestamp: string;
}

interface AIChatAssessmentProps {
  onBackToQuests: () => void;
  user?: any;
}

const AIChatAssessment: React.FC<AIChatAssessmentProps> = ({ 
  onBackToQuests,
  user
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [aiService] = useState(() => new AIChatService());
  const [userManager] = useState(() => UserManager.getInstance());

  // Initialize assessment with real API
  useEffect(() => {
    const startAssessment = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Ensure we have a user session
        if (user?.email && !userManager.getCurrentUser()) {
          userManager.createNewUser(user.email);
        } else if (!userManager.getCurrentUser()) {
          userManager.createNewUser();
        }
        
        // Start conversation with API
        const response = await aiService.startConversation();
        
        if (response.error) {
          setError(response.error);
        }

        const welcomeMessage: Message = {
          id: Date.now(),
          text: response.question || "Hello! I'm your AI assessment companion. I'm here to help you discover your Core Operating Gifts through natural conversation. Let's start with something simple - what's your name, and what brings you here today?",
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString()
        };

        setMessages([welcomeMessage]);
        setQuestionCount(1);
      } catch (err) {
        console.error('Error starting assessment:', err);
        setError('Failed to start assessment. Please try again.');
        // Still show welcome message as fallback
        const fallbackMessage: Message = {
          id: Date.now(),
          text: "Hello! I'm your AI assessment companion. I'm here to help you discover your Core Operating Gifts through natural conversation. Let's start with something simple - what's your name, and what brings you here today?",
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages([fallbackMessage]);
      } finally {
        setIsLoading(false);
      }
    };

    startAssessment();
  }, [user, aiService, userManager]);

  // Add scroll to bottom functionality
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setIsLoading(true);

    try {
      // Send response to API
      const response = await aiService.sendResponse(inputText);
      
      if (response.error) {
        setError(response.error);
        // Still continue with a fallback response
      }

      // Check if assessment is complete
      if (response.isComplete) {
        // Show completion message
        const completionMessage: Message = {
          id: Date.now() + 1,
          text: "Thank you for this wonderful conversation! I've gathered enough insights to analyze your Core Operating Gifts. Let me process this information and provide you with your personalized COG profile.",
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, completionMessage]);
        setIsTyping(false);
        setIsLoading(false);
        
        // Get final results from API
        setTimeout(async () => {
          try {
            const summary = await aiService.getAssessmentSummary();
            setResults(summary);
            setShowResults(true);
          } catch (err) {
            console.error('Error getting results:', err);
            // Show results with fallback data
            setResults({
              traits: {
                Analytical: Math.floor(Math.random() * 40) + 60,
                Creative: Math.floor(Math.random() * 40) + 60,
                Practical: Math.floor(Math.random() * 40) + 60,
                Relational: Math.floor(Math.random() * 40) + 60
              },
              insights: [
                "Your AI chat assessment has been completed successfully",
                "Strong conversational engagement detected",
                "Adaptive thinking patterns identified"
              ],
              completionTime: "8:42",
              score: Math.floor(Math.random() * 200) + 300
            });
            setShowResults(true);
          }
        }, 3000);
        return;
      }

      // Add AI response after delay
      setTimeout(() => {
        const aiMessage: Message = {
          id: Date.now() + 1,
          text: response.question || "Thank you for sharing that. Could you tell me more about how you approach challenges in your daily life?",
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, aiMessage]);
        setQuestionCount(prev => prev + 1);
        setIsTyping(false);
        setIsLoading(false);
      }, 1500 + Math.random() * 1000);

    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
      
      // Fallback response to keep conversation flowing
      setTimeout(() => {
        const fallbackMessage: Message = {
          id: Date.now() + 1,
          text: "I appreciate your response. Let me ask you something different - how do you typically approach new challenges or problems?",
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, fallbackMessage]);
        setQuestionCount(prev => prev + 1);
        setIsTyping(false);
        setIsLoading(false);
      }, 1500);
    }
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
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    setInputText('');
    setIsTyping(false);
    setQuestionCount(0);
    setShowResults(false);
    setError(null);
    // Restart the API session
    userManager.clearUser();
  };

  const navigateToHome = () => {
    onBackToQuests();
  };

  if (showResults) {
    return (
      <ResultsScreen
        questionsCompleted={questionCount}
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
            {error && (
              <div className="error-message">
                <span>⚠️ {error}</span>
                <button onClick={() => setError(null)} className="dismiss-error">×</button>
              </div>
            )}
          </div>

          <div className="messages-container">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-bubble">
                  <p>{message.text}</p>
                  <span className="timestamp">
                    {message.timestamp}
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
              placeholder={isLoading ? "Processing..." : "Share your thoughts..."}
              disabled={isTyping || isLoading}
              rows={3}
            />
            <button 
              onClick={handleSendMessage} 
              disabled={!inputText.trim() || isTyping || isLoading}
              className="send-button"
            >
              {isLoading ? "..." : "Send"}
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

  .error-message {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    margin-top: 1rem;
    color: #fca5a5;
    font-size: 0.85rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dismiss-error {
    background: none;
    border: none;
    color: #fca5a5;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dismiss-error:hover {
    background: rgba(239, 68, 68, 0.2);
    border-radius: 4px;
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
