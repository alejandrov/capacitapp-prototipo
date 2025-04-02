import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * Componente de cabecera para páginas con título y botón de regreso
 * Ajustado para que coincida con el diseño mostrado en las imágenes
 */
const PageHeader = ({ 
  title, 
  onBack, 
  backUrl,
  rightElement,
  className = '' 
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`${className}`} style={{ marginBottom: '20px', }}>
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <div 
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#f1f0f6',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '12px'
          }}
        >
          <button
            onClick={handleGoBack}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1a1060'
            }}
            aria-label="Regresar"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        <h2 style={{ 
          fontSize: '20px', 
          margin: 0, 
          fontWeight: '600',
          color: '#1a1060'
        }}>
          {title}
        </h2>
      </div>

      {rightElement && (
        <div style={{ float: 'right' }}>
          {rightElement}
        </div>
      )}
    </div>
  );
};

export default PageHeader;