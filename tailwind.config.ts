import type { Config } from "tailwindcss";
// Every color is a CSS variable (src/styles/tokens.css) so tokens live in one place.
const v = (n: string) => `var(--${n})`;
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent", current: "currentColor",
      "terminal-bg": v("terminal-bg"), "terminal-green": v("terminal-green"),
      bg: v("bg"), surface: v("surface"), panel: v("panel"), border: v("border"),
      gray: v("gray"), text: v("text"), orange: v("orange"), mint: v("mint"),
      "acid-yellow": v("acid-yellow"), "hot-pink": v("hot-pink"),
      "toxic-lime": v("toxic-lime"), peach: v("peach"), crimson: v("crimson"),
    },
    fontFamily: { mono: v("font-mono").split(","), serif: v("font-serif").split(",") },
    extend: {},
  },
  plugins: [],
} satisfies Config;
