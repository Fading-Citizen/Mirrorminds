import React, { useState } from 'react';
import styled from 'styled-components';
import mirrormindsLogo from '../assets/mirrorminds-logo.png';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
  onBackToLanding: () => void;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onLogin, 
  onSwitchToRegister, 
  onBackToLanding,
  isLoading = false 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <StyledWrapper>
      <div className="auth-container">
        <button 
          className="back-button"
          onClick={onBackToLanding}
        >
          ← Back to Home
        </button>

        <div className="form-container">
          <div className="logo-section">
            <img src={mirrormindsLogo} alt="MirrorMinds Logo" className="logo" />
            <h1 className="brand-title">MirrorMinds</h1>
          </div>

          <p className="title">Welcome Back</p>
          <p className="subtitle">Sign in to continue your COG journey</p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="forgot">
                <a href="#" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
              </div>
            </div>
            <button className="sign" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="social-message">
            <div className="line" />
            <p className="message">Or continue with</p>
            <div className="line" />
          </div>

          <div className="social-icons">
            <button aria-label="Log in with Google" className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
              </svg>
            </button>
            <button aria-label="Log in with GitHub" className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
              </svg>
            </button>
          </div>

          <p className="signup">
            Don't have an account?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .auth-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
  }

  .back-button {
    position: absolute;
    top: 2rem;
    left: 2rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
  }

  .back-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-2px);
  }

  .form-container {
    width: 400px;
    max-width: 90vw;
    border-radius: 20px;
    background: rgba(17, 24, 39, 0.95);
    backdrop-filter: blur(10px);
    padding: 3rem 2.5rem;
    color: rgba(243, 244, 246, 1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .logo-section {
    text-align: center;
    margin-bottom: 2rem;
  }

  .logo {
    width: 60px;
    height: 60px;
    margin-bottom: 0.5rem;
    object-fit: contain;
  }

  .brand-title {
    font-size: 1.8rem;
    margin: 0;
    background: linear-gradient(135deg, #00d4ff 0%, #9333ea 50%, #4f46e5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
  }

  .title {
    text-align: center;
    font-size: 1.8rem;
    line-height: 2rem;
    font-weight: 700;
    margin: 0;
    color: white;
  }

  .subtitle {
    text-align: center;
    font-size: 0.95rem;
    color: rgba(156, 163, 175, 1);
    margin: 0.5rem 0 2rem 0;
  }

  .form {
    margin-top: 1.5rem;
  }

  .input-group {
    margin-bottom: 1.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .input-group label {
    display: block;
    color: rgba(156, 163, 175, 1);
    margin-bottom: 6px;
    font-weight: 500;
    text-align: left;
  }

  .input-group input {
    width: 100%;
    border-radius: 10px;
    border: 1px solid rgba(55, 65, 81, 1);
    outline: 0;
    background-color: rgba(17, 24, 39, 0.8);
    padding: 1rem 1.25rem;
    color: rgba(243, 244, 246, 1);
    font-size: 0.95rem;
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  .input-group input:focus {
    border-color: #00d4ff;
    box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
  }

  .input-group input::placeholder {
    color: rgba(107, 114, 128, 1);
  }

  .forgot {
    display: flex;
    justify-content: flex-end;
    font-size: 0.8rem;
    line-height: 1rem;
    color: rgba(156, 163, 175, 1);
    margin: 8px 0 0 0;
  }

  .forgot a, .signup a {
    color: #00d4ff;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
  }

  .forgot a:hover, .signup a:hover {
    color: #9333ea;
    text-decoration: underline;
  }

  .sign {
    display: block;
    width: 100%;
    background: linear-gradient(135deg, #00d4ff 0%, #9333ea 50%, #4f46e5 100%);
    padding: 1rem;
    text-align: center;
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
  }

  .sign:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 212, 255, 0.3);
  }

  .sign:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .social-message {
    display: flex;
    align-items: center;
    padding: 1.5rem 0 1rem 0;
  }

  .line {
    height: 1px;
    flex: 1 1 0%;
    background-color: rgba(55, 65, 81, 1);
  }

  .social-message .message {
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: rgba(156, 163, 175, 1);
  }

  .social-icons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .social-icons .icon {
    border-radius: 10px;
    padding: 0.875rem;
    border: 1px solid rgba(55, 65, 81, 1);
    background-color: rgba(17, 24, 39, 0.8);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .social-icons .icon:hover {
    border-color: #00d4ff;
    background-color: rgba(0, 212, 255, 0.1);
  }

  .social-icons .icon svg {
    height: 1.25rem;
    width: 1.25rem;
    fill: #fff;
  }

  .signup {
    text-align: center;
    font-size: 0.875rem;
    line-height: 1rem;
    color: rgba(156, 163, 175, 1);
    margin: 0;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .form-container {
      width: 350px;
      padding: 2rem 1.5rem;
    }

    .back-button {
      top: 1rem;
      left: 1rem;
      padding: 0.4rem 0.8rem;
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    .auth-container {
      padding: 1rem;
    }

    .form-container {
      width: 100%;
      padding: 1.5rem 1rem;
    }

    .logo {
      font-size: 2.5rem;
    }

    .brand-title {
      font-size: 1.5rem;
    }

    .title {
      font-size: 1.5rem;
    }
  }
`;

export default LoginForm;
