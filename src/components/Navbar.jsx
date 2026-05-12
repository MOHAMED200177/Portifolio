import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0F]/90 backdrop-blur-md border-b border-[#1E1E2E]' : 'bg-transparent'
      }`}
      style={!dark && scrolled ? { background: 'rgba(245,243,238,0.9)' } : {}}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display font-bold text-lg tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
          <span className="text-[#E8FF47]">M</span>
          <span className={dark ? 'text-white' : 'text-[#0A0A0F]'}>E</span>
          <span className={`font-mono text-xs ml-1 ${dark ? 'text-[#6B6B7B]' : 'text-[#6B6B7B]'}`}>.dev</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`font-mono text-xs tracking-widest uppercase transition-colors hover:text-[#E8FF47] ${
                dark ? 'text-[#6B6B7B]' : 'text-[#6B6B7B]'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className={`p-2 rounded border transition-colors ${
              dark
                ? 'border-[#1E1E2E] text-[#6B6B7B] hover:border-[#E8FF47] hover:text-[#E8FF47]'
                : 'border-gray-300 text-gray-500 hover:border-[#E8FF47] hover:text-[#0A0A0F]'
            }`}
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <button
            onClick={() => setOpen(o => !o)}
            className={`md:hidden p-2 ${dark ? 'text-white' : 'text-[#0A0A0F]'}`}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className={`md:hidden border-t px-6 py-6 flex flex-col gap-4 ${
            dark ? 'bg-[#0A0A0F] border-[#1E1E2E]' : 'bg-[#F5F3EE] border-gray-200'
          }`}
        >
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-mono text-xs tracking-widest uppercase text-[#6B6B7B] hover:text-[#E8FF47]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
