import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthContainerProps {
  onBackToLanding: () => void;
  onAuthSuccess: (userData: any) => void;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ 
  onBackToLanding, 
  onAuthSuccess 
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Login attempt:', { email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      const userData = {
        id: '1',
        name: 'John Doe',
        email: email,
        token: 'mock-jwt-token'
      };
      
      onAuthSuccess(userData);
    } catch (error) {
      console.error('Login failed:', error);
      // TODO: Show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Register attempt:', { name, email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const userData = {
        id: '1',
        name: name,
        email: email,
        token: 'mock-jwt-token'
      };
      
      onAuthSuccess(userData);
    } catch (error) {
      console.error('Registration failed:', error);
      // TODO: Show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  const switchToRegister = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  if (isLogin) {
    return (
      <LoginForm
        onLogin={handleLogin}
        onSwitchToRegister={switchToRegister}
        onBackToLanding={onBackToLanding}
        isLoading={isLoading}
      />
    );
  }

  return (
    <RegisterForm
      onRegister={handleRegister}
      onSwitchToLogin={switchToLogin}
      onBackToLanding={onBackToLanding}
      isLoading={isLoading}
    />
  );
};

export default AuthContainer;
