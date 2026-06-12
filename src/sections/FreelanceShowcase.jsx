import { freelanceWork } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';
import { ExternalLink, Sparkles } from 'lucide-react';

export default function FreelanceShowcase() {
  const { dark } = useTheme();
  const textColor = dark ? 'text-white' : 'text-[#0A0A0F]';
  const mutedColor = 'text-[#6B6B7B]';
  const borderColor = dark ? 'border-[#1E1E2E]' : 'border-gray-200';
  const surfaceColor = dark ? 'bg-[#13131A]' : 'bg-white';

  return (
    <section id="freelance" aria-label="Freelance cinematic projects" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Label + rule */}
        <div className="flex items-center gap-4 mb-8 reveal">
          <Sparkles size={12} className="text-[#E8FF47] flex-shrink-0" aria-hidden="true" />
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#E8FF47] whitespace-nowrap">
            Frontend Freelance · Cinematic Experiences
          </p>
          <div className={`flex-1 h-px ${dark ? 'bg-[#1E1E2E]' : 'bg-gray-200'}`} />
        </div>

        <div className="grid sm:grid-cols-3 gap-px bg-[#1E1E2E] reveal reveal-delay-1">
          {freelanceWork.map((work, i) => (
            <a
              key={i}
              href={work.url}
              target="_blank"
              rel="noreferrer"
              className={`group ${surfaceColor} p-5 sm:p-6 flex flex-col gap-3 hover:bg-[#E8FF47]/5 transition-all duration-300 focus-visible:outline-accent`}
              aria-label={`View ${work.label} live demo`}>
              <div className="flex items-start justify-between">
                <span className="font-mono text-2xl font-bold text-[#E8FF47]/15 group-hover:text-[#E8FF47]/30 transition-colors"
                  style={{ fontFamily: 'Syne, sans-serif' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <ExternalLink size={13} className={`${mutedColor} group-hover:text-[#E8FF47] transition-colors`} aria-hidden="true" />
              </div>
              <h4 className={`font-display font-bold text-sm sm:text-base group-hover:text-[#E8FF47] transition-colors ${textColor}`}
                style={{ fontFamily: 'Syne, sans-serif' }}>
                {work.label}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {work.stack.map(s => <span key={s} className="tag text-[9px]">{s}</span>)}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
