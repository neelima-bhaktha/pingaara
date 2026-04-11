import { Link, NavLink } from 'react-router-dom'

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
  logo: {
    fontFamily: "'Calligraffitti', cursive",
    color: '#EAE202',
    fontSize: '2rem',
    textDecoration: 'none',
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
    backgroundColor: '#EAE202',
    color: '#1D5C26',
    fontWeight: '700',
    fontSize: '0.85rem',
    letterSpacing: '0.15em',
    padding: '10px 28px',
    borderRadius: '999px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },
}

const navItems = [
  { label: 'About', path: '/about' },
  { label: 'Menu', path: '/menu' },
  { label: 'Gallery', path: '/gallery' },
]

function Navbar() {
  return (
    <nav style={styles.nav}>

      {/* Logo */}
      <Link to="/" style={styles.logo}>
        pingaara
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
      </ul>

      {/* Order Now */}
      <Link
        to="/order"
        style={styles.orderBtn}
        onMouseEnter={e => {
          e.target.style.backgroundColor = '#1D5C26'
          e.target.style.color = '#EAE202'
          e.target.style.outline = '2px solid #EAE202'
        }}
        onMouseLeave={e => {
          e.target.style.backgroundColor = '#EAE202'
          e.target.style.color = '#1D5C26'
          e.target.style.outline = 'none'
        }}
      >
        Order Now
      </Link>

    </nav>
  )
}

export default Navbar