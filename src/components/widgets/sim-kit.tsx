"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { bumpStat } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { Tex } from "@/components/learn/tex";

/** Counts the first interaction with a simulation towards the "Hands-on Hero" badge. Call `touch()` in any handler. */
export function useToolUse() {
  const used = useRef(false);
  return useCallback(() => {
    if (used.current) return;
    used.current = true;
    bumpStat("toolsUsed");
  }, []);
}

/** True when the learner asked for calm mode or the OS asks for reduced motion (re-checked on mount). */
export function useCalm() {
  const [calm, setCalm] = useState(false);
  useEffect(() => {
    const check = () => setCalm(document.documentElement.classList.contains("calm") || window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return calm;
}

/**
 * Animation clock for simulations: calls `step(dt)` (seconds, capped) every
 * frame while `running`. Simulations never auto-play in calm mode – the
 * learner presses Play.
 */
export function useTicker(step: (dt: number) => void, running: boolean) {
  const fn = useRef(step);
  fn.current = step;
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      fn.current(dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running]);
}

/** Play / pause / reset controls shared by every animated simulation. */
export function SimControls({ running, onToggle, onReset, colour = "var(--brand)", children }: { running: boolean; onToggle: () => void; onReset?: () => void; colour?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={onToggle} className="inline-flex h-9 items-center gap-1.5 rounded-xl px-4 text-sm font-semibold text-white transition active:scale-[0.98]" style={{ background: colour }} aria-pressed={running}>
        {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />} {running ? "Pause" : "Play"}
      </button>
      {onReset && (
        <button onClick={onReset} className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-line px-3 text-sm font-semibold text-muted transition hover:text-fg">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      )}
      {children}
    </div>
  );
}

/** A grid of live readings: label, value (LaTeX allowed) and unit. */
export function Readouts({ items, colour = "var(--brand)", className }: { items: { label: string; value: string; tex?: boolean; unit?: string; highlight?: boolean }[]; colour?: string; className?: string }) {
  return (
    <dl className={cn("grid grid-cols-2 gap-2 sm:grid-cols-3", className)}>
      {items.map((it) => (
        <div key={it.label} className={cn("rounded-xl border px-3 py-2", it.highlight ? "border-transparent" : "border-line bg-surface-2/60")} style={it.highlight ? { background: `color-mix(in oklab, ${colour} 14%, transparent)` } : undefined}>
          <dt className="text-xs font-semibold text-muted">{it.label}</dt>
          <dd className="font-mono text-base font-bold tabular-nums" style={it.highlight ? { color: colour } : undefined}>
            {it.tex ? <Tex tex={it.value} /> : it.value}
            {it.unit && <span className="ml-1 text-xs font-semibold text-muted">{it.unit}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** A labelled arrow for SVG force / velocity / field diagrams. Length in SVG units; angle in degrees (0 = right, 90 = up). */
export function Arrow({ x, y, length, angle, colour, label, width = 3, dashed, labelOffset = 12 }: { x: number; y: number; length: number; angle: number; colour: string; label?: string; width?: number; dashed?: boolean; labelOffset?: number }) {
  if (Math.abs(length) < 1) return null;
  if (length < 0) {
    length = -length;
    angle += 180;
  }
  const a = (angle * Math.PI) / 180;
  const x2 = x + length * Math.cos(a);
  const y2 = y - length * Math.sin(a);
  const head = Math.min(10, Math.abs(length) * 0.45);
  const left = a + Math.PI - 0.45;
  const right = a + Math.PI + 0.45;
  const lx = x2 + labelOffset * Math.cos(a);
  const ly = y2 - labelOffset * Math.sin(a);
  return (
    <g>
      <line x1={x} y1={y} x2={x2} y2={y2} stroke={colour} strokeWidth={width} strokeLinecap="round" strokeDasharray={dashed ? "6 4" : undefined} />
      <path d={`M${x2},${y2} L${x2 + head * Math.cos(left)},${y2 - head * Math.sin(left)} L${x2 + head * Math.cos(right)},${y2 - head * Math.sin(right)} Z`} fill={colour} />
      {label && <text x={lx} y={ly} fontSize="12" fontWeight="700" textAnchor="middle" dominantBaseline="middle" fill={colour} stroke="var(--surface)" strokeWidth="3" paintOrder="stroke">{label}</text>}
    </g>
  );
}

/** A friendly "what's happening" explanation box under a simulation. */
export function Explain({ children, colour = "var(--brand)" }: { children: React.ReactNode; colour?: string }) {
  return (
    <div className="mt-3 rounded-xl border-l-4 bg-surface-2/60 p-3 text-sm leading-relaxed" style={{ borderColor: colour }} aria-live="polite">
      {children}
    </div>
  );
}

/** Formats a number with a decimal comma for widgets (SA style). */
export const dc = (x: number, dp = 2) => (Number.isFinite(x) ? x.toFixed(dp).replace(".", ",").replace(/^-0(,0+)?$/, "0$1") : "–");

/** Rand amount, SA style: R12 450 or R12 450,50 (negative amounts in brackets, like an accountant). */
export const rand = (x: number, dp = 0) => {
  if (!Number.isFinite(x)) return "–";
  const [i, f] = Math.abs(x).toFixed(dp).split(".");
  const body = `R${i.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0")}${f ? `,${f}` : ""}`;
  return x < 0 && Math.abs(x) >= 0.5 * 10 ** -dp ? `(${body})` : body;
};

/** Percentage with a decimal comma: 35,5 %. */
export const pct = (x: number, dp = 1) => `${dc(x, dp)}%`;

/** A quick confetti pop (canvas-confetti) for a finished task – skipped in calm mode / reduced motion. */
export function celebrate() {
  if (typeof window === "undefined") return;
  if (document.documentElement.classList.contains("calm") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  void import("canvas-confetti").then(({ default: confetti }) => confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, disableForReducedMotion: true }));
}

/** A labelled number box (for widgets where learners type their own figures). */
export function NumberField({ label, value, onChange, step = 100, min = 0, prefix = "R", colour = "var(--brand)" }: { label: React.ReactNode; value: number; onChange: (v: number) => void; step?: number; min?: number; prefix?: string; colour?: string }) {
  return (
    <label className="block text-sm">
      <span className="font-semibold">{label}</span>
      <span className="mt-1 flex items-center overflow-hidden rounded-xl border-2 border-line bg-bg focus-within:border-brand">
        {prefix && <span className="px-2 font-mono text-xs font-bold" style={{ color: colour }}>{prefix}</span>}
        <input type="number" inputMode="decimal" min={min} step={step} value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
          className="w-full min-w-0 bg-transparent px-2 py-1.5 font-mono tabular-nums outline-none" />
      </span>
    </label>
  );
}

/** Shared Recharts styling so every chart matches the theme. */
export const chartTick = { fontSize: 10, fill: "var(--text-muted)" };
export const kfmt = (v: unknown) => {
  const n = Number(v);
  return Math.abs(n) >= 1_000_000 ? `R${(n / 1_000_000).toFixed(1).replace(".", ",")}m` : Math.abs(n) >= 1000 ? `R${Math.round(n / 1000)}k` : `R${Math.round(n)}`;
};
