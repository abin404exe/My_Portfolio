export interface Project {
    id: number
    title: string
    description: string
    tech: string[]
    github: string
    live: string
    status: 'live' | 'wip' | 'archived'
  }
  
  export const projects: Project[] = [
    {
      id: 1,
      title: 'Auth API',
      description: 'A production-ready REST API with JWT authentication, refresh tokens, rate limiting and role-based access control.',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
      github: 'https://github.com',
      live: '',
      status: 'live',
    },
    {
      id: 2,
      title: 'Dev Portfolio',
      description: 'This portfolio — built with React, TypeScript and Three.js. Features a custom analytics dashboard to track visitors.',
      tech: ['React', 'TypeScript', 'Three.js'],
      github: 'https://github.com',
      live: 'https://abin.dev',
      status: 'wip',
    },
    {
      id: 3,
      title: 'Real-time Chat',
      description: 'Scalable chat application with rooms, private messaging, typing indicators and read receipts using WebSockets.',
      tech: ['Node.js', 'Socket.io', 'MongoDB', 'React'],
      github: 'https://github.com',
      live: '',
      status: 'wip',
    },
    {
      id: 4,
      title: 'CLI Task Manager',
      description: 'A terminal-based task manager with priority queues, deadlines and Markdown export. Built to learn systems thinking.',
      tech: ['Python', 'Click', 'SQLite'],
      github: 'https://github.com',
      live: '',
      status: 'archived',
    },
  ]