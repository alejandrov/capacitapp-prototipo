import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import './VerificationComplete.css';

const VerificationComplete = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate to ID verification instructions page after email verification is complete
    navigate('/id-verification');
  };

  return (
    <div className="verification-complete-page">
      <div className="verification-complete-container">
        <h1 className="verification-complete-title">Verificación Completa</h1>
        
        <p className="verification-complete-text">
          Su cuenta ha sido creada exitosamente.
          <br />
          A continuación, le solicitaremos seguir unos pasos
          <br />
          para completar el proceso de seguridad.
        </p>
        
        <div className="verification-complete-illustration">
          <svg width="240" height="160" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Envelope background */}
            <rect x="170" y="40" width="70" height="120" rx="5" fill="#F5F5F5"/>
            <rect x="190" y="10" width="15" height="30" fill="#F5F5F5"/>
            
            {/* Envelope */}
            <path d="M190 40H250V120C250 123.314 247.314 126 244 126H196C192.686 126 190 123.314 190 120V40Z" fill="#1a1060"/>
            <path d="M190 40L220 70L250 40H190Z" fill="#231582"/>
            
            {/* Letter with checkmark */}
            <rect x="205" y="55" width="30" height="40" rx="2" fill="white"/>
            <circle cx="220" cy="75" r="12" fill="#FFB74D"/>
            <path d="M216 75L219 78L224 73" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            
            {/* Person figure */}
            <rect x="240" y="115" width="10" height="20" fill="#424242"/> {/* leg */}
            <rect x="255" y="115" width="10" height="20" fill="#424242"/> {/* leg */}
            <rect x="245" y="80" width="15" height="35" fill="#1a1060"/> {/* body */}
            <circle cx="252.5" cy="70" r="10" fill="#E0E0E0"/> {/* head */}
            <path d="M240 90H235C233.895 90 233 90.8954 233 92V100C233 101.105 233.895 102 235 102H240V90Z" fill="#1a1060"/> {/* arm */}
          </svg>
        </div>
        
        <Button 
          variant="primary" 
          fullWidth
          onClick={handleContinue}
          className="verification-continue-button"
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default VerificationComplete;