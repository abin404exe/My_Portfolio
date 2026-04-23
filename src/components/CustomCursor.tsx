import { useEffect, useRef } from 'react'

interface BlobPoint {
  x: number
  y: number
  age: number
  maxAge: number
}

function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // hide default cursor
    document.body.style.cursor = 'none'

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const trail: BlobPoint[] = []

    // how many blob drops to spawn per move
    const TRAIL_LENGTH = 18
    const DROP_INTERVAL = 3  // spawn a drop every N pixels moved

    let lastX = mouse.x
    let lastY = mouse.y

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY

      const dx = mouse.x - lastX
      const dy = mouse.y - lastY
      const dist = Math.sqrt(dx * dx + dy * dy)

      // only spawn a new drop if moved enough
      if (dist > DROP_INTERVAL) {
        trail.push({
          x: mouse.x,
          y: mouse.y,
          age: 0,
          maxAge: TRAIL_LENGTH + Math.random() * 10,
        })
        lastX = mouse.x
        lastY = mouse.y
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    // colour palette — purple to teal melt
    const colors = [
      { r: 139, g: 92,  b: 246 },  // purple
      { r: 236, g: 72,  b: 153 },  // pink
      { r: 6,   g: 182, b: 212 },  // teal
      { r: 251, g: 146, b: 60  },  // orange
    ]
    let colorIndex = 0
    let nextColorIndex = 1
    let colorT = 0  // blend factor between two colours

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    let animId: number

    const animate = () => {
      animId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // slowly cycle colours
      colorT += 0.008
      if (colorT >= 1) {
        colorT = 0
        colorIndex = nextColorIndex
        nextColorIndex = (nextColorIndex + 1) % colors.length
      }

      const c1 = colors[colorIndex]
      const c2 = colors[nextColorIndex]
      const r = Math.round(lerp(c1.r, c2.r, colorT))
      const g = Math.round(lerp(c1.g, c2.g, colorT))
      const b = Math.round(lerp(c1.b, c2.b, colorT))

      // draw and age each blob drop
      for (let i = trail.length - 1; i >= 0; i--) {
        const drop = trail[i]
        drop.age += 1

        if (drop.age >= drop.maxAge) {
          trail.splice(i, 1)
          continue
        }

        const lifeRatio = drop.age / drop.maxAge     // 0 = fresh, 1 = dead
        const alpha = (1 - lifeRatio) * 0.85

        // radius grows then shrinks — like a melting drop
        const radius = lifeRatio < 0.4
          ? 8 + lifeRatio * 20           // expand
          : 16 - (lifeRatio - 0.4) * 26 // melt away

        if (radius <= 0) continue

        // slight gravity drip — y drifts down as it ages
        const dripY = drop.y + lifeRatio * lifeRatio * 18

        const grad = ctx.createRadialGradient(
          drop.x, dripY, 0,
          drop.x, dripY, radius
        )
        grad.addColorStop(0,   `rgba(${r},${g},${b},${alpha})`)
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.6})`)
        grad.addColorStop(1,   `rgba(${r},${g},${b},0)`)

        ctx.beginPath()
        ctx.arc(drop.x, dripY, radius, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      // main cursor dot — always on top
      const dotGrad = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 7
      )
      dotGrad.addColorStop(0,   `rgba(${r},${g},${b},1)`)
      dotGrad.addColorStop(0.6, `rgba(${r},${g},${b},0.4)`)
      dotGrad.addColorStop(1,   `rgba(${r},${g},${b},0)`)

      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 7, 0, Math.PI * 2)
      ctx.fillStyle = dotGrad
      ctx.fill()
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )
}

export default CustomCursor