import React from 'react';

const MessagesPage = () => {
  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: 'calc(100vh - 100px)', 
        backgroundColor: '#f5f5f5' 
      }}
    >
      <div 
        style={{ 
          padding: '15px', 
          borderBottom: '1px solid #ddd', 
          backgroundColor: 'white' 
        }}
      >
        <h2 style={{ margin: 0, fontSize: '20px', color: '#1a1060' }}>
          Mensajes
        </h2>
      </div>

      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flex: 1 
        }}
      >
        <p style={{ color: '#999', textAlign: 'center' }}>
          No hay mensajes por ahora
        </p>
      </div>
    </div>
  );
};

export default MessagesPage;