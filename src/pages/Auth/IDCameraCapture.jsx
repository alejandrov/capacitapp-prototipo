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

  // Initialize camera when component mounts
  useEffect(() => {
    startCamera();
    return () => {
      // Clean up by stopping all media tracks when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: { ideal: 'environment' } // Use back camera on mobile devices if available
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setCameraError(null);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setCameraError(`No se pudo acceder a la cámara: ${err.message}`);
      setCameraActive(false);
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
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
    // Navigate to ID confirmation screen with the captured image
    navigate('/id-confirmation', { state: { capturedImage } });
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
                    className="camera-video"
                  />
                  <div className="id-overlay">
                    <div className="id-guide-text">Coloca tu INE aquí</div>
                  </div>
                </div>
              ) : (
                <div className="camera-error">
                  {cameraError || 'Iniciando cámara...'}
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