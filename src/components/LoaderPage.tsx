import { useEffect, useState } from 'react'

interface LoaderProps {
  onComplete: () => void
}

function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)  // controls speed changes

  useEffect(() => {
    // simulate realistic loading — fast then slow then burst to 100
    const phases = [
      { target: 30, speed: 40  },   // quick start
      { target: 60, speed: 80  },   // slows down (like real loading)
      { target: 85, speed: 120 },   // crawls (suspense)
      { target: 100, speed: 35 },   // bursts to done
    ]

    let current = 0
    let phaseIndex = 0

    const tick = () => {
      const { target, speed } = phases[phaseIndex]

      if (current < target) {
        current += 1
        setProgress(current)
      } else {
        phaseIndex += 1
        if (phaseIndex >= phases.length) return  // done
        setPhase(phaseIndex)
      }

      setTimeout(tick, speed)
    }

    const t = setTimeout(tick, 300)  // small delay before starting
    return () => clearTimeout(t)
  }, [])

  // once progress hits 100 wait a beat then call onComplete
  useEffect(() => {
    if (progress === 100) {
      const t = setTimeout(onComplete, 800)
      return () => clearTimeout(t)
    }
  }, [progress, onComplete])

  // scanline rows for the retro feel
  const rows = Array.from({ length: 8 })

  return (
    <div style={styles.overlay}>

      {/* top left — system boot text */}
      <div style={styles.bootLog}>
        <p style={styles.bootLine}>BIOS v2.4.1 ... <span style={styles.green}>OK</span></p>
        <p style={styles.bootLine}>Initializing memory ... <span style={styles.green}>OK</span></p>
        <p style={styles.bootLine}>
          Loading modules ...{' '}
          <span style={progress < 100 ? styles.amber : styles.green}>
            {progress < 100 ? 'WAIT' : 'OK'}
          </span>
        </p>
        {progress >= 60 && (
          <p style={styles.bootLine}>
            Mounting portfolio ... <span style={styles.green}>OK</span>
          </p>
        )}
        {progress === 100 && (
          <p style={styles.bootLine}>
            Booting Abin.exe ... <span style={styles.green}>DONE</span>
          </p>
        )}
      </div>

      {/* centre — progress bar */}
      <div style={styles.centre}>

        <p style={styles.label}>SYSTEM LOAD</p>

        {/* outer bar shell — old school chunked look */}
        <div style={styles.barShell}>
          {rows.map((_, i) => {
            const filled = i / rows.length < progress / 100
            return (
              <div
                key={i}
                style={{
                  ...styles.barChunk,
                  backgroundColor: filled ? '#00ff88' : 'transparent',
                  borderColor: filled ? '#00ff88' : '#1a1a1a',
                  // slight stagger so it fills left to right
                  opacity: filled ? 1 : 0.3,
                }}
              />
            )
          })}
        </div>

        {/* scanline overlay for CRT feel */}
        <div style={styles.scanlines} />

        <p style={styles.subLabel}>
          {progress < 100 ? 'LOADING...' : 'COMPLETE'}
        </p>
      </div>

      {/* bottom right — percentage */}
      <div style={styles.percentBox}>
        <span style={styles.percentNum}>{String(progress).padStart(3, '0')}</span>
        <span style={styles.percentSign}>%</span>
      </div>

      {/* bottom left — fake system info */}
      <div style={styles.sysInfo}>
        <p style={styles.sysLine}>CPU: portfolio.exe</p>
        <p style={styles.sysLine}>MEM: {Math.floor(progress * 2.4)}MB / 256MB</p>
        <p style={styles.sysLine}>SYS: ABIN_OS v1.0</p>
      </div>

    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: '#000',
    zIndex: 9999,
    fontFamily: 'Courier New, monospace',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  // boot log — top left
  bootLog: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  bootLine: {
    fontSize: '0.75rem',
    color: '#444',
    letterSpacing: '1px',
    margin: 0,
  },
  green: {
    color: '#00ff88',
  },
  amber: {
    color: '#f59e0b',
  },

  // centre block
  centre: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    position: 'relative',
  },
  label: {
    color: '#333',
    fontSize: '0.7rem',
    letterSpacing: '4px',
    margin: 0,
  },

  // chunked bar
  barShell: {
    display: 'flex',
    gap: '4px',
    padding: '6px',
    border: '1px solid #1a1a1a',
    backgroundColor: '#050505',
  },
  barChunk: {
    width: '28px',
    height: '28px',
    border: '1px solid',
    transition: 'background-color 0.1s, border-color 0.1s',
  },
  scanlines: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
    pointerEvents: 'none',
  },
  subLabel: {
    color: '#00ff88',
    fontSize: '0.65rem',
    letterSpacing: '3px',
    margin: 0,
  },

  // bottom right percentage
  percentBox: {
    position: 'absolute',
    bottom: '40px',
    right: '40px',
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
  },
  percentNum: {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#00ff88',
    letterSpacing: '-2px',
    fontVariantNumeric: 'tabular-nums',
  },
  percentSign: {
    fontSize: '1.5rem',
    color: '#1a5c3a',
  },

  // bottom left sys info
  sysInfo: {
    position: 'absolute',
    bottom: '40px',
    left: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  sysLine: {
    fontSize: '0.7rem',
    color: '#222',
    letterSpacing: '1px',
    margin: 0,
  },
}

export default Loader