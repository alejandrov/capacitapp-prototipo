import React, { createContext, useState, useEffect } from 'react';
import apiService from '../services/api';

// Crear el contexto
const AuthContext = createContext();

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
            
            // Obtenemos el rol del localStorage para mantener la consistencia
            // Si no hay rol, usamos 'empleado' como valor por defecto
            const userRole = localStorage.getItem('user_role') || 'empleado';
            
            setCurrentUser({
              id: '1',
              name: 'Miguel Villarreal',
              email: 'miguel.villarreal@gmail.com',
              role: userRole // Usamos un rol válido
            });
          } catch (err) {
            // Si hay un error (token expirado, inválido, etc.), limpiamos la autenticación
            console.error('Error al verificar autenticación:', err);
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_role');
            setCurrentUser(null);
            setError('Tu sesión ha expirado. Por favor inicia sesión de nuevo.');
          }
        } else {
          console.log('No se encontró token de autenticación');
          setCurrentUser(null);
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
        let userRole;
        let userName;
        
        if (email === 'empleado@gmail.com') {
          userRole = 'empleado';
          userName = 'Miguel Villarreal';
        } else if (email === 'ejecutivo@gmail.com') {
          userRole = 'ejecutivo';
          userName = 'Ana López';
        } else if (email === 'externo@gmail.com') {
          userRole = 'externo';
          userName = 'Carlos Ramírez';
        } else {
          setError('Credenciales incorrectas');
          setLoading(false);
          return false;
        }
        
        // Guardar el token y el rol en localStorage
        localStorage.setItem('auth_token', 'fake-token-for-prototype');
        localStorage.setItem('user_role', userRole);
        
        // Establecer el usuario actual
        setCurrentUser({
          id: Math.random().toString(36).substr(2, 9), // ID aleatorio
          name: userName,
          email: email,
          role: userRole
        });
        
        setLoading(false);
        return true;
      } else {
        setError('Contraseña demasiado corta');
        setLoading(false);
        return false;
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      setLoading(false);
      return false;
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
      
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message || 'Error al registrar usuario');
      setLoading(false);
      return false;
    }
  };
  
  // Función para cerrar sesión
  const logout = () => {
    // En un entorno real, podrías también hacer una llamada a la API:
    // apiService.auth.logout();
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
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

// Exportar el contexto
export { AuthContext };