import React, { useState, useEffect } from "react";
import { 
  UserCheck as UserCheckIcon, 
  UserX as UserXIcon,
  Plus as PlusIcon,
  Search as SearchIcon,
  Filter as FilterIcon
} from "lucide-react";
import PageHeaderMain from "../../components/common/PageHeaderMain";

const PadronPage = () => {
  // Estado para los CURPs existentes y el formulario
  const [curps, setCurps] = useState([]);
  const [formCurps, setFormCurps] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Estados para filtros y búsqueda
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [curpsFiltrados, setCurpsFiltrados] = useState([]);

  // Cargar CURPs al montar el componente
  useEffect(() => {
    // Simulamos cargar datos de localStorage o usamos datos de ejemplo
    const storedCurps = localStorage.getItem("padronCurps");
    
    if (storedCurps) {
      setCurps(JSON.parse(storedCurps));
    } else {
      // CURPs de ejemplo con diferentes estados
      const exampleCurps = [
        { curp: "MELM8305281HDFNNS09", registrado: true },
        { curp: "PERC971212MDFRZR08", registrado: false },
        { curp: "GORJ850624HCHMVN04", registrado: true },
        { curp: "SAHS901122MDFLRR01", registrado: false },
        { curp: "OELB810702HDFRPR03", registrado: false },
        { curp: "HERF650327MDFRYL09", registrado: true },
        { curp: "MAAA880814HCHRLN09", registrado: false },
        { curp: "TOGL720621MDFRRR02", registrado: false },
        { curp: "LUFA001115HQTRRL01", registrado: false },
        { curp: "ROOA010504HTSJDA7", registrado: false },
      ];
      
      setCurps(exampleCurps);
      localStorage.setItem("padronCurps", JSON.stringify(exampleCurps));
    }
  }, []);

  // Efecto para filtrar los CURPs cuando cambian los filtros o la búsqueda
  useEffect(() => {
    // Aplicar filtros
    let resultado = [...curps];
    
    // Filtrar por estado
    if (filtroEstado === "registrados") {
      resultado = resultado.filter(item => item.registrado);
    } else if (filtroEstado === "pendientes") {
      resultado = resultado.filter(item => !item.registrado);
    }
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      const termino = searchTerm.toLowerCase();
      resultado = resultado.filter(item => 
        item.curp.toLowerCase().includes(termino)
      );
    }
    
    setCurpsFiltrados(resultado);
  }, [curps, filtroEstado, searchTerm]);

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dividir por comas y limpiar espacios en blanco
    const newCurpsArray = formCurps
      .split(',')
      .map(curp => curp.trim())
      .filter(curp => curp.length > 0);
    
    if (newCurpsArray.length === 0) return;
    
    // Crear objetos CURP y añadirlos al estado
    const newCurpsObjects = newCurpsArray.map(curp => ({
      curp: curp,
      registrado: false
    }));
    
    // Actualizar el estado y localStorage
    const updatedCurps = [...curps, ...newCurpsObjects];
    setCurps(updatedCurps);
    localStorage.setItem("padronCurps", JSON.stringify(updatedCurps));
    
    // Limpiar el formulario y mostrar mensaje de éxito
    setFormCurps("");
    setShowSuccessMessage(true);
    
    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // Manejar cambios en el campo de texto
  const handleInputChange = (e) => {
    setFormCurps(e.target.value);
  };

  // Manejar la búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Manejar cambio de filtro de estado
  const handleFiltroEstadoChange = (estado) => {
    setFiltroEstado(estado);
  };

  // Alternar el estado de registro de un CURP
  const handleToggleRegistro = (curpToToggle) => {
    const updatedCurps = curps.map(item => {
      if (item.curp === curpToToggle) {
        return { ...item, registrado: !item.registrado };
      }
      return item;
    });
    setCurps(updatedCurps);
    localStorage.setItem("padronCurps", JSON.stringify(updatedCurps));
  };

  // Manejar la eliminación de un CURP
  const handleDeleteCurp = (curpToDelete) => {
    if (window.confirm(`¿Estás seguro de eliminar el CURP ${curpToDelete}?`)) {
      const updatedCurps = curps.filter(item => item.curp !== curpToDelete);
      setCurps(updatedCurps);
      localStorage.setItem("padronCurps", JSON.stringify(updatedCurps));
    }
  };

  return (
    <div
      style={{
        paddingBottom: "80px", // Espacio para el menú inferior
      }}
    >
      <PageHeaderMain
        title="Padrón de CURPs"
        subtitle="Gestión de CURPs autorizados"
      />
      
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Formulario para agregar CURPs */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              margin: "0 0 15px",
              fontSize: "18px",
              fontWeight: "600",
              color: "#1a1060",
            }}
          >
            Agregar nuevos CURPs
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div
              style={{
                marginBottom: "15px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                  marginBottom: "10px",
                }}
              >
                Ingresa los CURPs separados por comas:
              </p>
              <textarea
                value={formCurps}
                onChange={handleInputChange}
                placeholder="Ej: MELM8305281HDFNNS09, PERC971212MDFRZR08"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  minHeight: "100px",
                  fontSize: "14px",
                  resize: "vertical",
                }}
              />
            </div>
            
            <button
              type="submit"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
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
              Agregar al padrón
            </button>
            
            {showSuccessMessage && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "10px 15px",
                  backgroundColor: "rgba(76, 175, 80, 0.1)",
                  borderRadius: "8px",
                  color: "#4CAF50",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                CURPs agregados correctamente
              </div>
            )}
          </form>
        </div>
        
        {/* Tabla de CURPs */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}>
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "600",
                color: "#1a1060",
              }}
            >
              Listado de CURPs autorizados
            </h3>
            
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <span style={{ fontSize: "14px", color: "#666" }}>
                {curpsFiltrados.length} {curpsFiltrados.length === 1 ? 'registro' : 'registros'}
              </span>
            </div>
          </div>

          {/* Filtros y búsqueda */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            gap: "15px",
            flexWrap: "wrap"
          }}>
            {/* Filtro por estado */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap"
            }}>
              <div style={{ 
                display: "flex",
                alignItems: "center", 
                gap: "5px",
                fontSize: "14px",
                color: "#666"
              }}>
                <FilterIcon size={16} />
                <span>Filtrar:</span>
              </div>
              
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => handleFiltroEstadoChange("todos")}
                  style={{
                    backgroundColor: filtroEstado === "todos" ? "#1a1060" : "transparent",
                    color: filtroEstado === "todos" ? "white" : "#666",
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
                  onClick={() => handleFiltroEstadoChange("registrados")}
                  style={{
                    backgroundColor: filtroEstado === "registrados" ? "#4CAF5020" : "transparent",
                    color: filtroEstado === "registrados" ? "#4CAF50" : "#666",
                    border: filtroEstado === "registrados" ? "1px solid #4CAF50" : "1px solid #ddd",
                    borderRadius: "20px",
                    padding: "5px 12px",
                    fontSize: "13px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Registrados
                </button>
                
                <button
                  onClick={() => handleFiltroEstadoChange("pendientes")}
                  style={{
                    backgroundColor: filtroEstado === "pendientes" ? "#FF980020" : "transparent",
                    color: filtroEstado === "pendientes" ? "#FF9800" : "#666",
                    border: filtroEstado === "pendientes" ? "1px solid #FF9800" : "1px solid #ddd",
                    borderRadius: "20px",
                    padding: "5px 12px",
                    fontSize: "13px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Pendientes
                </button>
              </div>
            </div>
            
            {/* Búsqueda */}
            <div style={{
              position: "relative",
              flex: "1",
              maxWidth: "300px"
            }}>
              <input
                type="text"
                placeholder="Buscar CURP..."
                value={searchTerm}
                onChange={handleSearch}
                style={{
                  width: "100%",
                  padding: "8px 12px 8px 36px",
                  borderRadius: "20px",
                  border: "1px solid #ddd",
                  fontSize: "14px",
                }}
              />
              <SearchIcon 
                size={16} 
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#666"
                }}
              />
            </div>
          </div>
          
          <div
            style={{
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <th
                    style={{
                      padding: "12px 15px",
                      textAlign: "left",
                    }}
                  >
                    CURP
                  </th>
                  <th
                    style={{
                      padding: "12px 15px",
                      textAlign: "center",
                    }}
                  >
                    Estado
                  </th>
                  <th
                    style={{
                      padding: "12px 15px",
                      textAlign: "right",
                    }}
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {curpsFiltrados.map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <td
                      style={{
                        padding: "12px 15px",
                        fontFamily: "monospace",
                        fontWeight: "500",
                      }}
                    >
                      {item.curp}
                    </td>
                    <td
                      style={{
                        padding: "12px 15px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "5px 10px",
                          borderRadius: "12px",
                          backgroundColor: item.registrado
                            ? "rgba(76, 175, 80, 0.1)"
                            : "rgba(255, 152, 0, 0.1)",
                          color: item.registrado ? "#4CAF50" : "#FF9800",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        {item.registrado ? (
                          <>
                            <UserCheckIcon size={14} />
                            <span>Registrado</span>
                          </>
                        ) : (
                          <>
                            <UserXIcon size={14} />
                            <span>Pendiente</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "12px 15px",
                        textAlign: "right",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}>
                        <button
                          onClick={() => handleToggleRegistro(item.curp)}
                          style={{
                            backgroundColor: item.registrado 
                              ? "rgba(255, 152, 0, 0.1)"
                              : "rgba(76, 175, 80, 0.1)",
                            color: item.registrado ? "#FF9800" : "#4CAF50",
                            border: "none",
                            borderRadius: "8px",
                            padding: "6px 12px",
                            fontSize: "12px",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          {item.registrado ? (
                            <>
                              <UserXIcon size={14} />
                              <span>Marcar pendiente</span>
                            </>
                          ) : (
                            <>
                              <UserCheckIcon size={14} />
                              <span>Marcar registrado</span>
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={() => handleDeleteCurp(item.curp)}
                          style={{
                            backgroundColor: "rgba(244, 67, 54, 0.1)",
                            color: "#F44336",
                            border: "none",
                            borderRadius: "8px",
                            padding: "6px 12px",
                            fontSize: "12px",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                        Eliminar
                      </button>
                    </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {curpsFiltrados.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "30px 0",
                  color: "#666",
                }}
              >
                {searchTerm || filtroEstado !== "todos" ? 
                  "No se encontraron CURPs con los filtros aplicados" : 
                  "No hay CURPs en el padrón"}
              </div>
            )}
            
            {/* Contador de resultados */}
            {curpsFiltrados.length > 0 && (
              <div style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 15px",
                borderTop: "1px solid #eee",
                fontSize: "13px",
                color: "#666"
              }}>
                <div>
                  Mostrando {curpsFiltrados.length} de {curps.length} CURPs
                </div>
                {(filtroEstado !== "todos" || searchTerm) && (
                  <button
                    onClick={() => {
                      setFiltroEstado("todos");
                      setSearchTerm("");
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#1a1060",
                      fontSize: "13px",
                      cursor: "pointer",
                      textDecoration: "underline"
                    }}
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PadronPage;