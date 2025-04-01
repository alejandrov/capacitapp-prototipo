import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import './Dashboard.css';

const EmpleadoDashboard = () => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>CapacitApp - Empleado</h1>
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
          <p>Este es el panel para empleados.</p>
        </div>
        
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Mis Cursos</h3>
            <p>Explora los cursos asignados para tu rol.</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Mi Progreso</h3>
            <p>Revisa tu avance de aprendizaje.</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Certificados</h3>
            <p>Visualiza tus certificados obtenidos.</p>
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

export default EmpleadoDashboard;