import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/common/Button';
import './EmailVerification.css';

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "juan.perez@gmail.com"; // Get email from location state or use default
  
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef([]);
  const [isVerifying, setIsVerifying] = useState(false);

  // Focus on first input when component mounts
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Handle input change and auto-advance to next input
  const handleCodeChange = (e, index) => {
    const value = e.target.value;
    
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    // Update the code array
    const newCode = [...verificationCode];
    newCode[index] = value.slice(-1); // Only keep the last digit
    setVerificationCode(newCode);
    
    // Auto advance to next input if a digit was entered
    if (value && index < 5) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle key navigation between inputs
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      setActiveIndex(index - 1);
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Move to previous input on arrow left
      setActiveIndex(index - 1);
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      // Move to next input on arrow right
      setActiveIndex(index + 1);
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle paste event for the entire code
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, 6).split('');
    
    const newCode = [...verificationCode];
    digits.forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit;
      }
    });
    
    setVerificationCode(newCode);
    
    // Focus on the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex(val => !val);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    setActiveIndex(focusIndex);
    inputRefs.current[focusIndex].focus();
  };

  // Handle verification when code is complete
  const handleVerify = () => {
    if (verificationCode.every(digit => digit !== '')) {
      setIsVerifying(true);
      
      // Simulate verification process
      setTimeout(() => {
        setIsVerifying(false);
        
        // CORRECCIÓN: Navigate to ID verification instructions page instead of verification complete
        navigate('/id-verification');
      }, 1500);
    }
  };

  // Check if all digits are filled
  const isCodeComplete = verificationCode.every(digit => digit !== '');

  // Handle resend code
  const handleResendCode = () => {
    // Here you would implement the logic to resend the verification code
    alert('Se ha enviado un nuevo código de verificación.');
  };

  return (
    <div className="verification-page">
      <div className="verification-container">
        <div className="verification-header">
          <h1 className="verification-title">Revisa tu correo</h1>
          <div className="envelope-icon">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="60" height="60" rx="30" fill="#FFB74D" fillOpacity="0.2"/>
              <path d="M40 23H20C18.9 23 18.01 23.9 18.01 25L18 35C18 36.1 18.9 37 20 37H40C41.1 37 42 36.1 42 35V25C42 23.9 41.1 23 40 23ZM40 27L30 31L20 27V25L30 29L40 25V27Z" fill="#FF9800"/>
            </svg>
          </div>
        </div>
        
        <p className="verification-text">
          Hemos enviado un código de verificación a <strong>{email}</strong>, si no logras verlo en tu bandeja de entrada revisa la carpeta de spam.
        </p>
        
        <div className="verification-code-container">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleCodeChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : null}
              className={`verification-input ${activeIndex === index ? 'active' : ''}`}
              autoFocus={index === 0}
            />
          ))}
        </div>
        
        <Button 
          type="button" 
          variant="primary" 
          fullWidth 
          disabled={!isCodeComplete || isVerifying}
          onClick={handleVerify}
          className="verify-button"
        >
          {isVerifying ? 'VERIFICANDO...' : 'VERIFICAR'}
        </Button>
        
        <div className="resend-container">
          <p>No recibiste un código? </p>
          <button onClick={handleResendCode} className="resend-button">
            Reenviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;