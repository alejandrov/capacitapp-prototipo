import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import './SelfieCameraCapture.css';

const SelfieCameraCapture = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize camera when component mounts
  useEffect(() => {
    // En GitHub Pages, podemos tener problemas con la cámara, así que manejamos eso más agresivamente
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    // Intenta iniciar la cámara, pero con un timeout por si hay problemas
    const cameraPromise = startCamera();
    
    // Si estamos en GitHub Pages o en otro entorno que pueda ser problemático,
    // establecemos un timeout para mostrar la opción de simulación si tarda demasiado
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        if (isInitializing && !cameraActive) {
          setCameraError('No se pudo acceder a la cámara en un tiempo razonable. Puedes usar la simulación para continuar.');
          setIsInitializing(false);
        }
      }, 3000); // 3 segundos de espera máxima
    });
    
    // Limpiar al desmontar
    return () => {
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
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user' // Use front camera for selfie
        }
      };
      
      console.log('Solicitando acceso a la cámara para selfie...');
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Importante: Esperar a que el video esté listo
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata cargada correctamente para selfie');
          setCameraActive(true);
          setIsInitializing(false);
        };
        
        // Manejar el error si el video no carga correctamente
        videoRef.current.onerror = (err) => {
          console.error('Error al cargar el video para selfie:', err);
          setCameraError(`Error al inicializar la cámara: ${err}`);
          setIsInitializing(false);
        };
      } else {
        setCameraError('Referencia del video no disponible');
        setIsInitializing(false);
      }
    } catch (err) {
      console.error('Error accediendo a la cámara para selfie:', err);
      setCameraError(`No se pudo acceder a la cámara: ${err.message || 'Error desconocido'}`);
      setCameraActive(false);
      setIsInitializing(false);
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video dimensions
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    
    // Draw current video frame onto the canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas content to data URL (base64 image)
    const imageDataURL = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageDataURL);
    
    // Stop the camera after capturing
    if (video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  const handleRetry = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleContinue = () => {
    // Navigate to the verification complete screen with the captured selfie
    navigate('/verification-complete', { state: { selfieCaptured: true } });
  };

  // Función para renderizar un "fake selfie" en desarrollo o cuando hay problemas con la cámara
  const handleMockCapture = () => {
    // Crear una imagen simulada de un selfie
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
    
    // Convertir a imagen
    const imageDataURL = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageDataURL);
    setCameraActive(false);
  };

  return (
    <div className="selfie-camera-page">
      <div className="selfie-camera-container">
        <h1 className="selfie-camera-title">Captura de Selfie</h1>
        
        <p className="selfie-camera-instructions">
          Coloca tu rostro dentro del marco y asegúrate que esté bien iluminado.
        </p>
        
        <div className="camera-view-container">
          {!capturedImage ? (
            <>
              {cameraActive ? (
                <div className="selfie-camera-frame">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted // Importante añadir muted para autoplay en algunos navegadores
                    className="camera-video"
                  />
                  <div className="face-overlay">
                    <div className="face-guide-text">Coloca tu rostro aquí</div>
                  </div>
                </div>
              ) : (
                <div className="camera-error">
                  {isInitializing ? 'Iniciando cámara...' : (cameraError || 'Error al iniciar la cámara')}
                  
                  {/* Botón para simular captura cuando hay errores o en entornos de desarrollo */}
                  {(!cameraActive && !isInitializing) && (
                    <div style={{ marginTop: '20px' }}>
                      <Button 
                        variant="primary" 
                        onClick={handleMockCapture}
                      >
                        Usar Simulación
                      </Button>
                      <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                        No podemos acceder a tu cámara. Puedes continuar con una simulación para probar la aplicación.
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {cameraActive && (
                <Button 
                  variant="primary" 
                  onClick={captureImage}
                  className="capture-button"
                >
                  Capturar
                </Button>
              )}
            </>
          ) : (
            <>
              <div className="captured-image-container">
                <img src={capturedImage} alt="Selfie Capturada" className="captured-image" />
              </div>
              
              <div className="capture-actions">
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
            </>
          )}
        </div>
        
        {/* Hidden canvas used for capturing the image */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default SelfieCameraCapture;