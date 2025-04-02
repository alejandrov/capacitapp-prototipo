import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Shield as ShieldIcon,
  Edit as EditIcon,
  Trash2 as TrashIcon,
  Plus as PlusIcon,
} from "lucide-react";
import PageHeaderSecondary from "../../components/common/PageHeaderSecondary";

const EditCursoPage = () => {
  const { cursoId } = useParams();
  const navigate = useNavigate();
  const [showTestModal, setShowTestModal] = useState(false);

  // Valores iniciales del formulario basados en la información actual del curso
  const [formData, setFormData] = useState({
    title: "Curso de Seguridad",
    description: "Seguridad en el trabajo y protocolos",
    moduleDescription: "Al tomar esta evaluación, los integrantes aprenderán:",
    totalModules: "4",
    testQuestions: [
      {
        question:
          "¿Cuál es la primera acción que debes tomar al identificar un riesgo en el área de trabajo?",
        options: [
          "Reportarlo inmediatamente al supervisor de seguridad",
          "Intentar solucionarlo por tu cuenta",
          "Continuar trabajando pero con más precaución",
        ],
        correctAnswer: 0,
      },
      {
        question: "El equipo de protección personal (EPP) debe utilizarse:",
        options: [
          "Solo cuando el supervisor lo indique",
          "Cuando el trabajador considere que hay riesgo",
          "Siempre que se realicen trabajos con posibles riesgos, según los protocolos establecidos",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "En caso de un incendio en el área de trabajo, ¿cuál es la prioridad?",
        options: [
          "Salvar los equipos y materiales importantes",
          "Garantizar la evacuación segura del personal",
          "Intentar apagar el fuego con los medios disponibles",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "¿Cuál es el propósito principal de las señalizaciones de seguridad en el área de trabajo?",
        options: [
          "Informar sobre riesgos potenciales y medidas preventivas",
          "Cumplir con los requisitos legales de la empresa",
          "Decorar el espacio de trabajo",
        ],
        correctAnswer: 0,
      },
      {
        question:
          "Al trabajar con sustancias químicas peligrosas, es obligatorio:",
        options: [
          "Utilizar solo guantes como protección",
          "Conocer las hojas de seguridad y utilizar el EPP adecuado",
          "Trabajar en áreas con poca ventilación para evitar la dispersión",
        ],
        correctAnswer: 1,
      },
    ],
    modules: [
      {
        id: "identification",
        title: "Identificación de Riesgos",
        description:
          "Aprenderás a identificar los riesgos existentes en tu área de trabajo.",
        mediaUrl: "https://example.com/risk-identification.jpg",
        isTest: false,
      },
      {
        id: "protection",
        title: "Equipo de Protección",
        description:
          "Conocerás y aprenderás a utilizar el equipo de protección adecuado para trabajar en grandes alturas o temperaturas elevadas o con electricidad.",
        mediaUrl: "https://example.com/protective-equipment.mp4",
        isTest: false,
      },
      {
        id: "emergency",
        title: "Procedimientos de Emergencia",
        description:
          "Entenderás los protocolos a seguir en situaciones de emergencia.",
        mediaUrl: "https://example.com/emergency-procedures.jpg",
        isTest: false,
      },
      {
        id: "test",
        title: "Prueba Complementaria",
        description: "Evaluación final de los conocimientos adquiridos.",
        isTest: true,
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...formData.modules];
    updatedModules[index] = {
      ...updatedModules[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      modules: updatedModules,
    });
  };

  const handleDeleteModule = (index) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este módulo?")) {
      const updatedModules = [...formData.modules];
      updatedModules.splice(index, 1);
      setFormData({
        ...formData,
        modules: updatedModules,
        totalModules: String(updatedModules.length),
      });
    }
  };

  const handleAddModule = () => {
    const newModule = {
      id: `module-${Date.now()}`, // Crear un ID único basado en la marca de tiempo
      title: "",
      description: "",
      mediaUrl: "",
      isTest: false,
    };

    const updatedModules = [...formData.modules, newModule];
    setFormData({
      ...formData,
      modules: updatedModules,
      totalModules: String(updatedModules.length),
    });
  };

  const handleIsTestChange = (index, isTest) => {
    const updatedModules = [...formData.modules];
    updatedModules[index] = {
      ...updatedModules[index],
      isTest,
    };

    if (isTest) {
      // Si este módulo es un test, pero ya hay otro test, preguntar
      const existingTestIndex = formData.modules.findIndex(
        (module) => module.isTest && module.id !== updatedModules[index].id
      );
      if (existingTestIndex !== -1) {
        if (
          window.confirm(
            "Ya existe un módulo de prueba. ¿Desea convertir este módulo en prueba y revertir el otro a módulo normal?"
          )
        ) {
          updatedModules[existingTestIndex] = {
            ...updatedModules[existingTestIndex],
            isTest: false,
          };
        } else {
          return; // No hacer el cambio si el usuario cancela
        }
      }
    }

    setFormData({
      ...formData,
      modules: updatedModules,
    });
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...formData.testQuestions];
    newQuestions[questionIndex].options.push("");

    setFormData({
      ...formData,
      testQuestions: newQuestions,
    });
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    if (formData.testQuestions[questionIndex].options.length <= 2) {
      alert("Debe haber al menos dos opciones de respuesta.");
      return;
    }

    const newQuestions = [...formData.testQuestions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);

    // Si la respuesta correcta era esta opción o estaba después, ajustar el índice
    if (newQuestions[questionIndex].correctAnswer === optionIndex) {
      newQuestions[questionIndex].correctAnswer = 0;
    } else if (newQuestions[questionIndex].correctAnswer > optionIndex) {
      newQuestions[questionIndex].correctAnswer--;
    }

    setFormData({
      ...formData,
      testQuestions: newQuestions,
    });
  };

  const handleAddQuestion = () => {
    const newQuestions = [
      ...formData.testQuestions,
      {
        question: "",
        options: ["", "", ""],
        correctAnswer: 0,
      },
    ];

    setFormData({
      ...formData,
      testQuestions: newQuestions,
    });
  };

  const handleRemoveQuestion = (index) => {
    if (formData.testQuestions.length <= 1) {
      alert("Debe haber al menos una pregunta en la prueba.");
      return;
    }

    const newQuestions = [...formData.testQuestions];
    newQuestions.splice(index, 1);

    setFormData({
      ...formData,
      testQuestions: newQuestions,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los cambios
    alert("Cambios guardados exitosamente");
    // Redirigir de vuelta a la lista de cursos
    navigate("/dashboard/ejecutivo/cursos");
  };

  const handleCancel = () => {
    navigate("/dashboard/ejecutivo/cursos");
  };

  return (
    <div
      style={{
        padding: "20px",
        paddingBottom: "80px", // Espacio para el menú inferior
      }}
    >
      {/* Usando el componente PageHeaderSecondary */}
      <PageHeaderSecondary
        title="Editar Curso"
        backUrl="/dashboard/ejecutivo/cursos"
      />

      {/* Información básica del curso */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "12px",
              backgroundColor: "rgba(26, 16, 96, 0.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ShieldIcon size={32} color="#1a1060" />
          </div>

          <div>
            <h3
              style={{
                margin: "0 0 5px",
                fontSize: "20px",
                fontWeight: "600",
                color: "#1a1060",
              }}
            >
              {formData.title}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#666",
              }}
            >
              {formData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Formulario de edición */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Información general del curso */}
          <div style={{ marginBottom: "30px" }}>
            <h3
              style={{
                fontSize: "18px",
                color: "#1a1060",
                marginBottom: "20px",
                fontWeight: "600",
              }}
            >
              Información General
            </h3>

            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="title"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Título del Curso
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px 15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="description"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Descripción Breve
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px 15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="moduleDescription"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Descripción de los Módulos
              </label>
              <textarea
                id="moduleDescription"
                name="moduleDescription"
                value={formData.moduleDescription}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px 15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  minHeight: "80px",
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="totalModules"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Número de Módulos
              </label>
              <input
                type="number"
                id="totalModules"
                name="totalModules"
                value={formData.totalModules}
                onChange={handleInputChange}
                min="1"
                max="10"
                style={{
                  width: "100px",
                  padding: "10px 15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          {/* Módulos del curso */}
          <div>
            <h3
              style={{
                fontSize: "18px",
                color: "#1a1060",
                marginBottom: "20px",
                fontWeight: "600",
              }}
            >
              Módulos del Curso
            </h3>

            {formData.modules.map((module, index) => (
              <div
                key={module.id}
                style={{
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  padding: "20px",
                  marginBottom: "15px",
                  position: "relative",
                }}
              >
                {/* Botón para eliminar módulo */}
                <button
                  type="button"
                  onClick={() => handleDeleteModule(index)}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#F44336",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title="Eliminar módulo"
                >
                  <TrashIcon size={18} />
                </button>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor={`module-${index}-title`}
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Título del Módulo {index + 1}
                  </label>
                  <input
                    type="text"
                    id={`module-${index}-title`}
                    value={module.title}
                    onChange={(e) =>
                      handleModuleChange(index, "title", e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "10px 15px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor={`module-${index}-description`}
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Descripción del Módulo
                  </label>
                  <textarea
                    id={`module-${index}-description`}
                    value={module.description}
                    onChange={(e) =>
                      handleModuleChange(index, "description", e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "10px 15px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "14px",
                      minHeight: "80px",
                      resize: "vertical",
                    }}
                  />
                </div>

                {/* Selector de tipo de módulo */}
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Tipo de Módulo
                  </label>

                  <div style={{ display: "flex", gap: "15px" }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name={`module-${index}-type`}
                        checked={!module.isTest}
                        onChange={() => handleIsTestChange(index, false)}
                        style={{ marginRight: "8px" }}
                      />
                      <span>Contenido</span>
                    </label>

                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name={`module-${index}-type`}
                        checked={module.isTest}
                        onChange={() => handleIsTestChange(index, true)}
                        style={{ marginRight: "8px" }}
                      />
                      <span>Prueba / Evaluación</span>
                    </label>
                  </div>
                </div>

                {/* Mostrar campo de URL media para los módulos de contenido */}
                {!module.isTest && (
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      htmlFor={`module-${index}-media`}
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      URL de Imagen o Video
                    </label>
                    <input
                      type="text"
                      id={`module-${index}-media`}
                      value={module.mediaUrl || ""}
                      onChange={(e) =>
                        handleModuleChange(index, "mediaUrl", e.target.value)
                      }
                      placeholder="https://ejemplo.com/imagen.jpg o https://ejemplo.com/video.mp4"
                      style={{
                        width: "100%",
                        padding: "10px 15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "14px",
                      }}
                    />
                    <p
                      style={{
                        margin: "5px 0 0",
                        fontSize: "12px",
                        color: "#888",
                      }}
                    >
                      Ingresa la URL completa de la imagen o video que se
                      mostrará en este módulo
                    </p>
                  </div>
                )}

                {/* Botón de editar prueba para el módulo de prueba */}
                {module.isTest && (
                  <div style={{ marginTop: "20px" }}>
                    <button
                      type="button"
                      onClick={() => setShowTestModal(true)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 20px",
                        backgroundColor: "rgba(26, 16, 96, 0.1)",
                        color: "#1a1060",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                    >
                      <EditIcon size={18} />
                      Editar Prueba
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Botón para agregar un nuevo módulo */}
            <div style={{ marginTop: "20px" }}>
              <button
                type="button"
                onClick={handleAddModule}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px 20px",
                  backgroundColor: "white",
                  color: "#1a1060",
                  border: "1px dashed #1a1060",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                <PlusIcon size={18} />
                Agregar Nuevo Módulo
              </button>
            </div>
          </div>

          {/* Botones de acción */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "15px",
              marginTop: "30px",
            }}
          >
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                backgroundColor: "white",
                color: "#666",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>

            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#1a1060",
                color: "white",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Guardar Cambios
            </button>
          </div>
        </form>

        <div
          style={{
            fontSize: "14px",
            color: "#666",
            backgroundColor: "rgba(26, 16, 96, 0.05)",
            padding: "10px 20px",
            borderRadius: "8px",
            marginTop: "30px",
            textAlign: "center",
          }}
        >
          ID del curso: {cursoId}
        </div>
      </div>

      {/* Modal para editar las preguntas de la prueba */}
      {showTestModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "30px",
              width: "100%",
              maxWidth: "700px",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowTestModal(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <h2
              style={{
                marginBottom: "20px",
                color: "#1a1060",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              Edición de Preguntas - Prueba Complementaria
            </h2>

            <div style={{ marginBottom: "20px" }}>
              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                  marginBottom: "20px",
                }}
              >
                Edita las preguntas y respuestas de la prueba. Marca la opción
                correcta para cada pregunta.
              </p>

              {formData.testQuestions.map((question, qIndex) => (
                <div
                  key={qIndex}
                  style={{
                    border: "1px solid #eee",
                    borderRadius: "8px",
                    padding: "20px",
                    marginBottom: "20px",
                    position: "relative",
                  }}
                >
                  {formData.testQuestions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(qIndex)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#F44336",
                      }}
                    >
                      <TrashIcon size={16} />
                    </button>
                  )}

                  <div style={{ marginBottom: "15px" }}>
                    <label
                      htmlFor={`question-${qIndex}`}
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Pregunta {qIndex + 1}
                    </label>
                    <textarea
                      id={`question-${qIndex}`}
                      value={question.question}
                      onChange={(e) => {
                        const newQuestions = [...formData.testQuestions];
                        newQuestions[qIndex].question = e.target.value;
                        setFormData({
                          ...formData,
                          testQuestions: newQuestions,
                        });
                      }}
                      style={{
                        width: "100%",
                        padding: "10px 15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "14px",
                        minHeight: "60px",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        marginBottom: "10px",
                      }}
                    >
                      Opciones de respuesta:
                    </p>

                    {question.options.map((option, oIndex) => (
                      <div
                        key={oIndex}
                        style={{
                          display: "flex",
                          marginBottom: "10px",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <input
                          type="radio"
                          id={`question-${qIndex}-option-${oIndex}`}
                          name={`question-${qIndex}-correct`}
                          checked={oIndex === question.correctAnswer}
                          onChange={() => {
                            const newQuestions = [...formData.testQuestions];
                            newQuestions[qIndex].correctAnswer = oIndex;
                            setFormData({
                              ...formData,
                              testQuestions: newQuestions,
                            });
                          }}
                          style={{ marginRight: "10px" }}
                        />
                        <div style={{ flex: 1 }}>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newQuestions = [...formData.testQuestions];
                              newQuestions[qIndex].options[oIndex] =
                                e.target.value;
                              setFormData({
                                ...formData,
                                testQuestions: newQuestions,
                              });
                            }}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              border: "1px solid #ddd",
                              borderRadius: "6px",
                              fontSize: "14px",
                            }}
                          />
                        </div>

                        {question.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveOption(qIndex, oIndex)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#F44336",
                              cursor: "pointer",
                              marginLeft: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <TrashIcon size={16} />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => handleAddOption(qIndex)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 15px",
                        border: "1px dashed #1a1060",
                        borderRadius: "6px",
                        backgroundColor: "transparent",
                        color: "#1a1060",
                        fontSize: "13px",
                        cursor: "pointer",
                        marginTop: "10px",
                      }}
                    >
                      <PlusIcon size={16} />
                      Agregar Opción
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddQuestion}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  backgroundColor: "rgba(26, 16, 96, 0.1)",
                  color: "#1a1060",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <PlusIcon size={18} />
                Agregar Pregunta
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "15px",
              }}
            >
              <button
                onClick={() => setShowTestModal(false)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  backgroundColor: "white",
                  color: "#666",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  alert("Preguntas de prueba actualizadas correctamente");
                  setShowTestModal(false);
                }}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#1a1060",
                  color: "white",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Guardar Preguntas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCursoPage;
