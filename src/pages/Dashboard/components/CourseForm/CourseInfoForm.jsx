import React from 'react';
import { 
  Book as BookIcon,
  Shield as ShieldIcon,
  Box as BoxIcon,
  Flag as FlagIcon,
  Cpu as CpuIcon,
  Beaker as BeakerIcon
} from 'lucide-react';

const CourseInfoForm = ({ 
  formData, 
  selectedIcon, 
  requiresValidation, 
  onInputChange, 
  onCheckboxChange, 
  onIconSelect 
}) => {
  // Componente para seleccionar íconos
  const IconSelector = () => {
    const icons = [
      { name: 'book', component: <BookIcon size={32} color="#1a1060" /> },
      { name: 'shield', component: <ShieldIcon size={32} color="#1a1060" /> },
      { name: 'box', component: <BoxIcon size={32} color="#1a1060" /> },
      { name: 'flag', component: <FlagIcon size={32} color="#1a1060" /> },
      { name: 'cpu', component: <CpuIcon size={32} color="#1a1060" /> },
      { name: 'beaker', component: <BeakerIcon size={32} color="#1a1060" /> },
    ];
    
    return (
      <div style={{ marginBottom: '20px' }}>
        <label 
          htmlFor="icon-selector" 
          style={{ 
            display: 'block', 
            marginBottom: '10px', 
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Ícono del Curso
        </label>
        <div style={{ 
          display: 'flex', 
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          {icons.map((icon) => (
            <div 
              key={icon.name}
              onClick={() => onIconSelect(icon.name)}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                backgroundColor: selectedIcon === icon.name ? 'rgba(26, 16, 96, 0.2)' : 'rgba(26, 16, 96, 0.05)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                border: selectedIcon === icon.name ? '2px solid #1a1060' : '2px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              {icon.component}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ marginBottom: '30px' }}>
      <h3 style={{ 
        fontSize: '18px', 
        color: '#1a1060', 
        marginBottom: '20px',
        fontWeight: '600' 
      }}>
        Información General
      </h3>
      
      {/* Selector de ícono */}
      <IconSelector />
      
      {/* Checkbox de Requiere validación */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'flex', 
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none'
        }}>
          <input 
            type="checkbox" 
            name="requiresValidation"
            checked={requiresValidation}
            onChange={onCheckboxChange}
            style={{ 
              marginRight: '10px',
              width: '18px',
              height: '18px',
              accentColor: '#1a1060'
            }}
          />
          <span style={{ 
            fontSize: '15px',
            fontWeight: '500'
          }}>
            Requiere validación
          </span>
        </label>
       
      </div>
      
      {/* Título del curso */}
      <div style={{ marginBottom: '15px' }}>
        <label 
          htmlFor="title" 
          style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Título del Curso*
        </label>
        <input 
          type="text" 
          id="title"
          name="title"
          value={formData.title}
          onChange={onInputChange}
          placeholder="Ej. Curso de Seguridad Industrial"
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
      
      {/* Descripción del curso */}
      <div style={{ marginBottom: '15px' }}>
        <label 
          htmlFor="description" 
          style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Descripción Breve*
        </label>
        <input 
          type="text" 
          id="description"
          name="description"
          value={formData.description}
          onChange={onInputChange}
          placeholder="Ej. Aprenda los protocolos de seguridad en el trabajo"
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
      
      {/* Descripción de módulos */}
      <div style={{ marginBottom: '15px' }}>
        <label 
          htmlFor="moduleDescription" 
          style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Descripción de los Módulos
        </label>
        <textarea 
          id="moduleDescription"
          name="moduleDescription"
          value={formData.moduleDescription}
          onChange={onInputChange}
          placeholder="Ej. Al tomar esta evaluación, los integrantes aprenderán:"
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
    </div>
  );
};

export default CourseInfoForm;