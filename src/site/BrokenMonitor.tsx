import { useEffect, useRef, useState } from "react";
import { content, site } from "../content";
import { key } from "../sound";

interface L { t: string; cls: string; speed: number; }
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const C = "var(--text)";

// Hand-drawn crack: radial fractures from one impact point, branches, rings, a few shards.
const RAYS = [
  "M640 120 L610 95 L575 98 L540 60 L500 52 L470 8", "M640 120 L668 88 L664 50 L690 22 L688 0",
  "M640 120 L690 130 L722 118 L760 140 L800 132", "M640 120 L655 165 L632 205 L650 260 L626 320 L640 380 L618 440 L630 500",
  "M640 120 L600 150 L560 148 L520 190 L470 198 L420 240 L380 238", "M640 120 L612 170 L580 210 L585 255 L540 300 L548 350",
  "M575 98 L560 122 L530 118", "M722 118 L735 150 L770 168", "M632 205 L590 215 L560 250", "M520 190 L505 232 L480 260",
  "M600 100 L630 80 L670 86 L702 112 L706 150", "M566 152 L578 192 L618 224 L668 212 L690 188",
];

export default function BrokenMonitor({ role }: { role: string }) {
  const lines: L[] = [
    { t: "$ send-request --to portfolio", cls: "text-text", speed: 26 },
    { t: "POST /portfolio HTTP/1.1", cls: "text-gray", speed: 10 },
    ...site.facts.map(([k, v]): L => ({ t: `${k}: ${v}`, cls: "text-gray", speed: 8 })),
    { t: "", cls: "", speed: 0 },
    { t: content.person.fullName, cls: "text-orange text-[clamp(28px,6.4vw,78px)] leading-[1.05]", speed: 55 },
    { t: role, cls: "text-text text-[clamp(15px,2.7vw,32px)]", speed: 24 },
    { t: "", cls: "", speed: 0 },
    { t: "HTTP/1.1 201 Created", cls: "text-mint", speed: 22 },
  ];
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [shown, setShown] = useState<string[]>(() => (reduce ? lines.map((l) => l.t) : []));
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    let gone = false, started = false, dead = false;
    const run = async () => {
      const out: string[] = [];
      for (const l of lines) {
        out.push(""); setShown([...out]);
        let cur = "";
        for (const c of l.t) {
          if (dead) return;
          cur += c; out[out.length - 1] = cur; setShown([...out]);
          if (l.speed >= 22) key(c === " " ? "space" : "key");
          await sleep(l.speed * (0.6 + Math.random() * 0.8));
        }
        await sleep(l.t ? 90 : 140);
      }
    };
    const check = () => {
      if (started || !gone || !el.current) return;
      if (el.current.getBoundingClientRect().top < innerHeight * 0.75) { started = true; removeEventListener("scroll", check); void run(); }
    };
    const go = () => { gone = true; check(); };
    window.addEventListener("site-go", go, { once: true });
    addEventListener("scroll", check, { passive: true });
    return () => { dead = true; window.removeEventListener("site-go", go); removeEventListener("scroll", check); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const last = shown.length - 1;
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="rounded-[22px] bg-[#131313] p-3 md:p-5" style={{ boxShadow: "0 40px 90px rgba(0,0,0,.7), inset 0 0 0 2px #2b2b2b, inset 0 2px 0 #3b3b3b" }}>
        <div ref={el} className="relative min-h-[430px] overflow-hidden rounded-[10px] bg-terminal-bg p-5 font-mono md:min-h-[470px] md:p-10" style={{ boxShadow: "inset 0 0 0 2px #000, inset 0 0 80px rgba(0,0,0,.9)" }}>
          <div className="sr-only"><h3>{content.person.fullName}</h3><p>{role}</p></div>
          <div aria-hidden="true" className="relative z-10 text-[clamp(11px,1.5vw,16px)]">
            {lines.map((l, i) => shown[i] === undefined ? null : (
              <div key={i} className={`break-words ${l.cls}`} style={{ minHeight: l.t ? undefined : "1rem" }}>{shown[i]}{i === last && <span className="cursor text-terminal-green">▌</span>}</div>
            ))}
          </div>
          <svg aria-hidden="true" viewBox="0 0 800 500" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-20 h-full w-full">
            <defs><radialGradient id="hit"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient></defs>
            <polygon points="640,120 690,130 722,118 735,150 655,165" fill="#fff" fillOpacity=".05" />
            <polygon points="640,120 600,150 566,152 578,192 612,170" fill="#fff" fillOpacity=".04" />
            <polygon points="640,120 610,95 575,98 600,100 630,80" fill="#fff" fillOpacity=".06" />
            <circle cx="640" cy="120" r="34" fill="url(#hit)" />
            <g transform="translate(1.5 1.5)" fill="none" stroke="#000" strokeOpacity=".7" strokeWidth="2.2" strokeLinejoin="round">{RAYS.map((d) => <path key={d} d={d} />)}</g>
            <g fill="none" stroke={C} strokeOpacity=".5" strokeWidth="1.2" strokeLinejoin="round">{RAYS.map((d) => <path key={d} d={d} vectorEffect="non-scaling-stroke" />)}</g>
            <rect x="0" y="212" width="800" height="2" fill="var(--hot-pink)" opacity=".35" />
            <rect x="612" y="0" width="2" height="500" fill="var(--orange)" opacity=".3" />
          </svg>
          <div aria-hidden className="pointer-events-none absolute inset-0 z-30" style={{ background: "linear-gradient(118deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,0) 34%), radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.5) 100%)" }} />
        </div>
      </div>
      <div aria-hidden className="mx-auto h-6 w-24 md:h-8 md:w-32" style={{ background: "linear-gradient(90deg,#141414,#2b2b2b 50%,#141414)", clipPath: "polygon(12% 0,88% 0,100% 100%,0 100%)" }} />
      <div aria-hidden className="mx-auto h-2 w-48 rounded-full md:h-3 md:w-72" style={{ background: "linear-gradient(#303030,#121212)", boxShadow: "0 12px 26px rgba(0,0,0,.7)" }} />
    </div>
  );
}
