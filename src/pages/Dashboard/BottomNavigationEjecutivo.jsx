import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  ClipboardList as ClipboardListIcon,
  BookOpen as BookOpenIcon
} from 'lucide-react';

const BottomNavigationEjecutivo = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    onTabChange(tab);
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        padding: '10px', 
        backgroundColor: 'white', 
        borderTop: '1px solid #ddd',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
      }}
    >
      <button 
        onClick={() => handleTabClick('home')}
        style={{ 
          background: 'none', 
          border: 'none', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          color: activeTab === 'home' ? '#1a1060' : '#666' 
        }}
      >
        <HomeIcon size={24} />
        <span style={{ fontSize: '12px', marginTop: '5px' }}>Inicio</span>
      </button>
      
      <button 
        onClick={() => handleTabClick('solicitudes')}
        style={{ 
          background: 'none', 
          border: 'none', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          color: activeTab === 'solicitudes' ? '#1a1060' : '#666' 
        }}
      >
        <ClipboardListIcon size={24} />
        <span style={{ fontSize: '12px', marginTop: '5px' }}>Solicitudes</span>
      </button>
      
      <button 
        onClick={() => handleTabClick('cursos')}
        style={{ 
          background: 'none', 
          border: 'none', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          color: activeTab === 'cursos' ? '#1a1060' : '#666' 
        }}
      >
        <BookOpenIcon size={24} />
        <span style={{ fontSize: '12px', marginTop: '5px' }}>Cursos</span>
      </button>
    </div>
  );
};

export default BottomNavigationEjecutivo;