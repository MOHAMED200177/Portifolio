import { personal } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';
import { GitFork, Link2, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const { dark } = useTheme();
  const textColor = dark ? 'text-white' : 'text-[#0A0A0F]';
  const mutedColor = 'text-[#6B6B7B]';
  const borderColor = dark ? 'border-[#1E1E2E]' : 'border-gray-200';

  return (
    <footer className={`border-t ${borderColor} relative`} role="contentinfo">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-24 h-0.5 bg-gradient-to-r from-[#E8FF47] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <p className={`font-display font-extrabold text-base ${textColor}`} style={{ fontFamily: 'Syne, sans-serif' }}>
              <span className="text-[#E8FF47]">Mohamed</span> Elafandy
            </p>
            <p className={`font-mono text-[10px] mt-0.5 ${mutedColor}`}>
              Full-Stack Developer · Alexandria, Egypt
            </p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2" aria-label="Social links">
            {[
              { Icon: GitFork, href: personal.github, label: 'GitHub' },
              { Icon: Link2, href: personal.linkedin, label: 'LinkedIn' },
              { Icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                className={`p-2 border ${borderColor} ${mutedColor} hover:border-[#E8FF47] hover:text-[#E8FF47] hover:bg-[#E8FF47]/5 transition-all duration-200 focus-visible:outline-accent`}>
                <Icon size={13} strokeWidth={1.5} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className={`font-mono text-[10px] ${mutedColor} flex items-center gap-1`}>
            © {new Date().getFullYear()} · Built with
            <Heart size={9} className="text-[#E8FF47] mx-0.5" aria-hidden="true" />
            React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
