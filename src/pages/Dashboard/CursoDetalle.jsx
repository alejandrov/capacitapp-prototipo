import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeaderMain from '../../components/common/PageHeaderMain';
import BottomNavigation from './BottomNavigation';
import './CursoDetalle.css';

export default function CursoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);
  const [activeTab, setActiveTab] = useState('courses');

  useEffect(() => {
    // Simulación de datos del curso
    const cursoData = {
      id: parseInt(id),
      nombre: "Seguridad en el Trabajo",
      descripcion: "Curso fundamental sobre seguridad en el entorno laboral",
      fechaInicio: "15/03/2025",
      fechaFin: "28/03/2025",
      estatus: "en_progreso",
      progreso: 60,
      instructor: "Dr. Juan Pérez",
      duracion: "20 horas",
      modulos: [
        {
          id: 1,
          titulo: "Introducción a la Seguridad Laboral",
          duracion: "2 horas",
          completado: true
        },
        {
          id: 2,
          titulo: "Equipos de Protección Personal",
          duracion: "3 horas",
          completado: true
        },
        {
          id: 3,
          titulo: "Procedimientos de Emergencia",
          duracion: "4 horas",
          completado: false
        },
        {
          id: 4,
          titulo: "Primeros Auxilios",
          duracion: "5 horas",
          completado: false
        },
        {
          id: 5,
          titulo: "Evaluación Final",
          duracion: "1 hora",
          completado: false
        }
      ]
    };
    setCurso(cursoData);
  }, [id]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      navigate('/dashboard/empleado');
    } else if (tab === 'messages') {
      navigate('/dashboard/empleado/messages');
    } else if (tab === 'courses') {
      navigate('/dashboard/empleado/courses');
    }
  };

  const getStatusColor = (estatus) => {
    switch (estatus) {
      case "pendiente":
        return "#FFA000";
      case "en_progreso":
        return "#2196F3";
      case "completado":
        return "#4CAF50";
      default:
        return "#757575";
    }
  };

  const getStatusText = (estatus) => {
    switch (estatus) {
      case "pendiente":
        return "Pendiente";
      case "en_progreso":
        return "En progreso";
      case "completado":
        return "Completado";
      default:
        return estatus;
    }
  };

  if (!curso) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="curso-detalle-container">
      <PageHeaderMain
        title={curso.nombre}
        subtitle="Detalles del curso"
      />

      <div className="curso-detalle-content">
        {/* Información general del curso */}
        <div className="curso-info-section">
          <h3>Información General</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Instructor:</span>
              <span className="info-value">{curso.instructor}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Duración:</span>
              <span className="info-value">{curso.duracion}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Fecha de inicio:</span>
              <span className="info-value">{curso.fechaInicio}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Fecha de fin:</span>
              <span className="info-value">{curso.fechaFin}</span>
            </div>
          </div>
        </div>

        {/* Descripción del curso */}
        <div className="curso-descripcion-section">
          <h3>Descripción</h3>
          <p>{curso.descripcion}</p>
        </div>

        {/* Progreso del curso */}
        <div className="curso-progreso-section">
          <h3>Progreso del Curso</h3>
          <div className="progreso-bar">
            <div 
              className="progreso-fill"
              style={{
                width: `${curso.progreso}%`,
                backgroundColor: getStatusColor(curso.estatus)
              }}
            />
          </div>
          <div className="progreso-text">
            <span>{curso.progreso}% Completado</span>
            <span className="estatus-badge" style={{ backgroundColor: `${getStatusColor(curso.estatus)}20`, color: getStatusColor(curso.estatus) }}>
              {getStatusText(curso.estatus)}
            </span>
          </div>
        </div>

        {/* Módulos del curso */}
        <div className="curso-modulos-section">
          <h3>Módulos del Curso</h3>
          <div className="modulos-list">
            {curso.modulos.map((modulo) => (
              <div key={modulo.id} className="modulo-item">
                <div className="modulo-info">
                  <h4>{modulo.titulo}</h4>
                  <span className="modulo-duracion">{modulo.duracion}</span>
                </div>
                <div className="modulo-status">
                  {modulo.completado ? (
                    <span className="status-completado">Completado</span>
                  ) : (
                    <button className="btn-iniciar">Iniciar Módulo</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
} 