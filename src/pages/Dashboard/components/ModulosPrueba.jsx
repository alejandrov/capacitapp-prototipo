import React from 'react';
import { CheckCircle, Circle, Layers } from 'lucide-react';

const ModulosPrueba = ({ modulos }) => {
  return (
    <div className="section-card">
      <h3 className="section-title">
        <Layers size={20} color="#1a1060" />
        Módulos Completados
      </h3>
      
      <div className="modulos-list">
        {modulos.map((modulo, index) => (
          <div 
            key={index}
            className="modulo-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              borderBottom: index < modulos.length - 1 ? '1px solid #f2f2f2' : 'none',
              backgroundColor: index % 2 === 0 ? '#fafafa' : 'white'
            }}
          >
            <div 
              className="modulo-status"
              style={{ marginRight: '15px' }}
            >
              {modulo.completado ? (
                <CheckCircle size={20} color="#4CAF50" />
              ) : (
                <Circle size={20} color="#999" />
              )}
            </div>
            
            <div className="modulo-content" style={{ flex: 1 }}>
              <div 
                className="modulo-title"
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#333'
                }}
              >
                {modulo.titulo}
              </div>
              
              {modulo.descripcion && (
                <div 
                  className="modulo-description"
                  style={{
                    fontSize: '14px',
                    color: '#666',
                    marginTop: '4px'
                  }}
                >
                  {modulo.descripcion}
                </div>
              )}
            </div>
            
            <div 
              className="modulo-completion-date"
              style={{
                fontSize: '13px',
                color: '#888',
                textAlign: 'right'
              }}
            >
              {modulo.completado ? `${modulo.fechaCompletado}` : 'Pendiente'}
            </div>
          </div>
        ))}
      </div>
      
      <div 
        className="modulos-summary"
        style={{
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ fontSize: '14px', color: '#666' }}>
          Progreso total:
        </div>
        <div style={{ 
          fontSize: '16px', 
          fontWeight: '600', 
          color: '#1a1060' 
        }}>
          {modulos.filter(m => m.completado).length} de {modulos.length} módulos
        </div>
      </div>
    </div>
  );
};

export default ModulosPrueba;