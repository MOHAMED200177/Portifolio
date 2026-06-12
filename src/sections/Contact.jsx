import { useState } from 'react';
import { personal } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';
import { Mail, GitFork, Link2, Phone, ArrowUpRight, Send } from 'lucide-react';

const LINKS = [
  { icon: Mail,    label: 'Email',    value: 'mohamedelafandy593@gmail.com', href: `mailto:mohamedelafandy593@gmail.com` },
  { icon: GitFork, label: 'GitHub',   value: 'MOHAMED200177',                href: personal.github },
  { icon: Link2,   label: 'LinkedIn', value: 'Mohamed Elafandy',             href: personal.linkedin },
  { icon: Phone,   label: 'Phone',    value: '+20 109 584 6921',              href: `tel:+201095846921` },
];

export default function Contact() {
  const { dark } = useTheme();
  const [copied, setCopied] = useState(false);
  const textColor = dark ? 'text-white' : 'text-[#0A0A0F]';
  const mutedColor = 'text-[#6B6B7B]';
  const borderColor = dark ? 'border-[#1E1E2E]' : 'border-gray-200';
  const surfaceColor = dark ? 'bg-[#13131A]' : 'bg-white';

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[160px] opacity-[0.06] pointer-events-none"
        style={{ background: '#E8FF47' }} aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 reveal">
          <p className="section-label mb-3">06 / Contact</p>
          <h2 id="contact-heading"
            className={`font-display text-4xl sm:text-5xl font-bold leading-tight ${textColor}`}
            style={{ fontFamily: 'Syne, sans-serif' }}>
            Let's Build
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #E8FF47 0%, #C8DF27 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Something Real</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* Left: CTA */}
          <div className="reveal">
            <p className={`text-lg sm:text-xl leading-relaxed mb-8 ${mutedColor}`}>
              I'm open to backend roles, full-stack positions, fintech projects, and ERP system development.
              Whether you're building something ambitious or need a reliable engineer — let's talk.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <a href={`mailto:${personal.email}`}
                className="btn-shimmer group inline-flex items-center gap-2 bg-[#E8FF47] text-[#0A0A0F] font-bold px-7 py-3.5 text-sm hover:bg-white transition-all duration-200 focus-visible:outline-accent"
                style={{ fontFamily: 'Syne, sans-serif' }}>
                <Send size={13} />
                Send Me an Email
              </a>
              <button
                onClick={copyEmail}
                className={`inline-flex items-center gap-2 border ${borderColor} px-5 py-3.5 text-sm font-mono transition-all duration-200 hover:border-[#E8FF47] hover:text-[#E8FF47] ${textColor} focus-visible:outline-accent`}
                aria-live="polite">
                {copied ? '✓ Copied!' : 'Copy Email'}
              </button>
            </div>

            {/* Quick note */}
            <p className={`font-mono text-[10px] ${mutedColor}`}>
              ⟶ Response time: usually within 24h
            </p>
          </div>

          {/* Right: Link list */}
          <div className="grid gap-px bg-[#1E1E2E] reveal reveal-delay-1">
            {LINKS.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={`${label}: ${value}`}
                className={`group flex items-center justify-between p-4 sm:p-5 ${surfaceColor} hover:bg-[#E8FF47]/5 transition-all duration-200 focus-visible:outline-accent`}>
                <div className="flex items-center gap-4 min-w-0">
                  <div className="p-2 border border-[#E8FF47]/20 bg-[#E8FF47]/5 flex-shrink-0 group-hover:border-[#E8FF47]/40 transition-colors">
                    <Icon size={13} className="text-[#E8FF47]" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-mono text-[9px] uppercase tracking-[0.2em] mb-0.5 ${mutedColor}`}>{label}</p>
                    <p className={`text-sm font-medium truncate ${textColor}`}>{value}</p>
                  </div>
                </div>
                <ArrowUpRight size={13}
                  className={`${mutedColor} group-hover:text-[#E8FF47] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 ml-4`}
                  aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
