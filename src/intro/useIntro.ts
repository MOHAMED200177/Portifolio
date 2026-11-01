import { useEffect, useReducer, useRef } from "react";
import { initialPhase, introReducer } from "./machine";

export function useIntro() {
  const [phase, send] = useReducer(introReducer, undefined, initialPhase);
  const ref = useRef(phase);
  ref.current = phase;

  useEffect(() => {
    document.documentElement.dataset.phase = phase;
    document.getElementById("site")?.toggleAttribute("inert", phase !== "live");
  }, [phase]);

  useEffect(() => {
    if (phase !== "boot") return;
    const t = setTimeout(() => send({ type: "BOOT_DONE" }), 350);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "live") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (ref.current === "awaitingSend") { if (e.key === "Enter") send({ type: "SEND" }); return; }
      send({ type: "FAST_FORWARD" });
    };
    const onPtr = () => send({ type: "FAST_FORWARD" });
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPtr);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("pointerdown", onPtr); };
  }, [phase]);

  return { phase, send };
}
