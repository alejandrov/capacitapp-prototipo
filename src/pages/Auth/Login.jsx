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
    if (isAuthenticated && currentUser) {
      // Definir la ruta de destino basada en el rol
      let destination;
      
      if (currentUser.role === 'empleado') {
        destination = '/dashboard/empleado';
      } else if (currentUser.role === 'ejecutivo') {
        destination = '/dashboard/ejecutivo';
      } else if (currentUser.role === 'externo') {
        destination = '/dashboard/externo';
      } else {
        // Si hay un usuario pero no tiene un rol válido, redireccionamos a la ruta principal
        destination = '/dashboard';
      }
      
      // Realizar la redirección
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, currentUser, navigate]);

  const handleLoginSubmit = async (formData) => {
    console.log('Login attempted with:', formData);
    setLoginError(null);
    setIsLoggingIn(true);
    
    try {
      // Usar el método de login del contexto de autenticación
      const success = await login(formData.email, formData.password);
      
      // La redirección se maneja en el useEffect de arriba
      if (!success) {
        setLoginError('Credenciales inválidas. Por favor intenta de nuevo.');
      }
    } catch (error) {
      setLoginError('Error al iniciar sesión. Intenta de nuevo más tarde.');
      console.error('Login error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Si está cargando, mostramos un mensaje
  if (authLoading) {
    return <div className="loading-screen">Cargando...</div>;
  }

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