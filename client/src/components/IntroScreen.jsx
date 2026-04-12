import { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.png'

function IntroScreen({ onFinish }) {
  const canvasRef = useRef(null)
  const [logoVisible, setLogoVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, grains = [], animId, startTime = null

    const COLORS = ['#EAE202', '#f5f0a0', '#fffde0', '#c8b800']
    const RINGS = [
      { radiusFrac: 0.08, count: 10, speed:  0.006 },
      { radiusFrac: 0.18, count: 16, speed: -0.004 },
      { radiusFrac: 0.30, count: 22, speed:  0.003 },
      { radiusFrac: 0.43, count: 28, speed: -0.002 },
      { radiusFrac: 0.57, count: 34, speed:  0.0015 },
    ]

    function resize() {
      const rect = canvas.getBoundingClientRect()
      W = canvas.width = rect.width * devicePixelRatio
      H = canvas.height = rect.height * devicePixelRatio
      initGrains()
    }

    function initGrains() {
      grains = []
      for (const ring of RINGS) {
        for (let i = 0; i < ring.count; i++) {
          const baseAngle = (i / ring.count) * Math.PI * 2
          grains.push({
            ring,
            currentAngle: baseAngle,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            len: (Math.random() * 5 + 5) * devicePixelRatio,
            r: (Math.random() * 1.2 + 0.8) * devicePixelRatio,
          })
        }
      }
    }

    function draw(ts) {
      if (!startTime) startTime = ts
      const elapsed = (ts - startTime) / 1000
      ctx.clearRect(0, 0, W, H)
      const cx = W / 2, cy = H / 2

      for (const g of grains) {
        g.currentAngle += g.ring.speed
        const r = g.ring.radiusFrac * Math.min(W, H)
        const x = cx + Math.cos(g.currentAngle) * r
        const y = cy + Math.sin(g.currentAngle) * r
        const tangent = g.currentAngle + Math.PI / 2

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(tangent)
        ctx.globalAlpha = Math.min(elapsed / 0.8, 1)
        ctx.fillStyle = g.color
        ctx.beginPath()
        ctx.ellipse(0, 0, g.len, g.r * 0.5, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      if (elapsed > 1.5) setLogoVisible(true)

      if (elapsed > 6) {
        setExiting(true)
        cancelAnimationFrame(animId)
        setTimeout(() => onFinish(), 1200)
        return
      }

      animId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    resize()
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1D5C26',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: exiting ? 'translateY(-100%)' : 'translateY(0)',
        opacity: exiting ? 0 : 1,
        transition: 'transform 1.2s cubic-bezier(0.76,0,0.24,1), opacity 0.8s ease',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? 'scale(1.8)' : 'scale(0.6)',
          transition: 'opacity 1.2s ease, transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <img
          src={logo}
          alt="Pingaara"
          style={{ width: '200px' }}
        />
      </div>
    </div>
  )
}

export default IntroScreen