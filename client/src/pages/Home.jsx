import Navbar from '../components/Navbar'
import fish from '../assets/fish.png'
import AboutSection from '../components/AboutSection'
import GallerySection from '../components/GallerySection'
import RiceWave from '../components/RiceWave'
import Footer from '../components/Footer'
import { useEffect, useRef } from 'react'

function Home() {
  const fishRef = useRef(null)

  useEffect(() => {
    let start = null
    let animFrameId
    const animate = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const y = Math.sin((elapsed / 3000) * 2 * Math.PI) * 12
      const rotate = Math.sin((elapsed / 3000) * 2 * Math.PI) * 2.5
      if (fishRef.current) {
        fishRef.current.style.transform = `translate(-50%, calc(-50% + ${y}px)) rotate(${rotate}deg)`
      }
      animFrameId = requestAnimationFrame(animate)
    }
    animFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrameId)
  }, [])

  return (
    <div style={{ backgroundColor: '#1D5C26', overflowX: 'hidden' }}>
      <Navbar />

      <section
        className="hero-section"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '100px 64px 40px',
        }}
      >
        {/* Simply Fresh */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 className="hero-title" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: 'white',
            fontSize: '7rem',
            lineHeight: 1,
            textDecoration: 'underline',
            textDecorationColor: '#EAE202',
            textUnderlineOffset: '10px',
          }}>
            SIMPLY FRESH.
          </h1>
        </div>

        {/* Text + Fish */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: '420px', marginLeft: '80px' }}>
            <h2 className="hero-subtitle" style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: '#EAE202',
              fontSize: '3.9rem',
              lineHeight: 1.05,
              marginBottom: '0.6rem',
            }}>
              SEA FRESH FLAVOURS, EVERY DAY OF THE WEEK.
            </h2>
            <p className="hero-body" style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: 'white',
              fontSize: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.01em',
              lineHeight: 1.5,
            }}>
              More than a meal. Pingaara is an experience. Rooted in coastal
              heritage, serving handpicked seafood crafted with care.
            </p>
          </div>

          {/* Fish */}
          <div className="fish-container" style={{
            position: 'relative',
            width: '500px',
            height: '400px',
            flexShrink: 0,
          }}>
            <div style={{
              position: 'absolute',
              width: '350px', height: '350px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #c8d400 0%, #8a9900 65%, #1D5C26 70%)',
              filter: 'blur(55px)',
              opacity: 0.55,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 0,
            }} />
            <img
              ref={fishRef}
              src={fish}
              alt="Fresh Fish"
              className="fish-img"
              style={{
                position: 'absolute',
                width: '1000px',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
                willChange: 'transform',
              }}
            />
            <p style={{
              fontFamily: "'Calligraffitti', cursive",
              color: 'white',
              fontSize: '2.2rem',
              fontStyle: 'italic',
              position: 'absolute',
              bottom: '20px', right: '80px',
              zIndex: 2,
              whiteSpace: 'nowrap',
            }}>
              Fresh Fish Only!
            </p>
          </div>
        </div>
      </section>

      <AboutSection />
      <GallerySection />
      <RiceWave />
      <Footer />
    </div>
  )
}

export default Home