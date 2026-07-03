import React, { useState, useEffect, useCallback } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface WebProject {
  id: string;
  href?: string;
  heading: string;
  subheading?: string;
  tags: string[];
  imagePath?: string;
  altText?: string;
}

export interface DesignWork {
  id: string;
  title: string;
  category: 'CAD' | '3D' | 'Render';
  imagePath: string;
  altText?: string;
  description?: string;
  modelPath?: string;
}

interface Props {
  webProjects: WebProject[];
  designWorks: DesignWork[];
  lang?: 'it' | 'en';
}

// ── Badge colours per categoria ───────────────────────────────────────────────

const CATEGORY_STYLES: Record<DesignWork['category'], string> = {
  CAD:    'border-[#C99267] text-[#C99267]',
  '3D':   'border-sky-400 text-sky-400',
  Render: 'border-violet-400 text-violet-400',
};

// ── Labels bilingue ───────────────────────────────────────────────────────────

const LABELS = {
  it: { web: 'Progetti Web', design: 'CAD · 3D · Render', visit: 'Visita il sito', all: 'Tutti', zoom: 'Ingrandisci', close: 'Chiudi' },
  en: { web: 'Web Projects', design: 'CAD · 3D · Render', visit: 'Visit site',    all: 'All',   zoom: 'Zoom',        close: 'Close' },
};

// ── Lightbox ──────────────────────────────────────────────────────────────────

interface LightboxImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  modelSrc?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  closeLabel: string;
  modelViewerReady: boolean;
}

const Lightbox: React.FC<LightboxProps> = ({ images, index, onClose, onNavigate, closeLabel, modelViewerReady }) => {
  const current = images[index];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && images.length > 1) onNavigate((index + 1) % images.length);
      if (e.key === 'ArrowLeft' && images.length > 1) onNavigate((index - 1 + images.length) % images.length);
    },
    [index, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!current) return null;

  const stopProp = (e: React.MouseEvent) => e.stopPropagation();

  const showModelViewer = Boolean(current.modelSrc) && modelViewerReady;

  // URL del decoder Meshopt (CDN)
  const meshoptDecoderUrl = 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/meshopt_decoder.js';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4 py-8"
      onClick={onClose}
    >
      {/* Chiudi */}
      <button
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Frecce navigazione */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate((index - 1 + images.length) % images.length); }}
            aria-label="Previous"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate((index + 1) % images.length); }}
            aria-label="Next"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Contenuto centrale + didascalia IN COLONNA */}
      <div className="flex flex-col items-center" onClick={stopProp}>
        {showModelViewer
          ? React.createElement('model-viewer', {
              src: current.modelSrc,
              poster: current.src,
              alt: current.alt,
              'camera-controls': true,
              'auto-rotate': true,
              'shadow-intensity': '1',
              'meshopt-decoder-location': meshoptDecoderUrl,  // <-- CDN decoder Meshopt
              style: {
                display: 'block',
                width: '800px',
                height: '500px',
                maxWidth: '90vw',
                maxHeight: '70vh',
                background: 'transparent',
              },
              class: 'rounded-lg shadow-2xl',
            })
          : (
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[80vh] w-auto rounded-lg object-contain shadow-2xl"
            />
          )}

        {/* Didascalia SOTTO */}
        {(current.title || current.description) && (
          <div className="mt-4 text-center text-white">
            {current.title && <h3 className="text-base font-semibold">{current.title}</h3>}
            {current.description && <p className="text-sm text-white/70">{current.description}</p>}
          </div>
        )}

        {images.length > 1 && (
          <span className="mt-2 text-xs text-white/50">{index + 1} / {images.length}</span>
        )}
      </div>
    </div>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────

