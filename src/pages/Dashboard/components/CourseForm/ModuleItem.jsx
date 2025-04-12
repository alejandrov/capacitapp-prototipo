import React from 'react';
import { 
  Trash2 as TrashIcon, 
  Plus as PlusIcon 
} from 'lucide-react';

const ModuleItem = ({ module, index, onUpdate, onDelete, onTypeChange, onConfigureTest }) => {
  return (
    <div 
      style={{
        border: '1px solid #eee',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '15px',
        position: 'relative'
      }}
    >
      {/* Botón para eliminar módulo */}
      <button
        type="button"
        onClick={onDelete}
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#F44336',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        title="Eliminar módulo"
      >
        <TrashIcon size={18} />
      </button>
      
      {/* Título del módulo */}
      <div style={{ marginBottom: '15px' }}>
        <label 
          htmlFor={`module-${index}-title`} 
          style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Título del Módulo {index + 1}*
        </label>
        <input 
          type="text" 
          id={`module-${index}-title`}
          value={module.title}
          onChange={(e) => onUpdate('title', e.target.value)}
          placeholder="Ej. Identificación de Riesgos"
          required
          style={{
            width: '100%',
            padding: '10px 15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px'
          }}
        />
      </div>
      
      {/* Descripción del módulo */}
      <div style={{ marginBottom: '15px' }}>
        <label 
          htmlFor={`module-${index}-description`} 
          style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Descripción del Módulo*
        </label>
        <textarea 
          id={`module-${index}-description`}
          value={module.description}
          onChange={(e) => onUpdate('description', e.target.value)}
          placeholder="Ej. Aprenderás a identificar los riesgos existentes en tu área de trabajo."
          required
          style={{
            width: '100%',
            padding: '10px 15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px',
            minHeight: '80px',
            resize: 'vertical'
          }}
        />
      </div>
      
      {/* Selector de tipo de módulo */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Tipo de Módulo
        </label>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <input 
              type="radio" 
              name={`module-${index}-type`} 
              checked={!module.isTest}
              onChange={() => onTypeChange(false)}
              style={{ marginRight: '8px' }}
            />
            <span>Contenido</span>
          </label>
          
          <label style={{ 
            display: 'flex', 
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <input 
              type="radio" 
              name={`module-${index}-type`} 
              checked={module.isTest}
              onChange={() => onTypeChange(true)}
              style={{ marginRight: '8px' }}
            />
            <span>Prueba / Evaluación</span>
          </label>
        </div>
      </div>
      
      {/* URL de media para módulos de contenido */}
      {!module.isTest && (
        <div style={{ marginBottom: '15px' }}>
          <label 
            htmlFor={`module-${index}-media`} 
            style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            URL de Imagen o Video
          </label>
          <input 
            type="text" 
            id={`module-${index}-media`}
            value={module.mediaUrl || ''}
            onChange={(e) => onUpdate('mediaUrl', e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg o https://ejemplo.com/video.mp4"
            style={{
              width: '100%',
              padding: '10px 15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
          <p style={{ 
            margin: '5px 0 0', 
            fontSize: '12px', 
            color: '#888' 
          }}>
            Ingresa la URL completa de la imagen o video que se mostrará en este módulo
          </p>
        </div>
      )}
      
      {/* Botón de configurar prueba para módulos de tipo test */}
      {module.isTest && (
        <div style={{ marginTop: '20px' }}>
          <button
            type="button"
            onClick={onConfigureTest}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: 'rgba(26, 16, 96, 0.1)',
              color: '#1a1060',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            <PlusIcon size={18} />
            Configurar Preguntas
          </button>
        </div>
      )}
    </div>
  );
};

export default ModuleItem;