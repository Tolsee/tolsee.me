'use client';
// hook-results-builder: slides/01-hook.tsx → slides 2–3
import React from 'react';
import { motion } from 'framer-motion';
import type { SlideData } from './_types';
import { useSlideActs } from '../slide-acts-context';
import { sans } from '@/lib/fonts';

// ── Slide 02 — aggregate results (static, no staged reveal) ──────────────────
function HookHero() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center gap-6">
      <div className={`${sans.className} text-9xl font-bold text-white tabular-nums`}>
        80+
      </div>
      <div className={`${sans.className} text-2xl text-white/70`}>
        pull requests merged
      </div>
      <div className={`${sans.className} text-xl text-white/55`}>
        at 50%+ merge rate · across 20+ services
      </div>
      <div className="font-mono text-sm text-white/40 tracking-wide">
        — first month —
      </div>

      {/* Flagship-win card */}
      <div className="mt-8 border border-white/15 rounded-lg px-8 py-5 max-w-xl">
        <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-3">
          flagship win
        </div>
        <div className={`${sans.className} text-3xl font-mono text-white`}>
          22 min → 8 min
        </div>
        <div className={`${sans.className} text-sm text-white/60 mt-2`}>
          64% off · every feature CI build
        </div>
      </div>

      <div className={`${sans.className} text-xl text-white/85 italic mt-6 max-w-2xl leading-relaxed`}>
        I authored zero of them.
        <br />I was asleep when most shipped.
      </div>
    </div>
  );
}

