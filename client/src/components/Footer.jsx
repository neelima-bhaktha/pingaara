import band from '../assets/band.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer style={{ backgroundColor: '#EAE202' }}>

      {/* Top band */}
      <img
        src={band}
        alt=""
        style={{ width: '100%', display: 'block', height: '65px', objectFit: 'cover' }}
      />

      {/* Main footer content */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '60px 80px',
        gap: '40px',
      }}>

        {/* Left — Map */}
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '2rem',
            color: '#1D5C26',
            marginBottom: '20px',
            letterSpacing: '0.05em',
          }}>
            WHERE TO FIND US
          </h3>
          <iframe
            title="Pingaara Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.8!2d74.8560!3d12.9141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzUwLjgiTiA3NMKwNTEnMjEuNiJF!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="220"
            style={{
              border: 'none',
              borderRadius: '6px',
            }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>

        {/* Right — Hours & Contact */}
        <div style={{ flex: 1, paddingLeft: '60px' }}>

          {/* Hours */}
          <h3 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '2rem',
            color: '#1D5C26',
            letterSpacing: '0.05em',
            marginBottom: '10px',
          }}>
            HOURS
          </h3>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.95rem',
            color: '#1D5C26',
            marginBottom: '30px',
          }}>
            SUNDAY–MONDAY 11:00AM – 12:00PM
          </p>

          {/* Contact */}
          <h3 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '2rem',
            color: '#1D5C26',
            letterSpacing: '0.05em',
            marginBottom: '10px',
          }}>
            CONTACT
          </h3>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.95rem',
            color: '#1D5C26',
            lineHeight: 1.8,
          }}>
            hello@pingaara.com<br />
            +91 12345-67890
          </p>

          {/* Nav Links */}
          <div style={{
            display: 'flex',
            gap: '30px',
            marginTop: '30px',
          }}>
            {['HOME', 'ABOUT', 'MENU', 'GALLERY'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  color: '#1D5C26',
                  textDecoration: 'none',
                }}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Fresh Fish Only */}
          <p style={{
            fontFamily: "'Calligraffitti', cursive",
            fontSize: '2rem',
            color: '#1D5C26',
            marginTop: '20px',
            fontStyle: 'italic',
          }}>
            Fresh Fish Only!
          </p>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(29, 92, 38, 0.3)',
        padding: '16px 80px',
      }}>
        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '0.8rem',
          color: '#1D5C26',
        }}>
          Site by Neelima
        </p>
      </div>

    </footer>
  )
}

export default Footer