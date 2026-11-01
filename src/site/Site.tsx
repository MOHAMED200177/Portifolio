import { useEffect, useRef, useState } from "react";
import { content } from "../content";
import { jumpTo, log, onLog, setScroller } from "../logBus";
import { blip, useSound } from "../sound";
import Explorer from "./Explorer";
import Stages from "./Stages";


const role = content.intro.roleJourney[2] + content.intro.roleSuffix;
const files: [string, string, string][] = [...content.stages.map((s): [string, string, string] => [s.file, s.id, s.title]), ["README.md", "request", "root"]];

function QuickOpen({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [miss, setMiss] = useState(false);
  const m = files.filter(([f]) => f.toLowerCase().includes(q.toLowerCase()));
  const go = (id: string) => { jumpTo(id); onClose(); };
  const enter = () => {
    if (q === ".env") { go("exception"); window.dispatchEvent(new Event("reveal-env")); return; }
    const first = m[0];
    if (first) go(first[1]); else { log(`GET /${q} 404 Not Found`); setMiss(true); }
  };
  return (
    <div role="dialog" aria-label="Quick file search" className="fixed inset-0 z-40 grid place-items-start bg-black/60 p-4 pt-[12vh]" onClick={onClose}>
      <div className="mx-auto w-full max-w-xl border border-border bg-surface p-3 font-mono" onClick={(e) => e.stopPropagation()}>
        <input autoFocus value={q} onChange={(e) => { setQ(e.target.value); setMiss(false); }} placeholder="Go to file..." aria-label="File name"
          onKeyDown={(e) => { if (e.key === "Enter") enter(); if (e.key === "Escape") onClose(); }} className="w-full bg-transparent p-2 text-text outline-none" />
        {miss && <p className="p-2 text-crimson">404 Not Found: {q}</p>}
        <ul>{m.map(([f, id, l]) => <li key={f}><button type="button" onClick={() => go(id)} className="flex min-h-[44px] w-full justify-between px-2 text-left hover:bg-panel"><span>{f}</span><span className="text-gray">{l}</span></button></li>)}</ul>
      </div>
    </div>
  );
}

function LogStream() {
  const [ls, setLs] = useState<string[]>(["[Nest] Nest application successfully started on :3000"]);
  const [open, setOpen] = useState(false);
  useEffect(() => onLog((s) => setLs((l) => [...l.slice(-39), `${new Date().toLocaleTimeString("en-GB")} ${s}`])), []);
  return (
    <div className={`fixed inset-x-0 bottom-0 z-30 border-t border-border bg-terminal-bg font-mono text-xs text-terminal-green ${open ? "h-44" : "h-8 md:h-24"} overflow-hidden`} style={{ paddingBottom: "var(--safe-bottom)" }}>
      <button type="button" aria-label="Toggle server log" aria-expanded={open} onClick={() => setOpen(!open)} className="absolute right-1 top-0 z-10 min-h-[28px] px-2 text-gray">{open ? "▾" : "▴"}</button>
      <div aria-hidden="true" className="flex h-full flex-col justify-end px-3 py-1">{ls.slice(open ? -9 : -3).map((l, i) => <div key={i} className="truncate">{l}</div>)}</div>
    </div>
  );
}


// Idea: Ctrl+D "debug mode": component outlines, fps, renders and time spent per stage.
function DebugPanel({ active, renders }: { active: string; renders: number }) {
  const [fps, setFps] = useState(0);
  const [times, setTimes] = useState<Record<string, number>>({});
  const acc = useRef<Record<string, number>>({});
  const act = useRef(active);
  act.current = active;
  useEffect(() => {
    let raf = 0, last = performance.now(), t0 = last, frames = 0;
    const f = (n: number) => {
      acc.current[act.current] = (acc.current[act.current] ?? 0) + (n - last);
      last = n; frames++;
      if (n - t0 >= 500) { setFps(Math.round((frames * 1000) / (n - t0))); setTimes({ ...acc.current }); frames = 0; t0 = n; }
      raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div aria-hidden="true" data-debug className="fixed right-2 top-14 z-40 w-56 border border-border bg-terminal-bg p-3 font-mono text-xs text-terminal-green">
      <div className="mb-1">fps {fps} · renders {renders}</div>
      {content.stages.map((s) => (times[s.id] ? <div key={s.id} style={{ color: `var(--${s.color})` }}>{s.label} {(times[s.id]! / 1000).toFixed(1)}s</div> : null))}
    </div>
  );
}

export default function Site({ live, go }: { live: boolean; go: boolean }) {
  const [active, setActive] = useState("request");
  const [qo, setQo] = useState(false);
  const [ex, setEx] = useState(true);
  const dot = useRef<HTMLDivElement>(null);
  const nav = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState("");
  const [dbg, setDbg] = useState(false);
  const [envOn, setEnvOn] = useState(false);
  useEffect(() => { const f = () => setEnvOn(true); window.addEventListener("reveal-env", f); return () => window.removeEventListener("reveal-env", f); }, []);
  const renders = useRef(0);
  renders.current++;
  useEffect(() => { document.documentElement.classList.toggle("debug", dbg); if (dbg) log("[Debug] component outlines on"); }, [dbg]);
  const [snd, toggleSnd] = useSound();
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2600); };

  // reveal targets are hidden from first paint, revealed as the zoom opens the site
  useEffect(() => { document.querySelectorAll("section[data-stage]").forEach((sec) => sec.querySelectorAll(":scope > *, pre, li").forEach((el) => el.classList.add("rv"))); }, []);
  useEffect(() => {
    // Not an IntersectionObserver: Chromium treats a clip-path'd target as invisible, so it never reports it.
    if (!go) return;
    let pending: HTMLElement[] = [];
    let raf = 0;
    const check = () => {
      raf = 0;
      const vh = innerHeight;
      pending = pending.filter((el) => {
        const r = el.getBoundingClientRect();
        const isSec = el.tagName === "SECTION";
        if (r.top >= vh * (isSec ? 0.85 : 0.92)) return true; // anything already passed is revealed too
        if (isSec) { el.classList.add("sec-in"); return false; }
        const i = Array.prototype.indexOf.call(el.parentElement?.children ?? [], el);
        el.style.animationDelay = `${Math.min(i, 5) * 70}ms`; el.classList.add("rv-in");
        return false;
      });
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(check); };
    const t = setTimeout(() => {
      window.dispatchEvent(new Event("site-go"));
      pending = [...document.querySelectorAll<HTMLElement>("section[data-stage], .rv")];
      check();
      addEventListener("scroll", queue, { passive: true }); addEventListener("resize", queue);
    }, document.documentElement.dataset.phase === "live" ? 0 : 700);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); removeEventListener("scroll", queue); removeEventListener("resize", queue); };
  }, [go]);

  // smooth inertial scroll (Lenis, lazy), off for reduced motion
  useEffect(() => {
    if (!live || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, dead = false, inst: { destroy: () => void } | undefined;
    void import("lenis").then(({ default: Lenis }) => {
      if (dead) return;
      const x = new Lenis({ lerp: 0.09 });
      setScroller(x); inst = x;
      const f = (t: number) => { x.raf(t); raf = requestAnimationFrame(f); };
      raf = requestAnimationFrame(f);
    });
    return () => { dead = true; cancelAnimationFrame(raf); inst?.destroy(); setScroller(null); };
  }, [live]);

  useEffect(() => { // keep the active chip in view in the stage bar
    const b = nav.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (b && nav.current) nav.current.scrollTo({ left: b.offsetLeft - 24, behavior: "smooth" });
  }, [active]);

  useEffect(() => { // easter eggs: Konami = 418, unknown #hash = 404
    const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let i = 0;
    const k = (e: KeyboardEvent) => {
      i = e.key === seq[i] ? i + 1 : e.key === seq[0] ? 1 : 0;
      if (i === seq.length) { i = 0; log("GET /coffee 418 I'm a teapot"); say("418: I'm a teapot, and proud of it."); document.documentElement.classList.toggle("party"); }
    };
    const h = () => { const id = location.hash.slice(1); if (id && !document.getElementById(id)) { log(`GET /${id} 404 Not Found`); say(`404: /${id} not found`); } };
    addEventListener("keydown", k); addEventListener("hashchange", h);
    return () => { removeEventListener("keydown", k); removeEventListener("hashchange", h); };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("section[data-stage]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    const s = content.stages.find((x) => x.id === active);
    if (!s) return;
    blip(); log(s.log); log(`GET /${active} 200 ${Math.round(6 + Math.random() * 20)}ms`);
    history.replaceState(null, "", "#" + active);
  }, [active, live]);

  useEffect(() => { if (live && location.hash) jumpTo(location.hash.slice(1)); }, [live]);

  useEffect(() => {
    let raf = 0;
    const f = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const p = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
      if (dot.current) dot.current.style.transform = `translateY(${p * 60}vh)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    }); };
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      const key = e.key.toLowerCase();
      if (key === "p") { e.preventDefault(); setQo(true); }
      if (key === "d") { e.preventDefault(); setDbg((d) => !d); }
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, []);

  const color = (id: string) => `var(--${content.stages.find((s) => s.id === id)?.color ?? "orange"})`;
  return (
    <div className="pb-28">
      <div ref={bar} aria-hidden className="fixed inset-x-0 top-0 z-30 h-[2px] origin-left" style={{ background: color(active), transform: "scaleX(0)" }} />
      <nav ref={nav} aria-label="Request lifecycle" className="sticky top-0 z-20 flex items-center gap-1 overflow-x-auto border-b border-border bg-bg px-3 font-mono text-xs" style={{ paddingTop: "var(--safe-top)" }}>
        {content.stages.map((s) => (
          <button key={s.id} data-id={s.id} type="button" aria-current={active === s.id ? "step" : undefined} onClick={() => jumpTo(s.id)}
            className="min-h-[44px] shrink-0 px-2 transition-colors duration-200" style={{ background: active === s.id ? `var(--${s.color})` : "transparent", color: active === s.id ? "var(--bg)" : "var(--gray)" }}>{s.title}</button>
        ))}
        <button type="button" aria-pressed={snd} onClick={toggleSnd} className="ml-auto min-h-[44px] shrink-0 px-2 text-gray">sound {snd ? "on" : "off"}</button>
        <button type="button" onClick={() => setQo(true)} className="min-h-[44px] shrink-0 px-2 text-gray">Ctrl+P</button>
        <button type="button" aria-pressed={dbg} onClick={() => setDbg(!dbg)} className="min-h-[44px] shrink-0 px-2 text-gray">debug</button>
      </nav>
      <div aria-hidden className="fixed left-2 top-[20vh] z-10 h-[60vh] w-px bg-border">
        <div ref={dot} className="-ml-[5px] h-[11px] w-[11px] rounded-full" style={{ background: color(active), boxShadow: `0 0 12px ${color(active)}` }} />
      </div>
      <div className="md:grid" style={{ gridTemplateColumns: ex ? "160px minmax(0,1fr)" : "36px minmax(0,1fr)" }}>
        <Explorer open={ex} onToggle={() => setEx(!ex)} active={active} color={color(active)} envOn={envOn} sound={snd} onJump={jumpTo} onQuick={() => setQo(true)} onDebug={() => setDbg((d) => !d)} onSound={toggleSnd} />
        <div className="md:hidden px-3 pt-3"><select aria-label="Files" className="w-full bg-panel p-3 font-mono text-sm" value="" onChange={(e) => jumpTo(e.target.value)}><option value="">src/components/...</option>{files.map(([f, id]) => <option key={f} value={id}>{f}</option>)}</select></div>
        <main><Stages role={role} /></main>
      </div>
      <LogStream />
      {dbg && <DebugPanel active={active} renders={renders.current} />}
      {qo && <QuickOpen onClose={() => setQo(false)} />}
      {toast && <div role="status" className="fixed bottom-12 left-1/2 z-50 -translate-x-1/2 bg-acid-yellow px-4 py-2 font-mono text-sm text-bg">{toast}</div>}
    </div>
  );
}
