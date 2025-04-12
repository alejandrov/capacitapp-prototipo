import React from 'react';
import { 
  Trash2 as TrashIcon, 
  Plus as PlusIcon 
} from 'lucide-react';
import QuestionItem from './QuestionItem';

const TestQuestionsModal = ({ show, onClose, questions, onQuestionsChange }) => {
  if (!show) return null;

  // Agregar nueva pregunta
  const handleAddQuestion = () => {
    const newQuestions = [...questions, {
      question: '',
      options: ['', '', ''],
      correctAnswer: 0
    }];
    
    onQuestionsChange(newQuestions);
  };

  // Eliminar una pregunta
  const handleRemoveQuestion = (index) => {
    if (questions.length <= 1) {
      alert('Debe haber al menos una pregunta en la prueba.');
      return;
    }
    
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    
    onQuestionsChange(newQuestions);
  };

  // Actualizar pregunta
  const handleQuestionUpdate = (index, question) => {
    const newQuestions = [...questions];
    newQuestions[index] = question;
    onQuestionsChange(newQuestions);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        width: '100%',
        maxWidth: '700px',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>
        
        <h2 style={{ 
          marginBottom: '20px', 
          color: '#1a1060',
          fontSize: '20px',
          fontWeight: '600'
        }}>
          Configuración de Preguntas
        </h2>
        
        <div style={{ marginBottom: '20px' }}>
          <p style={{ 
            fontSize: '14px', 
            color: '#666', 
            marginBottom: '20px' 
          }}>
            Configura las preguntas y respuestas de la prueba. Marca la opción correcta para cada pregunta.
          </p>
          
          {questions.map((question, index) => (
            <QuestionItem
              key={index}
              question={question}
              index={index}
              onUpdate={(updatedQuestion) => handleQuestionUpdate(index, updatedQuestion)}
              onDelete={() => handleRemoveQuestion(index)}
              showDeleteButton={questions.length > 1}
            />
          ))}
          
          <button
            type="button"
            onClick={handleAddQuestion}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: 'rgba(26, 16, 96, 0.1)',
              color: '#1a1060',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              width: '100%',
              marginBottom: '20px'
            }}
          >
            <PlusIcon size={18} />
            Agregar Pregunta
          </button>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          gap: '15px'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              backgroundColor: 'white',
              color: '#666',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
          
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#1a1060',
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Guardar Preguntas
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestQuestionsModal;