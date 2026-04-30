import React, { useState } from 'react';

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
  it: { web: 'Progetti Web', design: 'CAD · 3D · Render', visit: 'Visita il sito', all: 'Tutti' },
  en: { web: 'Web Projects', design: 'CAD · 3D · Render', visit: 'Visit site',    all: 'All'   },
};

// ── Component ─────────────────────────────────────────────────────────────────

const PortfolioTabs: React.FC<Props> = ({ webProjects, designWorks, lang = 'it' }) => {
  const [activeTab, setActiveTab]           = useState<'web' | 'design'>('design');
  const [activeCategory, setActiveCategory] = useState<'All' | DesignWork['category']>('All');
  const lbl = LABELS[lang];

  const visibleDesign =
    activeCategory === 'All'
      ? designWorks
      : designWorks.filter((w) => w.category === activeCategory);

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
          {webProjects.map((project) => (
            <a
              key={project.id}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-[45%] lg:w-[30%]"
            >
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md">
                {project.imagePath && (
                  <div className="overflow-hidden">
                    <img
                      src={project.imagePath}
                      alt={project.altText ?? project.heading}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
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
              </div>
            </a>
          ))}
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
                onClick={() => setActiveCategory(cat)}
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
            {visibleDesign.map((work) => (
              <div
                key={work.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={work.imagePath}
                    alt={work.altText ?? work.title}
                    className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Badge categoria in overlay */}
                  <span
                    className={[
                      'absolute right-3 top-3 rounded-full border bg-background/80 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm',
                      CATEGORY_STYLES[work.category],
                    ].join(' ')}
                  >
                    {work.category}
                  </span>
                </div>
                <div className="px-4 py-3">
                  <h3 className="text-sm font-semibold text-foreground">{work.title}</h3>
                  {work.description && (
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {work.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioTabs;