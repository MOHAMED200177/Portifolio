import { personal } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';
import { MapPin, Code2, BookOpen, Zap } from 'lucide-react';

const FACTS = [
  { icon: MapPin, label: 'Location', value: 'Alexandria, Egypt', sub: 'Remote · Relocation OK' },
  { icon: Code2, label: 'Specialization', value: 'Full-Stack & Backend', sub: 'Node.js · NestJS · React/Next.js' },
  { icon: BookOpen, label: 'Dual Background', value: 'Software Eng. + Finance', sub: 'Unique edge in ERP & fintech' },
];

export default function About() {
  const { dark } = useTheme();
  const textColor = dark ? 'text-white' : 'text-[#0A0A0F]';
  const mutedColor = 'text-[#6B6B7B]';
  const borderColor = dark ? 'border-[#1E1E2E]' : 'border-gray-200';
  const surfaceColor = dark ? 'bg-[#13131A]' : 'bg-white';

  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[120px] opacity-[0.04] pointer-events-none"
        style={{ background: '#E8FF47' }} aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-16 reveal">
          <p className="section-label mb-3">01 / About</p>
          <h2 id="about-heading"
            className={`font-display text-4xl sm:text-5xl font-bold leading-tight ${textColor}`}
            style={{ fontFamily: 'Syne, sans-serif' }}>
            Building Systems
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #E8FF47 0%, #C8DF27 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              That Actually Scale
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-12 xl:gap-20">
          {/* Bio */}
          <div className="space-y-6">
            <p className={`text-lg sm:text-xl leading-relaxed reveal ${mutedColor}`}>
              I'm a full-stack developer who builds systems that handle real load, real transactions, and real security requirements.
              My work at Sand Technologies and in freelance projects proved to me that <span className="text-[#E8FF47] font-medium">performance isn't a feature — it's a baseline.</span>
            </p>
            <p className={`text-base leading-relaxed reveal reveal-delay-1 ${mutedColor}`}>
              What sets me apart is my dual background in{' '}
              <span className="text-[#E8FF47] font-medium">Software Engineering</span> and{' '}
              <span className="text-[#E8FF47] font-medium">Accounting & Finance</span>.
              I don't just build the API — I understand the business logic behind invoices, ledgers, and financial reconciliation
              at a level most developers don't. This makes me uniquely effective in ERP systems, fintech backends, and anything
              where data integrity is non-negotiable.
            </p>
            <p className={`text-base leading-relaxed reveal reveal-delay-2 ${mutedColor}`}>
              Currently enrolled in the <span className={`font-medium ${dark ? 'text-white' : 'text-[#0A0A0F]'}`}>AWS AI & ML Scholars Program</span>, 
              expanding into AI/ML infrastructure while continuing to ship production-ready systems.
            </p>

            {/* Highlight bar */}
            <div className={`reveal reveal-delay-3 flex items-center gap-3 border-l-2 border-[#E8FF47] pl-5 py-2`}>
              <Zap size={14} className="text-[#E8FF47] flex-shrink-0" />
              <p className={`font-mono text-xs ${mutedColor}`}>
                Currently building Teacher Platform — a production SaaS with NestJS + PostgreSQL + Next.js 14
              </p>
            </div>
          </div>

          {/* Fact cards + Status */}
          <div className="flex flex-col gap-3 reveal reveal-delay-2">
            {FACTS.map(({ icon: Icon, label, value, sub }) => (
              <div key={label}
                className={`card-glow group flex items-start gap-4 p-4 border ${borderColor} ${surfaceColor} transition-all duration-300 cursor-default`}>
                <div className="p-2 border border-[#E8FF47]/20 bg-[#E8FF47]/5 flex-shrink-0 transition-colors group-hover:border-[#E8FF47]/40 group-hover:bg-[#E8FF47]/10">
                  <Icon size={13} className="text-[#E8FF47]" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className={`font-mono text-[10px] uppercase tracking-widest mb-0.5 ${mutedColor}`}>{label}</p>
                  <p className={`font-medium text-sm ${textColor}`}>{value}</p>
                  <p className={`font-mono text-[10px] mt-0.5 ${mutedColor}`}>{sub}</p>
                </div>
              </div>
            ))}

            {/* Status pill */}
            <div className={`p-4 border border-[#E8FF47]/25 bg-[#E8FF47]/5 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20 pointer-events-none"
                style={{ background: '#E8FF47' }} />
              <div className="relative flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8FF47] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8FF47]" />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#E8FF47]">Status</p>
              </div>
              <p className={`text-sm font-semibold ${textColor}`}>Open to opportunities</p>
              <p className={`font-mono text-[10px] mt-1 ${mutedColor}`}>Full-Stack · Backend · Remote preferred</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
