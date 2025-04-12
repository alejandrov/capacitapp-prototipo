import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import VerificationPopup from './VerificationPopup';
import './ComplementaryTestModule.css';
import PageHeaderSecondary from '../../components/common/PageHeaderSecondary';

const ComplementaryTestModule = () => {
  const navigate = useNavigate();
  const [isModuleCompleted, setIsModuleCompleted] = useState(false);
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: ''
  });
  const [isAllAnswered, setIsAllAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [isIdentityVerified, setIsIdentityVerified] = useState(false);
  // Nuevo estado para seguir si ya se ha hecho la verificación intermedia
  const [midwayVerificationDone, setMidwayVerificationDone] = useState(false);
  // Estado para rastrear si debemos mostrar la verificación al finalizar o en intermedio
  const [isIntermediateVerification, setIsIntermediateVerification] = useState(false);

  // Verificar si el módulo ya está completado al cargar
  useEffect(() => {
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    setIsModuleCompleted(completedModules.includes('test'));
  }, []);

  // Verificar si todas las preguntas están respondidas
  useEffect(() => {
    const allAnswered = Object.values(answers).every(answer => answer !== '');
    setIsAllAnswered(allAnswered);
  }, [answers]);

  // Efecto para verificar si se han respondido 3 preguntas
  useEffect(() => {
    const answeredCount = Object.values(answers).filter(answer => answer !== '').length;
    
    // Si han respondido exactamente 3 preguntas y aún no se ha hecho la verificación intermedia
    if (answeredCount === 3 && !midwayVerificationDone && !isIdentityVerified) {
      setIsIntermediateVerification(true);
      setShowVerificationPopup(true);
    }
  }, [answers, midwayVerificationDone, isIdentityVerified]);

  // Función para manejar la selección de respuestas
  const handleAnswerSelection = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Función para regresar al curso sin marcar como completado
  const handleBackToCourse = () => {
    navigate('/courses/safety');
  };

  // Función para calcular la puntuación (correctas / total * 100)
  const calculateScore = () => {
    // Respuestas correctas (para este ejemplo)
    const correctAnswers = {
      q1: 'a',
      q2: 'c',
      q3: 'b',
      q4: 'a',
      q5: 'b'
    };

    let correctCount = 0;
    for (const [question, answer] of Object.entries(answers)) {
      if (answer === correctAnswers[question]) {
        correctCount++;
      }
    }

    return (correctCount / 5) * 100;
  };

  // Función para iniciar el proceso de verificación de identidad 
  const handleStartVerification = () => {
    // Mostrar el popup de verificación (será verificación final)
    setIsIntermediateVerification(false);
    setShowVerificationPopup(true);
  };

  // Función para manejar cuando se completa la verificación
  const handleVerificationComplete = (success) => {
    setShowVerificationPopup(false);
    
    if (success) {
      if (isIntermediateVerification) {
        // Si era la verificación intermedia, marcamos que se ha completado
        setMidwayVerificationDone(true);
        setIsIntermediateVerification(false);
        
        // Mensaje temporal para verificación intermedia
        const verificationMessage = document.createElement('div');
        verificationMessage.className = 'verification-success-message';
        verificationMessage.textContent = '¡Verificación intermedia exitosa! Puedes continuar con el examen.';
        document.body.appendChild(verificationMessage);
        
        setTimeout(() => {
          verificationMessage.classList.add('show');
        }, 100);
        
        setTimeout(() => {
          verificationMessage.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(verificationMessage);
          }, 500);
        }, 3000);
      } else {
        // Verificación final exitosa
        setIsIdentityVerified(true);
        
        // Mostrar un mensaje efímero para indicar que la verificación fue exitosa
        const verificationMessage = document.createElement('div');
        verificationMessage.className = 'verification-success-message';
        verificationMessage.textContent = '¡Identidad verificada! Ahora puedes terminar la prueba.';
        document.body.appendChild(verificationMessage);
        
        setTimeout(() => {
          verificationMessage.classList.add('show');
        }, 100);
        
        setTimeout(() => {
          verificationMessage.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(verificationMessage);
          }, 500);
        }, 3000);
      }
    }
  };

  // Función para manejar la finalización del examen
  const handleFinishTest = () => {
    // Solo si se ha verificado la identidad al final
    if (isIdentityVerified) {
      const testScore = calculateScore();
      setScore(testScore);
      setShowResults(true);

      // Marcar el módulo como completado SOLO si ha obtenido el 100%
      if (testScore === 100) {
        const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
        if (!completedModules.includes('test')) {
          completedModules.push('test');
          localStorage.setItem('completedModules', JSON.stringify(completedModules));
        }
        setIsModuleCompleted(true);
      }
    } else {
      // Si intenta terminar sin verificar, inicia el proceso de verificación final
      handleStartVerification();
    }
  };

  // Función para reiniciar el examen
  const handleResetTest = () => {
    setAnswers({
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      q5: ''
    });
    setShowResults(false);
    setIsIdentityVerified(false); // Restablecer el estado de verificación de identidad
    setMidwayVerificationDone(false); // Restablecer la verificación intermedia
    
    // No es necesario borrar del localStorage ya que el módulo no se marcó como completado
    // al no haber aprobado la prueba
  };

  return (
    <div className="test-module-page">
       <div style={{ padding: '20px 20px' }}>
        {/* Usando el componente PageHeaderSecondary (antes PageHeader) */}
        <PageHeaderSecondary 
          title="Prueba complementaria" 
          onBack={handleBackToCourse}
        />
      </div>
      
      <div className="test-module-content">
        {showResults ? (
          <div className="test-results">
            <div className="results-header">
              <h2>Resultados de la Prueba</h2>
              {score >= 70 ? (
                <div className="result-icon success">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="40" fill="#4CAF50" fillOpacity="0.1"/>
                    <circle cx="40" cy="40" r="32" fill="#4CAF50"/>
                    <path d="M30 40L36 46L50 32" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ) : (
                <div className="result-icon failure">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="40" fill="#F44336" fillOpacity="0.1"/>
                    <circle cx="40" cy="40" r="32" fill="#F44336"/>
                    <path d="M32 32L48 48M32 48L48 32" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
            
            <p className="results-feedback">
              {score === 100 
                ? "¡Felicidades! Has completado la prueba complementaria con éxito." 
                : "No has aprobado la prueba. Debes responder correctamente todas las preguntas."}
            </p>
            
            <div className="test-actions">
             
              
              <Button 
                variant="primary"
                onClick={handleBackToCourse}
                className="continue-button"
              >
                Regresar al Curso
              </Button>
            </div>
          </div>
        ) : (
          <div className="test-questions">
            <p className="test-instructions" style={{ marginTop: '-30px' }}>
              Selecciona la respuesta correcta para cada pregunta. Necesitas responder todas las preguntas para enviar el examen.
            </p>
            
            {/* Pregunta 1 */}
            <div className="question-card">
              <h3>1. ¿Cuál es la primera acción que debes tomar al identificar un riesgo en el área de trabajo?</h3>
              <div className="answer-options">
                <label className={`answer-option ${answers.q1 === 'a' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="q1" 
                    value="a" 
                    checked={answers.q1 === 'a'} 
                    onChange={() => handleAnswerSelection('q1', 'a')} 
                  />
                  <span className="option-text">a) Reportarlo inmediatamente al supervisor de seguridad</span>
                </label>
                
                <label className={`answer-option ${answers.q1 === 'b' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="q1" 
                    value="b" 
                    checked={answers.q1 === 'b'} 
                    onChange={() => handleAnswerSelection('q1', 'b')} 
                  />
                  <span className="option-text">b) Intentar solucionarlo por tu cuenta</span>
                </label>
                
                <label className={`answer-option ${answers.q1 === 'c' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="q1" 
                    value="c" 
                    checked={answers.q1 === 'c'} 
                    onChange={() => handleAnswerSelection('q1', 'c')} 
                  />
                  <span className="option-text">c) Continuar trabajando pero con más precaución</span>
                </label>
              </div>
            </div>
            
            {/* Pregunta 2 */}
            <div className="question-card">
              <h3>2. El equipo de protección personal (EPP) debe utilizarse:</h3>
              <div className="answer-options">
                <label className={`answer-option ${answers.q2 === 'a' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="q2" 
                    value="a" 
                    checked={answers.q2 === 'a'} 
                    onChange={() => handleAnswerSelection('q2', 'a')} 
                  />
                  <span className="option-text">a) Solo cuando el supervisor lo indique</span>
                </label>
                
                <label className={`answer-option ${answers.q2 === 'b' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="q2" 
                    value="b" 
                    checked={answers.q2 === 'b'} 
                    onChange={() => handleAnswerSelection('q2', 'b')} 
                  />
                  <span className="option-text">b) Cuando el trabajador considere que hay riesgo</span>
                </label>
                
                <label className={`answer-option ${answers.q2 === 'c' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="q2" 
                    value="c" 
                    checked={answers.q2 === 'c'} 
                    onChange={() => handleAnswerSelection('q2', 'c')} 
                  />
                  <span className="option-text">c) Siempre que se realicen trabajos con posibles riesgos, según los protocolos establecidos</span>
                </label>
              </div>
            </div>
            
            {/* Pregunta 3 */}
            <div className="question-card">
              <h3>3. En caso de un incendio en el área de trabajo, ¿cuál es la prioridad?</h3>
              <div className="answer-options">
                <label className={`answer-option ${answers.q3 === 'a' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="q3" 
                    value="a" 
                    checked={answers.q3 === 'a'} 
                    onChange={() => handleAnswerSelection('q3', 'a')} 
                  />
                  <span className="option-text">a) Salvar los equipos y materiales importantes</span>
                </label>
                
                <label className={`answer-option ${answers.q3 === 'b' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="q3" 
                    value="b" 
                    checked={answers.q3 === 'b'} 
                    onChange={() => handleAnswerSelection('q3', 'b')} 
                  />
                  <span className="option-text">b) Garantizar la evacuación segura del personal</span>
                </label>
                
                <label className={`answer-option ${answers.q3 === 'c' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="q3" 
                    value="c" 
                    checked={answers.q3 === 'c'} 
                    onChange={() => handleAnswerSelection('q3', 'c')} 
                  />
                  <span className="option-text">c) Intentar apagar el fuego con los medios disponibles</span>
                </label>
              </div>
            </div>
            
            {/* Pregunta 4 */}
            <div className="question-card">
              <h3>4. ¿Cuál es el propósito principal de las señalizaciones de seguridad en el área de trabajo?</h3>
              <div className="answer-options">
                <label className={`answer-option ${answers.q4 === 'a' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="q4" 
                    value="a" 
                    checked={answers.q4 === 'a'} 
                    onChange={() => handleAnswerSelection('q4', 'a')} 
                  />
                  <span className="option-text">a) Informar sobre riesgos potenciales y medidas preventivas</span>
                </label>
                
                <label className={`answer-option ${answers.q4 === 'b' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="q4" 
                    value="b" 
                    checked={answers.q4 === 'b'} 
                    onChange={() => handleAnswerSelection('q4', 'b')} 
                  />
                  <span className="option-text">b) Cumplir con los requisitos legales de la empresa</span>
                </label>
                
                <label className={`answer-option ${answers.q4 === 'c' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="q4" 
                    value="c" 
                    checked={answers.q4 === 'c'} 
                    onChange={() => handleAnswerSelection('q4', 'c')} 
                  />
                  <span className="option-text">c) Decorar el espacio de trabajo</span>
                </label>
              </div>
            </div>
            
            {/* Pregunta 5 */}
            <div className="question-card">
              <h3>5. Al trabajar con sustancias químicas peligrosas, es obligatorio:</h3>
              <div className="answer-options">
                <label className={`answer-option ${answers.q5 === 'a' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="q5" 
                    value="a" 
                    checked={answers.q5 === 'a'} 
                    onChange={() => handleAnswerSelection('q5', 'a')} 
                  />
                  <span className="option-text">a) Utilizar solo guantes como protección</span>
                </label>
                
                <label className={`answer-option ${answers.q5 === 'b' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="q5" 
                    value="b" 
                    checked={answers.q5 === 'b'} 
                    onChange={() => handleAnswerSelection('q5', 'b')} 
                  />
                  <span className="option-text">b) Conocer las hojas de seguridad y utilizar el EPP adecuado</span>
                </label>
                
                <label className={`answer-option ${answers.q5 === 'c' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="q5" 
                    value="c" 
                    checked={answers.q5 === 'c'} 
                    onChange={() => handleAnswerSelection('q5', 'c')} 
                  />
                  <span className="option-text">c) Trabajar en áreas con poca ventilación para evitar la dispersión</span>
                </label>
              </div>
            </div>
            
            <div className="test-actions">
              <Button 
                variant="primary"
                onClick={!isIdentityVerified ? handleStartVerification : handleFinishTest}
                disabled={!isAllAnswered}
                className="finish-button"
              >
                Terminar Prueba
              </Button>
            </div>
            
            {/* Estado de verificación */}
            {(isIdentityVerified || midwayVerificationDone) && (
              <div className="verification-status" style={{ marginTop: '20px', textAlign: 'center' }}>
                <div className="verification-badge" style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center',
                  padding: '8px 16px',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  borderRadius: '20px',
                  color: '#4CAF50'
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                    <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM6.4 12L2.4 8L3.8 6.6L6.4 9.2L12.2 3.4L13.6 4.8L6.4 12Z" fill="#4CAF50"/>
                  </svg>
                  <span>
                    {isIdentityVerified 
                      ? "Identidad verificada completamente" 
                      : "Verificación intermedia completada"}
                  </span>
                </div>
              </div>
            )}
            
            {/* Popup de verificación de identidad */}
            {showVerificationPopup && (
              <VerificationPopup 
                onClose={() => setShowVerificationPopup(false)}
                onVerificationComplete={handleVerificationComplete}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplementaryTestModule;