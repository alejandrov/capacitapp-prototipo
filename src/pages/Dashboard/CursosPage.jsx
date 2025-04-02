import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield as ShieldIcon,
  Edit as EditIcon,
  Plus as PlusIcon,
  Box,
  Flag,
  Cpu,
  Beaker,
} from "lucide-react";
import PageHeaderMain from "../../components/common/PageHeaderMain";

const CursosPage = () => {
  const navigate = useNavigate();

  // Lista de cursos disponibles
  const cursos = [
    {
      id: "seguridad",
      title: "Seguridad",
      description: "Curso de seguridad en el trabajo",
      icon: <ShieldIcon size={24} color="#1a1060" />,
      modules: 4,
      editable: true,
      route: "/dashboard/ejecutivo/edit-curso/seguridad",
    },
    {
      id: "almacen",
      title: "Almacén",
      description: "Control de inventario y almacenamiento",
      icon: <Box size={24} color="#1a1060" />,
      modules: 3,
      editable: false,
      route: null,
    },
    {
      id: "etica",
      title: "Ética y Valores",
      description: "Principios corporativos y conducta ética",
      icon: <Flag size={24} color="#1a1060" />,
      modules: 5,
      editable: false,
      route: null,
    },
    {
      id: "psicometrico",
      title: "Psicométrico",
      description: "Evaluación psicológica para personal",
      icon: <Cpu size={24} color="#1a1060" />,
      modules: 2,
      editable: false,
      route: null,
    },
    {
      id: "quimicos",
      title: "Manejo de Químicos",
      description: "Seguridad industrial con materiales químicos",
      icon: <Beaker size={24} color="#1a1060" />,
      modules: 6,
      editable: false,
      route: null,
    },
  ];

  const handleEditCurso = (route) => {
    navigate(route);
  };
  
  const handleAddCurso = () => {
    navigate('/dashboard/ejecutivo/add-curso');
  };

  return (
    <div
      style={{
        paddingBottom: "80px", // Espacio para el menú inferior
      }}
    >
      <PageHeaderMain
        title="Gestión de cursos"
        subtitle="Administra los cursos disponibles"
      />
      <div
        style={{
          padding: "20px",
        }}
      >
        {/* Header con botón de agregar curso (AHORA HABILITADO) */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={handleAddCurso}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: "#1a1060",
              color: "white",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              border: "none",
              cursor: "pointer",
            }}
          >
            <PlusIcon size={16} />
            Agregar Curso
          </button>
        </div>

        {/* Lista de cursos */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {cursos.map((curso) => (
            <div
              key={curso.id}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(26, 16, 96, 0.1)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {curso.icon}
                </div>

                <div>
                  <h3
                    style={{
                      margin: "0 0 5px",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1a1060",
                    }}
                  >
                    {curso.title}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 5px",
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    {curso.description}
                  </p>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                    }}
                  >
                    {curso.modules} módulos
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  curso.editable ? handleEditCurso(curso.route) : null
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  backgroundColor: curso.editable
                    ? "rgba(26, 16, 96, 0.1)"
                    : "#f5f5f5",
                  color: curso.editable ? "#1a1060" : "#999",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  border: "none",
                  cursor: curso.editable ? "pointer" : "not-allowed",
                }}
              >
                <EditIcon size={16} />
                Editar
              </button>
            </div>
          ))}
        </div>

        {/* Mensaje cuando no hay cursos */}
        {cursos.length === 0 && (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <p style={{ color: "#888", fontSize: "16px" }}>
              No hay cursos disponibles
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CursosPage;