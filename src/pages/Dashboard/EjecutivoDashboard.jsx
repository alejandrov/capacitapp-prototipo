import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  ClipboardList as ClipboardListIcon,
  BookOpen as BookOpenIcon,
  BarChart2 as BarChart2Icon,
  Users as UsersIcon
} from 'lucide-react';
import DashboardHeader from './DashboardHeader';
import BottomNavigationEjecutivo from './BottomNavigationEjecutivo';
import SolicitudesPage from './SolicitudesPage';

const EjecutivoDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  // Datos de ejemplo para la gráfica de solicitudes
  const solicitudesData = [
    { dia: 'Lunes', cantidad: 5 },
    { dia: 'Martes', cantidad: 8 },
    { dia: 'Miércoles', cantidad: 12 },
    { dia: 'Jueves', cantidad: 6 },
    { dia: 'Viernes', cantidad: 9 },
    { dia: 'Sábado', cantidad: 3 },
    { dia: 'Domingo', cantidad: 2 },
  ];

  // Calcular el valor máximo para escalar la gráfica
  const maxSolicitudes = Math.max(...solicitudesData.map(d => d.cantidad));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderHomeContent = () => (
    <div className="dashboard-content" style={{ paddingBottom: '20px' }}>
      <DashboardHeader />

      {/* Sección de estadísticas rápidas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '15px',
        marginBottom: '20px' 
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          padding: '15px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ 
            backgroundColor: 'rgba(26, 16, 96, 0.1)', 
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <UsersIcon color="#1a1060" size={24} />
          </div>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Equipos</h3>
          <p style={{ 
            margin: '5px 0 0', 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: '#1a1060' 
          }}>5</p>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          padding: '15px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ 
            backgroundColor: 'rgba(26, 16, 96, 0.1)', 
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <ClipboardListIcon color="#1a1060" size={24} />
          </div>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Solicitudes</h3>
          <p style={{ 
            margin: '5px 0 0', 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: '#1a1060' 
          }}>45</p>
        </div>
      </div>

      {/* Gráfica de solicitudes */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        padding: '20px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Solicitudes Recibidas</h3>
          <BarChart2Icon color="#1a1060" size={20} />
        </div>

        {/* Gráfica de barras simplificada */}
        <div style={{
          display: 'flex',
          height: '200px',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginTop: '20px'
        }}>
          {solicitudesData.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: '1'
            }}>
              <div style={{
                height: `${(item.cantidad / maxSolicitudes) * 160}px`,
                width: '70%',
                backgroundColor: '#1a1060',
                borderRadius: '4px 4px 0 0',
                marginBottom: '10px'
              }}></div>
              <span style={{ fontSize: '12px', color: '#666' }}>{item.dia}</span>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.cantidad}</span>
            </div>
          ))}
        </div>
      </div>


    </div>
  );

  const renderSolicitudesContent = () => (
    <SolicitudesPage />
  );

  const renderCursosContent = () => (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100vh - 120px)', // Altura que deja espacio para header y navegación
      padding: '20px'
    }}>
      <h2 style={{ 
        margin: '0 0 20px', 
        fontSize: '20px', 
        color: '#1a1060',
        textAlign: 'center'
      }}>
        Cursos Asignados
      </h2>
      
      <p style={{ 
        color: '#666', 
        textAlign: 'center',
        fontSize: '16px'
      }}>
        Esta sección se implementará próximamente
      </p>
    </div>
  );

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh', 
        backgroundColor: '#f5f5f5',
        paddingBottom: '60px' // Espacio para la navegación inferior
      }}
    >
      {activeTab === 'home' && renderHomeContent()}
      {activeTab === 'solicitudes' && renderSolicitudesContent()}
      {activeTab === 'cursos' && renderCursosContent()}

      <BottomNavigationEjecutivo 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
    </div>
  );
};

export default EjecutivoDashboard;