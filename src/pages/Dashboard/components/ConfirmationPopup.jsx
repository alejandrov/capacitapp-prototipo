import React from 'react';

const ConfirmationPopup = ({ action, onConfirm, onCancel, empleadoNombre }) => {
  const isApprove = action === 'approve';
  
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3 className="popup-title">
          {isApprove ? '¿Validar solicitud?' : '¿Rechazar solicitud?'}
        </h3>
        
        <p className="popup-message">
          {isApprove 
            ? `¿Estás seguro de que deseas validar la solicitud de ${empleadoNombre}?` 
            : `¿Estás seguro de que deseas rechazar la solicitud de ${empleadoNombre}?`
          }
        </p>
        
        <div className="popup-actions">
          <button className="popup-cancel" onClick={onCancel}>
            Cancelar
          </button>
          
          <button 
            className={`popup-confirm ${isApprove ? 'approve' : 'reject'}`}
            onClick={onConfirm}
          >
            {isApprove ? 'Validar' : 'Rechazar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;