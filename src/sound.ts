// UI sound engine (plain Web Audio, no library).
//
// Browsers keep audio locked until the visitor's first tap / click / key. So the intro opens on a "power on"
// screen: that first gesture unlocks audio *and* starts the show, which means "sound: on" is really on.
// Every later gesture re-checks the context, so a tab that was suspended recovers by itself.
import { useSyncExternalStore } from "react";

const STORE = "pf-sound";
const read = (): boolean => { try { return localStorage.getItem(STORE) !== "off"; } catch { return true; } };

let on = read();
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
const bufs: Record<string, AudioBuffer[]> = {};
const subs = new Set<() => void>();

type Kind = "key" | "space" | "enter" | "back";

function mk(c: AudioContext, ms: number, f: (t: number, i: number, n: number) => number): AudioBuffer {
  const n = Math.floor((c.sampleRate * ms) / 1000), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.max(-1, Math.min(1, f(i / c.sampleRate, i, n)));
  return b;
}

// One soft mechanical tick: a very short high "tik" plus a faint low body. Deliberately small and quiet.
function keyBuf(c: AudioContext, f: number, decay: number, body: number): AudioBuffer {
  let prev = 0;
  return mk(c, 48, (t) => {
    const nz = Math.random() * 2 - 1, hp = nz - prev; prev = nz;
    const clk = hp * Math.exp(-t / 0.0008) * 0.35;
    const tik = Math.sin(2 * Math.PI * f * t) * Math.exp(-t / decay) * 0.5;
    const low = Math.sin(2 * Math.PI * 240 * t) * Math.exp(-t / 0.007) * body;
    return clk + tik + low;
  });
}

function build(c: AudioContext) {
  bufs.key = [1050, 1150, 1250, 1350].map((f) => keyBuf(c, f, 0.0055, 0.18));
  bufs.space = [keyBuf(c, 780, 0.008, 0.28), keyBuf(c, 820, 0.008, 0.28)];
  bufs.enter = [keyBuf(c, 700, 0.009, 0.3)];
  bufs.back = [keyBuf(c, 1000, 0.006, 0.18), keyBuf(c, 1080, 0.006, 0.18)];
  bufs.blip = [mk(c, 50, (t, i, n) => Math.sin(2 * Math.PI * (760 + 140 * (i / n)) * t) * Math.exp(-i / (n * 0.3)) * 0.4)];
}

function ensure(): AudioContext | null {
  if (ctx) return ctx;
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  ctx = new AC({ latencyHint: "interactive" });
  master = ctx.createGain(); master.gain.value = 0.8; master.connect(ctx.destination);
  build(ctx);
  return ctx;
}

/** Call from inside a user gesture (key / pointer / tap). Resolves true when audio is really running. */
export async function unlockAudio(): Promise<boolean> {
  const c = ensure();
  if (!c) return false;
  try {
    if (c.state !== "running") await c.resume();
    // a silent one-sample buffer finishes the unlock on older iOS Safari
    const s = c.createBufferSource(); s.buffer = c.createBuffer(1, 1, c.sampleRate); s.connect(c.destination); s.start();
  } catch { /* stays locked; the next gesture tries again */ }
  return c.state === "running";
}

if (typeof window !== "undefined") {
  ["pointerdown", "keydown", "touchend"].forEach((e) =>
    addEventListener(e, () => { if (on && (!ctx || ctx.state !== "running")) void unlockAudio(); }, { passive: true, capture: true }));
  document.addEventListener("visibilitychange", () => { if (!document.hidden && on && ctx && ctx.state !== "running") void ctx.resume().catch(() => undefined); });
}

function play(name: string, vol = 1, jitter = 0) {
  if (!on || !ctx || !master || ctx.state !== "running") return;
  const arr = bufs[name];
  if (!arr) return;
  const s = ctx.createBufferSource(), g = ctx.createGain();
  s.buffer = arr[Math.floor(Math.random() * arr.length)] as AudioBuffer;
  s.playbackRate.value = 1 + (Math.random() - 0.5) * jitter;
  g.gain.value = vol;
  s.connect(g); g.connect(master); s.start();
}

let lastKey = 0;
/** A keyboard key. Throttled so very fast scripted typing still sounds like typing, not a buzz. */
export function key(kind: Kind = "key") {
  const now = performance.now();
  if (now - lastKey < 55) return; // fast typing still sounds like calm, light ticking
  lastKey = now;
  play(kind, 0.2, 0.06);
}
export const blip = () => play("blip", 0.07);
export const thud = () => key("enter");

export const isSoundOn = () => on;
export function setSoundOn(v: boolean) {
  on = v;
  try { localStorage.setItem(STORE, v ? "on" : "off"); } catch { /* private mode */ }
  subs.forEach((f) => f());
  if (v) void unlockAudio().then((ok) => { if (ok) key(); });
}
/** [on, toggle]: one shared value, so the intro and the site can never disagree. */
export function useSound(): [boolean, () => void] {
  const v = useSyncExternalStore((f) => { subs.add(f); return () => { subs.delete(f); }; }, () => on, () => true);
  return [v, () => setSoundOn(!on)];
}
