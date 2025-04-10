import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import "./Register.css";
import PageHeaderSecondary from "../../components/common/PageHeaderSecondary";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeNumber: "",
    fullName: "",
    curp: "",
    plant: "",
    company: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [curpValidated, setCurpValidated] = useState(null); // null: not validated, true: valid, false: invalid
  const [curpErrorMessage, setCurpErrorMessage] = useState("");
  const [padronCurps, setPadronCurps] = useState([]);

  // Cargar el registro de CURPs cuando se monta el componente
  useEffect(() => {
    // Intentar cargar curps desde localStorage
    const storedCurps = localStorage.getItem("padronCurps");

    if (storedCurps) {
      try {
        const curpsArray = JSON.parse(storedCurps);
        setPadronCurps(curpsArray);
        console.log("CURPs cargados:", curpsArray.length);
      } catch (error) {
        console.error("Error al parsear CURPs del localStorage:", error);
        setPadronCurps([]);
      }
    } else {
      console.log("No hay CURPs almacenados en localStorage");
      setPadronCurps([]);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Lógica de validación de CURP
    if (name === "curp") {
      // Limpiar validación previa
      setCurpValidated(null);
      setCurpErrorMessage("");

      // Solo validamos si hay al menos 5 caracteres
      if (value.length >= 5) {
        console.log("Validando CURP:", value);

        // La validación simulada: si contiene números es válido
        const hasNumbers = /\d/.test(value);

        if (hasNumbers) {
          setCurpValidated(true);
          setCurpErrorMessage("CURP verificado y disponible para registro");
          console.log("CURP válido (contiene números)");
        } else {
          setCurpValidated(false);
          setCurpErrorMessage(
            "Este CURP no se encuentra en el padrón autorizado"
          );
          console.log("CURP inválido (no contiene números)");
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica del formulario
    if (
      !formData.employeeNumber ||
      !formData.fullName ||
      !formData.curp ||
      !formData.plant ||
      !formData.company ||
      !formData.email
    ) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }

    // Validar CURP antes de enviar
    const hasNumbers = /\d/.test(formData.curp);
    if (!hasNumbers) {
      setCurpValidated(false);
      setCurpErrorMessage("Este CURP no se encuentra en el padrón autorizado");
      return;
    }

    setIsSubmitting(true);

    // Simulando llamada API de registro
    setTimeout(() => {
      console.log("Registro intentado con:", formData);

      // Actualizar el estado del CURP a registrado en localStorage
      if (padronCurps.length > 0) {
        const updatedCurps = padronCurps.map((item) => {
          // Simulamos coincidencia parcial para demostración
          if (
            formData.curp.includes("123") ||
            item.curp.includes(formData.curp)
          ) {
            return { ...item, registrado: true };
          }
          return item;
        });

        localStorage.setItem("padronCurps", JSON.stringify(updatedCurps));
      }

      setIsSubmitting(false);

      // Navegar directamente a la pantalla de verificación de correo
      navigate("/verification", { state: { email: formData.email } });
    }, 1000);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-form-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <br />
            <PageHeaderSecondary title="Crea una cuenta" />
            <div className="form-group">
              <label htmlFor="employeeNumber">Número de empleado</label>
              <Input
                type="text"
                id="employeeNumber"
                name="employeeNumber"
                value={formData.employeeNumber}
                onChange={handleChange}
                placeholder="7555"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fullName">Nombre Completo</label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Juan Pérez López"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="curp">CURP</label>
              <Input
                type="text"
                id="curp"
                name="curp"
                value={formData.curp}
                onChange={handleChange}
                placeholder="PELJ880101HDFRNL09"
                required
                error={curpValidated === false ? curpErrorMessage : ""}
              />

              {curpValidated === true && (
                <div
                  style={{
                    marginTop: "5px",
                    fontSize: "14px",
                    color: "#4CAF50",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
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
                  {curpErrorMessage}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="plant">Planta</label>
              <Input
                type="text"
                id="plant"
                name="plant"
                value={formData.plant}
                onChange={handleChange}
                placeholder="Planta Industrial Norte"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Empresa</label>
              <Input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Industrias Mexicanas S.A. de C.V."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="juan.perez@gmail.com"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              className="iniciar-button"
              disabled={isSubmitting || curpValidated === false}
            >
              {isSubmitting ? "ENVIANDO..." : "INICIAR"}
            </Button>

            {/* Mensaje de ayuda para la simulación */}
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#666",
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>Nota de demostración:</strong> Para validar un CURP,
                debe contener al menos un número y tener mas de 5 caracteres (1,
                2, 3, etc.)
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
