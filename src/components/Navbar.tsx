import React from 'react'

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>abin._</div>
      <ul style={styles.links}>
        <li><a href="#hero" style={styles.link}>home</a></li>
        <li><a href="#about" style={styles.link}>about</a></li>
        <li><a href="#projects" style={styles.link}>projects</a></li>
        <li><a href="#contact" style={styles.link}>contact</a></li>
      </ul>
    </nav>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 60px',
    borderBottom: '1px solid #1a1a1a',
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: '#0a0a0a',
    zIndex: 100,
  },
  logo: {
    color: '#00ff88',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
  links: {
    display: 'flex',
    gap: '40px',
    listStyle: 'none',
  },
  link: {
    color: '#888',
    textDecoration: 'none',
    fontSize: '0.9rem',
    letterSpacing: '1px',
    transition: 'color 0.3s',
  }
}

export default Navbar