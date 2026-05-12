import { skills } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';

export default function Skills() {
  const { dark } = useTheme();
  const bg = dark ? 'text-white' : 'text-[#0A0A0F]';
  const sub = 'text-[#6B6B7B]';
  const border = dark ? 'border-[#1E1E2E]' : 'border-gray-200';
  const surface = dark ? 'bg-[#13131A]' : 'bg-white';

  return (
    <section id="skills" className="py-24 relative">
      {/* Section stripe */}
      <div className={`border-y ${border} py-3 mb-16 overflow-hidden`}>
        <div className="flex gap-8 animate-[marquee_25s_linear_infinite] w-max">
          {[...Array(3)].flatMap(() =>
            ['Node.js', 'NestJS', 'MongoDB', 'Apache Kafka', 'Docker', 'TypeScript', 'JWT', 'Redis', 'REST APIs', 'Microservices']
              .map((s, i) => (
                <span key={`${s}-${i}`} className={`font-mono text-xs uppercase tracking-widest whitespace-nowrap flex items-center gap-4 ${sub}`}>
                  {s}
                  <span className="text-[#E8FF47]">·</span>
                </span>
              ))
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#E8FF47] mb-3">02 / Skills</p>
          <h2 className={`font-display text-4xl lg:text-5xl font-bold ${bg}`} style={{ fontFamily: 'Syne, sans-serif' }}>
            Technical
            <br />
            <span className="text-[#E8FF47]">Arsenal</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1E1E2E]">
          {skills.map((group, i) => (
            <div
              key={i}
              className={`p-6 group hover:bg-[#E8FF47]/5 transition-colors ${surface}`}
            >
              <p className={`font-mono text-xs uppercase tracking-widest mb-4 ${sub}`}>{group.category}</p>
              <div className="flex flex-col gap-2">
                {group.items.map(skill => (
                  <span
                    key={skill}
                    className={`text-sm font-medium ${bg} group-hover:text-[#E8FF47] transition-colors duration-300`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
