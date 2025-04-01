import React from 'react';
import { 
  Home as HomeIcon, 
  MessageCircle as MessageCircleIcon 
} from 'lucide-react';

const BottomNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        padding: '10px', 
        backgroundColor: 'white', 
        borderTop: '1px solid #ddd' 
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