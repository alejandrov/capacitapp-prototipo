import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, currentUser, isAuthenticated } = useAuth();
  
  // Verificamos si está autenticado (medida de seguridad adicional)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    // Usar el método de logout del contexto de autenticación
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>CapacitApp</h1>
        <div className="header-actions">
          <span className="user-name">{currentUser?.name}</span>
          <Button onClick={handleLogout} variant="text" className="header-logout-btn">
            <span className="logout-icon">↩</span> Salir
          </Button>
        </div>
      </header>
      
      <main className="dashboard-content">
        <div className="dashboard-welcome">
          <h2>Bienvenido {currentUser?.name || 'Usuario'}</h2>
          <p>Esta es una página de muestra para el prototipo.</p>
        </div>
        
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Cursos</h3>
            <p>Explora nuestros cursos disponibles.</p>
          </div>
          
          <div className="dashboard-card">
            <h3>Progreso</h3>
            <p>Revisa tu avance en los cursos.</p>
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

export default Dashboard;