import { personal } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';
import { MapPin, GraduationCap, Briefcase } from 'lucide-react';

export default function About() {
  const { dark } = useTheme();
  const bg = dark ? 'text-white' : 'text-[#0A0A0F]';
  const sub = 'text-[#6B6B7B]';
  const border = dark ? 'border-[#1E1E2E]' : 'border-gray-200';
  const surface = dark ? 'bg-[#13131A]' : 'bg-white';

  const facts = [
    { icon: MapPin, label: 'Location', value: personal.location },
    { icon: Briefcase, label: 'Focus', value: 'Backend Systems & APIs' },
    { icon: GraduationCap, label: 'Dual Background', value: 'Software Eng. + Finance' },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#E8FF47] mb-3">01 / About</p>
          <h2 className={`font-display text-4xl lg:text-5xl font-bold ${bg}`} style={{ fontFamily: 'Syne, sans-serif' }}>
            The Developer
            <br />
            <span className="text-[#E8FF47]">Behind the API</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Bio */}
          <div className="lg:col-span-2">
            <p className={`text-lg leading-relaxed mb-6 ${sub}`}>
              I'm a backend-focused developer who builds systems that handle real load, real transactions, and real security requirements. My work at Sand Technologies and in freelance projects taught me that performance isn't a feature — it's a baseline.
            </p>
            <p className={`text-base leading-relaxed mb-8 ${sub}`}>
              What sets me apart is my dual background in <span className="text-[#E8FF47]">Software Engineering</span> and <span className="text-[#E8FF47]">Accounting & Finance</span>. I don't just build the API — I understand the business logic behind invoices, ledgers, and reconciliation at a level most developers don't. This makes me particularly effective building ERP systems, fintech backends, and anything where data integrity is non-negotiable.
            </p>
            <p className={`text-base leading-relaxed ${sub}`}>
              Currently enrolled in the AWS AI & ML Scholars Program, expanding into AI/ML infrastructure on AWS while continuing to ship production-ready Node.js backends.
            </p>
          </div>

          {/* Fact cards */}
          <div className="flex flex-col gap-4">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className={`p-5 border ${border} ${surface} flex items-start gap-4`}>
                <div className="mt-0.5 p-2 border border-[#E8FF47]/20 bg-[#E8FF47]/5">
                  <Icon size={14} className="text-[#E8FF47]" />
                </div>
                <div>
                  <p className={`font-mono text-xs uppercase tracking-widest mb-1 ${sub}`}>{label}</p>
                  <p className={`font-medium text-sm ${bg}`}>{value}</p>
                </div>
              </div>
            ))}

            {/* Availability badge */}
            <div className="p-5 border border-[#E8FF47]/30 bg-[#E8FF47]/5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#E8FF47] animate-pulse" />
                <p className="font-mono text-xs uppercase tracking-widest text-[#E8FF47]">Status</p>
              </div>
              <p className={`text-sm font-medium ${bg}`}>Open to opportunities</p>
              <p className={`font-mono text-xs mt-1 ${sub}`}>Remote · Relocation OK</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
