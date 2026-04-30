import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useAuth } from '../context/AuthContext'

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 64px',
    backgroundColor: '#1D5C26',
    boxSizing: 'border-box',
  },
  navList: {
    display: 'flex',
    gap: '3rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    fontFamily: "'Poppins', sans-serif",
    fontSize: '0.85rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    opacity: 0.85,
    transition: 'opacity 0.2s ease',
  },
  orderBtn: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#000A48',
    color: '#EAE202',
    fontWeight: '700',
    fontSize: '0.85rem',
    letterSpacing: '0.15em',
    padding: '10px 28px',
    borderRadius: '999px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease, color 0.2s ease',
    cursor: 'pointer',
    border: 'none',
    display: 'inline-block',
  },
}

const navItems = [
  { label: 'About', path: '/about' },
  { label: 'Menu', path: '/menu' },
  { label: 'Gallery', path: '/gallery' },
]

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>

      {/* Logo */}
      <Link to="/">
        <img
          src={logo}
          alt="Pingaara"
          style={{ height: '50px', objectFit: 'contain' }}
        />
      </Link>

      {/* Nav Links */}
      <ul style={styles.navList}>
        {navItems.map(({ label, path }) => (
          <li key={path}>
            <NavLink
              to={path}
              style={({ isActive }) => ({
                ...styles.navLink,
                opacity: isActive ? 1 : 0.85,
                borderBottom: isActive ? '2px solid #EAE202' : 'none',
              })}
            >
              {label}
            </NavLink>
          </li>
        ))}
        {user && user.role === 'admin' && (
          <li>
            <NavLink to="/admin" style={styles.navLink}>Dashboard</NavLink>
          </li>
        )}
      </ul>

      {/* Right side buttons */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {user ? (
          <>
            {user.role === 'customer' && (
              <Link to="/order" style={styles.orderBtn}>Order Now</Link>
            )}
            <button onClick={handleLogout} style={{ ...styles.orderBtn, backgroundColor: 'transparent', color: 'white', border: '1px solid white' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ ...styles.orderBtn, backgroundColor: 'transparent', color: 'white', border: '1px solid white' }}>
              Login
            </Link>
            <Link to="/order" style={styles.orderBtn}>
              Order Now
            </Link>
          </>
        )}
      </div>

    </nav>
  )
}

export default Navbar