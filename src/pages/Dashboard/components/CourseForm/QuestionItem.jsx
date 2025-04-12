import React from 'react';
import { 
  Trash2 as TrashIcon, 
  Plus as PlusIcon 
} from 'lucide-react';

const QuestionItem = ({ question, index, onUpdate, onDelete, showDeleteButton }) => {
  // Actualizar contenido de la pregunta
  const handleQuestionTextChange = (e) => {
    const updatedQuestion = {
      ...question,
      question: e.target.value
    };
    onUpdate(updatedQuestion);
  };

  // Actualizar una opción de respuesta
  const handleOptionChange = (optionIndex, value) => {
    const updatedOptions = [...question.options];
    updatedOptions[optionIndex] = value;
    
    const updatedQuestion = {
      ...question,
      options: updatedOptions
    };
    onUpdate(updatedQuestion);
  };

  // Establecer respuesta correcta
  const handleCorrectAnswerChange = (optionIndex) => {
    const updatedQuestion = {
      ...question,
      correctAnswer: optionIndex
    };
    onUpdate(updatedQuestion);
  };

  // Agregar una nueva opción
  const handleAddOption = () => {
    const updatedOptions = [...question.options, ''];
    
    const updatedQuestion = {
      ...question,
      options: updatedOptions
    };
    onUpdate(updatedQuestion);
  };

  // Eliminar una opción
  const handleRemoveOption = (optionIndex) => {
    if (question.options.length <= 2) {
      alert('Debe haber al menos dos opciones de respuesta.');
      return;
    }
    
    const updatedOptions = [...question.options];
    updatedOptions.splice(optionIndex, 1);
    
    // Ajustar el índice de la respuesta correcta si es necesario
    let updatedCorrectAnswer = question.correctAnswer;
    if (updatedCorrectAnswer === optionIndex) {
      updatedCorrectAnswer = 0; // Si se eliminó la opción correcta, establecer la primera como correcta
    } else if (updatedCorrectAnswer > optionIndex) {
      updatedCorrectAnswer--; // Ajustar el índice si es mayor que el de la opción eliminada
    }
    
    const updatedQuestion = {
      ...question,
      options: updatedOptions,
      correctAnswer: updatedCorrectAnswer
    };
    onUpdate(updatedQuestion);
  };

  return (
    <div 
      style={{
        border: '1px solid #eee',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        position: 'relative'
      }}
    >
      {showDeleteButton && (
        <button
          type="button"
          onClick={onDelete}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#F44336'
          }}
        >
          <TrashIcon size={16} />
        </button>
      )}
      
      {/* Texto de la pregunta */}
      <div style={{ marginBottom: '15px' }}>
        <label 
          htmlFor={`question-${index}`} 
          style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Pregunta {index + 1}*
        </label>
        <textarea 
          id={`question-${index}`}
          value={question.question}
          onChange={handleQuestionTextChange}
          placeholder="Escriba la pregunta aquí..."
          required
          style={{
            width: '100%',
            padding: '10px 15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px',
            minHeight: '60px',
            resize: 'vertical'
          }}
        />
      </div>
      
      {/* Opciones de respuesta */}
      <div style={{ marginBottom: '10px' }}>
        <p style={{ 
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '10px'
        }}>
          Opciones de respuesta:
        </p>
        
        {question.options.map((option, optionIndex) => (
          <div 
            key={optionIndex}
            style={{
              display: 'flex',
              marginBottom: '10px',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <input 
              type="radio"
              id={`question-${index}-option-${optionIndex}`}
              name={`question-${index}-correct`}
              checked={optionIndex === question.correctAnswer}
              onChange={() => handleCorrectAnswerChange(optionIndex)}
              style={{ marginRight: '10px' }}
            />
            <div style={{ flex: 1 }}>
              <input 
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                placeholder={`Opción ${optionIndex + 1}`}
                required
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            {question.options.length > 2 && (
              <button
                type="button"
                onClick={() => handleRemoveOption(optionIndex)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#F44336',
                  cursor: 'pointer',
                  marginLeft: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <TrashIcon size={16} />
              </button>
            )}
          </div>
        ))}
        
        {/* Botón para agregar nueva opción */}
        <button
          type="button"
          onClick={handleAddOption}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 15px',
            border: '1px dashed #1a1060',
            borderRadius: '6px',
            backgroundColor: 'transparent',
            color: '#1a1060',
            fontSize: '13px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          <PlusIcon size={16} />
          Agregar Opción
        </button>
      </div>
    </div>
  );
};

export default QuestionItem;