export const languages = {
  it: 'Italiano',
  en: 'English',
};

export const defaultLang = 'it';

export const ui = {
  it: {
    'nav.brand': 'Salvatore Desole',
    
    'hero.welcome': 'Benvenuto',
    'hero.greeting': "Ciao, sono",
    'hero.name': 'Salvatore Desole',
    'hero.description': "con un background in progettazione architettonica e modellazione 3D, ho sviluppato una forte passione per la creazione di soluzioni che uniscono funzionalità e chiarezza visiva. Questa mentalità mi ha portato allo sviluppo software, dove ho applicato lo stesso approccio creativo e analitico in un ambiente dinamico e tecnologico. Oggi, come sviluppatore full-stack, unisco la precisione tecnica dell'architettura con la capacità di costruire prodotti digitali utili, intuitivi e di impatto.",
    
    'skills.title': 'Le mie competenze tecniche',
    'skills.primary_tools': 'I miei strumenti principali includono:',
    'skills.list': [
      'React, Redux & Javascript',
      'Typescript & Tailwind',
      'Full Spring Boot & Java',
      'HTML/HTML5, CSS & Bootstrap',
      'PostgreSQL, Git, Postman & Swagger',
      'Software CAD: Bim, Gis & Acca',
      'Software 3D Modeling: Revit, SketchUp, Rhino, Archicad',
      'Adobe, Office'
    ],
    'skills.passion': 'Oltre alla programmazione, sono appassionato di architettura, viaggi, musica, videogiochi e cinema, e mi piace seguire gli ultimi sviluppi scientifici, spaziali e astronomici. Nel tempo libero, amo ascoltare buona musica, uscire con gli amici o guardare film e serie TV: è il mio modo per trovare ispirazione e mantenere viva la creatività al di fuori del mondo tech.',
    
    'contact.title': 'Iniziamo a lavorare insieme!',
    'contact.details': 'Dettagli di contatto',
    'contact.email': 'salvatoredesole.tech@gmail.com',
    'contact.socials': 'Social',
    
    'cv.title': 'CV',
    'cv.description': 'Visualizza e scarica il mio curriculum cliccando sul pulsante qui sotto',
    'cv.button': 'Scarica curriculum',
    
    'experience.title': 'Esperienza',
    'experience.view_more': 'Vedi di più',
    
    'now.title': 'Ora',
    'now.what_is': "cos'è?",
    'now.status': 'Attualmente sto lavorando',
    
    'study.title': 'Studio',
    
    'talent.title': 'Talent Epicode',
    'talent.description': 'Se vuoi vedere il mio percorso di formazione nello sviluppo web, questa pagina può esserti utile!',
    
    'softskills.title': 'Soft Skills',
    'softskills.quote': 'Ho acquisito esperienza in studi di architettura, ambienti tecnici e nel settore immobiliare, sviluppando forti capacità comunicative, di lavoro di squadra e problem solving. Sono abituato a gestire attività in autonomia, rispettare le scadenze e tradurre le esigenze dei clienti in soluzioni efficaci. Mi adatto rapidamente a nuovi strumenti e tecnologie.',
    
    'timezone.city': 'SS Sassari, Italia',
    
    'work.title': 'Lavori',
    'work.empty': 'Nessuna esperienza',
    
    'portfolio.title': 'Portfolio e progetti',
    'portfolio.description': 'Progetti web, disegni CAD, modelli 3D e render architettonici.',  // aggiornato
    
    'footer.built_by': 'Realizzato da',
    
    '404.title': '404 - Non trovata',
    '404.subtitle': 'Pagina non trovata',
    '404.message': 'Spiacenti, non abbiamo trovato la pagina che stai cercando.',
    '404.button': 'Torna alla home',
  },
  en: {
    'nav.brand': 'Salvatore Desole',
    
    'hero.welcome': 'Welcome',
    'hero.greeting': "Hi, I'm",
    'hero.name': 'Salvatore Desole',
    'hero.description': "with a background in architectural design and 3D modeling, I've developed a strong passion for creating solutions that combine functionality with visual clarity. This mindset led me to software development, where I applied the same creative and analytical approach in a dynamic, technology-driven environment. Today, as a full-stack developer, I merge the technical precision of architecture with the ability to build useful, intuitive, and impactful digital products.",
    
    'skills.title': 'My tech skills',
    'skills.primary_tools': 'My primary tools of choice includes:',
    'skills.list': [
      'React, Redux & Javascript',
      'Typescript & Tailwind',
      'Full Spring Boot & Java',
      'HTML/HTML5, CSS & Bootstrap',
      'PostgreSQL, Git, Postman & Swagger',
      'Software CAD: Bim, Gis & Acca',
      'Software 3D Modeling: Revit, SketchUp, Rhino, Archicad',
      'Adobe, Office'
    ],
    'skills.passion': "Beyond coding, I'm passionate about architecture, travel, music, video games, and cinema, and I enjoy keeping up with the latest developments in science, space, and astronomy. In my free time, I love listening to good music, hanging out with friends, or watching movies and TV series — it's my way of finding inspiration and keeping my creativity alive outside the tech world.",
    
    'contact.title': "Let's start working together!",
    'contact.details': 'Contact Details',
    'contact.email': 'salvatoredesole.tech@gmail.com',
    'contact.socials': 'Socials',
    
    'cv.title': 'CV',
    'cv.description': 'View and download my resume by clicking on the button below',
    'cv.button': 'Download resume',
    
    'experience.title': 'Experience',
    'experience.view_more': 'View More',
    
    'now.title': 'Now',
    'now.what_is': "what's that ?",
    'now.status': 'I am working',
    
    'study.title': 'Study',
    
    'talent.title': 'Talent Epicode',
    'talent.description': "If you'd like to see my training path in web development, this page can help you!",
    
    'softskills.title': 'Soft Skills',
    'softskills.quote': "I gained experience in architectural firms, technical environments, and real estate, developing strong communication, teamwork, and problem-solving skills. I'm used to managing tasks independently, meeting deadlines, and translating client needs into effective solutions. I quickly adapt to new tools and technologies.",
    
    'timezone.city': 'SS Sassari, Italy',
    
    'work.title': 'Work',
    'work.empty': 'No experience',
    
    'portfolio.title': 'Portfolio & Projects',
    'portfolio.description': 'Web projects, CAD drawings, 3D models and architectural renders.',  // aggiornato
    
    'footer.built_by': 'Built by',
    
    '404.title': '404 - Not Found',
    '404.subtitle': 'Page not found',
    '404.message': "Sorry, we couldn't find the page you're looking for.",
    '404.button': 'Go back home',
  }
} as const;

export type UiKey = keyof typeof ui.it;