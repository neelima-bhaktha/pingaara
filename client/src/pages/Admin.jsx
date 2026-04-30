import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AdminDashboard from '../components/AdminDashboard';
import { useAuth } from '../context/AuthContext';

export default function Admin() {
  const { user, loading, logout } = useAuth();
  
  if (loading) {
    return <div style={{ backgroundColor: '#1D5C26', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ backgroundColor: '#1D5C26', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <AdminDashboard token={localStorage.getItem('token')} onLogout={logout} />
      </div>
    </div>
  );
}
