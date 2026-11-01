type L = (s: string) => void;
const ls = new Set<L>();
export const onLog = (f: L) => { ls.add(f); return () => { ls.delete(f); }; };
export const log = (s: string) => ls.forEach((f) => f(s));
export interface Scroller { scrollTo: (t: HTMLElement, o?: { offset?: number }) => void; }
let sc: Scroller | null = null;
export const setScroller = (s: Scroller | null) => { sc = s; };
export const jumpTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (sc) sc.scrollTo(el, { offset: -48 });
  else el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
};
