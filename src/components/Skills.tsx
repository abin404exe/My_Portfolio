import React, { useEffect, useRef, useState } from 'react'

interface Skill {
  name: string
  level: number   // 0-100
}

interface SkillGroup {
  category: string
  skills: Skill[]
}

const skillData: SkillGroup[] = [
  {
    category: 'backend',
    skills: [
      { name: 'Node.js',     level: 85 },
      { name: 'Python',      level: 75 },
      { name: 'PostgreSQL',  level: 80 },
      { name: 'Redis',       level: 65 },
      { name: 'REST APIs',   level: 90 },
    ],
  },
  {
    category: 'frontend',
    skills: [
      { name: 'React',       level: 80 },
      { name: 'TypeScript',  level: 70 },
      { name: 'Three.js',    level: 55 },
      { name: 'CSS',         level: 75 },
    ],
  },
  {
    category: 'devops & tools',
    skills: [
      { name: 'Git',         level: 85 },
      { name: 'Docker',      level: 60 },
      { name: 'Linux',       level: 70 },
      { name: 'AWS',         level: 50 },
    ],
  },
]

// ── SINGLE SKILL BAR ──────────────────────────────────────
function SkillBar({ skill, animate }: { skill: Skill; animate: boolean }) {
  return (
    <div style={styles.skillRow}>
      <div style={styles.skillMeta}>
        <span style={styles.skillName}>{skill.name}</span>
        <span style={styles.skillLevel}>{skill.level}%</span>
      </div>
      <div style={styles.barTrack}>
        <div
          style={{
            ...styles.barFill,
            width: animate ? `${skill.level}%` : '0%',
          }}
        />
      </div>
    </div>
  )
}

// ── SKILL CATEGORY CARD ───────────────────────────────────
function SkillGroup({ group, animate }: { group: SkillGroup; animate: boolean }) {
  return (
    <div style={styles.card}>
      <p style={styles.category}>// {group.category}</p>
      <div style={styles.skillList}>
        {group.skills.map((skill) => (
          <SkillBar key={skill.name} skill={skill} animate={animate} />
        ))}
      </div>
    </div>
  )
}

// ── MAIN SKILLS SECTION ───────────────────────────────────
function Skills() {
  const [animate, setAnimate] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // trigger animation when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect() // only animate once
        }
      },
      { threshold: 0.2 }  // trigger when 20% of section is visible
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={styles.section} id="skills">
      <p style={styles.sectionTag}>// what i use</p>
      <h2 style={styles.sectionTitle}>skills</h2>

      <div style={styles.grid}>
        {skillData.map((group) => (
          <SkillGroup key={group.category} group={group} animate={animate} />
        ))}
      </div>
    </section>
  )
}

// ── STYLES ────────────────────────────────────────────────
const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: '100px 60px',
    maxWidth: '1100px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
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
    marginBottom: '48px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: '#0d0d0d',
    border: '1px solid #1a1a1a',
    padding: '28px',
  },
  category: {
    color: '#00ff88',
    fontSize: '0.85rem',
    marginBottom: '24px',
    letterSpacing: '1px',
  },
  skillList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  skillRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  skillMeta: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  skillName: {
    color: '#ccc',
    fontSize: '0.9rem',
  },
  skillLevel: {
    color: '#555',
    fontSize: '0.8rem',
  },
  barTrack: {
    height: '2px',
    backgroundColor: '#1a1a1a',
    width: '100%',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#00ff88',
    transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },
}

export default Skills