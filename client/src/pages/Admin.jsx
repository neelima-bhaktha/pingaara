import { useState } from 'react';
import Navbar from '../components/Navbar';
import AdminDashboard from '../components/AdminDashboard';

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [isLogin, setIsLogin] = useState(true);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  if (token) {
    return <AdminDashboard token={token} onLogout={handleLogout} />;
  }

  return (
    <div style={{ backgroundColor: '#1D5C26', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '120px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
          backgroundColor: '#000A48', 
          padding: '40px', 
          borderRadius: '12px',
          width: '100%',
          maxWidth: '400px',
          color: 'white',
          fontFamily: "'Poppins', sans-serif"
        }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: '#EAE202', textAlign: 'center' }}>
            {isLogin ? 'Admin Login' : 'Admin Register'}
          </h2>
          
          {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '0.9rem' }}>{error}</p>}
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            <div>
              <label>Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            
            <button type="submit" style={buttonStyle}>
              {isLogin ? 'Log In' : 'Register'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span 
              onClick={() => setIsLogin(!isLogin)} 
              style={{ color: '#EAE202', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {isLogin ? 'Register' : 'Log In'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #4a5568',
  backgroundColor: '#1a202c',
  color: 'white',
  marginTop: '5px'
};

const buttonStyle = {
  backgroundColor: '#EAE202',
  color: '#000A48',
  padding: '12px',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '10px'
};
