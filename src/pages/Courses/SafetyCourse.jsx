import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  MessageCircle as MessageCircleIcon,
  Shield as ShieldIcon
} from 'lucide-react';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';
import './SafetyCourse.css';

const SafetyCourse = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [modules, setModules] = useState([
    { 
      title: 'Identificación de Riesgos', 
      description: 'Aprenderás a identificar los riesgos existentes en tu área de trabajo.',
      completed: false
    },
    { 
      title: 'Equipo de Protección', 
      description: 'Conocerás y aprenderás a utilizar el equipo de protección adecuado.',
      completed: false
    },
    { 
      title: 'Procedimientos de Emergencia', 
      description: 'Entenderás los protocolos a seguir en situaciones de emergencia.',
      completed: false
    },
    { 
      title: 'Prueba Complementaria', 
      description: 'Evaluación final de los conocimientos adquiridos.',
      completed: false
    }
  ]);

  const handleStartModule = (moduleIndex) => {
    // Logic for starting a specific module
    console.log(`Starting module ${moduleIndex + 1}`);
    
    // For now, just update the completed status
    const updatedModules = [...modules];
    updatedModules[moduleIndex].completed = true;
    setModules(updatedModules);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      navigate('/dashboard/empleado');
    }
  };

  const isComplementaryTestAvailable = () => {
    return modules.slice(0, 3).every(module => module.completed);
  };

  const calculateProgress = () => {
    const completedModules = modules.filter(module => module.completed).length;
    return (completedModules / modules.length) * 100;
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
      <div className="dashboard-header">
        <div className="user-greeting">
          <h2>Hola, {currentUser?.name.split(' ')[0]}</h2>
        </div>
        <div 
          onClick={handleLogout}
          className="logout-avatar"
        >
          {currentUser?.name.charAt(0).toUpperCase()}
        </div>
      </div>

      <div 
        className="safety-course-content" 
        style={{ 
          flexGrow: 1, 
          overflowY: 'auto' 
        }}
      >
        {/* Course Icon and Module Count Section */}
        <div className="course-icon-section">
          <div className="course-icon-wrapper">
            <div className="course-icon">
              <ShieldIcon size={64} color="#1A1060" />
            </div>
          </div>
          <h1 className="course-title">Curso de Seguridad</h1>
          <p className="module-count">5 módulos</p>
        </div>

        <div className="progress-section">
          <h2>Su Progreso</h2>
          <div className="progress-info">
            <span>{modules.filter(m => m.completed).length} Módulos completados</span>
            <span>{calculateProgress().toFixed(0)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
        </div>
        
        <div className="modules-section">
          <h2>Descripción</h2>
          <p>Al tomar esta evaluación, los integrantes aprenderán:</p>
          <ul>
            <li>Identificar los riesgos que existen en el área de trabajo</li>
            <li>Utilizar el equipo de protección y seguir las medidas de seguridad adecuadas para trabajar en grandes alturas o temperaturas elevadas o con electricidad</li>
          </ul>
        </div>
        
        <div className="modules-list">
          <h2>Módulos del Curso</h2>
          {modules.map((module, index) => (
            <div key={index} className="module-item">
              <div className="module-info">
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>
              <div className="module-actions">
                {index < 3 ? (
                  <Button 
                    variant={module.completed ? "secondary" : "primary"}
                    onClick={() => handleStartModule(index)}
                    disabled={module.completed}
                    className="start-module-button"
                  >
                    {module.completed ? 'Completado' : 'Iniciar'}
                  </Button>
                ) : (
                  <Button 
                    variant={isComplementaryTestAvailable() ? "primary" : "secondary"}
                    onClick={() => handleStartModule(index)}
                    disabled={!isComplementaryTestAvailable()}
                    className="start-module-button"
                  >
                    {isComplementaryTestAvailable() ? 'Iniciar' : 'Bloqueado'}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

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
          onClick={() => handleTabChange('home')}
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
          onClick={() => handleTabChange('messages')}
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
    </div>
  );
};

export default SafetyCourse;