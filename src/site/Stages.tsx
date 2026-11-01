import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { content, links, site, ui, type Link, type Stage } from "../content";
import { jumpTo, log } from "../logBus";
import { key } from "../sound";
import BrokenMonitor from "./BrokenMonitor";
import Contact from "./Contact";
import ContactLinks from "./ContactLinks";

const S = (id: string) => content.stages.find((s) => s.id === id) as Stage;
const Code = ({ lines, className = "" }: { lines: readonly string[]; className?: string }) => (
  <pre className={`code overflow-x-auto bg-panel p-4 font-mono text-sm ${className}`}
    onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`); }}>
    {lines.map((l, i) => <div key={i}><span aria-hidden className="mr-4 inline-block w-5 select-none text-right text-gray">{i + 1}</span>{l}</div>)}
  </pre>
);
const G = "01{}<>/$#_=+";
function Scramble({ text }: { text: string }) {
  const [t, setT] = useState(text);
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([en]) => {
      if (!en?.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (n: number) => {
        const p = Math.min(1, (n - t0) / 700), k = Math.floor(p * text.length);
        setT(text.slice(0, k) + [...text.slice(k)].map((c) => (c === " " ? c : G[Math.floor(Math.random() * G.length)])).join(""));
        if (p < 1) raf = requestAnimationFrame(tick); else setT(text);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    const start = () => io.observe(el);
    window.addEventListener("site-go", start, { once: true });
    return () => { window.removeEventListener("site-go", start); io.disconnect(); cancelAnimationFrame(raf); };
  }, [text]);
  return <h2 ref={ref} aria-label={text} className="font-mono text-4xl md:text-6xl" style={{ color: "var(--c)" }}>{t}</h2>;
}
const Plain = ({ children }: { children: ReactNode }) => <p className="max-w-[60ch] font-serif text-lg leading-relaxed">{children}</p>;

function Sec({ id, children }: { id: string; children: ReactNode }) {
  const s = S(id);
  const intro = id === "request"; // the first section needs no title: everyone knows it is about me
  return (
    <section id={id} data-stage className="relative scroll-mt-12 px-5 py-24 md:px-12" style={{ "--c": `var(--${s.color})` } as CSSProperties}>
      <header data-comp={s.file} className={intro ? "mb-8" : "mb-10"}>
        <p className="mb-3 font-mono text-xs text-gray"><span style={{ color: "var(--c)" }}>{s.file}</span> · {s.route}</p>
        {!intro && <Scramble text={s.title} />}
        {!intro && <p className="mt-3 max-w-[60ch] font-serif text-xl">{s.subtitle}</p>}
      </header>
      {children}
    </section>
  );
}

const spot = (e: React.PointerEvent<HTMLElement>) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`); };
const markOf = (s: string) => (/AWS|Amazon/.test(s) ? "AWS" : /Udacity/.test(s) ? "UD" : /ALX/.test(s) ? "ALX" : s.slice(0, 2).toUpperCase());
const Chips = ({ list }: { list: string }) => <ul className="mt-4 flex flex-wrap gap-2">{list.split(", ").map((x) => <li key={x} className="chip">{x}</li>)}</ul>;

// Coloured like an editor, so a recruiter reads it as data and a developer reads it as code.
const Str = ({ v }: { v: string }) => <span className="text-mint">&quot;{v}&quot;</span>;
function AboutCode() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-panel font-mono text-[13px] md:text-sm">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2 text-xs text-gray">
        <span aria-hidden className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-crimson" /><i className="h-2.5 w-2.5 rounded-full bg-acid-yellow" /><i className="h-2.5 w-2.5 rounded-full bg-mint" /></span>
        <span className="ml-2">{site.about.file}</span>
      </div>
      <div className="break-words p-4 leading-7">
        <div><span className="text-hot-pink">export const</span> <span className="text-peach">developer</span> = {"{"}</div>
        {Object.entries(site.about.dev).map(([k, v]) => (
          <div key={k} className="pl-5"><span className="text-orange">{k}</span>: {Array.isArray(v) ? <>[{v.map((x, i) => <span key={x}>{i > 0 && ", "}<Str v={x} /></span>)}]</> : <Str v={v} />},</div>
        ))}
        <div>{"};"}</div>
      </div>
    </div>
  );
}

