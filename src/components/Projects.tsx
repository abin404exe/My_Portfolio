import React, { useState } from 'react'
import { projects } from '../Data/projects'
import type { Project } from '../Data/projects'
// ── CARD VIEW ───────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  const statusColor: Record<Project['status'], string> = {
    live:     '#00ff88',
    wip:      '#f59e0b',
    archived: '#555',
  }

  return (
    <div
      style={{
        ...styles.card,
        borderColor: hovered ? '#00ff88' : '#1a1a1a',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.cardTop}>
        <h3 style={styles.cardTitle}>{project.title}</h3>
        <span style={{ ...styles.status, color: statusColor[project.status] }}>
          ● {project.status}
        </span>
      </div>

      <p style={styles.cardDesc}>{project.description}</p>

      <div style={styles.techRow}>
        {project.tech.map((t) => (
          <span key={t} style={styles.techBadge}>{t}</span>
        ))}
      </div>

      <div style={styles.links}>
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" style={styles.link}>
            github →
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" style={styles.link}>
            live →
          </a>
        )}
      </div>
    </div>
  )
}

// ── LIST VIEW ───────────────────────────────────────────────
function ProjectRow({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  const statusColor: Record<Project['status'], string> = {
    live:     '#00ff88',
    wip:      '#f59e0b',
    archived: '#555',
  }

  return (
    <div
      style={{
        ...styles.row,
        backgroundColor: hovered ? '#0f0f0f' : 'transparent',
        borderColor: hovered ? '#00ff88' : '#1a1a1a',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.rowLeft}>
        <h3 style={styles.rowTitle}>{project.title}</h3>
        <p style={styles.rowDesc}>{project.description}</p>
      </div>

      <div style={styles.rowRight}>
        <div style={styles.techRow}>
          {project.tech.map((t) => (
            <span key={t} style={styles.techBadge}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ ...styles.status, color: statusColor[project.status] }}>
            ● {project.status}
          </span>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" style={styles.link}>
              github →
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" style={styles.link}>
              live →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ── MAIN PROJECTS SECTION ───────────────────────────────────
function Projects() {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <section style={styles.section} id="projects">

      <div style={styles.header}>
        <div>
          <p style={styles.sectionTag}>// my work</p>
          <h2 style={styles.sectionTitle}>projects</h2>
        </div>

        {/* toggle buttons — this is useState in action */}
        <div style={styles.toggle}>
          <button
            style={{
              ...styles.toggleBtn,
              backgroundColor: view === 'grid' ? '#00ff88' : 'transparent',
              color: view === 'grid' ? '#0a0a0a' : '#555',
            }}
            onClick={() => setView('grid')}
          >
            grid
          </button>
          <button
            style={{
              ...styles.toggleBtn,
              backgroundColor: view === 'list' ? '#00ff88' : 'transparent',
              color: view === 'list' ? '#0a0a0a' : '#555',
            }}
            onClick={() => setView('list')}
          >
            list
          </button>
        </div>
      </div>

      {/* conditionally render based on view state */}
      {view === 'grid' ? (
        <div style={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div style={styles.list}>
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      )}

    </section>
  )
}

// ── STYLES ──────────────────────────────────────────────────
const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: '100px 60px',
    maxWidth: '1100px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '48px',
  },
  sectionTag: {
    color: '#00ff88',
    fontSize: '0.85rem',
    marginBottom: '8px',
    fontFamily: 'monospace',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: '2.5rem',
    fontWeight: '700',
  },
  toggle: {
    display: 'flex',
    border: '1px solid #1a1a1a',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  toggleBtn: {
    padding: '8px 20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontFamily: 'Courier New, monospace',
    letterSpacing: '1px',
    transition: 'all 0.2s',
  },
  // card view
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: '#0d0d0d',
    border: '1px solid #1a1a1a',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    transition: 'all 0.3s',
    cursor: 'default',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  cardDesc: {
    color: '#666',
    fontSize: '0.9rem',
    lineHeight: '1.6',
    flex: 1,
  },
  // list view
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    border: '1px solid #1a1a1a',
    marginBottom: '-1px',
    transition: 'all 0.2s',
    gap: '40px',
  },
  rowLeft: {
    flex: 1,
  },
  rowTitle: {
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '6px',
  },
  rowDesc: {
    color: '#555',
    fontSize: '0.85rem',
    lineHeight: '1.5',
  },
  rowRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '12px',
    minWidth: '200px',
  },
  // shared
  techRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  techBadge: {
    padding: '4px 10px',
    border: '1px solid #222',
    color: '#555',
    fontSize: '0.75rem',
    letterSpacing: '0.5px',
  },
  status: {
    fontSize: '0.75rem',
    letterSpacing: '1px',
  },
  links: {
    display: 'flex',
    gap: '16px',
  },
  link: {
    color: '#00ff88',
    fontSize: '0.85rem',
    letterSpacing: '0.5px',
  },
}

export default Projects