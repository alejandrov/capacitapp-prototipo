import React, { useState, useEffect } from 'react';
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
      id: 'identification',
      title: 'Identificación de Riesgos', 
      description: 'Aprenderás a identificar los riesgos existentes en tu área de trabajo.',
      completed: false,
      route: '/courses/risk-identification'
    },
    { 
      id: 'protection',
      title: 'Equipo de Protección', 
      description: 'Conocerás y aprenderás a utilizar el equipo de protección adecuado.',
      completed: false,
      route: null
    },
    { 
      id: 'emergency',
      title: 'Procedimientos de Emergencia', 
      description: 'Entenderás los protocolos a seguir en situaciones de emergencia.',
      completed: false,
      route: null
    },
    { 
      id: 'test',
      title: 'Prueba Complementaria', 
      description: 'Evaluación final de los conocimientos adquiridos.',
      completed: false,
      route: null
    }
  ]);

  // Cargar los módulos completados desde localStorage al iniciar
  useEffect(() => {
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    
    if (completedModules.length > 0) {
      setModules(prevModules => 
        prevModules.map(module => ({
          ...module,
          completed: completedModules.includes(module.id)
        }))
      );
    }
  }, []);

  const handleModuleAction = (moduleIndex) => {
    const selectedModule = modules[moduleIndex];
    
    // Si el módulo ya está completado, lo marcamos como no completado
    if (selectedModule.completed) {
      // Actualizamos el estado local
      const updatedModules = [...modules];
      updatedModules[moduleIndex].completed = false;
      setModules(updatedModules);
      
      // Actualizamos localStorage
      const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
      const filteredModules = completedModules.filter(id => id !== selectedModule.id);
      localStorage.setItem('completedModules', JSON.stringify(filteredModules));
      
      console.log(`Módulo ${moduleIndex + 1} marcado como no completado`);
    } 
    // Si no está completado y tiene una ruta, navegamos a ella
    else if (selectedModule.route) {
      navigate(selectedModule.route);
    } 
    // Si no está completado y no tiene ruta, lo marcamos como completado
    else {
      // Actualizamos el estado local
      const updatedModules = [...modules];
      updatedModules[moduleIndex].completed = true;
      setModules(updatedModules);
      
      // Guardamos en localStorage
      const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
      if (!completedModules.includes(updatedModules[moduleIndex].id)) {
        completedModules.push(updatedModules[moduleIndex].id);
        localStorage.setItem('completedModules', JSON.stringify(completedModules));
      }
      
      console.log(`Módulo ${moduleIndex + 1} marcado como completado`);
    }
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
          <p className="module-count" style={{marginTop:"-15px"}}>4 módulos</p>
        </div>

        <div className="progress-section">
        <div className="module-card"  style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            // display: 'flex',
            // justifyContent: 'space-between',
            // alignItems: 'center'
          }}>
          <h2>Su Progreso</h2>
          <div className="progress-info">
            <span>{modules.filter(m => m.completed).length} Módulos completados</span>
            <span style={{fontSize:"26px", fontWeight:"bold"}}>{calculateProgress().toFixed(0)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
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
          <div className="module-card" key={index} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
                
              <div className="module-info">
                <h3>
                  {module.title}
                  {module.completed && <span className="completed-indicator"> ✓</span>}
                </h3>
                <p>{module.description}</p>
              </div>
              <div className="module-actions" style={{marginTop: '-10px'}}>
                {index < 3 ? (
                  <Button 
                    variant={module.completed ? "secondary" : "primary"}
                    onClick={() => handleModuleAction(index)}
                    className="start-module-button"
                  >
                    {module.completed ? 'Desmarcar' : 'Iniciar'}
                  </Button>
                ) : (
                  <Button 
                    variant={isComplementaryTestAvailable() ? "primary" : "secondary"}
                    onClick={() => handleModuleAction(index)}
                    disabled={!isComplementaryTestAvailable()}
                    className="start-module-button"
                  >
                    {module.completed ? 'Desmarcar' : (isComplementaryTestAvailable() ? 'Iniciar' : 'Bloqueado')}
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