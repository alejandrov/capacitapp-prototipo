import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import EmailVerification from './pages/Auth/EmailVerification';
import VerificationComplete from './pages/Auth/VerificationComplete';
import IDVerificationInstructions from './pages/Auth/IDVerificationInstructions';
import IDCameraCapture from './pages/Auth/IDCameraCapture';
import SelfieInstructions from './pages/Auth/SelfieInstructions';
import SelfieCameraCapture from './pages/Auth/SelfieCameraCapture';
import EmpleadoDashboard from './pages/Dashboard/EmpleadoDashboard';
import MessagesPage from './pages/Dashboard/MessagesPage';
import EjecutivoDashboard from './pages/Dashboard/EjecutivoDashboard';
import ExternoDashboard from './pages/Dashboard/ExternoDashboard';
import SafetyCourse from './pages/Courses/SafetyCourse';
import RiskIdentificationModule from './pages/Courses/RiskIdentificationModule';
import ComplementaryTestModule from './pages/Courses/ComplementaryTestModule';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import useAuth from './hooks/useAuth';
import MisCursosPage from './pages/Dashboard/MisCursosPage';
import CursoDetalle from './pages/Dashboard/CursoDetalle';

// Componente wrapper para rutas protegidas
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-screen">Cargando...</div>;
  }
  
  // Usamos replace para evitar problemas de navegación
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Componente para redireccionar al dashboard según el rol
const DashboardRedirect = () => {
  const { currentUser } = useAuth();
  
  // Usamos useMemo para calcular la ruta de redirección
  const redirectPath = React.useMemo(() => {
    if (currentUser?.role === 'empleado') {
      return '/dashboard/empleado';
    } else if (currentUser?.role === 'ejecutivo') {
      return '/dashboard/ejecutivo';
    } else if (currentUser?.role === 'externo') {
      return '/dashboard/externo';
    } else {
      return '/login';
    }
  }, [currentUser?.role]);

  // Retornamos el componente Navigate con replace=true para evitar ciclos
  return <Navigate to={redirectPath} replace />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<EmailVerification />} />
        <Route path="/verification-complete" element={<VerificationComplete />} />
        <Route path="/id-verification" element={<IDVerificationInstructions />} />
        <Route path="/id-camera" element={<IDCameraCapture />} />
        <Route path="/selfie-instructions" element={<SelfieInstructions />} />
        <Route path="/selfie-camera" element={<SelfieCameraCapture />} />
        
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route path="/dashboard/empleado" element={<EmpleadoDashboard />} />
          <Route path="/dashboard/empleado/messages" element={<MessagesPage />} />
          <Route path="/dashboard/empleado/courses" element={<MisCursosPage />} />
          <Route path="/dashboard/empleado/courses/:id" element={<CursoDetalle />} />
          
          {/* Rutas para el dashboard del ejecutivo con subrutas */}
          <Route path="/dashboard/ejecutivo/*" element={<EjecutivoDashboard />} />
          
          <Route path="/dashboard/externo" element={<ExternoDashboard />} />
          <Route path="/courses/safety" element={<SafetyCourse />} />
          <Route path="/courses/risk-identification" element={<RiskIdentificationModule />} />
          <Route path="/courses/complementary-test" element={<ComplementaryTestModule />} />
        </Route>
        
        {/* Ruta de 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;