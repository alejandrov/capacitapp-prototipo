import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeaderSecondary from '../../components/common/PageHeaderSecondary';
import DatosEmpleado from './components/DatosEmpleado';
import ReconocimientoFacial from './components/ReconocimientoFacial';
import ModulosPrueba from './components/ModulosPrueba';
import DesglosePrueba from './components/DesglosePrueba';
import ConfirmationPopup from './components/ConfirmationPopup';
import './SolicitudDetalle.css';

const SolicitudDetalle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState(null);

  // Simulación de datos de solicitud basado en el ID
  const solicitud = {
    id: id,
    empleado: {
      nombre: "Miguel Villarreal",
      numeroEmpleado: "7555",
      correo: "miguel.villarreal@gmail.com",
      planta: "Planta Industrial Norte",
      empresa: "Industrias Mexicanas S.A. de C.V."
    },
    curso: {
      titulo: "Seguridad en el Trabajo",
      fecha: "28 de marzo de 2025, 15:45",
      estatus: "pendiente"
    },
    oportunidad: 2,
    reconocimiento: {
      coincidencia: "92%",
      timestamp: "28/03/2025 15:30"
    },
    modulos: [
      {
        id: "identification",
        titulo: "Identificación de Riesgos",
        descripcion: "Identificación de riesgos en el área de trabajo",
        completado: true,
        fechaCompletado: "27/03/2025"
      },
      {
        id: "protection",
        titulo: "Equipo de Protección",
        descripcion: "Uso correcto de equipo de protección personal",
        completado: true,
        fechaCompletado: "27/03/2025"
      },
      {
        id: "emergency",
        titulo: "Procedimientos de Emergencia",
        descripcion: "Protocolos para situaciones de emergencia",
        completado: true,
        fechaCompletado: "28/03/2025"
      },
      {
        id: "test",
        titulo: "Prueba Complementaria",
        descripcion: "Evaluación final del curso",
        completado: true,
        fechaCompletado: "28/03/2025"
      }
    ],
    prueba: {
      titulo: "Prueba Complementaria",
      porcentajeAciertos: 80,
      preguntas: [
        {
          id: 1,
          pregunta: "¿Cuál es la primera acción que debes tomar al identificar un riesgo en el área de trabajo?",
          respuestaUsuario: "Reportarlo inmediatamente al supervisor de seguridad",
          esCorrecta: true,
          opciones: [
            "Reportarlo inmediatamente al supervisor de seguridad",
            "Intentar solucionarlo por tu cuenta",
            "Continuar trabajando pero con más precaución"
          ]
        },
        {
          id: 2,
          pregunta: "El equipo de protección personal (EPP) debe utilizarse:",
          respuestaUsuario: "Siempre que se realicen trabajos con posibles riesgos, según los protocolos establecidos",
          esCorrecta: true,
          opciones: [
            "Solo cuando el supervisor lo indique",
            "Cuando el trabajador considere que hay riesgo",
            "Siempre que se realicen trabajos con posibles riesgos, según los protocolos establecidos"
          ]
        },
        {
          id: 3,
          pregunta: "En caso de un incendio en el área de trabajo, ¿cuál es la prioridad?",
          respuestaUsuario: "Garantizar la evacuación segura del personal",
          esCorrecta: true,
          opciones: [
            "Salvar los equipos y materiales importantes",
            "Garantizar la evacuación segura del personal",
            "Intentar apagar el fuego con los medios disponibles"
          ]
        },
        {
          id: 4,
          pregunta: "¿Cuál es el propósito principal de las señalizaciones de seguridad en el área de trabajo?",
          respuestaUsuario: "Informar sobre riesgos potenciales y medidas preventivas",
          esCorrecta: true,
          opciones: [
            "Informar sobre riesgos potenciales y medidas preventivas",
            "Cumplir con los requisitos legales de la empresa",
            "Decorar el espacio de trabajo"
          ]
        },
        {
          id: 5,
          pregunta: "Al trabajar con sustancias químicas peligrosas, es obligatorio:",
          respuestaUsuario: "Utilizar solo guantes como protección",
          esCorrecta: false,
          opciones: [
            "Utilizar solo guantes como protección",
            "Conocer las hojas de seguridad y utilizar el EPP adecuado",
            "Trabajar en áreas con poca ventilación para evitar la dispersión"
          ]
        }
      ]
    }
  };

  const handleBack = () => {
    navigate('/dashboard/ejecutivo/solicitudes');
  };

  const handleActionClick = (actionType) => {
    setAction(actionType);
    setShowPopup(true);
  };

  const handleConfirm = () => {
    // Aquí iría la lógica para validar o rechazar la solicitud
    // por ahora solo mostraremos un mensaje
    alert(`La solicitud ha sido ${action === 'approve' ? 'validada' : 'rechazada'} exitosamente.`);
    setShowPopup(false);
    // Redireccionamos a la lista de solicitudes
    navigate('/dashboard/ejecutivo/solicitudes');
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="solicitud-detalle-page">
      <PageHeaderSecondary 
        title="Detalles de Solicitud" 
        onBack={handleBack}
      />

      <div className="solicitud-detalle-container">
        <div className="solicitud-header">
          <h2 className="curso-titulo">{solicitud.curso.titulo}</h2>
          <div className="solicitud-metadata">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p className="solicitud-id">Folio #{solicitud.id}</p>
              <p className="solicitud-id">&nbsp;&nbsp;&nbsp;&nbsp;Oportunidad #{solicitud.oportunidad}</p>
            
            </div>
            <p className="solicitud-fecha">{solicitud.curso.fecha}</p>
          </div>
        </div>

        <div className="solicitud-content">
          <DatosEmpleado empleado={solicitud.empleado} />
          <ReconocimientoFacial reconocimiento={solicitud.reconocimiento} />
          <ModulosPrueba modulos={solicitud.modulos} />
          <DesglosePrueba prueba={solicitud.prueba} />

          <div className="solicitud-actions">
            <button 
              className="action-button reject-button" 
              onClick={() => handleActionClick('reject')}
            >
              Rechazar
            </button>
            <button 
              className="action-button approve-button" 
              onClick={() => handleActionClick('approve')}
            >
              Validar
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <ConfirmationPopup 
          action={action} 
          onConfirm={handleConfirm} 
          onCancel={handleCancel}
          empleadoNombre={solicitud.empleado.nombre}
        />
      )}
    </div>
  );
};

export default SolicitudDetalle;