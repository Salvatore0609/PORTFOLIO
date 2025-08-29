import type { Site, Page } from './types'

export const loaderAnimation = [
  '.loader',
  { opacity: [1, 0], pointerEvents: 'none' },
  { easing: 'ease-out' },
]

export const LINKS = {
  github: 'https://github.com/Salvatore0609',
  linkedin: 'https://www.linkedin.com/in/salvatore-desole',
  mail: 'salvatoredesole1998@gmail.com',
  instagram: 'https://www.instagram.com/salvatore_desole/',
  epicode:
    'https://talent.epicode.com/talent/646b2034-6347-464b-a175-b125da854ce0',
  discord: 'https://discordapp.com/users/1067154636424871946',
}

// Global
export const SITE: Site = {
  TITLE: 'Astro Sphere',
  DESCRIPTION:
    'Welcome to Astro Sphere, a portfolio and blog for designers and developers.',
  AUTHOR: 'Mark Horn',
}

// Work Page
export const WORK: Page = {
  TITLE: 'Work',
  DESCRIPTION: 'Places I have worked.',
}

// Blog Page
export const BLOG: Page = {
  TITLE: 'Blog',
  DESCRIPTION: 'Writing on topics I am passionate about.',
}

// Projects Page
export const PROJECTS: Page = {
  TITLE: 'Projects',
  DESCRIPTION: 'Recent projects I have worked on.',
}

// Search Page
export const SEARCH: Page = {
  TITLE: 'Search',
  DESCRIPTION: 'Search all posts and projects by keyword.',
}

// Study Page
export const STUDIES = [
  {
    title: 'Full Stack Developer',
    institution: 'Epicode, institute of technology',
    link: 'https://www.epicode.com',
    date: '2024 - 2025',
  },
  {
    title: '...',
    institution: 'Independent study',
    link: '',
    date: '',
  },
  {
    title: 'Architecture',
    institution: 'Università degli Studi di Sassari',
    link: 'https://www.uniss.it/',
    date: '',
  },
  {
    title: 'Architectural and furniture design',
    institution: 'Filippo Figari Art High School',
    link: 'https://www.liceoartisticosassari.edu.it',
    date: '2012 - 2017',
  },
]

export const EXPERIENCE = [
  {
    company: 'Arch. Zaccheddu',
    location: 'Sassari, Italy',
    position: 'Technical Collaborator',
    start: '',
    end: '',
    tasks: [
      'Effective communication with clients, colleagues, and suppliers',
      'Translating complex requirements into clear specifications',
      'Sharing project updates',
    ],
  },
  {
    company: 'ESSECIQUADRO ASSOCIATI Arch. e Ing.',
    location: 'Sassari, Italy',
    position: 'Technical Collaborator',
    start: '',
    end: '',
    tasks: [
      'Collaboration with multidisciplinary teams (architects, engineers, technicians)',
      'Coordinating activities and meeting deadlines',
      'Problem solving on design and organizational issues',
    ],
  },
  {
    company: 'Tecnorete Sassari',
    location: 'Sassari, Italy',
    position: 'Real Estate Consultant',
    start: '',
    end: '',
    tasks: [
      'Managing client relationships and understanding their needs',
      'Building trustful relationships and ensuring high client satisfaction',
      'Balancing multiple assignments and planning work independently',
    ],
  },
  {
    company: 'Pixel Architecture Studio',
    location: 'Alghero, Italy',
    position: 'Intern',
    start: '',
    end: '',
    tasks: [
      'Apprenticeship in an architectural studio environment',
      'Learning and using digital tools (CAD, BIM, GIS, 3D modeling)',
      'Adapting to dynamic work environments and rapid learning',
    ],
  },
]
