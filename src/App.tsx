import { useState } from 'react'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import CustomCursor from './components/CustomCursor'
import Loader from './components/LoaderPage'
function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div>
      <CustomCursor />

      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {loaded && (
        <>
          <ParticleBackground />
          <Navbar />
          <Hero />
          <Projects />
          <Skills />
        </>
      )}
    </div>
  )
}


export default App