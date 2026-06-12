import { experience } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';
import { CheckCircle2, ExternalLink, Award, ChevronDown } from 'lucide-react';
import { useState } from 'react';

function ExperienceCard({ exp, index, dark }) {
  const [expanded, setExpanded] = useState(index === 0);
  const textColor = dark ? 'text-white' : 'text-[#0A0A0F]';
  const mutedColor = 'text-[#6B6B7B]';
  const borderColor = dark ? 'border-[#1E1E2E]' : 'border-gray-200';
  const surfaceColor = dark ? 'bg-[#13131A]' : 'bg-white';

  return (
    <div className={`reveal reveal-delay-${Math.min(index + 1, 4)} md:pl-16 relative`}>
      {/* Timeline dot */}
      <div className="hidden md:block timeline-dot" aria-hidden="true" />

      <article
        className={`card-glow border ${borderColor} ${surfaceColor} overflow-hidden transition-all duration-300`}
        aria-labelledby={`exp-title-${index}`}>
        {/* Card header — always visible */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="w-full p-6 sm:p-8 text-left group"
          aria-expanded={expanded}
          aria-controls={`exp-body-${index}`}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Role + company */}
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 id={`exp-title-${index}`}
                  className={`font-display text-lg sm:text-xl font-bold ${textColor}`}
                  style={{ fontFamily: 'Syne, sans-serif' }}>
                  {exp.role}
                </h3>
                {index === 0 && (
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#E8FF47] border border-[#E8FF47]/30 bg-[#E8FF47]/5 px-2 py-0.5">
                    Current
                  </span>
                )}
              </div>
              <p className="text-[#E8FF47] font-semibold text-sm mb-1">{exp.company}</p>
              <p className={`font-mono text-[10px] ${mutedColor}`}>{exp.type}</p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <span className={`font-mono text-[10px] border px-3 py-1.5 ${borderColor} ${mutedColor}`}>{exp.period}</span>
              <ChevronDown
                size={14}
                className={`${mutedColor} transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Stack tags — always visible */}
          <div className="flex flex-wrap gap-2 mt-4">
            {exp.stack.map(s => <span key={s} className="tag">{s}</span>)}
          </div>
        </button>

        {/* Collapsible body */}
        <div
          id={`exp-body-${index}`}
          className={`overflow-hidden transition-all duration-400 ease-out`}
          style={{ maxHeight: expanded ? '1000px' : '0px', opacity: expanded ? 1 : 0 }}>
          <div className={`px-6 sm:px-8 pb-6 sm:pb-8 pt-0 border-t ${borderColor}`}>
            <ul className="mt-5 space-y-3" role="list">
              {exp.highlights.map((h, j) => (
                <li key={j} className="flex items-start gap-3">
                  <CheckCircle2 size={13} className="text-[#E8FF47] mt-0.5 flex-shrink-0" aria-hidden="true" strokeWidth={2} />
                  <p className={`text-sm leading-relaxed ${mutedColor}`}>{h}</p>
                </li>
              ))}
            </ul>

            {/* Links row */}
            {(exp.cert || exp.projects) && (
              <div className={`mt-5 pt-4 border-t ${borderColor} flex flex-wrap items-center gap-4`}>
                {exp.cert && (
                  <a href={exp.cert} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#E8FF47] hover:underline focus-visible:outline-accent">
                    <Award size={11} /> View Certificate
                  </a>
                )}
                {exp.projects && (
                  <div className="flex flex-col gap-2 w-full mt-1">
                    <p className={`font-mono text-[9px] uppercase tracking-[0.2em] ${mutedColor}`}>Selected Projects</p>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                      {exp.projects.map((p, j) => (
                        <a key={j} href={p.url} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-[#E8FF47] hover:underline font-medium focus-visible:outline-accent">
                          <ExternalLink size={11} />
                          {p.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

export default function Experience() {
  const { dark } = useTheme();
  const textColor = dark ? 'text-white' : 'text-[#0A0A0F]';

  return (
    <section id="experience" aria-labelledby="exp-heading" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16 reveal">
          <p className="section-label mb-3">03 / Experience</p>
          <h2 id="exp-heading"
            className={`font-display text-4xl sm:text-5xl font-bold leading-tight ${textColor}`}
            style={{ fontFamily: 'Syne, sans-serif' }}>
            Where I've
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #E8FF47 0%, #C8DF27 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Shipped Code</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-8 top-6 bottom-6 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, #E8FF47, rgba(232,255,71,0.2), transparent)' }}
            aria-hidden="true" />

          <div className="space-y-8">
            {experience.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} dark={dark} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
