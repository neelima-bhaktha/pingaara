import Navbar from '../components/Navbar'
import fish from '../assets/fish.png'

function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#1D5C26' }}>
      <Navbar />

      {/* Hero Section — starts below navbar */}
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
              
              textDecorationColor: '#EAE202',
              textUnderlineOffset: '10px',
              lineHeight: 1,
            }}
          >
            SIMPLY FRESH.
          </h1>
        </div>

        {/* Text left + Fish right */}
        <div className="flex items-center justify-between gap-10">

          {/* Left Text */}
          <div style={{ maxWidth: '420px' }}>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: '#EAE202',
                fontSize: '3.9rem',
                lineHeight: 1.05,
                marginBottom: '1.5rem',
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
            {/* Fish */}
            <img
              src={fish}
              alt="Fresh Fish"
              style={{
                position: 'absolute',
                width: '1000px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            />
            {/* Fresh Fish Only */}
            <p
              style={{
                fontFamily: "'Calligraffitti', cursive",
                color: 'white',
                fontSize: '1.5rem',
                fontStyle: 'italic',
                position: 'absolute',
                bottom: '20px',
                right: '10px',
                zIndex: 2,
                whiteSpace: 'nowrap',
              }}
            >
              Fresh Fish Only!
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Home