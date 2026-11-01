import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { build } from "esbuild";

// Generates the <noscript> fallback from src/content.ts so copy stays in one file.
function noscriptFromContent(): Plugin {
  return {
    name: "noscript-from-content",
    async transformIndexHtml(html) {
      const r = await build({ entryPoints: ["src/content.ts"], bundle: true, write: false, format: "cjs", platform: "node", logLevel: "silent" });
      const m: { exports: Record<string, any> } = { exports: {} };
      new Function("module", "exports", r.outputFiles[0]!.text)(m, m.exports);
      const { content: c, site: s, links } = m.exports as Record<string, any>;
      const e = (x: unknown) => String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;");
      const A = (l: { label: string; url: string }) => `<a href="${e(l.url)}">${e(l.label)}</a>`;
      const body = `<main style="font:16px/1.6 Georgia,serif;max-width:62ch;margin:3rem auto;padding:0 1rem;background:#141414;color:#E8E4DA">
<h1>${e(c.person.fullName)}</h1><p>${e(c.person.city)}. ${e(s.requestPlain)}</p>
<h2>Education</h2><ul>${s.background.map((b: any) => `<li><b>${e(b.name)}</b>, ${e(b.where)} (${e(b.when)}). ${e(b.plain)} ${b.link ? A(b.link) : ""}</li>`).join("")}</ul>
<h2>Certifications</h2><ul>${s.credentials.map((x: any) => `<li><b>${e(x.name)}</b>, ${e(x.issuer)} (${e(x.when)}). ${e(x.plain)} ${x.link ? A(x.link) : ""}</li>`).join("")}</ul>
<h2>Experience</h2><ul>${s.roles.map((x: any) => `<li><b>${e(x.name)}</b> ${e(x.when)}. ${e(x.stack)}. ${e(x.plain)} ${x.links.map(A).join(" ")}</li>`).join("")}</ul>
<h2>Skills</h2><ul>${s.skills.map((g: any) => `<li><b>${e(g.group)}</b>: ${g.items.map((i: any) => e(i.name)).join(", ")}</li>`).join("")}</ul>
<h2>Projects</h2><ul>${s.projects.map((p: any) => `<li><b>${e(p.title)}</b> (${e(p.stack)}): ${e(p.plain)} ${A(p.link)}</li>`).join("")}</ul>
<h2>Contact</h2><p>${A({ label: c.person.email, url: links.mail })} ${A({ label: "LinkedIn", url: links.linkedin })} ${A({ label: "GitHub", url: links.github })} ${A({ label: "WhatsApp", url: links.whatsapp })}</p></main>`;
      return html.replace("<!--NOSCRIPT-->", `<noscript>${body}</noscript>`);
    },
  };
}

export default defineConfig({
  plugins: [react(), noscriptFromContent()],
  build: { rollupOptions: { output: { manualChunks: { gsap: ["gsap"] } } } },
});
