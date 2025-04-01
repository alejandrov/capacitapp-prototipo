import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import './Dashboard.css';

const EjecutivoDashboard = () => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header" style={{ backgroundColor: '#1c4587' }}>
        <h1>CapacitApp - Ejecutivo</h1>
        <div className="header-actions">
          <span className="user-name">{currentUser?.name}</span>
          <Button onClick={handleLogout} variant="text" className="header-logout-btn">
            <span className="logout-icon">↩</span> Salir
          </Button>
        </div>
      </header>
      
      <main className="dashboard-content">
        <div className="dashboard-welcome">
          <h2>Bienvenido {currentUser?.name}</h2>
          <p>Este es el panel para ejecutivos.</p>
        </div>
        
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Gestión de Equipos</h3>
            <p>Gestiona a los miembros de tu equipo y su progreso.</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Reportes</h3>
            <p>Accede a reportes detallados de capacitación.</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Asignación de Cursos</h3>
            <p>Asigna cursos a los miembros de tu equipo.</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Estadísticas</h3>
            <p>Visualiza estadísticas de rendimiento.</p>
          </div>
        </div>
        
        <div className="logout-container">
          <Button 
            onClick={handleLogout} 
            variant="secondary" 
            className="logout-button"
          >
            Cerrar sesión
          </Button>
        </div>
      </main>
    </div>
  );
};

export default EjecutivoDashboard;