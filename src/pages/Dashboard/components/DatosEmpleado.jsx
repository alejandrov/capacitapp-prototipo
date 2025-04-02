import React from 'react';
import { User } from 'lucide-react';

const DatosEmpleado = ({ empleado }) => {
  return (
    <div className="section-card">
      <h3 className="section-title">
        <User size={20} color="#1a1060" />
        Datos del Empleado
      </h3>
      
      <div className="data-grid">
        <div className="data-item">
          <div className="data-label">Nombre completo</div>
          <div className="data-value">{empleado.nombre}</div>
        </div>
        
        <div className="data-item">
          <div className="data-label">Número de empleado</div>
          <div className="data-value">{empleado.numeroEmpleado}</div>
        </div>
        
        <div className="data-item">
          <div className="data-label">Correo electrónico</div>
          <div className="data-value">{empleado.correo}</div>
        </div>
        
        <div className="data-item">
          <div className="data-label">Planta</div>
          <div className="data-value">{empleado.planta}</div>
        </div>
        
        <div className="data-item">
          <div className="data-label">Empresa</div>
          <div className="data-value">{empleado.empresa}</div>
        </div>
      </div>
    </div>
  );
};

export default DatosEmpleado;