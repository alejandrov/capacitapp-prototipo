import React, { useState, useEffect } from "react";
import { 
  UserCheck as UserCheckIcon, 
  UserX as UserXIcon,
  Plus as PlusIcon
} from "lucide-react";
import PageHeaderMain from "../../components/common/PageHeaderMain";

const PadronPage = () => {
  // Estado para los CURPs existentes y el formulario
  const [curps, setCurps] = useState([]);
  const [formCurps, setFormCurps] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

  // Manejar la eliminación de un CURP
  const handleDeleteCurp = (curpToDelete) => {
    const updatedCurps = curps.filter(item => item.curp !== curpToDelete);
    setCurps(updatedCurps);
    localStorage.setItem("padronCurps", JSON.stringify(updatedCurps));
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
          <h3
            style={{
              margin: "0 0 15px",
              fontSize: "18px",
              fontWeight: "600",
              color: "#1a1060",
            }}
          >
            Listado de CURPs autorizados
          </h3>
          
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
                {curps.map((item, index) => (
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {curps.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "30px 0",
                  color: "#666",
                }}
              >
                No hay CURPs en el padrón
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PadronPage;