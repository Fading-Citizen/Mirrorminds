import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AssessmentGame from './components/AssessmentGame';
import QuestSelection from './components/QuestSelection';
import AIChatAssessment from './components/AIChatAssessment';
import LoadingScreen from './components/LoadingScreen';
import AuthContainer from './components/AuthContainer';
import { UserManager } from './utils/userManager';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'loading' | 'landing' | 'auth' | 'quest-selection' | 'traditional-assessment' | 'ai-chat-assessment'>('landing'); // Start directly on landing
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [userManager] = useState(() => UserManager.getInstance());

  // Simplified - no loading timer for debugging
  useEffect(() => {
    try {
      console.log('MirrorMinds App starting directly on landing page...');
      // No timer needed - go straight to landing
    } catch (err) {
      console.error('Error in App useEffect:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, []);

  const navigateToQuestSelection = () => {
    try {
      setCurrentPage('quest-selection');
    } catch (err) {
      console.error('Error navigating to quest selection:', err);
      setError(err instanceof Error ? err.message : 'Navigation error');
    }
  };

  const navigateToTraditionalAssessment = () => {
    try {
      setCurrentPage('traditional-assessment');
    } catch (err) {
      console.error('Error navigating to traditional assessment:', err);
      setError(err instanceof Error ? err.message : 'Navigation error');
    }
  };

  const navigateToAIChatAssessment = () => {
    try {
      setCurrentPage('ai-chat-assessment');
    } catch (err) {
      console.error('Error navigating to AI chat assessment:', err);
      setError(err instanceof Error ? err.message : 'Navigation error');
    }
  };

  const navigateToAuth = () => {
    try {
      setCurrentPage('auth');
    } catch (err) {
      console.error('Error navigating to auth:', err);
      setError(err instanceof Error ? err.message : 'Navigation error');
    }
  };

  const navigateToLanding = () => {
    try {
      setCurrentPage('landing');
    } catch (err) {
      console.error('Error navigating to landing:', err);
      setError(err instanceof Error ? err.message : 'Navigation error');
    }
  };

  const handleAuthSuccess = (userData: any) => {
    try {
      setUser(userData);
      // Set the user in UserManager for API calls
      if (userData.email) {
        userManager.createNewUser(userData.email);
      }
      setCurrentPage('quest-selection');
      console.log('User authenticated:', userData);
    } catch (err) {
      console.error('Error handling auth success:', err);
      setError(err instanceof Error ? err.message : 'Authentication error');
    }
  };

  // Show error screen if there's an error
  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        background: '#0a0a0a', 
        color: 'white', 
        fontFamily: 'system-ui',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <div>
          <h1 style={{ color: '#ff4444' }}>Error Loading MirrorMinds</h1>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              padding: '10px 20px', 
              background: '#4f46e5', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Show loading screen only if currentPage is 'loading'
  if (currentPage === 'loading') {
    console.log('Showing loading screen, currentPage:', currentPage);
    return <LoadingScreen />;
  }

  console.log('Rendering main app, currentPage:', currentPage);

  return (
    <ThemeProvider>
      <div className="App">
        {currentPage === 'landing' && (
          <LandingPage 
            onStartAssessment={navigateToQuestSelection}
            onLogin={navigateToAuth}
          />
        )}
        {currentPage === 'auth' && (
        <AuthContainer 
          onBackToLanding={navigateToLanding}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
      {currentPage === 'quest-selection' && (
        <QuestSelection 
          onSelectTraditional={navigateToTraditionalAssessment}
          onSelectAIChat={navigateToAIChatAssessment}
          onBackToLanding={navigateToLanding}
        />
      )}
      {currentPage === 'traditional-assessment' && (
        <AssessmentGame onBackToQuestSelection={() => setCurrentPage('quest-selection')} />
      )}
      {currentPage === 'ai-chat-assessment' && (
        <AIChatAssessment 
          onBackToQuests={() => setCurrentPage('quest-selection')}
          user={user}
        />
      )}
    </div>
    </ThemeProvider>
  );
}

export default App;
