import React, { useState } from 'react';
import { 
  Settings as GearIcon, 
  Shield as ShieldIcon, 
  Box as BoxIcon, 
  Cpu as CpuIcon, 
  Flag as FlagIcon
} from 'lucide-react';
import DashboardHeader from './DashboardHeader';
import BottomNavigation from './BottomNavigation';
import MessagesPage from './MessagesPage';
import './Dashboard.css';

const EmpleadoDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const pruebas = [
    { 
      icon: <ShieldIcon color="#1a1060" size={32} />, 
      title: 'Seguridad', 
      description: 'Evaluación de protocolos' 
    },
    { 
      icon: <BoxIcon color="#1a1060" size={32} />, 
      title: 'Almacén', 
      description: 'Control de inventario' 
    },
    { 
      icon: <FlagIcon color="#1a1060" size={32} />, 
      title: 'Ética y Valores', 
      description: 'Principios corporativos' 
    },
    { 
      icon: <CpuIcon color="#1a1060" size={32} />, 
      title: 'Psicomético', 
      description: 'Evaluación psicológica' 
    },
    { 
      icon: <GearIcon color="#1a1060" size={32} />, 
      title: 'Manejo de Químicos', 
      description: 'Seguridad industrial' 
    }
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderHomeContent = () => (
    <div className="dashboard-content">
      <DashboardHeader />

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '15px' 
      }}>
        {pruebas.map((prueba, index) => (
          <div 
            key={index} 
            style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              padding: '15px', 
              textAlign: 'center', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
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
      {activeTab === 'messages' && <MessagesPage />}

      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
    </div>
  );
};

export default EmpleadoDashboard;