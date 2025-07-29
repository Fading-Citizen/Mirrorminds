import Loader from './Loader';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-brand">
          <h1 className="loading-title">MirrorMinds</h1>
          <p className="loading-subtitle">Initializing your journey...</p>
        </div>
        
        <div className="loader-container">
          <Loader />
        </div>
        
        <div className="loading-tips">
          <p>🧠 Preparing AI-powered insights</p>
          <p>⚡ Loading cognitive assessment tools</p>
          <p>🎮 Setting up your gaming experience</p>
        </div>
      </div>
      
      {/* Floating elements for ambiance */}
      <div className="loading-orbs">
        <div className="loading-orb orb-1"></div>
        <div className="loading-orb orb-2"></div>
        <div className="loading-orb orb-3"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
