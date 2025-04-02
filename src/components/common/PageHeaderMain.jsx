import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

/**
 * Componente de cabecera principal homologado para dashboards y páginas principales
 * Muestra el saludo al usuario, subtítulo opcional y avatar con funcionalidad de logout
 */
const PageHeaderMain = ({ 
  title,
  subtitle,
  onLogout,
  className = '' 
}) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    console.log('Logout clicked');
    
    logout();
      navigate('/login');
  };

  return (
    <div 
      className={className}
      style={{ 
        backgroundColor: 'white', 
        padding: '15px 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '0px',
        position: 'relative',
        zIndex: 1,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div>
        <h2 style={{ 
          margin: 0, 
          fontSize: '20px', 
          color: '#1a1060' 
        }}>
          {title || `Hola, ${currentUser?.name?.split(' ')[0] || 'Usuario'}`}
        </h2>
        {(subtitle || subtitle === '') ? (
          <p style={{ 
            color: '#1a1060', 
            margin: 0, 
            fontSize: '14px',
            opacity: 0.7
          }}>
            {subtitle}
          </p>
        ) : (
          <p style={{ 
            color: '#1a1060', 
            margin: 0, 
            fontSize: '14px',
            opacity: 0.7
          }}>
            Bienvenido a tu tablero
          </p>
        )}
      </div>
      <div 
        onClick={handleLogout}
        style={{ 
          width: '45px', 
          height: '45px', 
          borderRadius: '50%', 
          backgroundColor: '#f0f0f0', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}
      >
        <div 
          style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            backgroundColor: '#1a1060', 
            color: 'white', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            fontWeight: 'bold' 
          }}
        >
          {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
      </div>
    </div>
  );
};

export default PageHeaderMain;