function About() {
  const techCount = site.skills.reduce((n, g) => n + g.items.length, 0);
  const stats: [number, string][] = [[site.roles.length, "work experiences"], [site.projects.length + site.roles.reduce((n, r) => n + (r.works?.length ?? 0), 0), "projects built"], [site.credentials.length, "credentials"], [techCount, "technologies"]];
  const map: [string, string, string][] = [
    ["middleware", "Education", site.background.map((b) => b.name).join(" · ")],
    ["interceptors", "Experience", `${site.roles.length} roles, latest: ${site.roles[0]?.title} (${site.roles[0]?.org})`],
    ["pipes", "Skills", site.skills.slice(0, 5).map((g) => g.group).join(", ") + " and more"],
    ["controller", "Projects", site.projects.map((p) => p.name).join(", ")],
    ["response", "Contact", content.contact.reasons.join(", ")],
  ];
  return (
    <div className="mt-16 grid gap-10 lg:grid-cols-[1.05fr_1fr]">
      <div className="min-w-0">
        <p className="max-w-[44ch] font-serif text-2xl leading-snug md:text-3xl">{site.about.summary}</p>
        <p className="mt-4 max-w-[60ch] font-serif text-lg text-gray">{site.requestPlain}</p>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(([n, l]) => (
            <li key={l} className="border-l-2 pl-3" style={{ borderColor: "var(--c)" }}>
              <p className="font-mono text-3xl leading-none">{n}</p><p className="mt-1 font-mono text-xs text-gray">{l}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-0">
        <AboutCode />
        <ul className="mt-5 divide-y divide-border border-y border-border font-mono text-sm">
          {map.map(([id, name, text]) => (
            <li key={id}>
              <button type="button" onClick={() => jumpTo(id)} className="row flex min-h-[44px] w-full items-baseline gap-3 py-2 text-left">
                <span className="w-24 shrink-0" style={{ color: `var(--${S(id).color})` }}>{name}</span>
                <span className="min-w-0 flex-1 text-gray">{text}</span><span aria-hidden className="text-gray">↓</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const A = ({ l }: { l: Link }) => (
  <a href={l.url} target="_blank" rel="noopener noreferrer" className="underline decoration-[color:var(--c)] decoration-2 underline-offset-4 hover:bg-[color:var(--c)] hover:text-bg">{l.label} ↗</a>
);
const Links = ({ ls }: { ls: readonly Link[] }) => ls.length ? <p className="mt-1 flex flex-wrap gap-x-5 gap-y-1 font-mono text-sm">{ls.map((l) => <A key={l.url} l={l} />)}</p> : null;


// Idea: a visitor comment becomes a commit in the career git log (session only, no database).
// Optional: send it to Mohamed as feedback over WhatsApp.
function CommitLog() {
  const [mine, setMine] = useState<{ h: string; who: string; msg: string }[]>([]);
  const [msg, setMsg] = useState("");
  const [who, setWho] = useState("");
  const [err, setErr] = useState("");
  const [last, setLast] = useState<{ who: string; msg: string } | null>(null);
  const commit = () => {
    const m = msg.trim();
    if (m.length < 3) { setErr(ui.commit.tooShort); return; }
    const h = Array.from({ length: 7 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
    const w = who.trim() || "visitor";
    setMine((a) => [{ h, who: w, msg: m }, ...a]); setLast({ who: w, msg: m }); setMsg(""); setErr("");
    log("POST /feedback 201 Created");
  };
  const wa = last ? `${links.whatsapp}?text=${encodeURIComponent(`Portfolio feedback from ${last.who}: ${last.msg}`)}` : "";
  const f = "w-full border-b border-border bg-transparent py-2 font-mono text-text outline-none focus:border-acid-yellow";
  return (
    <div className="min-w-0">
      <Code lines={["$ git log --oneline", ...mine.map((c) => `${c.h} ${c.msg} (${c.who})`), ...site.commits]} />
      <div className="mt-4 grid gap-3">
        <label className="block font-mono text-sm text-gray">{ui.commit.label}
          <input className={f} value={msg} maxLength={72} onChange={(e) => setMsg(e.target.value)} onKeyDown={(e) => { key(e.key === " " ? "space" : e.key === "Backspace" ? "back" : e.key === "Enter" ? "enter" : "key"); if (e.key === "Enter") commit(); }} aria-invalid={!!err} />
        </label>
        <label className="block font-mono text-sm text-gray">{ui.commit.name}
          <input className={f} value={who} maxLength={30} onChange={(e) => setWho(e.target.value)} autoComplete="name" />
        </label>
        <button type="button" onClick={commit} className="min-h-[44px] justify-self-start bg-acid-yellow px-5 font-mono text-bg">{ui.commit.btn}</button>
        {err && <p role="alert" className="font-mono text-sm text-[color:var(--crimson-ink)]">{err}</p>}
        {last && <p role="status" className="font-serif">{ui.commit.done} <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => log("GET /whatsapp 302")} className="font-mono underline decoration-acid-yellow decoration-2 underline-offset-4">{ui.commit.send} ↗</a></p>}
      </div>
    </div>
  );
}

export default function Stages({ role }: { role: string }) {
  const [env, setEnv] = useState(false);
  const [miss, setMiss] = useState(false);
  useEffect(() => { const f = () => setEnv(true); window.addEventListener("reveal-env", f); return () => window.removeEventListener("reveal-env", f); }, []);
  const F = site.featured;
  const sum = (i: 1 | 2) => F.ledger.reduce((n, r) => n + r[i], 0);
  return (
    <>
      <Sec id="request">
        <BrokenMonitor role={role} />
        <About />
      </Sec>

      <Sec id="middleware">
        <div className="grid gap-6 lg:grid-cols-2" style={{ "--c2": "var(--peach)" } as CSSProperties}>
          {site.background.map((b) => (
            <article key={b.name} className="card" onPointerMove={spot}>
              <div className="flex items-start gap-4">
                <span aria-hidden className="mark">{b.mark}</span>
                <div className="min-w-0">
                  <span className="chipdate">{b.when}</span>
                  <h3 className="mt-2 font-serif text-3xl leading-tight">{b.name}</h3>
                  <p className="mt-1 font-mono text-sm text-gray">{b.where} · {b.place}</p>
                </div>
              </div>
              <h4 className="mb-3 mt-7 font-mono text-xs uppercase tracking-widest" style={{ color: "var(--c)" }}>What I did</h4>
              <ul className="mb-7 space-y-2.5 font-serif text-lg leading-snug">
                {b.did.map((d) => <li key={d} className="flex gap-3"><span aria-hidden className="tick" /><span>{d}</span></li>)}
              </ul>
              <div className="card-keep">
                <h4 className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--c)" }}>What I kept</h4>
                <p className="mt-2 font-serif text-lg leading-snug">{b.took}</p>
                {b.link && <div className="mt-3"><Links ls={[b.link]} /></div>}
              </div>
            </article>
          ))}
        </div>
      </Sec>

      <Sec id="guards">
        <div className="grid gap-6 md:grid-cols-2" style={{ "--c2": "var(--toxic-lime)" } as CSSProperties}>
          {site.credentials.map((c) => (
            <article key={c.name} className="card" onPointerMove={spot}>
              <div className="flex items-center justify-between gap-3">
                <span aria-hidden className="mark">{markOf(c.issuer)}</span>
                <span className="chipdate">{c.when}</span>
              </div>
              <h3 className="mt-5 font-serif text-2xl leading-tight">{c.name}</h3>
              <p className="mt-1 font-mono text-sm text-gray">{c.issuer}</p>
              <p className="mt-3 flex-1 font-serif text-lg leading-snug">{c.plain}</p>
              {c.link && <div className="mt-4"><Links ls={[c.link]} /></div>}
            </article>
          ))}
        </div>
      </Sec>

      <Sec id="interceptors">
        <div className="mb-16 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-10">
          <p className="font-serif text-2xl leading-snug text-gray"><span className="mb-1 block font-mono text-xs">before</span>{site.before}</p>
          <span aria-hidden className="font-mono text-4xl text-acid-yellow md:pt-5">→</span>
          <p className="font-serif text-2xl leading-snug"><span className="mb-1 block font-mono text-xs text-acid-yellow">after</span>{site.after}</p>
        </div>
        <ol className="exp">
          {site.roles.map((r, i) => (
            <li key={r.title + r.org} className="exp-row" onPointerMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - b.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - b.top}px`); }}>
              <span aria-hidden className="exp-n">{String(i + 1).padStart(2, "0")}</span>
              <div className="grid gap-4 md:grid-cols-[170px_1fr] md:gap-10">
                <div className="font-mono text-sm">
                  <p style={{ color: "var(--c)" }}>{r.when || r.kind}</p>
                  <p className="mt-1 text-gray">{[r.when ? r.kind : "", r.place].filter(Boolean).join(" · ")}</p>
                </div>
                <div className="min-w-0 md:pr-24">
                  <h3 className="exp-title font-serif text-4xl leading-[1.05] md:text-5xl"><span>{r.title}</span></h3>
                  {r.org !== r.kind && <p className="mt-2 font-mono text-base" style={{ color: "var(--c)" }}>{r.org}</p>}
                  {r.lead && <p className="mt-4 font-serif text-xl italic text-gray">{r.lead}</p>}
                  <ul className="mt-4 max-w-[62ch] space-y-2 font-serif text-lg leading-relaxed">
                    {r.points.map((pt) => <li key={pt} className="flex gap-3"><span aria-hidden className="mt-[0.15em] font-mono text-sm" style={{ color: "var(--c)" }}>▸</span><span>{pt}</span></li>)}
                  </ul>
                  <p className="mt-4 font-mono text-sm text-gray">{r.stack.split(", ").join("  /  ")}</p>
                  {r.works && (
                    <div className="mt-5">
                      <p className="font-mono text-xs text-gray">selected work</p>
                      <div className="mt-2 flex flex-wrap gap-x-7 gap-y-2 font-mono text-sm">{r.works.map((w) => <a key={w.url} href={w.url} target="_blank" rel="noopener noreferrer" className="arrow-link">{w.label} <span aria-hidden>↗</span></a>)}</div>
                    </div>
                  )}
                  {(r.links.length > 0 || r.see) && (
                    <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 font-mono text-sm">
                      {r.links.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="arrow-link">{l.label} <span aria-hidden>↗</span></a>)}
                      {r.see && <button type="button" onClick={() => jumpTo(r.see as string)} className="arrow-link">See how it works <span aria-hidden>↓</span></button>}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Sec>

      <Sec id="pipes">
        <p className="mb-10 max-w-[60ch] font-serif text-lg">Every skill flows through a pipe. Skills with an arrow link to the project that proves them.</p>
        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-2">
          {site.skills.map((g) => (
            <div key={g.group} className="min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="shrink-0 font-mono text-lg text-hot-pink">{g.group}</h3>
                <span aria-hidden className="pipe h-[6px] flex-1" />
                <span aria-hidden className="text-hot-pink">▶</span>
              </div>
              <p className="mt-2 font-serif text-base">{g.plain}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <li key={i.name}>
                    {i.proof
                      ? <a href={i.proof.url} target="_blank" rel="noopener noreferrer" title={`Proven in ${i.proof.project}`} className="chip chip-proof">{i.name} ↗</a>
                      : <span className="chip">{i.name}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Sec>

      <Sec id="controller">
        <div className="grid gap-6 md:grid-cols-2">
          {site.projects.map((p) => (
            <article key={p.name} className="flex flex-col border border-border bg-surface p-6" style={{ borderTop: "3px solid var(--c)" }}>
              <p className="font-mono text-xs text-gray">{p.route} · {p.when}</p>
              <h3 className="mt-2 font-mono text-2xl leading-snug">{p.title}</h3>
              <Chips list={p.stack} />
              <div className="mt-4 flex-1"><Plain>{p.plain}</Plain></div>
              <div className="mt-3"><Links ls={[p.link]} /></div>
            </article>
          ))}
        </div>
      </Sec>

      <Sec id="service">
        <h3 className="mb-3 font-mono text-2xl md:text-3xl">{F.name}</h3>
        <Plain>{F.plain}</Plain>
        <ol className="my-8 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
          {F.steps.map(([h, d], i) => (
            <li key={h} className="contents">
              <div className="border border-border bg-surface p-5" style={{ borderTop: "3px solid var(--c)" }}>
                <p className="font-mono text-sm text-gray">step {i + 1}</p><p className="mt-1 font-mono text-lg">{h}</p><p className="mt-1 font-serif">{d}</p>
              </div>
              {i < F.steps.length - 1 && <span aria-hidden className="grid place-items-center font-mono text-2xl text-peach">→</span>}
            </li>
          ))}
        </ol>
        <p className="mb-8 font-serif text-lg">All three save together, or none of them do. If one step fails, everything goes back to how it was.</p>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="overflow-x-auto"><table className="w-full border-collapse font-mono text-sm">
              <thead><tr className="border-b border-border text-left text-gray"><th>account</th><th>debit</th><th>credit</th></tr></thead>
              <tbody>{F.ledger.map(([a, d, c], i) => <tr key={i} className="border-b border-border"><td className="py-1">{a}</td><td>{d || ""}</td><td>{c || ""}</td></tr>)}</tbody>
              <tfoot><tr className="text-peach"><td className="pt-2">balanced</td><td>{sum(1)}</td><td>{sum(2)}</td></tr></tfoot>
            </table></div>
            <p className="mt-2 font-serif">{F.ledgerPlain}</p>
          </div>
          <div className="border border-border bg-surface p-5"><p className="font-mono text-sm text-gray">on its own</p><p className="mt-1 font-serif text-lg">{F.externalPlain}</p></div>
        </div>
      </Sec>

      <Sec id="response">
        <Contact />
        <ContactLinks />
        <div className="mt-20">
          <h3 className="mb-2 font-mono text-xl">Career log, and your own commit</h3>
          <p className="mb-5 max-w-[60ch] font-serif text-lg">Every step so far is a commit. Leave yours below: a short note, shown on this page only.</p>
          <CommitLog />
        </div>
      </Sec>

      <Sec id="exception">
        <p className="mb-3 font-mono text-gray">// still learning</p>
        <ul className="mb-8 font-mono">{site.learning.map((l) => <li key={l} className="text-[color:var(--crimson-ink)]">catch(): {l}</li>)}</ul>
        <div className="flex flex-wrap gap-3 font-mono text-sm">
          <button type="button" className="min-h-[44px] border border-crimson px-4" onClick={() => { setMiss(true); log("GET /nowhere 404 Not Found"); }}>GET /nowhere</button>
          <button type="button" className="min-h-[44px] border border-border px-4" onClick={() => setEnv(true)}>ls -a</button>
        </div>
        {miss && <p role="status" className="mt-4 font-serif text-xl">404: this page does not exist, but you do, and that is enough.</p>}
        {env && <Code lines={[".env", ...site.env]} />}
      </Sec>
    </>
  );
}
