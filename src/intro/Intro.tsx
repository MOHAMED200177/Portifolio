import { useEffect, useRef, useState } from "react";
import { content } from "../content";
import { key, thud, useSound } from "../sound";
import type { IntroEvent, Phase } from "./machine";

interface K { id: string; l: string; w: number; mod?: boolean; }
const ch = (s: string, mod = false): K[] => [...s].map((c) => ({ id: c, l: c, w: 1, mod }));
// widths sum to 14.8 units per row; `mod` keys are hidden on phones (simplified keyboard that still lights)
const ROWS: K[][] = [
  [{ id: "`", l: "`", w: 1, mod: true }, ...ch("1234567890-="), { id: "bs", l: "⌫", w: 1.8 }],
  [{ id: "tab", l: "tab", w: 1.5, mod: true }, ...ch("qwertyuiop"), ...ch("[]", true), { id: "\\", l: "\\", w: 1.3, mod: true }],
  [{ id: "caps", l: "caps", w: 1.8, mod: true }, ...ch("asdfghjkl;'"), { id: "enter", l: "enter", w: 2 }],
  [{ id: "shiftL", l: "shift", w: 2.3, mod: true }, ...ch("zxcvbnm,./"), { id: "shiftR", l: "shift", w: 2.5, mod: true }],
  [{ id: "ctrl", l: "ctrl", w: 1.8, mod: true }, { id: "alt", l: "alt", w: 1.5, mod: true }, { id: "space", l: "", w: 8.2 }, { id: "alt2", l: "alt", w: 1.5, mod: true }, { id: "ctrl2", l: "ctrl", w: 1.8, mod: true }],
];
const SH: Record<string, string> = { "&": "7", "@": "2", _: "-", "?": "/", "+": "=", ":": ";", '"': "'", "(": "9", ")": "0", "{": "[", "}": "]", "<": ",", ">": ".", "!": "1" };
const keysFor = (c: string): string[] => (c === " " ? ["space"] : SH[c] ? ["shiftL", SH[c]] : c !== c.toLowerCase() ? ["shiftL", c.toLowerCase()] : [c]);

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const pid = String(Math.floor(rnd(4000, 9000)));
const stamp = () => new Date().toLocaleString("en-GB", { hour12: false }).replace(",", "");
const nest = (c: string, m: string, ms: number) => `[Nest] ${pid}  - ${stamp()}  LOG [${c}] ${m} +${ms}ms`;
const serverLines = () => [
  nest("NestFactory", "Starting Nest application...", 0),
  nest("InstanceLoader", "AppModule dependencies initialized", 12),
  nest("RoutesResolver", "PortfolioController {/portfolio}:", 3),
  nest("RouterExplorer", "Mapped {/portfolio, POST} route", 1),
  nest("NestApplication", "Nest application successfully started", 4),
];
const gitOut = ["Initialized empty Git repository in ./.git/", "[main (root-commit) 3f9a1c2] portfolio for backend and full-stack developer", " 24 files changed, 1880 insertions(+)", " * [new branch]      main -> main"];
const { prompts, roleJourney: J, roleSuffix, captions, command } = content.intro;
const finalRole = J[2] + roleSuffix;

