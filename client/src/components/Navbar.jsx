import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100%',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 64px',
      backgroundColor: '#1D5C26',
      boxSizing: 'border-box',
    }}>
      <Link to="/">
        <img src={logo} alt="Pingaara" style={{ height: '45px', objectFit: 'contain' }} />
      </Link>

      <ul className="nav-links" style={{
        display: 'flex',
        gap: '3rem',
        listStyle: 'none',
        margin: 0, padding: 0,
        fontFamily: "'Poppins', sans-serif",
        fontSize: '0.85rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}>
        {[{ label: 'About', path: '/about' }, { label: 'Menu', path: '/menu' }, { label: 'Gallery', path: '/gallery' }].map(({ label, path }) => (
          <li key={path}>
            <NavLink to={path} style={({ isActive }) => ({
              color: 'white',
              textDecoration: 'none',
              opacity: isActive ? 1 : 0.85,
              borderBottom: isActive ? '2px solid #EAE202' : 'none',
            })}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <Link to="/order" className="nav-order-btn" style={{
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
      }}>
        Order Now
      </Link>
    </nav>
  )
}

export default Navbar