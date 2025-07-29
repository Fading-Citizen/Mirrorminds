import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AssessmentGame from './components/AssessmentGame';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'loading' | 'landing' | 'assessment'>('loading');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fixed loading time of 1 second for debugging
  useEffect(() => {
    try {
      console.log('MirrorMinds App starting...');
      const loadingTimer = setTimeout(() => {
        console.log('Timer firing - transitioning to landing page');
        setIsLoading(false);
        setCurrentPage('landing');
        console.log('Loading complete, showing landing page');
      }, 1000); // Reduced to 1 second for debugging

      return () => clearTimeout(loadingTimer);
    } catch (err) {
      console.error('Error in App useEffect:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, []);

  const navigateToAssessment = () => {
    try {
      setCurrentPage('assessment');
    } catch (err) {
      console.error('Error navigating to assessment:', err);
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

  // Show loading screen
  if (isLoading || currentPage === 'loading') {
    console.log('Showing loading screen, isLoading:', isLoading, 'currentPage:', currentPage);
    return <LoadingScreen />;
  }

  console.log('Rendering main app, currentPage:', currentPage);

  return (
    <div className="App">
      {currentPage === 'landing' && (
        <LandingPage onStartAssessment={navigateToAssessment} />
      )}
      {currentPage === 'assessment' && (
        <AssessmentGame onBackToLanding={navigateToLanding} />
      )}
    </div>
  );
}

export default App;
