import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useActiveSection } from '../hooks/useScrollReveal';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useActiveSection();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const base = 'fixed top-0 left-0 right-0 z-50 transition-all duration-500';
  const bg = scrolled
    ? dark
      ? `${base} bg-[#0A0A0F]/95 backdrop-blur-xl border-b border-[#1E1E2E] shadow-[0_1px_0_rgba(232,255,71,0.04)]`
      : `${base} bg-[#F5F3EE]/95 backdrop-blur-xl border-b border-gray-200`
    : `${base} bg-transparent`;

  return (
    <>
      <nav className={bg} role="navigation" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="group flex items-baseline gap-0.5 outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Mohamed Elafandy — home">
            <span className="font-display font-extrabold text-xl text-[#E8FF47] transition-transform group-hover:scale-105"
              style={{ fontFamily: 'Syne, sans-serif' }}>M</span>
            <span className={`font-display font-extrabold text-xl transition-colors ${dark ? 'text-white' : 'text-[#0A0A0F]'}`}
              style={{ fontFamily: 'Syne, sans-serif' }}>E</span>
            <span className="font-mono text-[10px] ml-0.5 text-[#6B6B7B] leading-none self-center">.dev</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="nav-link relative font-mono text-[10px] tracking-[0.2em] uppercase text-[#6B6B7B] hover:text-[#E8FF47] transition-colors duration-200 outline-none focus-visible:text-[#E8FF47]">
                {l.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 border border-[#1E1E2E] text-[#6B6B7B] hover:border-[#E8FF47] hover:text-[#E8FF47] transition-all duration-200 hover:bg-[#E8FF47]/5 focus-visible:outline-accent">
              {dark ? <Sun size={13} strokeWidth={1.5} /> : <Moon size={13} strokeWidth={1.5} />}
            </button>

            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className={`md:hidden p-2 border border-[#1E1E2E] transition-colors hover:border-[#E8FF47] ${dark ? 'text-white' : 'text-[#0A0A0F]'}`}>
              {open ? <X size={15} strokeWidth={1.5} /> : <Menu size={15} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>
      <div
        className={`fixed top-16 left-0 right-0 z-40 md:hidden transition-all duration-300 ease-out ${open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
        <div className={`border-b px-6 py-8 flex flex-col gap-6 ${dark ? 'bg-[#0A0A0F] border-[#1E1E2E]' : 'bg-[#F5F3EE] border-gray-200'}`}>
          {links.map((l, i) => (
            <a key={l.href} href={l.href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between font-mono text-xs tracking-[0.2em] uppercase text-[#6B6B7B] hover:text-[#E8FF47] transition-colors`}
              style={{ transitionDelay: `${i * 40}ms` }}>
              <span>{l.label}</span>
              <span className="text-[#E8FF47]/40 text-sm">→</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
