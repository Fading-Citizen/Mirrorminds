import React from 'react';
import styled from 'styled-components';
import AuthContainer from './AuthContainer';

const AuthDemo: React.FC = () => {
  const [showDemo, setShowDemo] = React.useState(true);

  const handleAuthSuccess = (userData: any) => {
    console.log('Auth Success:', userData);
    alert(`Welcome ${userData.name}!`);
  };

  if (!showDemo) {
    return (
      <StyledWrapper>
        <div className="demo-container">
          <h1>🧠 MirrorMinds Auth System Demo</h1>
          <p>Login system is ready for integration!</p>
          <button onClick={() => setShowDemo(true)}>Show Demo</button>
        </div>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <div className="demo-container">
        <h1>🧠 MirrorMinds Auth System</h1>
        <p>Login & Registration UI Components</p>
        
        <AuthContainer
          onBackToLanding={() => setShowDemo(false)}
          onAuthSuccess={handleAuthSuccess}
        />
        
        <div className="demo-info">
          <h3>✅ What's Included:</h3>
          <ul>
            <li>LoginForm component with MirrorMinds styling</li>
            <li>RegisterForm component with validation</li>
            <li>AuthContainer for managing login/register flow</li>
            <li>Integration with App.tsx navigation</li>
            <li>Responsive design matching your theme</li>
            <li>Social login buttons (UI only)</li>
            <li>Form validation and loading states</li>
          </ul>
          
          <h3>🔌 Ready for API Integration:</h3>
          <ul>
            <li>Replace mock functions in AuthContainer</li>
            <li>Add your authentication endpoints</li>
            <li>Implement error handling</li>
            <li>Add JWT token management</li>
          </ul>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .demo-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
    color: white;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .demo-info {
    margin-top: 2rem;
    background: rgba(17, 24, 39, 0.8);
    padding: 2rem;
    border-radius: 15px;
    max-width: 600px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .demo-info h3 {
    color: #00d4ff;
    margin-bottom: 1rem;
  }

  .demo-info ul {
    margin-bottom: 1.5rem;
  }

  .demo-info li {
    margin-bottom: 0.5rem;
    color: #a1a1aa;
  }

  button {
    background: linear-gradient(135deg, #00d4ff 0%, #9333ea 50%, #4f46e5 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 212, 255, 0.3);
  }
`;

export default AuthDemo;
