import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeaderMain from "../../components/common/PageHeaderMain";

const SolicitudesPage = () => {
  const navigate = useNavigate();
  const [filtroEstatus, setFiltroEstatus] = useState("todos");

  // Datos de ejemplo para las solicitudes
  const solicitudes = [
    {
      id: 1,
      empleado: "Miguel Villarreal",
      curso: "Seguridad en el Trabajo",
      fecha: "28/03/2025",
      estatus: "pendiente",
      oportunidad: 2
    },
    {
      id: 2,
      empleado: "Laura Torres",
      curso: "Manejo de Químicos",
      fecha: "27/03/2025",
      estatus: "aprobado",
      oportunidad: 1
    },
    {
      id: 3,
      empleado: "Carlos Mendoza",
      curso: "Seguridad en el Trabajo",
      fecha: "25/03/2025",
      estatus: "rechazado",
      oportunidad: 3
    },
    {
      id: 4,
      empleado: "Ana López",
      curso: "Ética y Valores",
      fecha: "24/03/2025",
      estatus: "aprobado",
      oportunidad: 1
    },
    {
      id: 5,
      empleado: "Roberto Gómez",
      curso: "Seguridad en el Trabajo",
      fecha: "23/03/2025",
      estatus: "pendiente",
      oportunidad: 2
    },
    {
      id: 6,
      empleado: "María Rodríguez",
      curso: "Ética y Valores",
      fecha: "22/03/2025",
      estatus: "aprobado",
      oportunidad: 1
    },
  ];

  // Función para obtener el color del estatus
  const getStatusColor = (estatus) => {
    switch (estatus) {
      case "pendiente":
        return "#FFA000"; // Amarillo
      case "aprobado":
        return "#4CAF50"; // Verde
      case "rechazado":
        return "#F44336"; // Rojo
      default:
        return "#757575"; // Gris por defecto
    }
  };

  // Filtrar solicitudes según el estado seleccionado
  const solicitudesFiltradas =
    filtroEstatus === "todos"
      ? solicitudes
      : solicitudes.filter((solicitud) => solicitud.estatus === filtroEstatus);

  const handleViewSolicitud = (id) => {
    navigate(`/dashboard/ejecutivo/solicitudes/${id}`);
  };

  return (
    <div
      style={{
        paddingBottom: "80px", // Espacio para el menú inferior
      }}
    >
      <PageHeaderMain
        title="Solicitudes"
        subtitle="Cursos completados por los empleados"
      />
      <div
        style={{
          padding: "20px",
        }}
      >
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
              Pendiente
            </button>

            <button
              onClick={() => setFiltroEstatus("aprobado")}
              style={{
                backgroundColor:
                  filtroEstatus === "aprobado" ? "#4CAF5020" : "transparent",
                color: filtroEstatus === "aprobado" ? "#4CAF50" : "#666",
                border:
                  filtroEstatus === "aprobado"
                    ? "1px solid #4CAF50"
                    : "1px solid #ddd",
                borderRadius: "20px",
                padding: "5px 12px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Aprobado
            </button>

            <button
              onClick={() => setFiltroEstatus("rechazado")}
              style={{
                backgroundColor:
                  filtroEstatus === "rechazado" ? "#F4433620" : "transparent",
                color: filtroEstatus === "rechazado" ? "#F44336" : "#666",
                border:
                  filtroEstatus === "rechazado"
                    ? "1px solid #F44336"
                    : "1px solid #ddd",
                borderRadius: "20px",
                padding: "5px 12px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Rechazado
            </button>
          </div>
        </div>

        {/* Tabla de solicitudes */}
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
              gridTemplateColumns: "1fr 3fr 2fr 1fr 2fr",
              padding: "15px",
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid #ddd",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            <div>Folio</div>
            <div>Empleado</div>
            <div>Curso</div>
            <div>Oportunidad</div>
            <div>Estatus</div>
          </div>

          {/* Filas de la tabla */}
          {solicitudesFiltradas.length > 0 ? (
            solicitudesFiltradas.map((solicitud) => (
              <div
                key={solicitud.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 3fr 2fr 1fr 2fr",
                  padding: "15px",
                  borderBottom: "1px solid #eee",
                  fontSize: "14px",
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: "500" }}>
                  #{solicitud.id}
                </div>
                
                <div>
                  <button
                    onClick={() => handleViewSolicitud(solicitud.id)}
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
                    {solicitud.empleado}
                  </button>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      marginTop: "4px",
                    }}
                  >
                    {solicitud.fecha}
                  </div>
                </div>

                <div>{solicitud.curso}</div>
                
                <div style={{ textAlign: "center" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor:"#1a1060",
                      color: "white",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "12px",
                      fontWeight: "500"
                    }}
                  >
                    {solicitud.oportunidad}
                  </span>
                </div>

                <div>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "6px 12px",
                      borderRadius: "12px",
                      backgroundColor: `${getStatusColor(solicitud.estatus)}20`, // 20 es opacidad en hex (12.5%)
                      color: getStatusColor(solicitud.estatus),
                      fontWeight: "500",
                      fontSize: "12px",
                      textTransform: "capitalize",
                    }}
                  >
                    {solicitud.estatus}
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
              No hay solicitudes con el estatus seleccionado
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolicitudesPage;