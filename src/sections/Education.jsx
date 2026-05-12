import { education, certifications } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';
import { Award, BookOpen } from 'lucide-react';

export default function Education() {
  const { dark } = useTheme();
  const bg = dark ? 'text-white' : 'text-[#0A0A0F]';
  const sub = 'text-[#6B6B7B]';
  const border = dark ? 'border-[#1E1E2E]' : 'border-gray-200';
  const surface = dark ? 'bg-[#13131A]' : 'bg-white';

  return (
    <section id="education" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#E8FF47] mb-3">05 / Education & Certs</p>
          <h2 className={`font-display text-4xl lg:text-5xl font-bold ${bg}`} style={{ fontFamily: 'Syne, sans-serif' }}>
            Always
            <br />
            <span className="text-[#E8FF47]">Learning</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {education.map((ed, i) => (
            <div key={i} className={`border ${border} ${surface} p-8 hover:border-[#E8FF47]/40 transition-colors`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 border border-[#E8FF47]/20 bg-[#E8FF47]/5 flex-shrink-0">
                  <BookOpen size={14} className="text-[#E8FF47]" />
                </div>
                <div>
                  <h3 className={`font-display font-bold text-base mb-1 ${bg}`} style={{ fontFamily: 'Syne, sans-serif' }}>
                    {ed.degree}
                  </h3>
                  <p className="text-[#E8FF47] text-sm font-medium">{ed.institution}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`font-mono text-xs border px-2 py-0.5 ${border} ${sub}`}>{ed.period}</span>
                <span className={`font-mono text-xs ${sub}`}>{ed.location}</span>
              </div>
              <p className={`text-sm leading-relaxed ${sub}`}>{ed.note}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="grid md:grid-cols-2 gap-px bg-[#1E1E2E]">
          {certifications.map((cert, i) => (
            <div key={i} className={`${surface} p-6 hover:bg-[#E8FF47]/5 transition-colors`}>
              <div className="flex items-start gap-3 mb-3">
                <Award size={14} className="text-[#E8FF47] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className={`font-display font-bold text-sm mb-1 ${bg}`} style={{ fontFamily: 'Syne, sans-serif' }}>
                    {cert.name}
                  </h4>
                  <p className={`font-mono text-xs ${sub}`}>{cert.issuer}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className={`text-sm ${sub}`}>{cert.note}</p>
                <span
                  className={`font-mono text-xs px-2 py-0.5 flex-shrink-0 ml-4 ${
                    cert.status.includes('Progress')
                      ? 'border border-[#E8FF47]/30 text-[#E8FF47]'
                      : 'border border-[#1E1E2E] text-[#6B6B7B]'
                  }`}
                >
                  {cert.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
