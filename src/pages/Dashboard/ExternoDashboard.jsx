import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import './Dashboard.css';

const ExternoDashboard = () => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header" style={{ backgroundColor: '#38761d' }}>
        <h1>CapacitApp - Externo</h1>
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
          <p>Este es el panel para colaboradores externos.</p>
        </div>
        
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Cursos Disponibles</h3>
            <p>Explora los cursos disponibles para colaboradores externos.</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Recursos</h3>
            <p>Accede a documentación y recursos adicionales.</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Soporte</h3>
            <p>Contacta al equipo de soporte si necesitas ayuda.</p>
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

export default ExternoDashboard;