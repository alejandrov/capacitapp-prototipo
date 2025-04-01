import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/common/Button';
import './VerificationComplete.css';

const VerificationComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selfieCaptured = location.state?.selfieCaptured;
  const [showComparison, setShowComparison] = useState(true);
  const [comparisonComplete, setComparisonComplete] = useState(false);

  // Si llegamos a esta pantalla sin haber pasado por la captura de selfie,
  // y no venimos desde el flujo de verificación de correo,
  // entonces probablemente necesitamos redireccionar al flujo correcto
  useEffect(() => {
    if (!selfieCaptured && !location.state?.fromEmailVerification) {
      // Redirigir al inicio del proceso de verificación de ID
      navigate('/id-verification');
    }

    // Simular el tiempo que toma la comparación - ahora sin mostrar el checkmark intermedio
    const timer = setTimeout(() => {
      // Pasar directamente a la pantalla de éxito sin mostrar el checkmark intermedio
      setShowComparison(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, [selfieCaptured, location.state, navigate]);

  const handleContinue = () => {
    // Navigate to login page after verification is complete
    navigate('/login');
  };

  // Componente para la animación de comparación
  const ComparisonAnimation = () => (
    <div className="verification-comparing">
      <div>
        <h2 className="comparison-title">Comparando Fotografías</h2>
        <div className="comparison-container">
          <div className="comparison-images">
            <div className="comparison-image">
              {/* Simular foto de ID - rostro recortado de la credencial */}
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#f0e7d8',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\' viewBox=\'0 0 120 120\'%3E%3Ccircle cx=\'60\' cy=\'55\' r=\'45\' fill=\'%23ddd\'/%3E%3Ccircle cx=\'60\' cy=\'40\' r=\'12\' fill=\'%23aaa\'/%3E%3Cpath d=\'M40 80 C 40 65, 80 65, 80 80 L 80 85 L 40 85 Z\' fill=\'%23aaa\'/%3E%3C/svg%3E")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}></div>
              <div className="scanning-effect"></div>
            </div>
            
            <div className="comparison-image">
              {/* Simular selfie - rostro con mejor calidad pero mismas proporciones */}
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#f5f5f5',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\' viewBox=\'0 0 120 120\'%3E%3Ccircle cx=\'60\' cy=\'55\' r=\'45\' fill=\'%23e0e0e0\'/%3E%3Ccircle cx=\'48\' cy=\'40\' r=\'8\' fill=\'%23555\'/%3E%3Ccircle cx=\'72\' cy=\'40\' r=\'8\' fill=\'%23555\'/%3E%3Cpath d=\'M40 75 C 50 90, 70 90, 80 75\' stroke=\'%23555\' stroke-width=\'3\' fill=\'transparent\'/%3E%3C/svg%3E")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <div className="scanning-effect"></div>
            </div>
          </div>
          
          <div className="comparison-line"></div>
          
          {/* Puntos de características faciales simulados */}
          <div className="comparison-points">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="face-point" style={{
                left: `${Math.random() * 240}px`,
                top: `${Math.random() * 100}px`,
              }}></div>
            ))}
          </div>
          
          <div className="comparison-status">
            <div className="comparison-progress">
              <div className="progress-bar"></div>
            </div>
            <div className="status-text">Comparando rasgos faciales...</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Componente para la pantalla de verificación completada
  const VerificationSuccess = () => (
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
  );

  return (
    <div className="verification-complete-page">
      {showComparison ? <ComparisonAnimation /> : <VerificationSuccess />}
    </div>
  );
};

export default VerificationComplete;