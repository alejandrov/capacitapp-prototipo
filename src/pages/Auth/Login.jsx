import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import useAuth from '../../hooks/useAuth';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading, error: authError, currentUser } = useAuth();
  const [loginError, setLoginError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSubmit = async (formData) => {
    console.log('Login attempted with:', formData);
    setLoginError(null);
    setIsLoggingIn(true);
    
    try {
      // Usar el método de login del contexto de autenticación
      const success = await login(formData.email, formData.password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setLoginError('Credenciales inválidas. Por favor intenta de nuevo.');
      }
    } catch (error) {
      setLoginError('Error al iniciar sesión. Intenta de nuevo más tarde.');
      console.error('Login error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <LoginForm 
          onSubmit={handleLoginSubmit} 
          loading={isLoggingIn}
          error={loginError || authError}
        />
      </div>
    </div>
  );
};

export default Login;