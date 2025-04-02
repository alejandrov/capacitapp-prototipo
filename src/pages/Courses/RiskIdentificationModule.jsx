import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import PageHeaderSecondary from '../../components/common/PageHeaderSecondary';
import BottomNavigation from '../Dashboard/BottomNavigation';
import './RiskIdentificationModule.css';

const RiskIdentificationModule = () => {
  const navigate = useNavigate();
  const [isModuleCompleted, setIsModuleCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Verificar si el módulo ya está completado al cargar
  useEffect(() => {
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    setIsModuleCompleted(completedModules.includes('identification'));
  }, []);

  // Función para regresar al curso sin marcar como completado
  const handleBackToCourse = () => {
    navigate('/courses/safety');
  };

  // Función para alternar entre completado y no completado
  const handleToggleCompletion = () => {
    // Obtenemos los módulos completados del localStorage
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    
    if (isModuleCompleted) {
      // Si está completado, lo quitamos de la lista
      const updatedModules = completedModules.filter(id => id !== 'identification');
      localStorage.setItem('completedModules', JSON.stringify(updatedModules));
      setIsModuleCompleted(false);
      console.log('Módulo de Identificación de Riesgos marcado como no completado');
    } else {
      // Si no está completado, lo agregamos a la lista
      if (!completedModules.includes('identification')) {
        completedModules.push('identification');
        localStorage.setItem('completedModules', JSON.stringify(completedModules));
      }
      setIsModuleCompleted(true);
      console.log('Módulo de Identificación de Riesgos completado');
    }
  };

  // Manejar cambios de tab en la navegación inferior
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      navigate('/dashboard/empleado');
    } else if (tab === 'messages') {
      // Aquí podrías navegar a la sección de mensajes
      // Por ahora, solo cambiamos el estado
      setActiveTab('messages');
    }
  };

  return (
    <div className="risk-module-page" style={{ paddingBottom: '60px' }}>
      <div style={{ padding: '20px 20px' }}>
        {/* Usando el componente PageHeaderSecondary (antes PageHeader) */}
        <PageHeaderSecondary 
          title="Identificación de Riesgos" 
          onBack={handleBackToCourse}
        />
      </div>
      
      <div className="risk-module-content">
        <div className="placeholder-container">
          <div className="placeholder-image">
            {/* Placeholder SVG que simula una imagen de identificación de riesgos */}
            <svg width="100%" height="100%" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
              <rect width="800" height="400" fill="#f0f0f0" />
              
              {/* Título */}
              <text x="400" y="50" fontFamily="Arial" fontSize="24" textAnchor="middle" fontWeight="bold">
                Identificación de Riesgos en el Área de Trabajo
              </text>
              
              {/* Elementos de riesgo */}
              <g>
                {/* Símbolo de advertencia */}
                <polygon points="150,100 170,150 130,150" fill="#ff9800" stroke="#e65100" strokeWidth="2" />
                <text x="150" y="140" fontFamily="Arial" fontSize="20" textAnchor="middle" fill="#000">!</text>
                <text x="150" y="180" fontFamily="Arial" fontSize="14" textAnchor="middle">Riesgo de Caída</text>
              </g>
              
              <g>
                {/* Símbolo químico */}
                <circle cx="300" cy="125" r="30" fill="#ff5252" stroke="#d32f2f" strokeWidth="2" />
                <text x="300" y="130" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#fff">Químico</text>
                <text x="300" y="180" fontFamily="Arial" fontSize="14" textAnchor="middle">Sustancias Peligrosas</text>
              </g>
              
              <g>
                {/* Símbolo eléctrico */}
                <polygon points="450,100 470,150 430,150" fill="#ffeb3b" stroke="#f57f17" strokeWidth="2" />
                <text x="450" y="140" fontFamily="Arial" fontSize="20" textAnchor="middle" fill="#000">⚡</text>
                <text x="450" y="180" fontFamily="Arial" fontSize="14" textAnchor="middle">Riesgo Eléctrico</text>
              </g>
              
              <g>
                {/* Símbolo de equipo pesado */}
                <rect x="550" y="100" width="60" height="50" fill="#64b5f6" stroke="#1976d2" strokeWidth="2" />
                <text x="580" y="130" fontFamily="Arial" fontSize="20" textAnchor="middle" fill="#fff">⚙</text>
                <text x="580" y="180" fontFamily="Arial" fontSize="14" textAnchor="middle">Maquinaria Pesada</text>
              </g>
              
              {/* Descripción */}
              <rect x="100" y="220" width="600" height="120" fill="#e0e0e0" stroke="#9e9e9e" strokeWidth="1" />
              <text x="400" y="250" fontFamily="Arial" fontSize="16" textAnchor="middle">
                Este módulo enseña a identificar correctamente los riesgos en el entorno laboral,
              </text>
              <text x="400" y="280" fontFamily="Arial" fontSize="16" textAnchor="middle">
                clasificarlos según su naturaleza y nivel de peligrosidad, y determinar
              </text>
              <text x="400" y="310" fontFamily="Arial" fontSize="16" textAnchor="middle">
                las medidas preventivas adecuadas para cada situación.
              </text>
            </svg>
          </div>
        </div>
        
        <div className="module-actions">
          <Button 
            variant={isModuleCompleted ? "secondary" : "primary"}
            onClick={handleToggleCompletion}
            className="complete-button"
          >
            {isModuleCompleted ? 'Marcar como no completado' : 'Marcar como completado'}
          </Button>
        </div>
      </div>
      
      {/* Menú de navegación inferior */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
    </div>
  );
};

export default RiskIdentificationModule;