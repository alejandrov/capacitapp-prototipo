import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/common/Button';
import './IDConfirmation.css';

const IDConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const capturedImage = location.state?.capturedImage;

  // Mock extracted data from the ID (in a real app, this would come from an OCR service)
  const idData = {
    nombre: 'HERNÁNDEZ ROJAS',
    apellido: 'OAXACA',
    nombreCompleto: 'ADAIR ELISEO',
    domicilio: 'C MORELOS 121 SAN CARLOS 87730 SAN CARLOS, TAMPS.',
    claveElector: 'ROOAD10504H28H000',
    curp: 'ROOA010504HTSJDA7',
    fechaNacimiento: '04/05/2001',
    estado: '28',
    municipio: '034',
    seccion: '1212',
    vigencia: '2029'
  };

  const handleRetry = () => {
    // Go back to the camera screen
    navigate('/id-camera');
  };

  const handleContinue = () => {
    // Navigate to the selfie instructions screen
    navigate('/selfie-instructions');
  };

  if (!capturedImage) {
    // If there's no image in the state, redirect to the camera page
    return (
      <div className="id-confirmation-page">
        <div className="id-confirmation-container">
          <h1>Error: No se ha capturado una imagen</h1>
          <Button 
            variant="primary" 
            onClick={() => navigate('/id-camera')}
          >
            Tomar Foto
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="id-confirmation-page">
      <div className="id-confirmation-container">
        <h1 className="id-confirmation-title">Captura de INE</h1>
        
        <p className="id-confirmation-instructions">
          Confirme que los datos de la tarjeta son correctos y continúe.
        </p>
        
        <div className="id-image-container">
          <img src={capturedImage} alt="ID Capturada" className="id-image" />
        </div>
        
        <div className="id-data-container">
          <div className="id-data-item">
            <span className="id-data-label">Nombre:</span>
            <span className="id-data-value">{idData.nombre} {idData.apellido} {idData.nombreCompleto}</span>
          </div>
          
          <div className="id-data-item">
            <span className="id-data-label">Domicilio:</span>
            <span className="id-data-value">{idData.domicilio}</span>
          </div>
          
          <div className="id-data-item">
            <span className="id-data-label">CURP:</span>
            <span className="id-data-value">{idData.curp}</span>
          </div>
          
          <div className="id-data-item">
            <span className="id-data-label">Clave de Elector:</span>
            <span className="id-data-value">{idData.claveElector}</span>
          </div>
          
          <div className="id-data-row">
            <div className="id-data-item id-data-item-half">
              <span className="id-data-label">Fecha de Nacimiento:</span>
              <span className="id-data-value">{idData.fechaNacimiento}</span>
            </div>
            
            <div className="id-data-item id-data-item-half">
              <span className="id-data-label">Vigencia:</span>
              <span className="id-data-value">{idData.vigencia}</span>
            </div>
          </div>
        </div>
        
        <div className="id-confirmation-actions">
          <Button 
            variant="secondary" 
            onClick={handleRetry}
            className="retry-button"
          >
            Reintentar
          </Button>
          
          <Button 
            variant="primary" 
            onClick={handleContinue}
            className="continue-button"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IDConfirmation;