const PortfolioTabs: React.FC<Props> = ({ webProjects, designWorks, lang = 'it' }) => {
  const [activeTab, setActiveTab]           = useState<'web' | 'design'>('design');
  const [activeCategory, setActiveCategory] = useState<'All' | DesignWork['category']>('All');
  const [lightboxIndex, setLightboxIndex]   = useState<number | null>(null);
  const [lightboxSource, setLightboxSource] = useState<'design' | 'web'>('design');
  const [modelViewerReady, setModelViewerReady] = useState(false);
  const lbl = LABELS[lang];

  // Import di @google/model-viewer SOLO lato client, mai in SSR
  useEffect(() => {
    let cancelled = false;
    import('@google/model-viewer').then(() => {
      if (!cancelled) setModelViewerReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  const visibleDesign =
    activeCategory === 'All'
      ? designWorks
      : designWorks.filter((w) => w.category === activeCategory);

  const designImages = visibleDesign.map((w) => ({
    src: w.imagePath,
    alt: w.altText ?? w.title,
    title: w.title,
    description: w.description,
    modelSrc: w.modelPath,
  }));

  const webImages = webProjects
    .filter((p) => p.imagePath)
    .map((p) => ({
      src: p.imagePath as string,
      alt: p.altText ?? p.heading,
      title: p.heading,
      description: p.subheading,
    }));

  const openDesignLightbox = (idx: number) => {
    setLightboxSource('design');
    setLightboxIndex(idx);
  };

  const openWebLightbox = (idx: number) => {
    setLightboxSource('web');
    setLightboxIndex(idx);
  };

  const activeImages = lightboxSource === 'design' ? designImages : webImages;

  return (
    <div className="w-full">

      {/* Toggle principale */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-xl border border-border bg-muted p-1 shadow-sm">
          {(['design', 'web'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                'rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200',
                activeTab === tab
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {tab === 'web' ? lbl.web : lbl.design}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab: Progetti Web ─────────────────────────────────────────────── */}
      {activeTab === 'web' && (
        <div className="flex w-full flex-wrap justify-center gap-4">
          {webProjects.map((project) => {
            const webIdx = webImages.findIndex((img) => img.src === project.imagePath);
            return (
              <div key={project.id} className="w-full sm:w-[45%] lg:w-[30%]">
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md">
                  {project.imagePath && (
                    <div className="relative overflow-hidden">
                      <a href={project.href} target="_blank" rel="noopener noreferrer">
                        <img
                          src={project.imagePath}
                          alt={project.altText ?? project.heading}
                          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </a>
                      {webIdx !== -1 && (
                        <button
                          onClick={() => openWebLightbox(webIdx)}
                          aria-label={lbl.zoom}
                          className="absolute right-3 top-3 rounded-full bg-background/80 p-2 backdrop-blur-sm transition hover:bg-background"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-foreground">
                            <circle cx="11" cy="11" r="7" />
                            <path strokeLinecap="round" d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                  <a href={project.href} target="_blank" rel="noopener noreferrer">
                    <div className="flex flex-col gap-1 px-5 py-4">
                      <h3 className="text-base font-semibold text-foreground">{project.heading}</h3>
                      {project.subheading && (
                        <p className="text-sm text-muted-foreground">{project.subheading}</p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block rounded-full border border-[#C99267] px-3 py-0.5 text-xs font-medium text-[#C99267]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.href && (
                        <span className="mt-3 text-xs font-medium text-primary group-hover:underline underline-offset-2">
                          {lbl.visit} →
                        </span>
                      )}
                    </div>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Tab: CAD / 3D / Render ────────────────────────────────────────── */}
      {activeTab === 'design' && (
        <div>
          {/* Filtro categorie */}
          <div className="mb-6 flex justify-center gap-2 flex-wrap">
            {(['All', 'CAD', '3D', 'Render'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); }}
                className={[
                  'rounded-full border px-4 py-1 text-xs font-semibold transition-all duration-150',
                  activeCategory === cat
                    ? 'border-[#C99267] bg-[#C99267]/10 text-[#C99267]'
                    : 'border-border text-muted-foreground hover:border-[#C99267] hover:text-[#C99267]',
                ].join(' ')}
              >
                {cat === 'All' ? lbl.all : cat}
              </button>
            ))}
          </div>

          {/* Griglia lavori */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleDesign.map((work, idx) => (
              <button
                key={work.id}
                onClick={() => openDesignLightbox(idx)}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={work.imagePath}
                    alt={work.altText ?? work.title}
                    className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span
                    className={[
                      'absolute right-3 top-3 rounded-full border bg-background/80 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm',
                      CATEGORY_STYLES[work.category],
                    ].join(' ')}
                  >
                    {work.category}
                  </span>
                  {work.modelPath && (
                    <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
                      <svg className="inline h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      3D
                    </span>
                  )}
                </div>
                <div className="px-4 py-3">
                  <h3 className="text-sm font-semibold text-foreground">{work.title}</h3>
                  {work.description && (
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {work.description}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={activeImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
          closeLabel={lbl.close}
          modelViewerReady={modelViewerReady}
        />
      )}
    </div>
  );
};

export default PortfolioTabs;