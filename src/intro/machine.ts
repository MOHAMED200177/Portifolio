// Pure, framework-free state machine for the intro. The GSAP timeline only *dispatches* events;
// it never owns state, so the machine stays testable and the UI can't desync from the timeline.
export type Phase = "boot" | "typing" | "awaitingSend" | "sending" | "zooming" | "live";

export type IntroEvent =
  | { type: "BOOT_DONE" }        // monitor mounted, timeline ready
  | { type: "TYPING_DONE" }      // all scripted typing finished (command, boot logs, prompts)
  | { type: "FAST_FORWARD" }     // any key / tap during boot or typing
  | { type: "SEND" }             // Enter key, on-screen Enter, tap, or fallback target
  | { type: "SENT_LOGGED" }      // "POST /portfolio" + "201 Created" printed
  | { type: "ZOOM_DONE" };       // camera zoom finished, site revealed

const transitions: Record<Phase, Partial<Record<IntroEvent["type"], Phase>>> = {
  boot:         { BOOT_DONE: "typing", FAST_FORWARD: "awaitingSend" },
  typing:       { TYPING_DONE: "awaitingSend", FAST_FORWARD: "awaitingSend" },
  awaitingSend: { SEND: "sending" },
  sending:      { SENT_LOGGED: "zooming" },
  zooming:      { ZOOM_DONE: "live" },
  live:         {},
};

export function introReducer(phase: Phase, event: IntroEvent): Phase {
  return transitions[phase][event.type] ?? phase; // illegal events are ignored, never throw
}

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Reduced motion: skip straight to `live`, as if the request was already sent. */
export const initialPhase = (): Phase => (prefersReducedMotion() ? "live" : "boot");
