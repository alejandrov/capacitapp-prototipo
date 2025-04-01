import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import EmailVerification from './pages/Auth/EmailVerification';
import VerificationComplete from './pages/Auth/VerificationComplete';
import IDVerificationInstructions from './pages/Auth/IDVerificationInstructions';
import IDCameraCapture from './pages/Auth/IDCameraCapture';
import IDConfirmation from './pages/Auth/IDConfirmation';
import SelfieInstructions from './pages/Auth/SelfieInstructions';
import SelfieCameraCapture from './pages/Auth/SelfieCameraCapture';
import EmpleadoDashboard from './pages/Dashboard/EmpleadoDashboard';
import EjecutivoDashboard from './pages/Dashboard/EjecutivoDashboard';
import ExternoDashboard from './pages/Dashboard/ExternoDashboard';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import useAuth from './hooks/useAuth';

// Componente wrapper para rutas protegidas
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-screen">Cargando...</div>;
  }
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

// Componente para redireccionar al dashboard según el rol
const DashboardRedirect = () => {
  const { currentUser } = useAuth();
  
  if (currentUser?.role === 'empleado') {
    return <Navigate to="/dashboard/empleado" />;
  } else if (currentUser?.role === 'ejecutivo') {
    return <Navigate to="/dashboard/ejecutivo" />;
  } else if (currentUser?.role === 'externo') {
    return <Navigate to="/dashboard/externo" />;
  } else {
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<EmailVerification />} />
        <Route path="/verification-complete" element={<VerificationComplete />} />
        <Route path="/id-verification" element={<IDVerificationInstructions />} />
        <Route path="/id-camera" element={<IDCameraCapture />} />
        <Route path="/id-confirmation" element={<IDConfirmation />} />
        <Route path="/selfie-instructions" element={<SelfieInstructions />} />
        <Route path="/selfie-camera" element={<SelfieCameraCapture />} />
        
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route path="/dashboard/empleado" element={<EmpleadoDashboard />} />
          <Route path="/dashboard/ejecutivo" element={<EjecutivoDashboard />} />
          <Route path="/dashboard/externo" element={<ExternoDashboard />} />
        </Route>
        
        {/* Ruta de 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;