export default function Intro({ phase, send }: { phase: Phase; send: (e: IntroEvent) => void }) {
  const [out, setOut] = useState<string[]>([]);
  const [cur, setCur] = useState("");
  const [cap, setCap] = useState("");
  const [lit, setLit] = useState<string[]>([]);
  const [idle, setIdle] = useState(false);
  const [snd, toggleSnd] = useSound();
  const veil = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  const runId = useRef(0);
  const tm = useRef<ReturnType<typeof setTimeout>>();

  const press = (ids: string[]) => { key(ids.includes("space") ? "space" : ids.includes("enter") ? "enter" : ids.includes("bs") ? "back" : "key"); setLit(ids); clearTimeout(tm.current); tm.current = setTimeout(() => setLit([]), 90); };

  useEffect(() => {
    if (phase !== "typing" || done.current) return;
    const run = ++runId.current;
    const alive = () => run === runId.current;
    const push = (l: string) => setOut((o) => [...o, l]);
    // ops: "text" types it, "-n" backspaces n, "~ms" waits, "@i" shows caption i
    const type = async (prefix: string, ops: string[], speed: number) => {
      let t = "";
      for (const op of ops) {
        if (!alive()) return;
        if (op.startsWith("~")) { await sleep(+op.slice(1)); continue; }
        if (op.startsWith("@")) { setCap(captions[+op.slice(1)] ?? ""); continue; }
        if (op.startsWith("-")) { for (let i = +op.slice(1); i > 0; i--) { t = t.slice(0, -1); setCur(prefix + t); press(["bs"]); await sleep(rnd(50, 90)); } continue; }
        for (const c of op) { if (!alive()) return; t += c; setCur(prefix + t); press(keysFor(c)); await sleep(rnd(speed * 0.6, speed * 1.5)); }
      }
    };
    void (async () => {
      await type("$ ", [command], 2400 / command.length);
      if (!alive()) return;
      push("$ " + command); setCur("");
      for (const l of gitOut) { push(l); await sleep(80); }
      for (const l of serverLines()) { if (!alive()) return; push(l); await sleep(rnd(170, 250)); }
      await type(prompts.name + " ", ["Mohamd", "-1", "ed"], 110);
      if (!alive()) return;
      push(prompts.name + " Mohamed");
      await type(prompts.role + " ", [J[0], "@0", "~550", "-" + J[0].length, J[1], "@1", "~550", "-" + J[1].length, J[2], "@2"], 85);
      if (!alive()) return;
      setCur(""); push(prompts.role + " " + finalRole);
      done.current = true;
      send({ type: "TYPING_DONE" });
    })();
    return () => { runId.current++; };
  }, [phase, send]);

  useEffect(() => {
    if (phase !== "awaitingSend") return;
    if (!done.current) {
      done.current = true;
      setOut(["$ " + command, ...gitOut, ...serverLines(), prompts.name + " Mohamed", prompts.role + " " + finalRole]);
      setCur(""); setCap(captions[2]);
    }
    const t = setTimeout(() => setIdle(true), 3000);
    const auto = setTimeout(() => send({ type: "SEND" }), 7500); // nobody pressed Enter: send it for them
    return () => { clearTimeout(t); clearTimeout(auto); };
  }, [phase]);

  useEffect(() => {
    if (phase === "sending") {
      thud(); setLit(["enter"]);
      setOut((o) => [...o, "> POST /portfolio", "< 201 Created"]);
      const t = setTimeout(() => send({ type: "SENT_LOGGED" }), 600);
      return () => clearTimeout(t);
    }
    if (phase === "zooming") {
      let tw: gsap.core.Timeline | undefined;
      void import("gsap").then(({ gsap }) => {
        tw = gsap.timeline({ onComplete: () => send({ type: "ZOOM_DONE" }) })
          .to(scene.current, { scale: 2.3, yPercent: -10, duration: 1.2, ease: "power3.inOut" })
          .to(veil.current, { opacity: 0, duration: 0.4, ease: "power1.in" }, 0.85); // the site opens from inside the screen
      });
      return () => { tw?.kill(); };
    }
  }, [phase, send]);

  const ready = phase === "awaitingSend";
  const keyCls = (id: string) => (lit.includes(id)
    ? "translate-y-[2px] bg-terminal-green text-terminal-bg shadow-none"
    : "bg-[#262626] text-gray shadow-[0_2px_0_#0a0a0a,0_4px_5px_rgba(0,0,0,.55)]");
  const size = "h-11 rounded-[5px] font-mono text-[10px] transition-transform duration-75 md:h-12 md:text-xs";

  return (
    <div ref={veil} className="fixed inset-0 z-50 grid place-items-center overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 38%, #171717 0%, #070707 70%)" }}>
      <button type="button" aria-pressed={snd} onPointerDown={(e) => e.stopPropagation()} onClick={toggleSnd} className="absolute right-3 top-3 z-10 min-h-[44px] px-3 font-mono text-xs text-gray">sound {snd ? "on" : "off"}</button>
      <div ref={scene} className="w-[min(96vw,1040px)]" style={{ transformOrigin: "50% 28%" }}>
        {/* monitor: bezel, glass, glare, vignette, power LED */}
        <div className="relative rounded-[20px] bg-[#131313] p-2.5 md:p-4" style={{ boxShadow: "0 40px 90px rgba(0,0,0,.8), inset 0 0 0 2px #2b2b2b, inset 0 2px 0 #3b3b3b" }}>
          <div className="relative overflow-hidden rounded-[10px] bg-terminal-bg" style={{ boxShadow: "inset 0 0 0 2px #000, inset 0 0 70px rgba(0,0,0,.9)" }}>
            <div className="flex h-[min(41dvh,440px)] flex-col justify-end overflow-hidden p-3 font-mono text-[clamp(12px,1.9vw,20px)] leading-snug text-terminal-green md:p-6" style={{ textShadow: "0 0 7px rgba(57,255,122,.35)" }}>
              {out.slice(-14).map((l, i) => <div key={i} className="break-all">{l}</div>)}
              {cur && <div className="break-all">{cur}<span className="cursor">▌</span></div>}
              {cap && <div className="font-serif italic opacity-80">{cap}</div>}
              {ready && (
                <div className="mt-2">
                  <div>{prompts.send} <span className="cursor">▌</span></div>
                  <button type="button" onClick={() => send({ type: "SEND" })} className="mt-2 min-h-[44px] w-full border border-terminal-green px-4 text-left hover:bg-terminal-green hover:text-terminal-bg">{content.intro.sendFallback} ⏎</button>
                </div>
              )}
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(118deg, rgba(255,255,255,.09) 0%, rgba(255,255,255,0) 34%), radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,.55) 100%)" }} />
          </div>
          <div aria-hidden className="mt-2 flex justify-center md:mt-3"><span className="h-1.5 w-1.5 rounded-full bg-terminal-green" style={{ boxShadow: "0 0 7px #39FF7A" }} /></div>
        </div>
        <div aria-hidden className="mx-auto h-6 w-24 md:h-8 md:w-32" style={{ background: "linear-gradient(90deg,#141414,#2b2b2b 50%,#141414)", clipPath: "polygon(12% 0,88% 0,100% 100%,0 100%)" }} />
        <div aria-hidden className="mx-auto h-2 w-48 rounded-full md:h-3 md:w-72" style={{ background: "linear-gradient(#303030,#121212)", boxShadow: "0 12px 26px rgba(0,0,0,.75)" }} />
        {/* keyboard */}
        <div className="mx-auto mt-4 w-[min(96vw,920px)] rounded-2xl bg-[#101010] p-2 md:mt-6 md:p-3" style={{ boxShadow: "0 18px 40px rgba(0,0,0,.7), inset 0 1px 0 #2a2a2a" }}>
          {ROWS.map((row, ri) => (
            <div key={ri} className="mb-[3px] flex justify-center gap-[3px] [--g:42px] last:mb-0 md:mb-1 md:gap-1 md:[--g:56px]">
              {row.map((k) => {
                const style = { width: `calc(${k.w} * (100% - var(--g)) / 14.8)` };
                if (k.id === "enter") {
                  return <button key={k.id} type="button" aria-label={content.intro.sendFallback} style={style} onClick={() => send({ type: "SEND" })} className={`${size} min-h-[44px] ${ready ? `bg-terminal-green text-terminal-bg ${idle ? "key-pulse-hot" : "key-pulse"}` : keyCls("enter")}`}>enter</button>;
                }
                return <div key={k.id} aria-hidden style={style} className={`${k.mod ? "hidden md:grid" : "grid"} place-items-center ${size} ${keyCls(k.id)}`}>{k.l}</div>;
              })}
            </div>
          ))}
        </div>
        {ready && <p className="mt-3 text-center font-mono text-sm text-terminal-green">{content.intro.sendHint} ↑</p>}
      </div>
    </div>
  );
}
