import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft as ArrowLeftIcon, Shield as ShieldIcon } from 'lucide-react';

const EditCursoPage = () => {
  const navigate = useNavigate();
  const { cursoId } = useParams();

  const handleGoBack = () => {
    // Volver a la página de cursos
    navigate(-1);
  };

  return (
    <div style={{ 
      padding: '20px',
      paddingBottom: '80px' // Espacio para el menú inferior
    }}>
      {/* Cabecera con botón de regreso */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <button
          onClick={handleGoBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(26, 16, 96, 0.1)',
            color: '#1a1060',
            border: 'none',
            cursor: 'pointer',
            marginRight: '15px'
          }}
        >
          <ArrowLeftIcon size={20} />
        </button>
        
        <h2 style={{ 
          margin: 0, 
          fontSize: '22px', 
          color: '#1a1060',
          fontWeight: '600'
        }}>
          Editar Curso
        </h2>
      </div>
      
      {/* Información básica del curso */}
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
          marginBottom: '20px'
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
            <ShieldIcon size={32} color="#1a1060" />
          </div>
          
          <div>
            <h3 style={{
              margin: '0 0 5px',
              fontSize: '20px',
              fontWeight: '600',
              color: '#1a1060'
            }}>
              {cursoId === 'seguridad' ? 'Curso de Seguridad' : 'Curso'}
            </h3>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#666'
            }}>
              {cursoId === 'seguridad' ? 'Seguridad en el trabajo y protocolos' : 'Descripción del curso'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Contenido vacío por ahora */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <p style={{ 
          color: '#888', 
          fontSize: '16px',
          marginBottom: '10px'
        }}>
          La funcionalidad de edición de cursos estará disponible próximamente
        </p>
        
        <div style={{ 
          fontSize: '14px', 
          color: '#666',
          backgroundColor: 'rgba(26, 16, 96, 0.05)',
          padding: '10px 20px',
          borderRadius: '8px',
          marginTop: '10px'
        }}>
          ID del curso: {cursoId}
        </div>
      </div>
    </div>
  );
};

export default EditCursoPage;