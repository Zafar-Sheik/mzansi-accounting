"use client";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Wallet } from "lucide-react";
import { AuroraBackground } from "@/components/aceternity/aurora-background";
import { Spotlight } from "@/components/aceternity/spotlight";
import { FlipWords } from "@/components/aceternity/flip-words";
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect";
import { MovingBorderLink } from "@/components/aceternity/moving-border";
import { gsap, motionAllowed, useGSAP } from "@/lib/gsap";

/**
 * Hero: Aceternity aurora + spotlight, and a GSAP timeline that posts three
 * transactions: coins drop onto both pans of the A = OE + L scale, the beam
 * wobbles and settles level, and the T-account entries write themselves.
 */
export function Hero({ stats }: { stats: { lessons: number; tools: number; exam: number } }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = root.current;
    if (!el) return;
    const fades = el.querySelectorAll("[data-fade]");
    const pops = el.querySelectorAll("[data-pop]");
    const coinsL = el.querySelectorAll("[data-coin-l]");
    const coinsR = el.querySelectorAll("[data-coin-r]");
    const beam = el.querySelector("[data-beam]");
    const rows = el.querySelectorAll("[data-row]");
    if (!motionAllowed()) {
      gsap.set(fades, { opacity: 1, y: 0 });
      gsap.set([...pops, ...coinsL, ...coinsR, ...rows], { opacity: 1, y: 0, scale: 1 });
      return;
    }
    gsap.from(fades, { opacity: 0, y: 24, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.2 });
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.5, delay: 0.6 });
    tl.set([...coinsL, ...coinsR], { opacity: 0, y: -120 })
      .set(rows, { opacity: 0, x: -12 })
      .set(pops, { opacity: 0, scale: 0.6 })
      .set(beam, { rotation: 0, svgOrigin: "200 120" });
    [0, 1, 2].forEach((k) => {
      tl.to(rows[k], { opacity: 1, x: 0, duration: 0.35 })
        .to(coinsL[k], { opacity: 1, y: 0, duration: 0.5, ease: "bounce.out" })
        .to(beam, { rotation: -6, duration: 0.25, ease: "power2.out" }, "<0.2")
        .to(coinsR[k], { opacity: 1, y: 0, duration: 0.5, ease: "bounce.out" }, "+=0.1")
        .to(beam, { rotation: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" }, "<0.2");
    });
    tl.to(pops, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.12, ease: "back.out(2)" }).to({}, { duration: 3 });
  }, { scope: root });

  const coin = (x: number, y: number, colour: string, key: string, side: "l" | "r") => (
    <g key={key} {...(side === "l" ? { "data-coin-l": true } : { "data-coin-r": true })} style={{ opacity: 0 }}>
      <ellipse cx={x} cy={y} rx="16" ry="6" fill={colour} stroke="white" strokeWidth="1.5" />
      <text x={x} y={y + 3.5} textAnchor="middle" fontSize="8" fontWeight="800" fill="white">R</text>
    </g>
  );

  return (
    <AuroraBackground className="border-b border-line">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#818cf8" />
      <div ref={root} className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pt-16 pb-20 md:pt-24 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p data-fade className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-sm font-semibold text-muted backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-book" /> CAPS Accounting · Grade 10, 11 &amp; 12 + Money Life
          </p>
          <h1 className="font-display text-4xl leading-[1.08] font-bold tracking-tight text-fg sm:text-5xl lg:text-6xl">
            <TextGenerateEffect words="Accounting you can actually use – in matric and in life." highlight={["Accounting", "use", "life."]} />
          </h1>
          <p data-fade className="mt-5 max-w-xl text-lg text-muted">
            Bite-sized lessons on{" "}
            <FlipWords words={["the accounting equation", "debits & credits", "VAT", "partnerships", "cash flow", "ratios", "break-even", "your payslip", "doing your taxes", "side hustles"]} className="inline-block font-semibold text-brand" />
            {" "}— with hands-on labs, a business simulator, questions that never run out, instant feedback and exam questions with memos. Every CAPS topic, plus the money skills school forgot.
          </p>
          <div data-fade className="mt-8 flex flex-wrap gap-3">
            <MovingBorderLink href="/learn">Start learning <ArrowRight className="h-4 w-4" /></MovingBorderLink>
            <Link href="/money-life" className="inline-flex items-center gap-2 rounded-2xl border border-line bg-surface/70 px-6 py-3 font-semibold backdrop-blur transition hover:border-brand/50">
              <Wallet className="h-4 w-4 text-life" /> Money Life skills
            </Link>
          </div>
          <dl data-fade className="mt-10 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4">
            {[[String(stats.lessons), "lessons"], [String(stats.tools), "hands-on labs"], ["∞", "practice questions"], [String(stats.exam), "exam questions"]].map(([a, b]) => (
              <div key={b}>
                <dt className="sr-only">{b}</dt>
                <dd className="font-display text-3xl font-bold text-fg">{a}</dd>
                <dd className="text-sm text-muted">{b}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-fade className="relative">
          <div className="decorative absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand/30 via-report/20 to-book/30 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3 text-xs text-muted">
              <span className="font-mono font-semibold">QUESTION 1 · THE ACCOUNTING EQUATION</span>
              <span className="ml-auto rounded-md bg-book px-2 py-0.5 font-semibold text-white">A = OE + L</span>
            </div>
            <svg viewBox="0 0 400 300" className="diagram" role="img" aria-label="Animation: three transactions are posted. Each time coins drop onto the assets pan and onto the owner's equity plus liabilities pan, and the balance scale settles level again.">
              <polygon points="200,124 182,170 218,170" fill="var(--text-muted)" />
              <rect x="150" y="170" width="100" height="8" rx="4" fill="var(--text-muted)" />
              <g data-beam>
                <rect x="40" y="116" width="320" height="8" rx="4" fill="var(--text)" />
                <line x1="80" y1="120" x2="80" y2="92" stroke="var(--text-muted)" strokeWidth="2" />
                <line x1="320" y1="120" x2="320" y2="92" stroke="var(--text-muted)" strokeWidth="2" />
                <rect x="38" y="88" width="84" height="6" rx="3" fill="var(--t-book)" />
                <rect x="278" y="88" width="84" height="6" rx="3" fill="var(--t-report)" />
                {[0, 1, 2].map((k) => coin(80, 80 - k * 13, "var(--t-book)", `l${k}`, "l"))}
                {[0, 1, 2].map((k) => coin(320, 80 - k * 13, k === 1 ? "var(--t-tax)" : "var(--t-report)", `r${k}`, "r"))}
                <text x="80" y="140" textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--t-book)">Assets</text>
                <text x="320" y="140" textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--t-report)">Equity + Liabilities</text>
              </g>
              <g fontSize="11" fontFamily="var(--font-mono)">
                {[["Capital deposited", "R50 000"], ["Stock bought on credit", "R12 000"], ["Cash sale (profit R2 000)", "R2 000"]].map(([t, v], k) => (
                  <g key={t} data-row style={{ opacity: 0 }}>
                    <text x="40" y={210 + k * 22} fill="var(--text)">{k + 1}. {t}</text>
                    <text x="360" y={210 + k * 22} textAnchor="end" fontWeight="700" fill="var(--t-book)">+{v}</text>
                  </g>
                ))}
              </g>
            </svg>
            <div data-pop className="absolute top-14 left-1/2 w-60 -translate-x-1/2 rounded-xl border border-line bg-elevated p-3 shadow-2xl" style={{ opacity: 0 }}>
              <div className="text-[10px] font-bold tracking-wider text-book uppercase">Live from the equation lab</div>
              <div className="mt-1 font-mono text-xs">R64 000 = R52 000 + R12 000</div>
              <div className="font-mono text-xs">Balanced after every transaction ✓</div>
              <div className="mt-1 text-xs text-muted">Predict the effect, then watch it post.</div>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
