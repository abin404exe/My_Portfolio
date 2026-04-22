import { useEffect, useRef } from 'react'

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // actual mouse position
    let mouseX = 0
    let mouseY = 0

    // ring lags behind — these are its current position
    let ringX = 0
    let ringY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // dot snaps instantly
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    // ring follows with smooth lerp (linear interpolation)
    // lerp = blend current position toward target by a small factor each frame
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12   // 0.12 = how fast it catches up
      ringY += (mouseY - ringY) * 0.12   // lower = more lag, higher = snappier

      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`

      requestAnimationFrame(animate)
    }

    // grow ring on hovering links/buttons
    const onMouseEnter = () => {
      ring.style.width = '50px'
      ring.style.height = '50px'
      ring.style.borderColor = '#00ff88'
      dot.style.opacity = '0'
    }

    const onMouseLeave = () => {
      ring.style.width = '32px'
      ring.style.height = '32px'
      ring.style.borderColor = 'rgba(0,255,136,0.6)'
      dot.style.opacity = '1'
    }

    // hide default cursor on the whole page
    document.body.style.cursor = 'none'

    // apply hover effect to all interactive elements
    const interactives = document.querySelectorAll('a, button')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    window.addEventListener('mousemove', onMouseMove)
    const animId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animId)
      document.body.style.cursor = 'auto'
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [])

  return (
    <>
      {/* small sharp dot */}
      <div ref={dotRef} style={styles.dot} />

      {/* lagging ring */}
      <div ref={ringRef} style={styles.ring} />
    </>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  dot: {
    position: 'fixed',
    width: '6px',
    height: '6px',
    backgroundColor: '#00ff88',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: 'translate(-50%, -50%)',
    transition: 'opacity 0.2s',
  },
  ring: {
    position: 'fixed',
    width: '32px',
    height: '32px',
    border: '1.5px solid rgba(0,255,136,0.6)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.2s, height 0.2s, border-color 0.2s',
  },
}

export default CustomCursor