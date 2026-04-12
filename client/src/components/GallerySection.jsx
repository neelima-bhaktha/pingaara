import band from '../assets/Band.png'
import fish2 from '../assets/fish2.png'
import fish3 from '../assets/fish3.png'

const placeholders = Array.from({ length: 10 }, (_, i) => i)

const reviews = [
  {
    name: 'NEELIMA BHAKTHA',
    text: 'The fish tastes incredibly fresh, the rice is perfectly seasoned, and everything feels thoughtfully made.',
    rating: 0,
  },
  {
    name: 'AKSHITH SHETTY',
    text: 'The fish tastes incredibly fresh, the rice is perfectly seasoned, and everything feels thoughtfully made.',
    rating: 0,
  },
  {
    name: 'NEELIMA BHAKTHA',
    text: 'The fish tastes incredibly fresh, the rice is perfectly seasoned, and everything feels thoughtfully made.',
    rating: 0,
  },
  {
    name: 'AKSHITH SHETTY',
    text: 'The fish tastes incredibly fresh, the rice is perfectly seasoned, and everything feels thoughtfully made.',
    rating: 0,
  },
]

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', gap: '4px', margin: '6px 0 12px' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < rating ? '#EAE202' : 'rgba(234,226,2,0.3)', fontSize: '1.1rem' }}>★</span>
      ))}
    </div>
  )
}

function GallerySection() {
  return (
    <section style={{ backgroundColor: '#1D5C26', overflow: 'hidden' }}>

      {/* Top band */}
      <img
        src={band}
        alt=""
        style={{ width: '100%', display: 'block', height: '65px', objectFit: 'cover' }}
      />

      {/* Auto-scrolling strip */}
      <div style={{ padding: '60px 0', overflow: 'hidden', backgroundColor: '#EAE202' }}>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            width: 'max-content',
            animation: 'scrollLeft 25s linear infinite',
          }}
        >
          {[...placeholders, ...placeholders].map((_, index) => (
            <div
              key={index}
              style={{
                width: '220px',
                height: '160px',
                backgroundColor: '#d1d1d1',
                borderRadius: '6px',
                flexShrink: 0,
              }}
            />
          ))}
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

      {/* Feedback Section */}
      <div style={{ padding: '80px 60px' }}>

        {/* Heading with fish */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          marginBottom: '60px',
          position: 'relative',
        }}>
          {/* Fish 2 — left */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #c8d400 0%, #8a9900 90%, #1D5C26 70%)',
              filter: 'blur(40px)',
              opacity: 0.5,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 0,
            }} />
            <img
              src={fish2}
              alt="Fish"
              style={{ width: '160px', position: 'relative', zIndex: 1 }}
            />
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: '#EAE202',
            fontSize: '3rem',
            textAlign: 'center',
            lineHeight: 1.1,
            maxWidth: '300px',
          }}>
            WHAT GUESTS SAY ABOUT PINGAARA
          </h2>

          {/* Fish 3 — right */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #c8d400 0%, #8a9900 90%, #1D5C26 70%)',
              filter: 'blur(40px)',
              opacity: 0.5,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 0,
            }} />
            <img
              src={fish3}
              alt="Fish"
              style={{ width: '160px', position: 'relative', zIndex: 1 }}
            />
          </div>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px 80px',
          maxWidth: '800px',
          margin: '0 auto 50px',
        }}>
          {reviews.map((review, index) => (
            <div key={index}>
              <p style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: '#EAE202',
                fontSize: '1.1rem',
                letterSpacing: '0.05em',
                marginBottom: '4px',
              }}>
                {review.name}
              </p>
              <StarRating rating={review.rating} />
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                color: 'white',
                fontSize: '0.8rem',
                lineHeight: 1.7,
              }}>
                {review.text}
              </p>
            </div>
          ))}
        </div>

        {/* Read More Button */}
        <div style={{ textAlign: 'center' }}>
          <button style={{
            backgroundColor: '#000A48',
            color: '#EAE202',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '600',
            fontSize: '0.85rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '14px 40px',
            borderRadius: '999px',
            
            cursor: 'pointer',
          }}>
            Read More
          </button>
        </div>

      </div>
    </section>
  )
}

export default GallerySection