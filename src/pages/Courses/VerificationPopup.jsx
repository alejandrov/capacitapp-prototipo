import React, { useState, useRef, useEffect } from 'react';
import Button from '../../components/common/Button';
import './VerificationPopup.css';

const VerificationPopup = ({ onClose, onVerificationComplete }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [verificationStep, setVerificationStep] = useState('capture'); // capture, confirm, verify, complete
  const [isVerifying, setIsVerifying] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Detectar iOS al inicio
  useEffect(() => {
    const iosDetected = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iosDetected);
    
    if (iosDetected) {
      console.log("Dispositivo iOS detectado. Usando configuración especial para verificación.");
    }
  }, []);

  // Iniciar cámara cuando se monte el componente
  useEffect(() => {
    startCamera();
    
    const timeoutId = setTimeout(() => {
      if (isInitializing && !cameraActive) {
        setCameraError('No se pudo acceder a la cámara en un tiempo razonable. Puedes usar la simulación para continuar.');
        setIsInitializing(false);
      }
    }, 4000);
    
    return () => {
      clearTimeout(timeoutId);
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    setIsInitializing(true);
    setCameraError(null);
    
    try {
      const constraints = {
        audio: false,
        video: {
          width: { ideal: isIOS ? 640 : 1280 },
          height: { ideal: isIOS ? 480 : 720 },
          facingMode: 'user' // Usar cámara frontal para selfie
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.setAttribute('autoplay', 'true');
        
        try {
          await videoRef.current.play();
        } catch (playError) {
          console.error('Error al reproducir video:', playError);
        }
        
        videoRef.current.onloadedmetadata = () => {
          setCameraActive(true);
          setIsInitializing(false);
        };
        
        videoRef.current.onplaying = () => {
          setCameraActive(true);
          setIsInitializing(false);
        };
        
        videoRef.current.onerror = (err) => {
          setCameraError(`Error al inicializar la cámara: ${err}`);
          setIsInitializing(false);
        };
      } else {
        setCameraError('Referencia del video no disponible');
        setIsInitializing(false);
      }
    } catch (err) {
      setCameraError(`No se pudo acceder a la cámara: ${err.message || 'Error desconocido'}`);
      setCameraActive(false);
      setIsInitializing(false);
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageDataURL = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageDataURL);
    
    if (video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setCameraActive(false);
    
    // Avanzar al siguiente paso
    setVerificationStep('confirm');
  };

  const handleRetry = () => {
    setCapturedImage(null);
    setVerificationStep('capture');
    startCamera();
  };

  const handleConfirm = () => {
    setVerificationStep('verify');
    setIsVerifying(true);
    
    // Simulamos una verificación de identidad
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationStep('complete');
    }, 3000);
  };

  const handleComplete = () => {
    if (onVerificationComplete) {
      onVerificationComplete(true);
    }
  };

  const handleMockCapture = () => {
    const canvas = canvasRef.current;
    canvas.width = 640;
    canvas.height = 480;
    const context = canvas.getContext('2d');
    
    // Dibujar fondo
    context.fillStyle = '#f5f5f5';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar un círculo que simula una cara
    context.fillStyle = '#e0e0e0';
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, 120, 0, Math.PI * 2);
    context.fill();
    
    // Dibujar ojos
    context.fillStyle = '#555';
    context.beginPath();
    context.arc(canvas.width / 2 - 40, canvas.height / 2 - 20, 10, 0, Math.PI * 2);
    context.arc(canvas.width / 2 + 40, canvas.height / 2 - 20, 10, 0, Math.PI * 2);
    context.fill();
    
    // Dibujar boca
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2 + 30, 50, 0.1 * Math.PI, 0.9 * Math.PI);
    context.strokeStyle = '#555';
    context.lineWidth = 3;
    context.stroke();
    
    const imageDataURL = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageDataURL);
    setCameraActive(false);
    setVerificationStep('confirm');
  };

  const renderCaptureStep = () => (
    <>
      <h2 className="verification-title">Verificación de Seguridad</h2>
      <p className="verification-text">
        Como parte de nuestros protocolos de seguridad, necesitamos verificar tu identidad antes de registrar tus resultados. Por favor, permite tomar una foto de tu rostro.
      </p>
      
      <div className="camera-container">
        {cameraActive ? (
          <div className="camera-view">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className="camera-video"
            />
            <div className="face-overlay">
              <div className="face-guide-text">Coloca tu rostro aquí</div>
            </div>
          </div>
        ) : (
          <div className="camera-error">
            {isInitializing ? 'Iniciando cámara...' : (cameraError || 'Error al iniciar la cámara')}
            
            {(!cameraActive && !isInitializing) && (
              <div className="mock-capture-container">
                <Button 
                  variant="primary" 
                  onClick={handleMockCapture}
                >
                  Usar Simulación
                </Button>
                <p className="mock-capture-text">
                  No podemos acceder a tu cámara. Puedes continuar con una simulación.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {cameraActive && (
        <Button 
          variant="primary" 
          onClick={captureImage}
          className="action-button"
        >
          Capturar Foto
        </Button>
      )}
    </>
  );

  const renderConfirmStep = () => (
    <>
      <h2 className="verification-title">Confirma tu Foto</h2>
      <p className="verification-text">
        ¿Estás satisfecho con la foto? Si no, puedes volver a tomarla.
      </p>
      
      <div className="captured-image-container">
        <img src={capturedImage} alt="Foto Capturada" className="captured-image" />
      </div>
      
      <div className="action-buttons">
        <Button 
          variant="secondary" 
          onClick={handleRetry}
          className="action-button"
        >
          Volver a tomar
        </Button>
        
        <Button 
          variant="primary" 
          onClick={handleConfirm}
          className="action-button"
        >
          Confirmar
        </Button>
      </div>
    </>
  );

  const renderVerifyStep = () => (
    <div className="verification-comparing">
      <h2 className="comparison-title">Comparando Fotografías</h2>
      <div className="comparison-container">
        <div className="comparison-images">
          <div className="comparison-image">
            {/* Simular foto de ID */}
            <div className="id-image"></div>
            <div className="scanning-effect"></div>
          </div>
          
          <div className="comparison-image">
            {/* Foto capturada */}
            <img src={capturedImage} alt="Foto Capturada" className="selfie-image" />
            <div className="scanning-effect"></div>
          </div>
        </div>
        
        <div className="comparison-line"></div>
        
        <div className="comparison-points"></div>
        
        <div className="comparison-status">
          <div className="comparison-progress">
            <div className="progress-bar"></div>
          </div>
          <div className="status-text">Comparando rasgos faciales...</div>
        </div>
      </div>
    </div>
  );

  const renderCompleteStep = () => (
    <>
      <div className="verification-success">
        <div className="success-icon">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="40" fill="#4CAF50" fillOpacity="0.1"/>
            <circle cx="40" cy="40" r="32" fill="#4CAF50"/>
            <path d="M30 40L36 46L50 32" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h2 className="verification-title">Verificación Exitosa</h2>
        
        <p className="verification-text">
          Tu identidad ha sido verificada correctamente. Ya puedes terminar la prueba.
        </p>
        
        <Button 
          variant="primary" 
          onClick={handleComplete}
          className="action-button"
        >
          Continuar
        </Button>
      </div>
    </>
  );

  return (
    <div className="verification-popup-overlay">
      <div className="verification-popup-content">
        {verificationStep === 'capture' && renderCaptureStep()}
        {verificationStep === 'confirm' && renderConfirmStep()}
        {verificationStep === 'verify' && renderVerifyStep()}
        {verificationStep === 'complete' && renderCompleteStep()}
      
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default VerificationPopup;