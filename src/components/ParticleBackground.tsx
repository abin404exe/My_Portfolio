import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function ParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── SCENE SETUP ──────────────────────────────────────────
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 2, 6)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mount.appendChild(renderer.domElement)

    // ── WAVE MESH ─────────────────────────────────────────────
    const GRID = 120          // how many segments (more = smoother)
    const SIZE = 20           // how wide the plane is

    const geometry = new THREE.PlaneGeometry(SIZE, SIZE, GRID, GRID)
    geometry.rotateX(-Math.PI / 2)  // lay it flat

    // store original Y positions for wave math
    const positions = geometry.attributes.position
    const originalY = new Float32Array(positions.count)
    for (let i = 0; i < positions.count; i++) {
      originalY[i] = positions.getY(i)
    }

    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // ── LIGHTING ──────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x00ff88, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x00ff88, 2, 50)
    pointLight.position.set(0, 10, 0)
    scene.add(pointLight)

    // ── MOUSE ─────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    // ── RESIZE ────────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // ── ANIMATION LOOP ────────────────────────────────────────
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // wave math — each vertex moves up/down like a sine wave
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const z = positions.getZ(i)

        // combine multiple waves for organic feel
        const wave =
          Math.sin(x * 0.5 + t * 1.2) * 0.4 +
          Math.sin(z * 0.4 + t * 0.8) * 0.3 +
          Math.sin((x + z) * 0.3 + t) * 0.2 +
          mouse.y * Math.sin(x * 0.3 + t) * 0.4 +  // mouse Y warps wave height
          mouse.x * Math.cos(z * 0.3 + t) * 0.4    // mouse X warps wave angle

        positions.setY(i, originalY[i] + wave)
      }

      positions.needsUpdate = true  // tell Three.js vertices changed
      geometry.computeVertexNormals()

      // subtly rotate camera with mouse
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.02
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // ── CLEANUP ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      mount.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

export default ParticleBackground