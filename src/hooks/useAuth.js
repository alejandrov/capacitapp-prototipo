import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Hook personalizado para acceder fácilmente al contexto de autenticación
const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
};

export default useAuth;