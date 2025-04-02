import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeaderMain from '../../components/common/PageHeaderMain';
import BottomNavigation from './BottomNavigation';

const MessagesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('messages');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      navigate('/dashboard/empleado');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh', 
        backgroundColor: '#f5f5f5' 
      }}
    >
      <PageHeaderMain 
        title="Mensajes" 
        subtitle="Consulta tus mensajes nuevos" 
        onLogout={handleLogout} 
      />
      
      <div 
        style={{ 
          flex: 1,
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          margin: '20px'
        }}
      >
        <p style={{ color: '#999', textAlign: 'center' }}>
          No hay mensajes por ahora
        </p>
      </div>

      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
    </div>
  );
};

export default MessagesPage;