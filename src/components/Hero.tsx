import React from 'react'
import { TypeAnimation } from 'react-type-animation'

function Hero() {
  return (
    <section style={styles.section} id="hero">

      <p style={styles.greeting}>hi, i'm</p>
      <h1 style={styles.name}>Abin</h1>

      <TypeAnimation
        sequence={[
          "I build backends that don't break.",  2000,
          "I architect APIs from scratch.",       2000,
          "I turn coffee into clean code.",       2000,
          "Full-stack. Always learning.",         2000,
        ]}
        wrapper="h2"
        speed={50}
        repeat={Infinity}
        style={styles.typewriter}
      />

      <p style={styles.subtext}>
        Based in India · Open to full-time & freelance roles
      </p>

      <div style={styles.buttons}>
        <a href="#projects" style={styles.btnPrimary}>view my work</a>
        <a href="#contact" style={styles.btnSecondary}>get in touch</a>
      </div>

    </section>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 60px',
    maxWidth: '900px',
    position: 'relative',
    zIndex: 1,
  },
  tag: {
    color: '#1a3a2a',
    fontSize: '0.85rem',
    marginBottom: '10px',
    fontFamily: 'monospace',
  },
  greeting: {
    color: '#888',
    fontSize: '1.2rem',
    marginBottom: '8px',
  },
  name: {
    color: '#ffffff',
    fontSize: '5rem',
    fontWeight: '800',
    lineHeight: '1',
    marginBottom: '20px',
  },
  typewriter: {
    color: '#00ff88',
    fontSize: '1.6rem',
    fontWeight: '400',
    marginBottom: '20px',
    minHeight: '2.5rem',
  },
  subtext: {
    color: '#555',
    fontSize: '0.95rem',
    marginBottom: '40px',
    letterSpacing: '1px',
  },
  buttons: {
    display: 'flex',
    gap: '20px',
  },
  btnPrimary: {
    padding: '12px 28px',
    backgroundColor: '#00ff88',
    color: '#0a0a0a',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    letterSpacing: '1px',
  },
  btnSecondary: {
    padding: '12px 28px',
    border: '1px solid #333',
    color: '#888',
    fontSize: '0.9rem',
    letterSpacing: '1px',
  }
}

export default Hero