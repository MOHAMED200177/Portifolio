import { GitFork, Link2, Mail, ArrowDown, Download } from 'lucide-react';
import { personal, stats } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';

export default function Hero() {
  const { dark } = useTheme();
  const bg = dark ? 'text-white' : 'text-[#0A0A0F]';
  const sub = 'text-[#6B6B7B]';
  const border = dark ? 'border-[#1E1E2E]' : 'border-gray-200';

  return (
    <section
      id="hero"
      className="min-h-screen relative flex flex-col justify-center pt-16 overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${dark ? '#E8FF47' : '#0A0A0F'} 1px, transparent 1px), linear-gradient(90deg, ${dark ? '#E8FF47' : '#0A0A0F'} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow blob */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: '#E8FF47' }}
      />

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p
              className={`font-mono text-xs uppercase tracking-[0.25em] mb-6 ${sub}`}
              style={{ animationDelay: '0ms' }}
            >
              <span className="text-[#E8FF47]">▸</span> Available for opportunities
            </p>

            <h1
              className={`font-display text-5xl lg:text-7xl font-extrabold leading-[1.0] mb-4 ${bg}`}
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Mohamed
              <br />
              <span className="text-[#E8FF47]">Elafandy</span>
            </h1>

            <p
              className={`font-display text-xl lg:text-2xl font-medium mb-6 ${sub}`}
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Backend Developer
            </p>

            <p className={`font-mono text-xs tracking-wide mb-10 max-w-md leading-relaxed ${sub}`}>
              {personal.subtitle}
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-[#E8FF47] text-[#0A0A0F] font-bold px-6 py-3 text-sm hover:bg-white transition-colors"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                View My Work
                <ArrowDown size={14} />
              </a>
              <a
                href="#contact"
                className={`inline-flex items-center gap-2 border px-6 py-3 text-sm transition-colors hover:border-[#E8FF47] hover:text-[#E8FF47] ${border} ${bg}`}
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Get In Touch
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a href={personal.github} target="_blank" rel="noreferrer"
                className={`p-2 border transition-colors hover:border-[#E8FF47] hover:text-[#E8FF47] ${border} ${sub}`}>
                <GitFork size={16} />
              </a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer"
                className={`p-2 border transition-colors hover:border-[#E8FF47] hover:text-[#E8FF47] ${border} ${sub}`}>
                <Link2 size={16} />
              </a>
              <a href={`mailto:${personal.email}`}
                className={`p-2 border transition-colors hover:border-[#E8FF47] hover:text-[#E8FF47] ${border} ${sub}`}>
                <Mail size={16} />
              </a>
              <span className={`font-mono text-xs ${sub}`}>{personal.email}</span>
            </div>
          </div>

          {/* Right — Stats */}
          <div className="hidden lg:grid grid-cols-2 gap-px bg-[#1E1E2E]">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`p-8 flex flex-col justify-end ${dark ? 'bg-[#0A0A0F]' : 'bg-[#F5F3EE]'}`}
              >
                <div
                  className="text-4xl font-extrabold text-[#E8FF47] mb-2"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {s.value}
                </div>
                <div className={`font-mono text-xs uppercase tracking-widest ${sub}`}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile stats */}
        <div className="mt-12 grid grid-cols-2 gap-px bg-[#1E1E2E] lg:hidden">
          {stats.map((s, i) => (
            <div key={i} className={`p-6 ${dark ? 'bg-[#0A0A0F]' : 'bg-[#F5F3EE]'}`}>
              <div className="text-3xl font-extrabold text-[#E8FF47]" style={{ fontFamily: 'Syne, sans-serif' }}>
                {s.value}
              </div>
              <div className={`font-mono text-xs uppercase tracking-widest mt-1 ${sub}`}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6B6B7B]">
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
