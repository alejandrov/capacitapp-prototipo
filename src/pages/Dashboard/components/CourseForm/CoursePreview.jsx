import React from 'react';
import { 
  Book as BookIcon,
  Shield as ShieldIcon,
  Box as BoxIcon,
  Flag as FlagIcon,
  Cpu as CpuIcon,
  Beaker as BeakerIcon
} from 'lucide-react';

const CoursePreview = ({ title, description, icon }) => {
  // Renderiza el ícono correspondiente según la selección
  const renderIcon = () => {
    switch (icon) {
      case 'shield': return <ShieldIcon size={32} color="#1a1060" />;
      case 'box': return <BoxIcon size={32} color="#1a1060" />;
      case 'flag': return <FlagIcon size={32} color="#1a1060" />;
      case 'cpu': return <CpuIcon size={32} color="#1a1060" />;
      case 'beaker': return <BeakerIcon size={32} color="#1a1060" />;
      default: return <BookIcon size={32} color="#1a1060" />;
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '12px',
          backgroundColor: 'rgba(26, 16, 96, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {renderIcon()}
        </div>
        
        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: '0 0 5px',
            fontSize: '20px',
            fontWeight: '600',
            color: '#1a1060'
          }}>
            {title || 'Nuevo Curso'}
          </h3>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: '#666'
          }}>
            {description || 'Ingrese la descripción del curso'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;