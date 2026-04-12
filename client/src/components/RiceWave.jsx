import { useEffect, useRef } from 'react'

function RiceWave() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, grains = [], animFrameId
    const COUNT = 500
    const COLORS = ['#EAE202', '#f5f0a0', '#fffde0', '#c8b800', '#EAE202']
    const mouse = { x: -999, y: -999 }

    function resize() {
      const rect = canvas.getBoundingClientRect()
      W = canvas.width = rect.width * devicePixelRatio
      H = canvas.height = rect.height * devicePixelRatio
      initGrains()
    }

    function wavePos(i) {
      const cols = Math.ceil(Math.sqrt(COUNT * 2))
      const col = i % cols
      const row = Math.floor(i / cols)
      const spacingX = W / (cols + 1)
      const spacingY = H / (Math.ceil(COUNT / cols) + 1)
      const x = spacingX * (col + 1)
      const waveOffset = Math.sin((col / cols) * Math.PI * 3) * 40 * devicePixelRatio
      const y = spacingY * (row + 1) + waveOffset
      const angle = Math.atan2(
        Math.cos((col / cols) * Math.PI * 3) * 40 * devicePixelRatio,
        spacingX
      )
      return { x, y, angle }
    }

    function initGrains() {
      grains = []
      for (let i = 0; i < COUNT; i++) {
        const pos = wavePos(i)
        grains.push({
          ox: pos.x, oy: pos.y,
          x: pos.x, y: pos.y,
          vx: 0, vy: 0,
          r: (Math.random() * 1.2 + 0.8) * devicePixelRatio,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          angle: pos.angle,
          len: (Math.random() * 5 + 4) * devicePixelRatio,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      const mx = mouse.x * devicePixelRatio
      const my = mouse.y * devicePixelRatio
      const RADIUS = 70 * devicePixelRatio
      const FORCE = 7 * devicePixelRatio

      for (const g of grains) {
        const dx = g.x - mx
        const dy = g.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < RADIUS && dist > 0) {
          const strength = (1 - dist / RADIUS) * FORCE
          g.vx += (dx / dist) * strength
          g.vy += (dy / dist) * strength
        }

        g.vx += (g.ox - g.x) * 0.04
        g.vy += (g.oy - g.y) * 0.04
        g.vx *= 0.80
        g.vy *= 0.80
        g.x += g.vx
        g.y += g.vy

        ctx.save()
        ctx.translate(g.x, g.y)
        const moveAngle = Math.sqrt(g.vx * g.vx + g.vy * g.vy) > 0.5
          ? Math.atan2(g.vy, g.vx)
          : g.angle
        ctx.rotate(moveAngle)
        ctx.fillStyle = g.color
        ctx.beginPath()
        ctx.ellipse(0, 0, g.len, g.r * 0.5, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      animFrameId = requestAnimationFrame(draw)
    }

    const onMouseMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onMouseLeave = () => { mouse.x = -999; mouse.y = -999 }
    const onTouchMove = (e) => {
      e.preventDefault()
      const r = canvas.getBoundingClientRect()
      mouse.x = e.touches[0].clientX - r.left
      mouse.y = e.touches[0].clientY - r.top
    }
    const onTouchEnd = () => { mouse.x = -999; mouse.y = -999 }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('touchmove', onTouchMove, { passive: false })
    canvas.addEventListener('touchend', onTouchEnd)
    window.addEventListener('resize', resize)

    resize()
    draw()

    return () => {
      cancelAnimationFrame(animFrameId)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '220px',
        cursor: 'none',
        backgroundColor: '#1D5C26',
      }}
    />
  )
}

export default RiceWave