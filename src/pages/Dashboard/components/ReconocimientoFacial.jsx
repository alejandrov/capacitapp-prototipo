import React from 'react';
import { ScanFace, ArrowRight } from 'lucide-react';

const ReconocimientoFacial = ({ reconocimiento }) => {
  return (
    <div className="section-card">
      <h3 className="section-title">
        <ScanFace size={20} color="#1a1060" />
        Resultado del Reconocimiento
      </h3>
      
      <div className="recognition-container">
        <div className="image-container">
          <div className="id-image">
            {/* Simulando una imagen de ID usando SVG inline */}
            <svg width="100%" height="100%" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="120" fill="#f0e7d8" />
              <circle cx="60" cy="55" r="25" fill="#ddd" />
              <circle cx="60" cy="45" r="8" fill="#aaa" />
              <path d="M45 70 C 45 60, 75 60, 75 70 L 75 75 L 45 75 Z" fill="#aaa" />
              <rect x="40" y="85" width="40" height="5" fill="#aaa" />
              <rect x="40" y="95" width="40" height="5" fill="#aaa" />
            </svg>
          </div>
        </div>
        
        <div className="comparison-info">
          <ArrowRight size={24} className="arrow-icon" />
          <div className="match-percentage">{reconocimiento.coincidencia}</div>
          <div className="match-label">Coincidencia</div>
        </div>
        
        <div className="image-container">
          <div className="selfie-image">
            {/* Simulando una imagen de selfie usando SVG inline */}
            <svg width="100%" height="100%" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="120" fill="#f5f5f5" />
              <circle cx="60" cy="60" r="30" fill="#e0e0e0" />
              <circle cx="48" cy="50" r="5" fill="#555" />
              <circle cx="72" cy="50" r="5" fill="#555" />
              <path d="M45 75 C 50 85, 70 85, 75 75" stroke="#555" strokeWidth="2" fill="transparent" />
            </svg>
          </div>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '15px',
        fontSize: '14px',
        color: '#666',
        textAlign: 'right'
      }}>
        Verificación realizada el {reconocimiento.timestamp}
      </div>
    </div>
  );
};

export default ReconocimientoFacial;