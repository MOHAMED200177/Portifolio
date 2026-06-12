import { education, certifications } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';
import { Award, BookOpen, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function Education() {
  const { dark } = useTheme();
  const textColor = dark ? 'text-white' : 'text-[#0A0A0F]';
  const mutedColor = 'text-[#6B6B7B]';
  const borderColor = dark ? 'border-[#1E1E2E]' : 'border-gray-200';
  const surfaceColor = dark ? 'bg-[#13131A]' : 'bg-white';

  return (
    <section id="education" aria-labelledby="edu-heading" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16 reveal">
          <p className="section-label mb-3">05 / Education & Certs</p>
          <h2 id="edu-heading"
            className={`font-display text-4xl sm:text-5xl font-bold leading-tight ${textColor}`}
            style={{ fontFamily: 'Syne, sans-serif' }}>
            Always
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #E8FF47 0%, #C8DF27 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Learning</span>
          </h2>
        </div>

        {/* Education cards */}
        <div className="grid lg:grid-cols-2 gap-px bg-[#1E1E2E] mb-px">
          {education.map((ed, i) => (
            <article key={i}
              className={`reveal reveal-delay-${i + 1} card-glow ${surfaceColor} p-7 sm:p-8 transition-all duration-300`}>
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className="p-2.5 border border-[#E8FF47]/20 bg-[#E8FF47]/5 flex-shrink-0">
                  <BookOpen size={13} className="text-[#E8FF47]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className={`font-mono text-[9px] uppercase tracking-[0.2em] mb-1 ${mutedColor}`}>{ed.badge}</p>
                  <h3 className={`font-display font-bold text-base sm:text-lg leading-tight mb-1 ${textColor}`}
                    style={{ fontFamily: 'Syne, sans-serif' }}>
                    {ed.degree}
                  </h3>
                  <p className="text-[#E8FF47] text-sm font-medium">{ed.institution}</p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className={`font-mono text-[10px] border px-2.5 py-1 ${borderColor} ${mutedColor}`}>{ed.period}</span>
                <span className={`font-mono text-[10px] ${mutedColor}`}>{ed.location}</span>
              </div>

              {/* Phases */}
              <ul className="space-y-2.5 mb-5" role="list">
                {ed.phases.map((phase, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className="text-[#E8FF47] text-xs mt-0.5 flex-shrink-0" aria-hidden="true">▸</span>
                    <span className={`text-sm leading-relaxed ${mutedColor}`}>{phase}</span>
                  </li>
                ))}
              </ul>

              {ed.certUrl && (
                <a href={ed.certUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#E8FF47] hover:underline focus-visible:outline-accent">
                  <ExternalLink size={11} /> View Certificate
                </a>
              )}
            </article>
          ))}
        </div>

        {/* Certifications */}
        <div className="grid sm:grid-cols-3 gap-px bg-[#1E1E2E]">
          {certifications.map((cert, i) => (
            <div key={i}
              className={`reveal reveal-delay-${i + 1} card-glow ${surfaceColor} p-5 sm:p-6 transition-all duration-300`}>
              <div className="flex items-start gap-3 mb-3">
                <Award size={13} className="text-[#E8FF47] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h4 className={`font-display font-bold text-sm mb-0.5 ${textColor}`}
                    style={{ fontFamily: 'Syne, sans-serif' }}>
                    {cert.name}
                  </h4>
                  <p className={`font-mono text-[10px] ${mutedColor}`}>{cert.issuer}</p>
                </div>
              </div>
              <p className={`text-sm leading-relaxed mb-4 ${mutedColor}`}>{cert.note}</p>
              <span className={`inline-block font-mono text-[9px] uppercase tracking-widest px-2 py-1 ${
                cert.status.includes('Progress')
                  ? 'border border-[#E8FF47]/30 bg-[#E8FF47]/5 text-[#E8FF47]'
                  : 'border border-[#1E1E2E] text-[#6B6B7B]'
              }`}>
                {cert.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
