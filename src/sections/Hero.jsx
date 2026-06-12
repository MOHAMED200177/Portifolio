import { useEffect, useState } from 'react';
import { GitFork, Link2, Mail, ArrowDown, Terminal } from 'lucide-react';
import { personal, stats } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';

function TypewriterText({ words }) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const speed = deleting ? 40 : 80;
    const current = words[idx];
    const timer = setTimeout(() => {
      if (!deleting && sub < current.length) {
        setText(current.substring(0, sub + 1));
        setSub(s => s + 1);
      } else if (!deleting && sub === current.length) {
        setTimeout(() => setDeleting(true), 1800);
      } else if (deleting && sub > 0) {
        setText(current.substring(0, sub - 1));
        setSub(s => s - 1);
      } else {
        setDeleting(false);
        setIdx(i => (i + 1) % words.length);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [sub, deleting, idx, words]);

  return (
    <span className="text-[#E8FF47]">
      {text}<span className="inline-block w-0.5 h-[0.85em] bg-[#E8FF47] ml-0.5 animate-pulse align-middle" />
    </span>
  );
}

const ROLES = ['Full-Stack Developer', 'Backend Engineer', 'API Architect', 'NestJS Specialist'];

export default function Hero() {
  const { dark } = useTheme();
  const isDark = dark;
  const textColor = isDark ? 'text-white' : 'text-[#0A0A0F]';
  const mutedColor = 'text-[#6B6B7B]';
  const borderColor = isDark ? 'border-[#1E1E2E]' : 'border-gray-200';

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(232,255,71,0.12)' : 'rgba(10,10,15,0.08)'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.4,
        }}
      />

      {/* Gradient vignette */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, ${isDark ? '#0A0A0F' : '#F5F3EE'} 100%)` }}
      />

      {/* Large ambient glow */}
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-[140px] opacity-[0.06] pointer-events-none"
        aria-hidden="true" style={{ background: '#E8FF47' }} />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.04] pointer-events-none"
        aria-hidden="true" style={{ background: '#E8FF47' }} />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-12 xl:gap-20 items-center">

          {/* ── Left column ── */}
          <div className="space-y-6 lg:space-y-8">

            {/* Status badge */}
            <div className="reveal">
              <span className={`inline-flex items-center gap-2 border ${borderColor} px-4 py-2 text-xs font-mono tracking-widest uppercase ${mutedColor}`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8FF47] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8FF47]" />
                </span>
                Available for opportunities
              </span>
            </div>

            {/* Name */}
            <div className="reveal reveal-delay-1">
              <h1 className={`hero-name font-display font-extrabold leading-[0.95] tracking-[-0.02em] ${textColor}`}
                style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(3rem, 9vw, 6rem)' }}>
                Mohamed
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #E8FF47 0%, #C8DF27 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Elafandy
                </span>
              </h1>
            </div>

            {/* Typewriter role */}
            <div className="reveal reveal-delay-2">
              <p className={`font-display text-xl sm:text-2xl font-medium ${mutedColor} min-h-[2rem]`}
                style={{ fontFamily: 'Syne, sans-serif' }}>
                <TypewriterText words={ROLES} />
              </p>
            </div>

            {/* Stack pills */}
            <div className="reveal reveal-delay-3">
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'NestJS', 'React.js', 'Next.js', 'PostgreSQL', 'MongoDB', 'Docker'].map(s => (
                  <span key={s} className={`tag cursor-default`}>{s}</span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="reveal reveal-delay-4 flex flex-wrap gap-3">
              <a href="#projects"
                className="btn-shimmer group inline-flex items-center gap-2 bg-[#E8FF47] text-[#0A0A0F] font-bold px-6 py-3 text-sm transition-all duration-200 hover:bg-white hover:shadow-accent focus-visible:outline-accent"
                style={{ fontFamily: 'Syne, sans-serif' }}>
                View My Work
                <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
              <a href="#contact"
                className={`group inline-flex items-center gap-2 border ${borderColor} px-6 py-3 text-sm font-medium transition-all duration-200 hover:border-[#E8FF47] hover:text-[#E8FF47] hover:bg-[#E8FF47]/5 ${textColor} focus-visible:outline-accent`}
                style={{ fontFamily: 'Syne, sans-serif' }}>
                Get In Touch
              </a>
            </div>

            {/* Socials row */}
            <div className="reveal flex items-center gap-3 flex-wrap">
              <a href={personal.github} target="_blank" rel="noreferrer"
                aria-label="GitHub profile"
                className={`p-2.5 border ${borderColor} ${mutedColor} hover:border-[#E8FF47] hover:text-[#E8FF47] hover:bg-[#E8FF47]/5 transition-all duration-200 focus-visible:outline-accent`}>
                <GitFork size={15} strokeWidth={1.5} />
              </a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer"
                aria-label="LinkedIn profile"
                className={`p-2.5 border ${borderColor} ${mutedColor} hover:border-[#E8FF47] hover:text-[#E8FF47] hover:bg-[#E8FF47]/5 transition-all duration-200 focus-visible:outline-accent`}>
                <Link2 size={15} strokeWidth={1.5} />
              </a>
              <a href={`mailto:${personal.email}`}
                aria-label={`Email ${personal.email}`}
                className={`p-2.5 border ${borderColor} ${mutedColor} hover:border-[#E8FF47] hover:text-[#E8FF47] hover:bg-[#E8FF47]/5 transition-all duration-200 focus-visible:outline-accent`}>
                <Mail size={15} strokeWidth={1.5} />
              </a>
              <span className={`font-mono text-xs ${mutedColor} hidden sm:block`}>{personal.email}</span>
            </div>
          </div>

          {/* ── Right column — Stats ── */}
          <div className="hidden lg:block reveal reveal-delay-2">
            <div className="grid grid-cols-2 gap-px bg-[#1E1E2E]"
              style={{ boxShadow: '0 0 0 1px #1E1E2E' }}>
              {stats.map((s, i) => (
                <div key={i}
                  className={`group p-7 xl:p-8 flex flex-col justify-end transition-colors duration-300 ${isDark ? 'bg-[#0A0A0F] hover:bg-[#13131A]' : 'bg-[#F5F3EE] hover:bg-white'}`}>
                  <div className="text-3xl xl:text-4xl font-extrabold mb-2 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      background: 'linear-gradient(135deg, #E8FF47, #B8D000)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                    {s.value}
                  </div>
                  <div className={`font-mono text-[9px] uppercase tracking-[0.18em] ${mutedColor}`}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Terminal hint */}
            <div className={`mt-3 p-3 border ${isDark ? 'border-[#1E1E2E] bg-[#13131A]' : 'border-gray-200 bg-white'} flex items-center gap-2`}>
              <Terminal size={11} className="text-[#E8FF47] flex-shrink-0" />
              <code className={`font-mono text-[10px] ${mutedColor}`}>
                ~/<span className="text-[#E8FF47]">backend</span> && ~/<span className="text-[#E8FF47]">frontend</span>
              </code>
            </div>
          </div>
        </div>

        {/* Mobile stats */}
        <div className="mt-10 grid grid-cols-2 gap-px bg-[#1E1E2E] lg:hidden reveal">
          {stats.map((s, i) => (
            <div key={i} className={`p-5 ${isDark ? 'bg-[#0A0A0F]' : 'bg-[#F5F3EE]'}`}>
              <div className="text-2xl font-extrabold mb-1"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  background: 'linear-gradient(135deg, #E8FF47, #B8D000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                {s.value}
              </div>
              <div className={`font-mono text-[9px] uppercase tracking-widest ${mutedColor}`}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6B6B7B]"
        aria-hidden="true">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#E8FF47]/40" />
        <ArrowDown size={12} strokeWidth={1.5} className="animate-bounce" />
      </div>
    </section>
  );
}
