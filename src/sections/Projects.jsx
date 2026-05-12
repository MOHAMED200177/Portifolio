import { useState } from 'react';
import { projects } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';
import { GitFork, ExternalLink, X, CheckCircle2, ArrowUpRight } from 'lucide-react';

function ProjectModal({ project, onClose, dark }) {
  const bg = dark ? 'text-white' : 'text-[#0A0A0F]';
  const sub = 'text-[#6B6B7B]';
  const border = dark ? 'border-[#1E1E2E]' : 'border-gray-200';
  const surface = dark ? 'bg-[#13131A]' : 'bg-white';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-2xl border ${border} ${surface} p-8 relative max-h-[90vh] overflow-y-auto`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 border ${border} ${sub} hover:text-[#E8FF47] hover:border-[#E8FF47] transition-colors`}
        >
          <X size={14} />
        </button>

        <div className="mb-2">
          <span className={`font-mono text-xs uppercase tracking-widest ${sub}`}>{project.period}</span>
          {project.status === 'active' && (
            <span className="ml-3 font-mono text-xs text-[#E8FF47] border border-[#E8FF47]/30 px-2 py-0.5">
              Active
            </span>
          )}
        </div>

        <h3 className={`font-display text-2xl font-bold mb-1 ${bg}`} style={{ fontFamily: 'Syne, sans-serif' }}>
          {project.name}
        </h3>
        <p className={`font-mono text-sm mb-6 ${sub}`}>{project.subtitle}</p>

        <p className={`text-sm leading-relaxed mb-6 ${sub}`}>{project.description}</p>

        <div className="mb-6">
          <p className={`font-mono text-xs uppercase tracking-widest mb-3 ${sub}`}>Key Achievements</p>
          <ul className="flex flex-col gap-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 size={13} className="text-[#E8FF47] mt-0.5 flex-shrink-0" />
                <span className={`text-sm ${sub}`}>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <p className={`font-mono text-xs uppercase tracking-widest mb-3 ${sub}`}>Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map(s => (
              <span key={s} className={`font-mono text-xs border px-2 py-1 ${border} ${sub}`}>{s}</span>
            ))}
          </div>
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#E8FF47] text-[#0A0A0F] font-bold px-5 py-2.5 text-sm hover:bg-white transition-colors"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            <GitFork size={14} /> View on GitHub
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const { dark } = useTheme();
  const [selected, setSelected] = useState(null);
  const bg = dark ? 'text-white' : 'text-[#0A0A0F]';
  const sub = 'text-[#6B6B7B]';
  const border = dark ? 'border-[#1E1E2E]' : 'border-gray-200';
  const surface = dark ? 'bg-[#13131A]' : 'bg-white';

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#E8FF47] mb-3">04 / Projects</p>
          <h2 className={`font-display text-4xl lg:text-5xl font-bold ${bg}`} style={{ fontFamily: 'Syne, sans-serif' }}>
            Things I've
            <br />
            <span className="text-[#E8FF47]">Built & Shipped</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-[#1E1E2E]">
          {projects.map((project, i) => (
            <div
              key={i}
              className={`${surface} p-8 group cursor-pointer hover:bg-[#E8FF47]/5 transition-colors border-0`}
              onClick={() => setSelected(project)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  {project.status === 'active' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E8FF47] animate-pulse" />
                      <span className="font-mono text-xs text-[#E8FF47] uppercase tracking-widest">Active</span>
                    </div>
                  )}
                  <h3 className={`font-display text-xl font-bold group-hover:text-[#E8FF47] transition-colors ${bg}`} style={{ fontFamily: 'Syne, sans-serif' }}>
                    {project.name}
                  </h3>
                  <p className={`font-mono text-xs mt-1 ${sub}`}>{project.subtitle}</p>
                </div>
                <ArrowUpRight size={16} className={`${sub} group-hover:text-[#E8FF47] transition-colors flex-shrink-0 mt-1`} />
              </div>

              <p className={`text-sm leading-relaxed mb-6 ${sub}`}>{project.description}</p>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map(s => (
                  <span key={s} className={`font-mono text-xs border px-2 py-0.5 ${border} ${sub}`}>{s}</span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={e => e.stopPropagation()}
                    className={`flex items-center gap-2 font-mono text-xs hover:text-[#E8FF47] transition-colors ${sub}`}
                  >
                    <GitFork size={13} /> GitHub
                  </a>
                )}
                <button
                  className="font-mono text-xs text-[#E8FF47] hover:underline"
                  onClick={() => setSelected(project)}
                >
                  View details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} dark={dark} />}
    </section>
  );
}
