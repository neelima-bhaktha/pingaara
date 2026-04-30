import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default to customer for registration
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // If there's a redirect target, use it, otherwise default based on role later
  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin ? { username, password } : { username, password, role };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Login to context
      login({ _id: data._id, username: data.username, role: data.role }, data.token);
      
      // Determine redirect
      if (from) {
        navigate(from, { replace: true });
      } else if (data.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/order', { replace: true });
      }
      
    } catch (err) {
      setError(err.message);
    }
  };

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
            {isLogin ? 'Welcome Back' : 'Create Account'}
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
            
            {!isLogin && (
              <div>
                <label>Register As</label>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  style={inputStyle}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
                <small style={{display: 'block', marginTop: '5px', color: '#ccc', fontSize: '0.75rem'}}>
                  (Note: Admin selection is available here for demonstration purposes)
                </small>
              </div>
            )}
            
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
