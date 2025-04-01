import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import './IDVerificationInstructions.css';

const IDVerificationInstructions = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    // Navigate to the ID camera screen to start the ID capture process
    navigate('/id-camera');
  };

  return (
    <div className="id-verification-page">
      <div className="id-verification-container">
        <h1 className="id-verification-title">Estupendo, ya casi está</h1>
        
        <p className="id-verification-subtitle">
          Para completar tu proceso de registro, es necesario
          seguir con los siguientes pasos.
        </p>
        
        <div className="verification-steps">
          <div className="verification-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3 className="step-title">Escanear tú identificación</h3>
              <p className="step-description">Será por ambos lados</p>
            </div>
          </div>
          
          <div className="verification-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3 className="step-title">Confirmar tú información</h3>
              <p className="step-description">La mayor parte de la información se escaneará de su identificación</p>
            </div>
          </div>
          
          <div className="verification-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3 className="step-title">Tomarse una fotografía</h3>
            </div>
          </div>
        </div>
        
        <Button 
          variant="primary" 
          fullWidth
          onClick={handleStart}
          className="id-verification-button"
        >
          INICIAR
        </Button>
      </div>
    </div>
  );
};

export default IDVerificationInstructions;