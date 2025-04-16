import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeaderMain from '../../components/common/PageHeaderMain';
import BottomNavigation from './BottomNavigation';

export default function MisCursosPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses');
  const [filtroEstatus, setFiltroEstatus] = useState('todos');

  // Datos de ejemplo para los cursos
  const cursos = [
    {
      id: 1,
      nombre: "Seguridad en el Trabajo",
      fechaInicio: "15/03/2025",
      fechaFin: "28/03/2025",
      estatus: "completado",
      progreso: 100
    },
    {
      id: 2,
      nombre: "Manejo de Químicos",
      fechaInicio: "10/03/2025",
      fechaFin: "25/03/2025",
      estatus: "en_progreso",
      progreso: 60
    },
    {
      id: 3,
      nombre: "Ética y Valores",
      fechaInicio: "05/03/2025",
      fechaFin: "20/03/2025",
      estatus: "pendiente",
      progreso: 0
    },
    {
      id: 4,
      nombre: "Almacén",
      fechaInicio: "01/03/2025",
      fechaFin: "15/03/2025",
      estatus: "completado",
      progreso: 100
    },
    {
      id: 5,
      nombre: "Psicométrico",
      fechaInicio: "25/02/2025",
      fechaFin: "10/03/2025",
      estatus: "completado",
      progreso: 100
    }
  ];

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

  // Función para obtener el color del estatus
  const getStatusColor = (estatus) => {
    switch (estatus) {
      case "pendiente":
        return "#FFA000"; // Amarillo
      case "en_progreso":
        return "#2196F3"; // Azul
      case "completado":
        return "#4CAF50"; // Verde
      default:
        return "#757575"; // Gris por defecto
    }
  };

  // Función para obtener el texto del estatus
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

  // Filtrar cursos según el estado seleccionado
  const cursosFiltrados =
    filtroEstatus === "todos"
      ? cursos
      : cursos.filter((curso) => curso.estatus === filtroEstatus);

  const handleViewCurso = (id) => {
    navigate(`/dashboard/empleado/courses/${id}`);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <PageHeaderMain
        title="Mis Cursos"
        subtitle="Gestiona tus cursos y capacitaciones"
      />

      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto'
      }}>
        {/* Filtro de estatus */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "15px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              marginBottom: "10px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            Filtrar por:
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <button
              onClick={() => setFiltroEstatus("todos")}
              style={{
                backgroundColor:
                  filtroEstatus === "todos" ? "#1a1060" : "transparent",
                color: filtroEstatus === "todos" ? "white" : "#666",
                border: "none",
                borderRadius: "20px",
                padding: "5px 12px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Todos
            </button>

            <button
              onClick={() => setFiltroEstatus("pendiente")}
              style={{
                backgroundColor:
                  filtroEstatus === "pendiente" ? "#FFA00020" : "transparent",
                color: filtroEstatus === "pendiente" ? "#FFA000" : "#666",
                border:
                  filtroEstatus === "pendiente"
                    ? "1px solid #FFA000"
                    : "1px solid #ddd",
                borderRadius: "20px",
                padding: "5px 12px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Pendientes
            </button>

            <button
              onClick={() => setFiltroEstatus("en_progreso")}
              style={{
                backgroundColor:
                  filtroEstatus === "en_progreso" ? "#2196F320" : "transparent",
                color: filtroEstatus === "en_progreso" ? "#2196F3" : "#666",
                border:
                  filtroEstatus === "en_progreso"
                    ? "1px solid #2196F3"
                    : "1px solid #ddd",
                borderRadius: "20px",
                padding: "5px 12px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              En progreso
            </button>

            <button
              onClick={() => setFiltroEstatus("completado")}
              style={{
                backgroundColor:
                  filtroEstatus === "completado" ? "#4CAF5020" : "transparent",
                color: filtroEstatus === "completado" ? "#4CAF50" : "#666",
                border:
                  filtroEstatus === "completado"
                    ? "1px solid #4CAF50"
                    : "1px solid #ddd",
                borderRadius: "20px",
                padding: "5px 12px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Completados
            </button>
          </div>
        </div>

        {/* Tabla de cursos */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          {/* Encabezado de la tabla */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr 2fr 1fr 1fr",
              padding: "15px",
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid #ddd",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            <div>ID</div>
            <div>Curso</div>
            <div>Fechas</div>
            <div>Progreso</div>
            <div>Estatus</div>
          </div>

          {/* Filas de la tabla */}
          {cursosFiltrados.length > 0 ? (
            cursosFiltrados.map((curso) => (
              <div
                key={curso.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr 2fr 1fr 1fr",
                  padding: "15px",
                  borderBottom: "1px solid #eee",
                  fontSize: "14px",
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: "500" }}>
                  #{curso.id}
                </div>
                
                <div>
                  <button
                    onClick={() => handleViewCurso(curso.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#1a1060",
                      textDecoration: "none",
                      fontWeight: "500",
                      cursor: "pointer",
                      padding: 0,
                      textAlign: "left",
                    }}
                  >
                    {curso.nombre}
                  </button>
                </div>

                <div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Inicio: {curso.fechaInicio}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Fin: {curso.fechaFin}
                  </div>
                </div>
                
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "8px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${curso.progreso}%`,
                        height: "100%",
                        backgroundColor: getStatusColor(curso.estatus),
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  <div style={{ fontSize: "12px", marginTop: "4px" }}>
                    {curso.progreso}%
                  </div>
                </div>

                <div>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "6px 12px",
                      borderRadius: "12px",
                      backgroundColor: `${getStatusColor(curso.estatus)}20`,
                      color: getStatusColor(curso.estatus),
                      fontWeight: "500",
                      fontSize: "12px",
                      textTransform: "capitalize",
                    }}
                  >
                    {getStatusText(curso.estatus)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "30px",
                textAlign: "center",
                color: "#666",
                fontSize: "14px",
              }}
            >
              No hay cursos con el estatus seleccionado
            </div>
          )}
        </div>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
