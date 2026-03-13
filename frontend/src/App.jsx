import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import MarketplaceHome from './pages/MarketplaceHome';
import AgentDetail from './pages/AgentDetail';
import DeveloperDashboard from './pages/DeveloperDashboard';
import './styles/global.css';

function ProtectedRoute({ children, requireDeveloper }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireDeveloper && user.role !== 'developer') {
    return <Navigate to="/marketplace" replace />;
  }
  
  return children;
}

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/marketplace" replace /> : <LandingPage />} />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/marketplace" replace /> : <Login />} 
        />
        <Route path="/marketplace" element={<MarketplaceHome />} />
        <Route path="/agent/:id" element={<AgentDetail />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireDeveloper>
              <DeveloperDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
