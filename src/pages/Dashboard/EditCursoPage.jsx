import React from 'react';
import { useParams } from 'react-router-dom';
import { Shield as ShieldIcon } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

const EditCursoPage = () => {
  const { cursoId } = useParams();

  return (
    <div style={{ 
      padding: '20px',
      paddingBottom: '80px' // Espacio para el menú inferior
    }}>
      {/* Usando el nuevo componente PageHeader */}
      <PageHeader title="Editar Curso" />
      
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