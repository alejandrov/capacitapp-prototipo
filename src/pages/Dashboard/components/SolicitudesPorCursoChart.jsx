import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SolicitudesPorCursoChart = () => {
  // Datos de ejemplo para la gráfica
  const data = [
    { nombre: 'Seguridad', solicitudes: 45 },
    { nombre: 'Ética', solicitudes: 30 },
    { nombre: 'Almacén', solicitudes: 22 },
    { nombre: 'Químicos', solicitudes: 18 },
    { nombre: 'Psicométrico', solicitudes: 15 },
  ];

  // Función personalizada para el tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ 
          backgroundColor: 'white', 
          padding: '10px', 
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p className="label" style={{ margin: 0, fontWeight: 'bold' }}>{`${label}`}</p>
          <p className="intro" style={{ margin: '5px 0 0', color: '#1a1060' }}>
            {`Solicitudes: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '12px', 
      padding: '20px', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      marginBottom: '20px',
      margin: '20px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Solicitudes por Curso</h3>
        <div style={{ 
          color: '#666', 
          fontSize: '12px',
          backgroundColor: 'rgba(26, 16, 96, 0.1)',
          padding: '4px 8px',
          borderRadius: '12px'
        }}>
          Total: 130 solicitudes
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: 0, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="nombre" 
            angle={-45}
            textAnchor="end"
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="solicitudes" 
            fill="#1a1060" 
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ 
        textAlign: 'center', 
        marginTop: '10px', 
        fontSize: '12px', 
        color: '#666' 
      }}>
        Distribución de solicitudes por tipo de curso
      </div>
    </div>
  );
};

export default SolicitudesPorCursoChart;