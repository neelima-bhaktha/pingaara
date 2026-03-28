import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav
      style={{
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
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: "'Calligraffitti', cursive",
          color: '#EAE202',
          fontSize: '2rem',
        }}
      >
        pingaara
      </div>

      {/* Nav Links */}
      <ul
        style={{
          display: 'flex',
          gap: '3rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          fontFamily: "'Poppins', sans-serif",
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'white',
        }}
      >
        <li><Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link></li>
        <li><Link to="/menu" style={{ color: 'white', textDecoration: 'none' }}>Menu</Link></li>
        <li><Link to="/gallery" style={{ color: 'white', textDecoration: 'none' }}>Gallery</Link></li>
      </ul>

      {/* Order Now */}
      <Link
        to="/order"
        style={{
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
        }}
      >
        Order Now
      </Link>
    </nav>
  )
}

export default Navbar