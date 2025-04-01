import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div 
      style={{ 
        backgroundColor: 'transparent', 
        padding: '10px 0', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
      }}
    >
      <div>
        <h2 style={{ 
          margin: 0, 
          fontSize: '20px', 
          color: '#1a1060' 
        }}>
          Hola, {currentUser?.name.split(' ')[0]}
        </h2>
        <p style={{ 
          color: '#1a1060', 
          margin: 0, 
          fontSize: '14px',
          opacity: 0.7
        }}>
          Bienvenido a tu tablero
        </p>
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
          {currentUser?.name.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;