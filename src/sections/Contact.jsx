import { personal } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';
import { Mail, GitFork, Link2, Phone, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const { dark } = useTheme();
  const bg = dark ? 'text-white' : 'text-[#0A0A0F]';
  const sub = 'text-[#6B6B7B]';
  const border = dark ? 'border-[#1E1E2E]' : 'border-gray-200';
  const surface = dark ? 'bg-[#13131A]' : 'bg-white';

  const links = [
    { icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: GitFork, label: 'GitHub', value: 'MOHAMED200177', href: personal.github },
    { icon: Link2, label: 'LinkedIn', value: 'Mohamed Elafandy', href: personal.linkedin },
    { icon: Phone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
  ];

  return (
    <section id="contact" className="py-24 relative">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ background: '#E8FF47' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#E8FF47] mb-3">06 / Contact</p>
          <h2 className={`font-display text-4xl lg:text-5xl font-bold ${bg}`} style={{ fontFamily: 'Syne, sans-serif' }}>
            Let's Build
            <br />
            <span className="text-[#E8FF47]">Something</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className={`text-lg leading-relaxed mb-8 ${sub}`}>
              I'm open to backend roles, fintech projects, ERP system development, and interesting engineering challenges. Whether you're building something ambitious or need a reliable backend engineer — let's talk.
            </p>

            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-3 bg-[#E8FF47] text-[#0A0A0F] font-bold px-8 py-4 text-sm hover:bg-white transition-colors"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              <Mail size={16} />
              Send Me an Email
            </a>
          </div>

          <div className="grid grid-cols-1 gap-px bg-[#1E1E2E]">
            {links.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className={`flex items-center justify-between p-5 ${surface} group hover:bg-[#E8FF47]/5 transition-colors`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 border border-[#E8FF47]/20 bg-[#E8FF47]/5">
                    <Icon size={14} className="text-[#E8FF47]" />
                  </div>
                  <div>
                    <p className={`font-mono text-xs uppercase tracking-widest mb-0.5 ${sub}`}>{label}</p>
                    <p className={`text-sm font-medium ${bg}`}>{value}</p>
                  </div>
                </div>
                <ArrowUpRight size={14} className={`${sub} group-hover:text-[#E8FF47] transition-colors`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
