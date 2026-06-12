import { useState, useEffect } from 'react';
import { projects } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';
import { GitFork, ExternalLink, X, CheckCircle2, ArrowUpRight, Tag } from 'lucide-react';

/* ── Modal ── */
function ProjectModal({ project, onClose, dark }) {
  const textColor = dark ? 'text-white' : 'text-[#0A0A0F]';
  const mutedColor = 'text-[#6B6B7B]';
  const borderColor = dark ? 'border-[#1E1E2E]' : 'border-gray-200';
  const surfaceColor = dark ? 'bg-[#0F0F16]' : 'bg-white';

  // Keyboard trap
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      role="dialog" aria-modal="true" aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}>

      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

      {/* Panel */}
      <div
        className={`modal-enter relative w-full max-w-2xl border ${borderColor} ${surfaceColor} max-h-[88vh] overflow-y-auto`}
        style={{ boxShadow: '0 0 0 1px rgba(232,255,71,0.1), 0 24px 80px rgba(0,0,0,0.5)' }}
        onClick={e => e.stopPropagation()}>

        {/* Accent top border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E8FF47] via-[#E8FF47]/60 to-transparent" />

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className={`absolute top-4 right-4 p-2 border ${borderColor} ${mutedColor} hover:text-[#E8FF47] hover:border-[#E8FF47] transition-colors focus-visible:outline-accent`}>
          <X size={13} />
        </button>

        <div className="p-6 sm:p-8">
          {/* Meta row */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`font-mono text-[10px] ${mutedColor}`}>{project.period}</span>
            {project.status === 'active' && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#E8FF47] border border-[#E8FF47]/30 bg-[#E8FF47]/5 px-2 py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8FF47] animate-pulse" />
                Active
              </span>
            )}
          </div>

          <h3 id="modal-title" className={`font-display text-2xl sm:text-3xl font-bold mb-1 ${textColor}`}
            style={{ fontFamily: 'Syne, sans-serif' }}>
            {project.name}
          </h3>
          <p className={`font-mono text-xs mb-6 ${mutedColor}`}>{project.subtitle}</p>
          <p className={`text-sm sm:text-base leading-relaxed mb-8 ${mutedColor}`}>{project.description}</p>

          {/* Achievements */}
          <div className="mb-7">
            <p className={`font-mono text-[9px] uppercase tracking-[0.2em] mb-3 ${mutedColor}`}>Key Achievements</p>
            <ul className="space-y-3" role="list">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={13} className="text-[#E8FF47] mt-0.5 flex-shrink-0" />
                  <span className={`text-sm leading-relaxed ${mutedColor}`}>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div className="mb-8">
            <p className={`font-mono text-[9px] uppercase tracking-[0.2em] mb-3 ${mutedColor}`}>
              <Tag size={10} className="inline mr-1.5" />Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(s => <span key={s} className="tag">{s}</span>)}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            {project.github ? (
              <a href={project.github} target="_blank" rel="noreferrer"
                className="btn-shimmer inline-flex items-center gap-2 bg-[#E8FF47] text-[#0A0A0F] font-bold px-5 py-2.5 text-sm hover:bg-white transition-colors focus-visible:outline-accent"
                style={{ fontFamily: 'Syne, sans-serif' }}>
                <GitFork size={13} /> View on GitHub
              </a>
            ) : (
              <p className={`font-mono text-xs ${mutedColor} italic self-center`}>Private repo — available upon request</p>
            )}
            {project.liveDemo && (
              <a href={project.liveDemo} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 border border-[#E8FF47]/40 text-[#E8FF47] px-5 py-2.5 text-sm hover:bg-[#E8FF47]/10 transition-colors focus-visible:outline-accent">
                <ExternalLink size={13} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Project card ── */
function ProjectCard({ project, onClick, dark, featured = false }) {
  const textColor = dark ? 'text-white' : 'text-[#0A0A0F]';
  const mutedColor = 'text-[#6B6B7B]';
  const borderColor = dark ? 'border-[#1E1E2E]' : 'border-gray-200';
  const surfaceColor = dark ? 'bg-[#13131A]' : 'bg-white';

  return (
    <article
      className={`card-glow group relative border ${borderColor} ${surfaceColor} cursor-pointer overflow-hidden
        transition-all duration-300 ${featured ? 'p-8 sm:p-10' : 'p-6 sm:p-8'}`}
      onClick={onClick}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      tabIndex={0}
      role="button"
      aria-label={`View ${project.name} project details`}>

      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8FF47]/0 via-[#E8FF47]/0 to-[#E8FF47]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

      {/* Featured accent line */}
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E8FF47] to-transparent" />
      )}

      <div className="relative">
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            {featured && (
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#E8FF47] border border-[#E8FF47]/30 bg-[#E8FF47]/5 px-2 py-0.5">
                Featured
              </span>
            )}
            {project.status === 'active' && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] text-[#E8FF47]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8FF47] animate-pulse" />
                Active
              </span>
            )}
          </div>
          <ArrowUpRight
            size={15}
            className={`${mutedColor} group-hover:text-[#E8FF47] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0`}
            aria-hidden="true"
          />
        </div>

        {/* Title */}
        <h3 className={`font-display font-bold group-hover:text-[#E8FF47] transition-colors duration-200 mb-1 ${textColor}
          ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}
          style={{ fontFamily: 'Syne, sans-serif' }}>
          {project.name}
        </h3>
        <p className={`font-mono text-xs mb-4 ${mutedColor}`}>{project.subtitle}</p>

        <p className={`text-sm leading-relaxed mb-5 ${mutedColor} ${featured ? 'max-w-2xl text-base' : ''}`}>
          {project.description}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.map(s => <span key={s} className="tag">{s}</span>)}
        </div>

        {/* Footer row */}
        <div className="flex items-center gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className={`inline-flex items-center gap-1.5 font-mono text-[10px] hover:text-[#E8FF47] transition-colors ${mutedColor} focus-visible:outline-accent`}>
              <GitFork size={12} strokeWidth={1.5} /> GitHub
            </a>
          )}
          <span className="font-mono text-[10px] text-[#E8FF47]">Details →</span>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { dark } = useTheme();
  const [selected, setSelected] = useState(null);
  const textColor = dark ? 'text-white' : 'text-[#0A0A0F]';

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16 reveal">
          <p className="section-label mb-3">04 / Projects</p>
          <h2 id="projects-heading"
            className={`font-display text-4xl sm:text-5xl font-bold leading-tight ${textColor}`}
            style={{ fontFamily: 'Syne, sans-serif' }}>
            Things I've
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #E8FF47 0%, #C8DF27 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Built & Shipped</span>
          </h2>
        </div>

        {/* Featured */}
        <div className="mb-px reveal reveal-delay-1">
          <ProjectCard project={projects[0]} onClick={() => setSelected(projects[0])} dark={dark} featured />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-px bg-[#1E1E2E]">
          {projects.slice(1).map((p, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 2}`}>
              <ProjectCard project={p} onClick={() => setSelected(p)} dark={dark} />
            </div>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} dark={dark} />}
    </section>
  );
}
