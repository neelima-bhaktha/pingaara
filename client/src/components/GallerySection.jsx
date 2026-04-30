import { useState, useEffect } from 'react'
import band from '../assets/Band.png'
import fish2 from '../assets/fish2.png'
import fish3 from '../assets/fish3.png'

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
  const [reviews, setReviews] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [feedback, setFeedback] = useState('')
  const [image, setImage] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error("Error fetching gallery", err))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!image) return setMsg("Image is required!")
    setMsg("Uploading...")
    const formData = new FormData()
    formData.append('customerName', name)
    formData.append('feedbackText', feedback)
    formData.append('image', image)

    try {
      const res = await fetch('/api/gallery', { method: 'POST', body: formData })
      if(res.ok) {
        setMsg("Success! Your post is pending admin approval before it goes live.")
        setName(''); setFeedback(''); setImage(null); setTimeout(()=>setShowForm(false), 3000)
      } else {
        setMsg("Failed to upload.")
      }
    } catch(err) {
      setMsg("Error submitting.")
    }
  }

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
            animation: reviews.length > 3 ? 'scrollLeft 25s linear infinite' : 'none',
          }}
        >
          {reviews.length === 0 ? (
            <div style={{padding: '0 40px', color:'#000A48', fontWeight:'bold'}}>No photos yet. Be the first to upload!</div>
          ) : (
            [...reviews, ...reviews, ...reviews].map((rev, index) => (
              <img
                key={index}
                src={rev.imageUrl}
                alt="user upload"
                style={{
                  width: '220px',
                  height: '160px',
                  backgroundColor: '#d1d1d1',
                  borderRadius: '6px',
                  flexShrink: 0,
                  objectFit: 'cover'
                }}
              />
            ))
          )}
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
          {reviews.length === 0 && <p style={{color:'white', gridColumn:'span 2', textAlign:'center'}}>Currently no reviews to display. Submit your feedback below!</p>}
          {reviews.map((review) => (
            <div key={review._id}>
              <p style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: '#EAE202',
                fontSize: '1.2rem',
                letterSpacing: '0.05em',
                marginBottom: '4px',
              }}>
                {review.customerName}
              </p>
              <StarRating rating={5} />
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                color: 'white',
                fontSize: '0.85rem',
                lineHeight: 1.7,
              }}>
                "{review.feedbackText}"
              </p>
            </div>
          ))}
        </div>

        {/* Upload Button & Form */}
        <div style={{ textAlign: 'center' }}>
          {msg && <p style={{color: '#EAE202', marginBottom: '15px'}}>{msg}</p>}
          
          {!showForm ? (
            <button 
              onClick={() => setShowForm(true)}
              style={{
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
                border: 'none'
              }}
            >
              Share Your Pingaara Moment
            </button>
          ) : (
            <div style={{ backgroundColor: '#000A48', padding: '30px', borderRadius: '12px', maxWidth: '500px', margin: '0 auto' }}>
              <h3 style={{fontFamily: "'Bebas Neue', sans-serif", color: '#EAE202', fontSize: '2rem', marginBottom: '20px'}}>Submit your review</h3>
              <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <input type="text" placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} required style={inputStyle} />
                <textarea placeholder="Write your feedback..." value={feedback} onChange={e=>setFeedback(e.target.value)} required style={{...inputStyle, minHeight: '80px'}} />
                <input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} required style={{color: 'white'}} />
                <button type="submit" style={{backgroundColor: '#EAE202', color: '#000A48', padding: '10px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer'}}>Upload to Gallery</button>
                <button type="button" onClick={() => setShowForm(false)} style={{background: 'none', color: 'white', border: 'none', cursor: 'pointer', marginTop: '10px'}}>Cancel</button>
              </form>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}

const inputStyle = { width: '100%', padding: '12px', borderRadius: '6px', border: 'none', fontFamily: "'Poppins', sans-serif" }

export default GallerySection