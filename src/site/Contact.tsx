import { useState } from "react";
import { content, links, site, ui } from "../content";
import { log } from "../logBus";

export interface ContactPayload { name: string; email: string; reason: string; message: string; }
/** Swap by setting VITE_FORM_ENDPOINT (Formspree or similar). Default: prefilled mailto. */
export async function submitContact(p: ContactPayload): Promise<void> {
  const url = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
  if (url) {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(p) });
    if (!r.ok) throw new Error("form service failed");
  } else {
    const body = encodeURIComponent(`${p.message}\n\n${p.name} <${p.email}>`);
    window.location.href = `${links.mail}?subject=${encodeURIComponent(p.reason)}&body=${body}`;
  }
  log("POST /contact 201 Created");
}

type Errs = Partial<Record<keyof ContactPayload, string>>;
interface Step { tag: string; color: string; text: string; ms: number; ok: boolean; }
const validate = (v: ContactPayload): Errs => {
  const e: Errs = {};
  if (v.name.trim().length < 2) e.name = "Enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email, like name@mail.com.";
  if (v.message.trim().length < 5) e.message = "Write at least a few words.";
  return e;
};
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const col = (c: string) => (c === "crimson" ? "var(--crimson-ink)" : `var(--${c})`);
const jit = () => Math.round(1 + Math.random() * 5);

export default function Contact() {
  const [v, setV] = useState<ContactPayload>({ name: "", email: "", reason: content.contact.reasons[0], message: "" });
  const [err, setErr] = useState<Errs>({});
  const [steps, setSteps] = useState<Step[]>([]);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k: keyof ContactPayload) => (e: { target: { value: string } }) => setV({ ...v, [k]: e.target.value });

  // The visitor's message travels the same lifecycle as the page: Guards, Pipes, Controller, Service, Response.
  const submit = async () => {
    if (busy) return;
    setBusy(true); setSteps([]); setSent(false);
    const e = validate(v); setErr(e);
    const bad = Object.keys(e).length > 0;
    const plan: Step[] = [
      { tag: "Guards", color: "mint", text: "canActivate() -> true", ms: jit(), ok: true },
      ...(["name", "email", "reason", "message"] as const).map((k): Step => ({ tag: "Pipes", color: "hot-pink", text: `ValidationPipe.${k} ${e[k] ? "-> " + e[k] : "ok"}`, ms: jit(), ok: !e[k] })),
      ...(bad
        ? [{ tag: "ExceptionFilter", color: "crimson", text: "BadRequestException 400", ms: jit(), ok: false }]
        : [{ tag: "Controller", color: "toxic-lime", text: "ContactController.create()", ms: jit(), ok: true },
           { tag: "Service", color: "peach", text: "ContactService.submit()", ms: jit(), ok: true },
           { tag: "Response", color: "text", text: "201 Created", ms: jit(), ok: true }]),
    ];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    for (const s of plan) { setSteps((a) => [...a, s]); log(`[${s.tag}] ${s.text} +${s.ms}ms`); await wait(reduce ? 0 : 280); }
    if (!bad) {
      try { await submitContact(v); setSent(true); } catch { setErr({ message: "Sending failed. Try again or email me directly." }); }
    }
    setBusy(false);
  };

  const f = "w-full border-b border-border bg-transparent py-2 font-mono text-text outline-none focus:border-orange";
  const trace = steps.length > 0 && (
    <div aria-hidden="true" className="mt-6 max-w-3xl bg-terminal-bg p-4 font-mono text-xs">
      {steps.map((s, i) => <div key={i} className="break-words" style={{ color: s.ok ? undefined : "var(--crimson-ink)" }}><span style={{ color: col(s.color) }}>[{s.tag}]</span> {s.text} +{s.ms}ms</div>)}
    </div>
  );
  const wa = `${links.whatsapp}?text=${encodeURIComponent(`[${v.reason}] ${v.message} (${v.name}, ${v.email})`)}`;

  if (sent) return (
    <div>
      <div role="status" className="border border-mint p-6 font-mono">
        <p className="text-4xl text-mint">200 OK</p>
        <p className="mt-2 font-serif text-lg">Thank you, {v.name}. {ui.contact.sent}</p>
        <p className="mt-4 font-serif text-lg">{ui.contact.waLine}</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => log("GET /whatsapp 302")} className="min-h-[44px] bg-acid-yellow px-5 py-3 text-bg">{ui.contact.wa} ↗</a>
          <button type="button" onClick={() => { setSent(false); setSteps([]); setV({ ...v, message: "" }); }} className="min-h-[44px] border border-border px-5">{ui.contact.again}</button>
        </div>
      </div>
      {trace}
    </div>
  );
  return (
    <div className="grid max-w-3xl gap-5">
      <p className="font-serif text-lg">{site.contactPlain}</p>
      {(["name", "email"] as const).map((k) => (
        <label key={k} className="block font-mono text-sm text-gray">{k}
          <input className={f} value={v[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={err[k] ? k + "-e" : undefined} autoComplete={k} />
          {err[k] && <span id={k + "-e"} className="text-[color:var(--crimson-ink)]">{err[k]}</span>}
        </label>
      ))}
      <label className="block font-mono text-sm text-gray">reason
        <select className={f + " bg-bg"} value={v.reason} onChange={set("reason")}>{content.contact.reasons.map((r) => <option key={r}>{r}</option>)}</select>
      </label>
      <label className="block font-mono text-sm text-gray">message
        <textarea data-lenis-prevent rows={4} className={f} value={v.message} onChange={set("message")} aria-invalid={!!err.message} />
        {err.message && <span className="text-[color:var(--crimson-ink)]">{err.message}</span>}
      </label>
      <button type="button" disabled={busy} aria-busy={busy} onClick={() => void submit()} className="min-h-[44px] justify-self-start bg-orange px-6 font-mono text-bg hover:bg-acid-yellow disabled:opacity-60">POST /contact</button>
      {trace}
    </div>
  );
}
