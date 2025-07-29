import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AssessmentGame from './components/AssessmentGame';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'loading' | 'landing' | 'assessment'>('loading');
  const [isLoading, setIsLoading] = useState(true);

  // Fixed loading time of 3 seconds
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setCurrentPage('landing');
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, []);

  const navigateToAssessment = () => {
    setCurrentPage('assessment');
  };

  const navigateToLanding = () => {
    setCurrentPage('landing');
  };

  // Show loading screen
  if (isLoading || currentPage === 'loading') {
    return <LoadingScreen />;
  }

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
