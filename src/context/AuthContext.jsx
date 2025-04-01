import React, { createContext, useState, useEffect } from 'react';
import apiService from '../services/api';

// Crear el contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Verificar si el usuario tiene una sesión activa al cargar la aplicación
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // En un entorno real, aquí verificarías si el token es válido haciendo una llamada a la API
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          try {
            // Esto sería una llamada real a un endpoint que devuelve el perfil del usuario
            // Para el prototipo, simulamos un usuario
            // const userProfile = await apiService.users.getProfile();
            
            // Simulación para el prototipo
            console.log('Token encontrado, cargando usuario...');
            setCurrentUser({
              id: '1',
              name: 'Miguel Villarreal',
              email: 'miguel.villarreal@gmail.com',
              role: 'user'
            });
          } catch (err) {
            // Si hay un error (token expirado, inválido, etc.), limpiamos la autenticación
            console.error('Error al verificar autenticación:', err);
            localStorage.removeItem('auth_token');
            setCurrentUser(null);
            setError('Tu sesión ha expirado. Por favor inicia sesión de nuevo.');
          }
        } else {
          console.log('No se encontró token de autenticación');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  // Función para iniciar sesión
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // En un entorno real, esto sería:
      // const userData = await apiService.auth.login(email, password);
      // setCurrentUser(userData.user);
      
      // Simulación para el prototipo
      console.log('Iniciando sesión con:', email);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay de red
      
      // Validar las diferentes cuentas de usuario
      if (password.length > 3) {
        if (email === 'empleado@gmail.com') {
          localStorage.setItem('auth_token', 'fake-token-for-prototype');
          setCurrentUser({
            id: '1',
            name: 'Miguel Villarreal',
            email: email,
            role: 'empleado'
          });
          return true;
        } else if (email === 'ejecutivo@gmail.com') {
          localStorage.setItem('auth_token', 'fake-token-for-prototype');
          setCurrentUser({
            id: '2',
            name: 'Ana López',
            email: email,
            role: 'ejecutivo'
          });
          return true;
        } else if (email === 'externo@gmail.com') {
          localStorage.setItem('auth_token', 'fake-token-for-prototype');
          setCurrentUser({
            id: '3',
            name: 'Carlos Ramírez',
            email: email,
            role: 'externo'
          });
          return true;
        } else {
          setError('Credenciales incorrectas');
          return false;
        }
      } else {
        setError('Contraseña demasiado corta');
        return false;
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Función para registrarse
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // En un entorno real, esto sería:
      // await apiService.auth.register(userData);
      
      // Simulación para el prototipo
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay de red
      
      return true;
    } catch (err) {
      setError(err.message || 'Error al registrar usuario');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Función para cerrar sesión
  const logout = () => {
    // En un entorno real, podrías también hacer una llamada a la API:
    // apiService.auth.logout();
    
    localStorage.removeItem('auth_token');
    setCurrentUser(null);
  };
  
  // Valor del contexto
  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Removed default export