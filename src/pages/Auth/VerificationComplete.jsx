import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/common/Button';
import './VerificationComplete.css';

const VerificationComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selfieCaptured = location.state?.selfieCaptured;

  // Si llegamos a esta pantalla sin haber pasado por la captura de selfie,
  // y no venimos desde el flujo de verificación de correo,
  // entonces probablemente necesitamos redireccionar al flujo correcto
  useEffect(() => {
    if (!selfieCaptured && !location.state?.fromEmailVerification) {
      // Redirigir al inicio del proceso de verificación de ID
      navigate('/id-verification');
    }
  }, [selfieCaptured, location.state, navigate]);

  const handleContinue = () => {
    // Navigate to login page after verification is complete
    navigate('/login');
  };

  return (
    <div className="verification-complete-page">
      <div className="verification-complete-container">
        <div className="verification-success-icon">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="40" fill="#4CAF50" fillOpacity="0.1"/>
            <circle cx="40" cy="40" r="32" fill="#4CAF50"/>
            <path d="M30 40L36 46L50 32" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 className="verification-complete-title">¡Verificación Completa!</h1>
        
        <p className="verification-complete-text">
          Su identificación y datos biométricos han sido verificados exitosamente.
          <br />
          Ya puede iniciar sesión en la plataforma con las credenciales proporcionadas.
        </p>
        
        <div className="verification-complete-illustration">
          <svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* ID Card */}
            <rect x="40" y="30" width="160" height="90" rx="8" fill="#1a1060"/>
            <rect x="50" y="40" width="50" height="60" rx="4" fill="#f0e7d8"/>
            <circle cx="75" cy="60" r="15" fill="#ccc"/>
            <rect x="110" y="45" width="80" height="8" rx="2" fill="white"/>
            <rect x="110" y="60" width="80" height="8" rx="2" fill="white"/>
            <rect x="110" y="75" width="60" height="8" rx="2" fill="white"/>
            
            {/* Check Mark */}
            <circle cx="180" cy="40" r="20" fill="#4CAF50"/>
            <path d="M170 40L178 48L190 36" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <Button 
          variant="primary" 
          fullWidth
          onClick={handleContinue}
          className="verification-continue-button"
        >
          INICIAR SESIÓN
        </Button>
      </div>
    </div>
  );
};

export default VerificationComplete;