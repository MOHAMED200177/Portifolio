import type { ReactNode } from "react";
import { content, links } from "../content";
import { log } from "../logBus";

// Hand-drawn stroke icons. Colors come from the site palette, never brand colors.
const svg = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);
const items = [
  { id: "email", label: "Email", sub: content.person.email, url: links.mail, c: "orange", ext: false, route: "POST /contact",
    ic: svg(<><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3.5 6.5 12 13l8.5-6.5" /></>) },
  { id: "whatsapp", label: "WhatsApp", sub: content.person.phone, url: `${links.whatsapp}?text=${encodeURIComponent("Hi Mohamed, I saw your portfolio.")}`, c: "acid-yellow", ext: true, route: "GET /whatsapp 302",
    ic: svg(<><path d="M4 20l1.3-4A8.2 8.2 0 1 1 8.2 18.7z" /><path d="M9.2 8.8c.3 2.4 2.3 4.4 4.8 4.8l1.1-1.2-1.8-.9-.8.7a3.8 3.8 0 0 1-1.6-1.6l.7-.8-.9-1.8z" /></>) },
  { id: "linkedin", label: "LinkedIn", sub: "mohamed-elafandy", url: links.linkedin, c: "hot-pink", ext: true, route: "GET /linkedin 302",
    ic: svg(<><rect x="3.5" y="3.5" width="17" height="17" rx="2" /><path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5a3 3 0 0 1 6 0V17" /></>) },
  { id: "github", label: "GitHub", sub: "MOHAMED200177", url: links.github, c: "toxic-lime", ext: true, route: "GET /github 302",
    ic: svg(<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15" />) },
];

export default function ContactLinks() {
  return (
    <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((i) => (
        <li key={i.id}>
          <a href={i.url} {...(i.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} onClick={() => log(i.route)}
            className="ci flex h-full min-h-[96px] flex-col justify-between gap-3 p-4 font-mono" style={{ "--k": `var(--${i.c})` } as React.CSSProperties}>
            {i.ic}
            <span><span className="block text-base">{i.label}</span><span className="ci-sub block break-all text-xs">{i.sub}</span></span>
          </a>
        </li>
      ))}
    </ul>
  );
}
