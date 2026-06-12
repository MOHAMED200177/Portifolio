import { useState } from 'react';
import { skills } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';

const TICKER_1 = ['Node.js','NestJS','React.js','Next.js 14','PostgreSQL','MongoDB','TypeORM','Apache Kafka','Docker','TypeScript'];
const TICKER_2 = ['JWT Auth','Redis','REST APIs','Microservices','Framer Motion','Tailwind CSS','Swagger/OpenAPI','Clean Architecture'];

// Category accent colors for variety
const CAT_ACCENTS = [
  'text-[#E8FF47]', 'text-[#7DD3FC]', 'text-[#86EFAC]', 'text-[#FCA5A5]',
  'text-[#E8FF47]', 'text-[#C4B5FD]', 'text-[#7DD3FC]', 'text-[#86EFAC]',
];

export default function Skills() {
  const { dark } = useTheme();
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const textColor = dark ? 'text-white' : 'text-[#0A0A0F]';
  const mutedColor = 'text-[#6B6B7B]';
  const borderColor = dark ? 'border-[#1E1E2E]' : 'border-gray-200';
  const surfaceColor = dark ? 'bg-[#13131A]' : 'bg-white';

  const renderTicker = (items, reverse = false) => (
    <div className="flex overflow-hidden border-y"
      style={{ borderColor: dark ? '#1E1E2E' : '#e5e7eb' }}>
      <div className={`marquee-track${reverse ? '-reverse' : ''} flex items-center gap-8 py-3`}>
        {[...items, ...items].map((s, i) => (
          <span key={i} className={`font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap ${mutedColor} flex items-center gap-8`}>
            {s}
            <span className="text-[#E8FF47] text-xs">·</span>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-24 sm:py-32 relative">
      {/* Top ticker */}
      <div className="mb-16 overflow-hidden">
        {renderTicker(TICKER_1)}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-14 reveal">
          <p className="section-label mb-3">02 / Skills</p>
          <h2 id="skills-heading"
            className={`font-display text-4xl sm:text-5xl font-bold leading-tight ${textColor}`}
            style={{ fontFamily: 'Syne, sans-serif' }}>
            Technical
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #E8FF47 0%, #C8DF27 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Arsenal</span>
          </h2>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1E1E2E] reveal reveal-delay-1"
          style={{ boxShadow: `0 0 0 1px ${dark ? '#1E1E2E' : '#e5e7eb'}` }}>
          {skills.map((group, i) => (
            <div
              key={i}
              className={`${surfaceColor} p-5 sm:p-6 transition-all duration-300 cursor-default
                ${hoveredGroup === i ? 'bg-[#E8FF47]/5' : ''}`}
              onMouseEnter={() => setHoveredGroup(i)}
              onMouseLeave={() => setHoveredGroup(null)}
            >
              <p className={`font-mono text-[9px] uppercase tracking-[0.22em] mb-4 transition-colors duration-300
                ${hoveredGroup === i ? CAT_ACCENTS[i % CAT_ACCENTS.length] : mutedColor}`}>
                {group.category}
              </p>
              <ul className="space-y-2" role="list" aria-label={`${group.category} skills`}>
                {group.items.map(skill => (
                  <li key={skill}
                    className={`skill-item text-sm font-medium transition-all duration-200
                      ${hoveredGroup === i ? textColor : mutedColor}`}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom ticker reversed */}
      <div className="mt-16 overflow-hidden">
        {renderTicker(TICKER_2, true)}
      </div>
    </section>
  );
}
