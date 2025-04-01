import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import './SelfieInstructions.css';

const SelfieInstructions = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    // Navigate to the selfie camera screen
    navigate('/selfie-camera');
  };

  return (
    <div className="selfie-instructions-page">
      <div className="selfie-instructions-container">
        <h1 className="selfie-instructions-title">Estupendo, ya casi está</h1>
        
        <p className="selfie-instructions-subtitle">
          Para completar tu proceso de registro, es necesario
          seguir con los siguientes pasos.
        </p>
        
        <div className="instructions-steps">
          <div className="instruction-step completed">
            <div className="step-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="white"/>
              </svg>
            </div>
            <div className="step-content">
              <h3 className="step-title">Escanear tú identificación</h3>
              <p className="step-description">Será por ambos lados</p>
            </div>
          </div>
          
          <div className="instruction-step active">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3 className="step-title">Fotografía Frontal</h3>
              <p className="step-description">Entorno despejado, clara y enfocada</p>
            </div>
          </div>
        </div>
        
        <Button 
          variant="primary" 
          fullWidth
          onClick={handleStart}
          className="selfie-start-button"
        >
          INICIAR
        </Button>
      </div>
    </div>
  );
};

export default SelfieInstructions;