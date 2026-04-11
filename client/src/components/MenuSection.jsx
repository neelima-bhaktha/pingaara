import { useState } from 'react'
import Navbar from '../components/Navbar'
import food1 from '../assets/food1.png'
import food2 from '../assets/food2.png'

const menuItems = [
  'BONDAS', 'BONDAS',
  'BONDAS', 'BONDAS',
  'BONDAS', 'BONDAS',
  'BONDAS', 'BONDAS',
  'BONDAS', 'BONDAS',
]

const images = [food1, food2]

function Menu() {
  const [current, setCurrent] = useState(0)

  // ✅ fixed state update
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  return (
    <div style={{ backgroundColor: '#1D5C26', minHeight: '100vh' }}>
      <Navbar />

      <div style={{
        paddingTop: '100px',
        paddingBottom: '60px',
        paddingLeft: '40px',
        paddingRight: '40px'
      }}>

        {/* Header */}
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          color: '#EAE202',
          fontSize: '2.5rem',
          textAlign: 'center',
          marginBottom: '30px',
          letterSpacing: '0.05em',
        }}>
          EXPLORE OUR WIDE VARIETY OF OUR DISHES
        </h2>

        {/* Carousel */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '10px',
        }}>
          <button onClick={prev} style={arrowStyle}>{'<'}</button>

          <div style={{
            width: '260px',
            height: '200px',
            overflow: 'hidden',
            borderRadius: '8px',
          }}>
            <img
              src={images[current]}
              alt={`Food ${current + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transition: 'opacity 0.3s ease',
              }}
            />
          </div>

          <button onClick={next} style={arrowStyle}>{'>'}</button>
        </div>

        {/* Counter */}
        <div style={counterStyle}>
          {current + 1} / {images.length}
        </div>

        {/* Menu Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              style={{
                padding: '18px 10px',
                borderBottom: '1px solid rgba(234, 226, 2, 0.3)',
                borderRight: index % 2 === 0 ? '1px solid rgba(234, 226, 2, 0.3)' : 'none',
              }}
            >
              <span style={menuTextStyle}>{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          textAlign: 'center',
          marginTop: '80px',
          paddingBottom: '40px',
        }}>
          <h2 style={ctaHeading}>
            FRESH. FLAVORFUL. UNFORGETTABLE.
          </h2>

          <p style={ctaText}>
            Indulge in food that takes you on a journey with the freshest seafood and innovative flavors.
          </p>

          {/* ✅ FIXED BUTTON */}
          <a
            href="tel:+911234567890"
            style={ctaButton}
          >
            Order Now
          </a>
        </div>

      </div>
    </div>
  )
}

/* Styles */
const arrowStyle = {
  background: 'none',
  border: 'none',
  color: '#EAE202',
  fontSize: '2rem',
  cursor: 'pointer',
  fontFamily: "'Poppins', sans-serif",
}

const counterStyle = {
  textAlign: 'center',
  color: 'white',
  fontFamily: "'Poppins', sans-serif",
  fontSize: '0.9rem',
  marginBottom: '40px',
}

const menuTextStyle = {
  fontFamily: "'Bebas Neue', sans-serif",
  color: '#EAE202',
  fontSize: '1.3rem',
  letterSpacing: '0.1em',
}

const ctaHeading = {
  fontFamily: "'Bebas Neue', sans-serif",
  color: '#EAE202',
  fontSize: '3rem',
  marginBottom: '16px',
}

const ctaText = {
  fontFamily: "'Poppins', sans-serif",
  color: 'white',
  fontSize: '0.95rem',
  marginBottom: '30px',
}

const ctaButton = {
  backgroundColor: '#EAE202',
  color: '#1D5C26',
  fontFamily: "'Poppins', sans-serif",
  fontWeight: '700',
  fontSize: '0.85rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  padding: '14px 36px',
  borderRadius: '999px',
  textDecoration: 'none',
  display: 'inline-block',
}

export default Menu