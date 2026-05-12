import { personal } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';
import { GitFork, Link2, Mail } from 'lucide-react';

export default function Footer() {
  const { dark } = useTheme();
  const sub = 'text-[#6B6B7B]';
  const border = dark ? 'border-[#1E1E2E]' : 'border-gray-200';

  return (
    <footer className={`border-t ${border} py-8`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className={`font-display font-bold text-sm`} style={{ fontFamily: 'Syne, sans-serif' }}>
            <span className="text-[#E8FF47]">M</span>
            <span className={dark ? 'text-white' : 'text-[#0A0A0F]'}>ohamed Elafandy</span>
          </p>
          <p className={`font-mono text-xs mt-0.5 ${sub}`}>Backend Developer · Alexandria, Egypt</p>
        </div>
        <div className="flex items-center gap-4">
          <a href={personal.github} target="_blank" rel="noreferrer"
            className={`p-2 border transition-colors hover:border-[#E8FF47] hover:text-[#E8FF47] border-[#1E1E2E] ${sub}`}>
            <GitFork size={13} />
          </a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer"
            className={`p-2 border transition-colors hover:border-[#E8FF47] hover:text-[#E8FF47] border-[#1E1E2E] ${sub}`}>
            <Link2 size={13} />
          </a>
          <a href={`mailto:${personal.email}`}
            className={`p-2 border transition-colors hover:border-[#E8FF47] hover:text-[#E8FF47] border-[#1E1E2E] ${sub}`}>
            <Mail size={13} />
          </a>
        </div>
        <p className={`font-mono text-xs ${sub}`}>© {new Date().getFullYear()} · Built with React</p>
      </div>
    </footer>
  );
}
