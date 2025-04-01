import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import './IDCameraCapture.css';

const IDCameraCapture = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isIOS, setIsIOS] = useState(false);

  // Detectar iOS al inicio
  useEffect(() => {
    // Detectar si es iOS
    const iosDetected = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iosDetected);
    
    if (iosDetected) {
      console.log("Dispositivo iOS detectado. Usando configuración especial.");
    }
  }, []);

  // Initialize camera when component mounts
  useEffect(() => {
    // Intenta iniciar la cámara
    startCamera();
    
    // Establecer un timeout para mostrar la opción de simulación si tarda demasiado
    const timeoutId = setTimeout(() => {
      if (isInitializing && !cameraActive) {
        console.log("Timeout alcanzado. La cámara no se inició correctamente.");
        setCameraError('No se pudo acceder a la cámara en un tiempo razonable. Puedes usar la simulación para continuar.');
        setIsInitializing(false);
      }
    }, 4000); // 4 segundos de espera máxima
    
    // Limpiar al desmontar
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
      // Configuración especial para iOS
      const constraints = {
        audio: false,
        video: {
          width: { ideal: isIOS ? 640 : 1280 },
          height: { ideal: isIOS ? 480 : 720 },
          facingMode: { ideal: 'environment' } // Usar cámara trasera
        }
      };
      
      console.log('Solicitando acceso a la cámara con restricciones:', JSON.stringify(constraints));
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Stream obtenido correctamente:', stream.id);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Para iOS, necesitamos ser explícitos con el playsinline y autoplay
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.setAttribute('autoplay', 'true');
        
        // También forzar el play() para iOS
        try {
          await videoRef.current.play();
          console.log('Video play() llamado explícitamente');
        } catch (playError) {
          console.error('Error al intentar reproducir video:', playError);
        }
        
        // Importante: Esperar a que el video esté listo
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata cargada: ' + videoRef.current.videoWidth + 'x' + videoRef.current.videoHeight);
          setCameraActive(true);
          setIsInitializing(false);
        };
        
        // Evento adicional para iOS
        videoRef.current.onplaying = () => {
          console.log('Video está reproduciéndose');
          setCameraActive(true);
          setIsInitializing(false);
        };
        
        // Manejar el error si el video no carga correctamente
        videoRef.current.onerror = (err) => {
          console.error('Error al cargar el video:', err);
          setCameraError(`Error al inicializar la cámara: ${err}`);
          setIsInitializing(false);
        };
      } else {
        console.error('videoRef.current es null');
        setCameraError('Referencia del video no disponible');
        setIsInitializing(false);
      }
    } catch (err) {
      console.error('Error accediendo a la cámara:', err);
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
    // Navigate directly to selfie instructions screen, skipping the ID confirmation
    navigate('/selfie-instructions');
  };

 // Función para renderizar un mensaje de "fake camera" en desarrollo
 const handleMockCapture = () => {
  // Crear una imagen simulada (rectángulo de color)
  const canvas = canvasRef.current;
  canvas.width = 640;
  canvas.height = 480;
  const context = canvas.getContext('2d');
  
  // Dibujar fondo (simulando una INE)
  context.fillStyle = '#f0e7d8';
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  // Dibujar un borde
  context.strokeStyle = '#333';
  context.lineWidth = 10;
  context.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);
  
  // Texto simulando INE
  context.fillStyle = '#000';
  context.font = '30px Arial';
  context.fillText('INSTITUTO NACIONAL ELECTORAL', 100, 60);
  context.fillText('CREDENCIAL PARA VOTAR', 150, 100);
  
  // Simular foto con el mismo avatar que se usa en verification complete
  // Dibuja un cuadro gris primero
  context.fillStyle = '#ddd';
  context.fillRect(50, 140, 150, 200);
  
  // Agregar avatar simple
  context.beginPath();
  context.arc(125, 190, 45, 0, 2 * Math.PI); // Cabeza
  context.fillStyle = '#ddd';
  context.fill();
  context.stroke();
  
  context.beginPath();
  context.arc(125, 175, 12, 0, 2 * Math.PI); // Cara superior
  context.fillStyle = '#aaa';
  context.fill();
  
  // Dibujar cuerpo estilizado
  context.beginPath();
  context.moveTo(80, 250);
  context.bezierCurveTo(80, 235, 170, 235, 170, 250);
  context.lineTo(170, 255);
  context.lineTo(80, 255);
  context.closePath();
  context.fillStyle = '#aaa';
  context.fill();
  
  // Simular datos
  context.fillStyle = '#000';
  context.font = '18px Arial';
  context.fillText('NOMBRE: HERNÁNDEZ ROJAS ADAIR ELISEO', 220, 160);
  context.fillText('DOMICILIO: C MORELOS 121', 220, 190);
  context.fillText('CURP: ROOA010504HTSJDA7', 220, 220);
  context.fillText('FECHA DE NACIMIENTO: 04/05/2001', 220, 250);
  
  // Convertir a imagen
  const imageDataURL = canvas.toDataURL('image/jpeg');
  setCapturedImage(imageDataURL);
  setCameraActive(false);
};

  return (
    <div className="id-camera-page">
      <div className="id-camera-container">
        <h1 className="id-camera-title">Captura de INE</h1>
        
        <p className="id-camera-instructions">
          Coloca tu identificación dentro del marco y asegúrate que sea legible.
        </p>
        
        <div className="camera-view-container">
          {!capturedImage ? (
            <>
              {cameraActive ? (
                <div className="camera-frame">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted // Importante añadir muted para autoplay en algunos navegadores
                    className="camera-video"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="id-overlay">
                    <div className="id-guide-text">Coloca tu INE aquí</div>
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
                <img src={capturedImage} alt="ID Capturada" className="captured-image" />
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

export default IDCameraCapture;