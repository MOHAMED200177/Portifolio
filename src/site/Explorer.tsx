import { useEffect, useState, type ReactNode } from "react";
import { content } from "../content";

type Ic = "tsx" | "md" | "env" | "dir";
// VS Code-style file icons, drawn in the site palette (no blue/cyan)
const Icon = ({ k, open }: { k: Ic; open?: boolean }) => {
  const p = { viewBox: "0 0 24 24", width: 14, height: 14, fill: "none", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
  if (k === "tsx") return <svg {...p} stroke="var(--orange)"><circle cx="12" cy="12" r="1.8" fill="var(--orange)" /><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /></svg>;
  if (k === "md") return <svg {...p} stroke="var(--text)"><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M6 15V9l3 3.5L12 9v6M16 9v6m0 0-2-2m2 2 2-2" /></svg>;
  if (k === "env") return <svg {...p} stroke="var(--acid-yellow)"><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" /></svg>;
  return <svg {...p} stroke="var(--gray)"><path d={open ? "M3 7h6l2 2h10l-2 10H3z" : "M3 6h7l2 2h9v11H3z"} /></svg>;
};
const Chev = () => <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: "rotate(90deg)" }}><path d="M9 5l7 7-7 7" /></svg>;

interface Props { open: boolean; onToggle: () => void; active: string; color: string; envOn: boolean; sound: boolean; onJump: (id: string) => void; onQuick: () => void; onDebug: () => void; onSound: () => void; }

export default function Explorer({ open, onToggle, active, color, envOn, sound, onJump, onQuick, onDebug, onSound }: Props) {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    if (!menu) return;
    const c = () => setMenu(false);
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(false); };
    addEventListener("click", c); addEventListener("keydown", k);
    return () => { removeEventListener("click", c); removeEventListener("keydown", k); };
  }, [menu]);

  const file = (name: string, id: string, icon: Ic, pad: string, track = true): ReactNode => (
    <button key={name} type="button" onClick={() => onJump(id)} className={`flex h-[22px] w-full items-center gap-1.5 pr-1 text-left hover:bg-surface hover:text-text ${pad}`}
      style={track && active === id ? { background: "var(--panel)", color: "var(--text)", boxShadow: `inset 2px 0 0 ${color}` } : undefined}>
      <Icon k={icon} /><span className="truncate">{name}</span>
    </button>
  );
  const dir = (name: string, pad: string): ReactNode => <div className={`flex h-[22px] items-center gap-1 ${pad}`}><Chev /><Icon k="dir" open /><span className="truncate">{name}</span></div>;
  const items: [string, string, () => void][] = [["Quick Open…", "Ctrl+P", onQuick], ["Toggle Debug", "Ctrl+D", onDebug], [`Sound: ${sound ? "on" : "off"}`, "", onSound]];

  return (
    <aside className="hidden md:block">
      {!open && (
        <div className="sticky top-14 pl-1">
          <button type="button" aria-label="Open file explorer" aria-expanded={false} onClick={onToggle} className="grid h-8 w-7 place-items-center text-gray hover:bg-surface hover:text-text"><span aria-hidden className="-rotate-90"><Chev /></span></button>
        </div>
      )}
      {open && <div className="sticky top-14 w-[150px] pl-1.5 font-mono text-[11px] text-gray select-none">
        <div className="flex h-8 items-center justify-between pr-1">
          <button type="button" aria-label="Close file explorer" aria-expanded onClick={onToggle} className="flex h-8 items-center gap-1 text-[10px] tracking-[0.12em] hover:text-text"><span aria-hidden className="rotate-90"><Chev /></span>EXPLORER</button>
          <div className="relative">
            <button type="button" aria-label="More actions" aria-haspopup="menu" aria-expanded={menu} onClick={() => setMenu(!menu)} className="grid h-6 w-6 place-items-center hover:bg-surface hover:text-text">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" /></svg>
            </button>
            {menu && (
              <ul role="menu" className="absolute right-0 z-30 mt-1 w-44 border border-border bg-surface py-1 text-text">
                {items.map(([l, k, fn]) => <li key={l} role="none"><button role="menuitem" type="button" onClick={fn} className="flex min-h-[28px] w-full items-center justify-between px-3 text-left hover:bg-panel"><span>{l}</span><span className="text-gray">{k}</span></button></li>)}
              </ul>
            )}
          </div>
        </div>
        <div className="flex h-[22px] items-center gap-1 text-[10.5px] font-medium tracking-wide text-text"><Chev />PORTFOLIO</div>
        {dir("src", "pl-3")}
        {dir("components", "pl-4")}
        {content.stages.map((s) => file(s.file, s.id, "tsx", "pl-[1.55rem]"))}
        {file("README.md", "request", "md", "pl-3", false)}
        {envOn && file(".env", "exception", "env", "pl-3")}
      </div>}
    </aside>
  );
}
