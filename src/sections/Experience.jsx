import { experience } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';
import { CheckCircle2 } from 'lucide-react';

export default function Experience() {
  const { dark } = useTheme();
  const bg = dark ? 'text-white' : 'text-[#0A0A0F]';
  const sub = 'text-[#6B6B7B]';
  const border = dark ? 'border-[#1E1E2E]' : 'border-gray-200';
  const surface = dark ? 'bg-[#13131A]' : 'bg-white';

  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#E8FF47] mb-3">03 / Experience</p>
          <h2 className={`font-display text-4xl lg:text-5xl font-bold ${bg}`} style={{ fontFamily: 'Syne, sans-serif' }}>
            Where I've
            <br />
            <span className="text-[#E8FF47]">Shipped Code</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 lg:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#E8FF47] via-[#E8FF47]/30 to-transparent hidden md:block" />

          <div className="flex flex-col gap-12">
            {experience.map((exp, i) => (
              <div key={i} className="md:pl-20 relative">
                {/* Dot */}
                <div className="hidden md:block absolute left-[28px] top-6 w-2 h-2 rounded-full bg-[#E8FF47]" />

                <div className={`border ${border} ${surface} p-8 hover:border-[#E8FF47]/40 transition-colors`}>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className={`font-display text-xl font-bold mb-1 ${bg}`} style={{ fontFamily: 'Syne, sans-serif' }}>
                        {exp.role}
                      </h3>
                      <p className="text-[#E8FF47] font-medium text-sm">{exp.company}</p>
                      <p className={`font-mono text-xs mt-1 ${sub}`}>{exp.type}</p>
                    </div>
                    <div className="text-right">
                      <span className={`font-mono text-xs border px-3 py-1 ${border} ${sub}`}>
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-3">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 size={14} className="text-[#E8FF47] mt-0.5 flex-shrink-0" />
                        <p className={`text-sm leading-relaxed ${sub}`}>{h}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
