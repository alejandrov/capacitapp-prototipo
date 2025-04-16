import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeaderMain from '../../components/common/PageHeaderMain';
import BottomNavigation from './BottomNavigation';

const MessagesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Sample messages - ACTUALIZADO con tres mensajes
  const messages = [
    {
      id: 1,
      title: 'Resultados de la prueba - Curso de Seguridad',
      date: '28 de marzo de 2025, 15:45',
      excerpt: 'Su resultado en el curso de seguridad ha sido...',
      fullContent: `Estimado Miguel Villarreal,\n\nNos complace informarle que ha APROBADO satisfactoriamente el Curso de Seguridad. Su compromiso con los protocolos de seguridad industrial ha quedado demostrado a través de su desempeño en la evaluación.\n\nSu tarjetón ha sido validado y firmado por el ejecutivo a cargo. Ya puede descargar su comprobante a continuación.\n\nFelicitaciones por completar exitosamente este importante curso.`,
      status: 'approved',
      validated: true
    },
    {
      id: 2,
      title: 'Resultados pendientes - Curso de Seguridad',
      date: '27 de marzo de 2025, 16:30',
      excerpt: 'Su resultado en el curso de seguridad ha sido aprobado y está pendiente de validación...',
      fullContent: `Estimado Miguel Villarreal,\n\nNos complace informarle que ha APROBADO satisfactoriamente el Curso de Seguridad. Su compromiso con los protocolos de seguridad industrial ha quedado demostrado a través de su desempeño en la evaluación.\n\nSu solicitud se encuentra actualmente en revisión por parte del ejecutivo a cargo. Una vez que su tarjetón sea validado y firmado, recibirá una notificación para poder descargarlo.\n\nFelicitaciones por completar exitosamente este importante curso.`,
      status: 'pending',
      validated: false
    },
    {
      id: 3,
      title: 'Resultados de la prueba - Curso de Seguridad',
      date: '25 de marzo de 2025, 10:30',
      excerpt: 'Lamentablemente, su resultado en el curso de seguridad...',
      fullContent: `Estimado Miguel Villarreal,\n\nLamentamos informarle que NO HA APROBADO el Curso de Seguridad en esta ocasión. Es importante que revise nuevamente los materiales del curso y prepare con mayor dedicación para el próximo intento.\n\nPuntuación: 55/100\nEstatus: REPROBADO\n\nLe recomendamos repasar los módulos de identificación de riesgos y procedimientos de emergencia.`,
      status: 'rejected',
      validated: false
    }
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      navigate('/dashboard/empleado');
    } else if (tab === 'messages') {
      navigate('/dashboard/empleado/messages');
    } else if (tab === 'courses') {
      navigate('/dashboard/empleado/courses');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleOpenMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleCloseMessage = () => {
    setSelectedMessage(null);
  };

  const renderMessageList = () => (
    <div 
      style={{ 
        backgroundColor: 'white',
        borderRadius: '12px',
        margin: '20px',
        overflow: 'hidden',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      }}
    >
      {messages.map((message) => (
        <div 
          key={message.id} 
          onClick={() => handleOpenMessage(message)}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '15px',
            borderBottom: '1px solid #f0f0f0',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div 
            style={{ 
              marginRight: '15px',
              color: message.status === 'approved' ? '#4CAF50' : 
                     message.status === 'pending' ? '#FFA000' : '#F44336'
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              {message.status === 'approved' ? (
                <>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </>
              ) : message.status === 'pending' ? (
                <>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </>
              ) : (
                <>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </>
              )}
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0, fontSize: '16px', marginBottom: '5px' }}>
              {message.title}
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              {message.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMessageDetail = () => {
    if (!selectedMessage) return null;

    return (
      <div 
        style={{ 
          backgroundColor: 'white',
          borderRadius: '12px',
          margin: '20px',
          padding: '20px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '20px', 
            color: selectedMessage.status === 'approved' ? '#4CAF50' : 
                  selectedMessage.status === 'pending' ? '#FFA000' : '#F44336'
          }}>
            {selectedMessage.title}
          </h2>
          <button 
            onClick={handleCloseMessage}
            style={{
              background: 'none',
              border: 'none',
              color: '#666',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>
        <p style={{ 
          fontSize: '14px', 
          color: '#666', 
          marginBottom: '20px' 
        }}>
          {selectedMessage.date}
        </p>
        <div 
          style={{ 
            whiteSpace: 'pre-wrap', 
            lineHeight: 1.6,
            fontSize: '15px'
          }}
        >
          {selectedMessage.fullContent}
        </div>

        {/* Solo mostrar el botón de descarga si está aprobado Y validado */}
        {selectedMessage.status === 'approved' && selectedMessage.validated && (
          <div style={{ 
            marginTop: '20px', 
            display: 'flex', 
            justifyContent: 'center' 
          }}>
            <button 
              onClick={() => {
                // Create a temporary link element to trigger download
                const link = document.createElement('a');
                link.href = '/capacitapp-prototipo/tarjeton.jpg'; // Adjusted for GitHub Pages base path
                link.download = 'tarjeton.jpg';
                link.click();
              }}
              style={{
                backgroundColor: '#1a1060',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Descargar Tarjetón
            </button>
          </div>
        )}
        
        {/* Mostrar mensaje de validación pendiente */}
        {selectedMessage.status === 'approved' && !selectedMessage.validated && (
          <div style={{ 
            marginTop: '20px', 
            padding: '15px',
            backgroundColor: 'rgba(255, 160, 0, 0.1)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#FFA000" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span style={{ fontSize: '14px', color: '#FFA000' }}>
              Pendiente de validación por el ejecutivo
            </span>
          </div>
        )}
      </div>
    );
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
        subtitle="Bandeja de entrada" 
        onLogout={handleLogout} 
      />
      
      {selectedMessage ? renderMessageDetail() : renderMessageList()}

      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
    </div>
  );
};

export default MessagesPage;