// ── Slide 03 — The loop we kept losing ──────────────────────────────────────
function CycleSlide() {
  const { act } = useSlideActs();

  const fadeIn = (atAct: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: act >= atAct ? 1 : 0, y: act >= atAct ? 0 : 8 },
    transition: { duration: 0.4, ease: 'easeOut' as const },
  });

  const nodeAppear = (atAct: number) => ({
    initial: { opacity: 0, scale: 0.82 },
    animate: { opacity: act >= atAct ? 1 : 0, scale: act >= atAct ? 1 : 0.82 },
    transition: { duration: 0.38, ease: 'easeOut' as const },
  });

  const arrowAppear = (atAct: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: act >= atAct ? 0.35 : 0 },
    transition: { duration: 0.25 },
  });

  return (
    <div className="flex flex-col h-full w-full justify-center gap-6">
      {/* ── 4-node flow row ── */}
      <div className="flex items-start justify-between">
        {/* Node 1 — Survey */}
        <motion.div {...nodeAppear(1)} className="flex flex-col items-center gap-2" style={{ width: '20%' }}>
          <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center font-mono text-sm text-white/70">
            Survey
          </div>
          <div className={`${sans.className} text-[11px] text-center text-white/45 leading-snug`}>
            CI slowness<br />tops the list
          </div>
          <div className="font-mono text-[10px] text-white/30 tracking-wide">— again —</div>
        </motion.div>

        {/* Arrow → */}
        <motion.div {...arrowAppear(2)} className="text-white text-2xl self-center mb-10 flex-shrink-0">→</motion.div>

        {/* Node 2 — Project */}
        <motion.div {...nodeAppear(2)} className="flex flex-col items-center gap-2" style={{ width: '20%' }}>
          <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center font-mono text-sm text-white/70">
            Project
          </div>
          <div className={`${sans.className} text-[11px] text-center text-white/45 leading-snug`}>
            30–40% off<br />worst pipelines
          </div>
          <div className="font-mono text-[10px] text-white/30 invisible">·</div>
        </motion.div>

        {/* Arrow → */}
        <motion.div {...arrowAppear(3)} className="text-white text-2xl self-center mb-10 flex-shrink-0">→</motion.div>

        {/* Node 3 — Win */}
        <motion.div {...nodeAppear(3)} className="flex flex-col items-center gap-2" style={{ width: '20%' }}>
          <div
            className="w-20 h-20 rounded-full border-2 flex items-center justify-center font-mono text-sm font-bold"
            style={{ borderColor: 'rgb(0,175,154)', color: 'rgb(0,175,154)', backgroundColor: 'rgba(0,175,154,0.1)' }}
          >
            Win
          </div>
          <div className={`${sans.className} text-[11px] text-center text-white/45 leading-snug`}>
            15 min → 8 min<br />flagship pipeline
          </div>
          <div className="font-mono text-[10px] text-white/30 invisible">·</div>
        </motion.div>

        {/* Arrow → */}
        <motion.div {...arrowAppear(4)} className="text-white text-2xl self-center mb-10 flex-shrink-0">→</motion.div>

        {/* Node 4 — Drift */}
        <motion.div {...nodeAppear(4)} className="flex flex-col items-center gap-2" style={{ width: '20%' }}>
          <div
            className="w-20 h-20 rounded-full border-2 flex items-center justify-center font-mono text-sm font-bold"
            style={{ borderColor: 'rgb(255,167,196)', color: 'rgb(255,167,196)', backgroundColor: 'rgba(255,167,196,0.1)' }}
          >
            Drift
          </div>
          <div className={`${sans.className} text-[11px] text-center text-white/45 leading-snug`}>
            8 min → 20 min<br />4 months later
          </div>
          <div className="font-mono text-[10px] tracking-wide" style={{ color: 'rgba(255,167,196,0.55)' }}>
            same pipeline
          </div>
        </motion.div>
      </div>

      {/* ── Loop-back arc (Drift → Survey) ── */}
      <div className="relative -mt-2">
        {/*
          viewBox 0 0 1200 100 keeps x/y scales close to 1:1 at typical slide widths,
          preventing the horizontal crush that flattened the old 100×22 viewBox.
          Arc dips to y=90 for a clearly visible curve (~80px drop at 100px height).
        */}
        <svg
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          className="w-full overflow-visible"
          style={{ width: '100%', height: 100 }}
        >
          {/* Arc from Drift side (~90%) back to Survey side (~10%) */}
          <motion.path
            d="M 1080 12 C 1080 90, 120 90, 120 12"
            fill="none"
            stroke="rgba(255,167,196,0.85)"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: act >= 5 ? 1 : 0, opacity: act >= 5 ? 1 : 0 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
          />
          {/* Arrowhead at Survey end pointing upward (tip at y=2, overflows into node area) */}
          <motion.polygon
            points="120,2 112,18 128,18"
            fill="rgba(255,167,196,0.85)"
            initial={{ opacity: 0 }}
            animate={{ opacity: act >= 5 ? 1 : 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          />
        </svg>
        <motion.div
          {...fadeIn(5)}
          className="text-center font-mono text-[10px] text-white/30 tracking-widest -mt-1"
        >
          next quarter · same answer
        </motion.div>
      </div>

      {/* ── Punchline ── */}
      <motion.div
        {...fadeIn(6)}
        className={`${sans.className} text-2xl font-semibold text-center leading-snug mt-1`}
        style={{ color: 'rgb(0,175,154)' }}
      >
        This time — the last CI project we&apos;d ever run.
      </motion.div>
    </div>
  );
}

const slides: SlideData[] = [
  {
    id: 2,
    title: undefined,
    content: <HookHero />,
    notes: `In about a month since launch, 80+ pull requests merged at a 50%+ merge rate, across 20+ services. The biggest single win — a service went from 22 minutes to 8 minutes on every feature CI run. Obviously there were many PRs that were not merged but the thing that makes it trustworthy is system validates the change looking at CI runs.`,
  },

  {
    id: 3,
    title: 'The loop we kept losing',
    acts: 7,
    content: <CycleSlide />,
    notes: `Each quarter, the developer experience survey came back with the same answer near the top: CI is too slow. And each quarter, the team would scope a project — pick the highest-traffic pipelines, apply best practices, ship real wins. The headline quarter: 30–40% off the worst offenders. One pipeline went from 15 minutes down to 8 minutes.

A few months later, that same pipeline was running at 20 minutes. Something changed, someone noticed, it got fixed. Then the next quarterly survey landed. CI slowness: near the top of the list, again.

One year after the biggest push, the team looked at the regression dashboard — the one built explicitly to catch this — and it read: flat year-over-year. Median pipeline duration had not improved. Meanwhile, the average PR had grown substantially (AI-assisted authoring, more changes per developer). The math was getting worse in per-engineer-hour terms, even while raw minutes held flat.

TODO(tulsi): confirm exact number of quarters CI topped the survey — research says "7+ surveys in the last ~18 months, CI consistently a top frustration"; use whichever framing you're comfortable defending.

The cycle wasn't a knowledge problem. The team knew what was slow and had the fixes documented. The problem was propagation: one team, many repos, each fix needing a manual PR per repo to apply, and no mechanism to detect drift before the next survey. This would be the last CI project run by hand.`,
  },
];

export default slides;
