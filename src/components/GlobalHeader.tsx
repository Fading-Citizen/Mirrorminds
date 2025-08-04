import React from 'react';
import ThemeToggle from './ThemeToggle';
import HeaderLogo from './HeaderLogo';
import './GlobalHeader.css';

interface GlobalHeaderProps {
  onLogin?: () => void;
  showLogo?: boolean;
  showHomeLink?: boolean;
  onHomeClick?: () => void;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ 
  onLogin, 
  showLogo = true, 
  showHomeLink = false,
  onHomeClick 
}) => {
  return (
    <header className="global-header">
      <div className="header-content">
        <div className="header-left">
          {showLogo && (
            <div className="header-logo-container" onClick={onHomeClick} style={{ cursor: onHomeClick ? 'pointer' : 'default' }}>
              <div className="header-logo-wrapper">
                <HeaderLogo />
              </div>
              <span className="header-title">MirrorMinds</span>
            </div>
          )}
          {showHomeLink && !showLogo && (
            <button className="home-link" onClick={onHomeClick}>
              ← Back to Home
            </button>
          )}
        </div>
        
        <div className="header-right">
          <ThemeToggle />
          {onLogin && (
            <button className="header-login-button" onClick={onLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
