import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import restaurant from '../assets/restaurant.png'
import band from '../assets/Band.png'

function AboutSection() {
  const textRef = useRef(null)

  useEffect(() => {
    const words = textRef.current.querySelectorAll('.word')

    words.forEach((word) => {
      word.addEventListener('mousemove', (e) => {
        const rect = word.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (e.clientX - centerX) * 0.4
        const deltaY = (e.clientY - centerY) * 0.4

        gsap.to(word, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: 'power2.out',
        })
      })

      word.addEventListener('mouseleave', () => {
        gsap.to(word, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        })
      })
    })
  }, [])

  const text = 'More than a meal. Pingaara is an experience. Rooted in coastal heritage, serving handpicked seafood crafted with care.'
  const words = text.split(' ')

  return (
    <section
      style={{
        backgroundColor: '#EAE202',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top band */}
      <img
        src={band}
        alt=""
        style={{
          width: '100%',
          display: 'block',
          height: '65px',
          objectFit: 'cover',
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'Center',
          padding: '80px 80px',
          gap: '60px',
          minHeight: '460px',
        }}
      >
        {/* Left — Fluid Text */}
        <div
          ref={textRef}
          style={{
            maxWidth: '420px',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1.5rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.01em',
            lineHeight: 1.5,
            color: '#1D5C26',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            cursor: 'default',
          }}
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="word"
              style={{
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#1D5C26'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#1D5C26'
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Right — Restaurant Image */}
        <div
          style={{
            flexShrink: 0,
            width: '380px',
            height: '280px',
            overflow: 'hidden',
            borderRadius: '4px',
          }}
        >
          <img
            src={restaurant}
            alt="Pingaara Restaurant"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      {/* Bottom band — flipped */}
      <img
        src={band}
        alt=""
        style={{
          width: '100%',
          display: 'block',
          height: '65px',
          objectFit: 'cover',
          transform: 'scaleX(-1)',
        }}
      />
    </section>
  )
}

export default AboutSection