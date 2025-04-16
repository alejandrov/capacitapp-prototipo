import React from 'react';
import { 
  Home as HomeIcon, 
  MessageCircle as MessageCircleIcon,
  ClipboardList as ClipboardListIcon
} from 'lucide-react';

const BottomNavigation = ({ activeTab, onTabChange }) => {
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
        width: '100%',
        zIndex: 100
      }}
    >
      <button 
        onClick={() => onTabChange('home')}
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
        onClick={() => onTabChange('courses')}
        style={{ 
          background: 'none', 
          border: 'none', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          color: activeTab === 'courses' ? '#1a1060' : '#666' 
        }}
      >
        <ClipboardListIcon size={24} />
        <span style={{ fontSize: '12px', marginTop: '5px' }}>Mis Cursos</span>
      </button>
      <button 
        onClick={() => onTabChange('messages')}
        style={{ 
          background: 'none', 
          border: 'none', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          color: activeTab === 'messages' ? '#1a1060' : '#666' 
        }}
      >
        <MessageCircleIcon size={24} />
        <span style={{ fontSize: '12px', marginTop: '5px' }}>Mensajes</span>
      </button>
    </div>
  );
};

export default BottomNavigation;