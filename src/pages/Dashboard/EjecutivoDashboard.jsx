import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  ClipboardList as ClipboardListIcon,
  BookOpen as BookOpenIcon,
  BarChart2 as BarChart2Icon,
  Users as UsersIcon
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeaderMain from '../../components/common/PageHeaderMain';
import BottomNavigationEjecutivo from './BottomNavigationEjecutivo';
import SolicitudesPage from './SolicitudesPage';
import SolicitudDetalle from './SolicitudDetalle';
import CursosPage from './CursosPage';
import EditCursoPage from './EditCursoPage';
import AddCursoPage from './AddCursoPage';
import PadronPage from './PadronPage';  // Import the new component
import SolicitudesPorCursoChart from './components/SolicitudesPorCursoChart';

const EjecutivoDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('home');
  
  // Detectar la pestaña activa basada en la URL actual
  useEffect(() => {
    if (location.pathname.includes('/solicitudes')) {
      setActiveTab('solicitudes');
    } else if (location.pathname.includes('/cursos') || location.pathname.includes('/edit-curso') || location.pathname.includes('/add-curso')) {
      setActiveTab('cursos');
    } else if (location.pathname.includes('/padron')) {
      setActiveTab('padron');
    } else {
      setActiveTab('home');
    }
  }, [location.pathname]);

  // Datos de ejemplo para la gráfica de solicitudes
  const solicitudesData = [
    { dia: 'Lunes', cantidad: 5 },
    { dia: 'Martes', cantidad: 8 },
    { dia: 'Miércoles', cantidad: 12 },
    { dia: 'Jueves', cantidad: 6 },
    { dia: 'Viernes', cantidad: 9 },
    { dia: 'Sábado', cantidad: 3 },
    { dia: 'Domingo', cantidad: 2 },
  ];

  // Calcular el valor máximo para escalar la gráfica
  const maxSolicitudes = Math.max(...solicitudesData.map(d => d.cantidad));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // Navegación basada en la pestaña seleccionada
    if (tab === 'home' && !location.pathname.endsWith('/dashboard/ejecutivo')) {
      navigate('/dashboard/ejecutivo');
    } else if (tab === 'solicitudes' && !location.pathname.includes('/solicitudes')) {
      navigate('/dashboard/ejecutivo/solicitudes');
    } else if (tab === 'cursos' && !location.pathname.includes('/cursos') && !location.pathname.includes('/edit-curso') && !location.pathname.includes('/add-curso')) {
      navigate('/dashboard/ejecutivo/cursos');
    } else if (tab === 'padron' && !location.pathname.includes('/padron')) {
      navigate('/dashboard/ejecutivo/padron');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const renderHomeContent = () => (
    <div>
      <PageHeaderMain 
          title="CapacitApp"
          subtitle="Panel de administración"
          onLogout={handleLogout}
        />
      <div className="dashboard-content" style={{ paddingTop: 0, paddingBottom: '20px' }}>
      
        {/* Nueva Gráfica: Solicitudes por Curso */}
        <SolicitudesPorCursoChart />

        {/* Gráfica de solicitudes por día */}
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
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Solicitudes Diarias</h3>
            <div style={{ 
              color: '#666', 
              fontSize: '12px',
              backgroundColor: 'rgba(26, 16, 96, 0.1)',
              padding: '4px 8px',
              borderRadius: '12px'
            }}>
              Semana actual
            </div>
          </div>

          {/* Gráfica de barras con Recharts */}
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={solicitudesData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="dia" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value}
              />
              <Tooltip 
                formatter={(value) => [`${value} solicitudes`, 'Cantidad']}
                labelFormatter={(label) => `${label}`}
              />
              <Bar 
                dataKey="cantidad" 
                fill="#1a1060" 
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh', 
        backgroundColor: '#f5f5f5',
        paddingBottom: '60px' // Espacio para la navegación inferior
      }}
    >
      <Routes>
        <Route path="/" element={renderHomeContent()} />
        <Route path="/solicitudes" element={<SolicitudesPage />} />
        <Route path="/solicitudes/:id" element={<SolicitudDetalle />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/edit-curso/:cursoId" element={<EditCursoPage />} />
        <Route path="/add-curso" element={<AddCursoPage />} />
        <Route path="/padron" element={<PadronPage />} />
      </Routes>

      <BottomNavigationEjecutivo 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
    </div>
  );
};

export default EjecutivoDashboard;