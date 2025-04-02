import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  MessageCircle as MessageCircleIcon,
  Settings as GearIcon, 
  Shield as ShieldIcon, 
  Box as BoxIcon, 
  Cpu as CpuIcon, 
  Flag as FlagIcon
} from 'lucide-react';
import PageHeaderMain from '../../components/common/PageHeaderMain';
import BottomNavigation from './BottomNavigation';
import './Dashboard.css';

const EmpleadoDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  const pruebas = [
    { 
      icon: <ShieldIcon color="#1a1060" size={32} />, 
      title: 'Seguridad', 
      description: 'Evaluación de protocolos',
      route: '/courses/safety'
    },
    { 
      icon: <BoxIcon color="#1a1060" size={32} />, 
      title: 'Almacén', 
      description: 'Control de inventario',
      route: null
    },
    { 
      icon: <FlagIcon color="#1a1060" size={32} />, 
      title: 'Ética y Valores', 
      description: 'Principios corporativos',
      route: null
    },
    { 
      icon: <CpuIcon color="#1a1060" size={32} />, 
      title: 'Psicomético', 
      description: 'Evaluación psicológica',
      route: null
    },
    { 
      icon: <GearIcon color="#1a1060" size={32} />, 
      title: 'Manejo de Químicos', 
      description: 'Seguridad industrial',
      route: null
    },
    { 
      icon: <GearIcon color="#1a1060" size={32} />, 
      title: 'Manejo de Químicos', 
      description: 'Seguridad industrial',
      route: null
    },
    { 
      icon: <GearIcon color="#1a1060" size={32} />, 
      title: 'Manejo de Químicos', 
      description: 'Seguridad industrial',
      route: null
    },
    { 
      icon: <GearIcon color="#1a1060" size={32} />, 
      title: 'Manejo de Químicos', 
      description: 'Seguridad industrial',
      route: null
    },
    { 
      icon: <GearIcon color="#1a1060" size={32} />, 
      title: 'Manejo de Químicos', 
      description: 'Seguridad industrial',
      route: null
    },
    { 
      icon: <GearIcon color="#1a1060" size={32} />, 
      title: 'Manejo de Químicos', 
      description: 'Seguridad industrial',
      route: null
    }
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCourseNavigation = (route) => {
    if (route) {
      navigate(route);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const renderHomeContent = () => (
    <div className="dashboard-content" style={{ paddingTop: 0 }}>
      <div style={{ position: "static" }}>
      <PageHeaderMain
          title="CapacitApp"
          subtitle="Dashboard"
          onLogout={handleLogout}
        />
      </div>

      <div style={{ padding: "20px", 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '15px' 
      }}>
        {pruebas.map((prueba, index) => (
          <div 
            key={index} 
            onClick={() => handleCourseNavigation(prueba.route)}
            style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              padding: '15px', 
              textAlign: 'center', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              cursor: prueba.route ? 'pointer' : 'default'
            }}
          >
            <div style={{ marginBottom: '10px' }}>
              {prueba.icon}
            </div>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{prueba.title}</h3>
            <p style={{ 
              margin: '5px 0 0', 
              fontSize: '12px', 
              color: '#666' 
            }}>{prueba.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Renderizar la página de mensajes con el PageHeaderMain personalizado
  const renderMessagesContent = () => (
    <div className="dashboard-content" style={{ paddingTop: 0 }}>
      <div style={{ position: "static" }}>
        <PageHeaderMain 
          title="Mensajes" 
          subtitle="Consulta tus mensajes nuevos" 
          onLogout={handleLogout} 
        />
      </div>
      
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          minHeight: '300px',
          margin: '20px'
        }}
      >
        <p style={{ color: '#999', textAlign: 'center' }}>
          No hay mensajes por ahora
        </p>
      </div>
    </div>
  );

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh', 
        backgroundColor: '#f5f5f5' 
      }}
    >
      {activeTab === 'home' && renderHomeContent()}
      {activeTab === 'messages' && renderMessagesContent()}

      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
    </div>
  );
};

export default EmpleadoDashboard;