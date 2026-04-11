import Navbar from '../components/Navbar'
import fish from '../assets/fish.png'
import AboutSection from '../components/AboutSection'
import MenuSection from '../components/MenuSection'
import GallerySection from '../components/GallerySection'
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
      // Slow gentle bob — full cycle every 3 seconds
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
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#1D5C26' }}>
      <Navbar />

      {/* Hero Section */}
      <section
        className="min-h-screen flex flex-col justify-center px-16"
        style={{ paddingTop: '100px' }}
      >
        {/* Simply Fresh — centered */}
        <div className="text-center mb-12">
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: 'white',
              fontSize: '7rem',
              lineHeight: 1,
            }}
          >
            SIMPLY FRESH.
          </h1>
        </div>

        {/* Text left + Fish right */}
        <div className="flex items-center justify-between gap-10">

          {/* Left Text — shifted right */}
          <div style={{ maxWidth: '420px', marginLeft: '80px' }}>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: '#EAE202',
                fontSize: '3.9rem',
                lineHeight: 1.05,
                marginBottom: '0.6rem', // ← reduced gap
              }}
            >
              SEA FRESH FLAVOURS, EVERY DAY OF THE WEEK.
            </h2>
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: 'white',
                fontSize: '1.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.01em',
                lineHeight: 1.5,
              }}
            >
              More than a meal. Pingaara is an experience. Rooted in coastal
              heritage, serving handpicked seafood crafted with care.
            </p>
          </div>

          {/* Fish + Glow */}
          <div
            style={{
              position: 'relative',
              width: '500px',
              height: '400px',
              flexShrink: 0,
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: 'absolute',
                width: '350px',
                height: '350px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #c8d400 0%, #8a9900 65%, #1D5C26 70%)',
                filter: 'blur(55px)',
                opacity: 0.55,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
              }}
            />
            {/* Fish — toggling via JS ref */}
            <img
              ref={fishRef}
              src={fish}
              alt="Fresh Fish"
              style={{
                position: 'absolute',
                width: '1000px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
                willChange: 'transform',
              }}
            />
            {/* Fresh Fish Only — shifted left */}
            <p
              style={{
                fontFamily: "'Calligraffitti', cursive",
                color: 'white',
                fontSize: '2.2rem',
                fontStyle: 'italic',
                position: 'absolute',
                bottom: '20px',
                right: '80px', // ← moved left from 10px
                zIndex: 2,
                whiteSpace: 'nowrap',
              }}
            >
              Fresh Fish Only!
            </p>
          </div>

        </div>
      </section>
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <Footer />
    </div>
  )
}

export default Home