import React from 'react';
import { ClipboardList, Check, X } from 'lucide-react';

const DesglosePrueba = ({ prueba }) => {
  // Calcular cuántas preguntas acertó
  const preguntasAcertadas = prueba.preguntas.filter(p => p.esCorrecta).length;
  
  return (
    <div className="section-card">
      <h3 className="section-title">
        <ClipboardList size={20} color="#1a1060" />
        Desglose del Examen: {prueba.titulo}
      </h3>
      
      <div className="preguntas-list">
        {prueba.preguntas.map((pregunta) => (
          <div key={pregunta.id} className="pregunta-item">
            <div className="pregunta-text">
              {pregunta.id}. {pregunta.pregunta}
            </div>

            <div className={`respuesta-usuario ${pregunta.esCorrecta ? 'respuesta-correcta' : 'respuesta-incorrecta'}`}>
              <div className="respuesta-icon">
                {pregunta.esCorrecta ? (
                  <Check size={18} color="#4CAF50" />
                ) : (
                  <X size={18} color="#F44336" />
                )}
              </div>
              <div className="respuesta-texto">
                {pregunta.respuestaUsuario}
              </div>
            </div>
            
            {!pregunta.esCorrecta && (
              <div style={{ marginTop: '10px', fontSize: '14px', color: '#333' }}>
                <strong>Respuesta correcta:</strong> {pregunta.opciones[1] /* Esto es una simplificación, deberías usar el índice correcto */}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="aciertos-container">
        <div className="aciertos-label">
          Porcentaje de aciertos:
        </div>
        <div className="aciertos-value">
          {prueba.porcentajeAciertos}% ({preguntasAcertadas} de {prueba.preguntas.length})
        </div>
      </div>
    </div>
  );
};

export default DesglosePrueba;