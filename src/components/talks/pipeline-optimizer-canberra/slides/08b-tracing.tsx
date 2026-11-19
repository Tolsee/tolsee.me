'use client';
// Slide — Learning #1: Tracing (AutoResearch folded in as the payoff).
// Acts: 0 = input/output only · 1 = real path draws · 2 = detours labelled
//       3 = AutoResearch reads the trace · 4 = path straightens
import React from 'react';
import { motion } from 'framer-motion';
import type { SlideData } from './_types';
import { useSlideActs } from '../slide-acts-context';
import { sans } from '@/lib/fonts';

const TEAL = 'rgb(0,175,154)';
const PINK = 'rgb(255,167,196)';
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

// Both paths use the same command structure (M + 5×C) so framer-motion can morph `d`.
const TANGLED =
  'M80,180 C220,20 360,40 330,170 C300,300 180,300 240,230 C300,160 480,120 560,250 C640,380 760,330 700,220 C640,110 900,60 1020,180';
const STRAIGHT =
  'M80,180 C143,170 205,170 268,180 C331,190 393,190 456,180 C519,170 581,170 644,180 C707,190 769,190 832,180 C895,170 957,170 1020,180';

const DETOURS = [
  { x: 300, y: 52,  label: 'wasted turns',      anchor: 'middle' as const },
  { x: 205, y: 318, label: 'misread intent',    anchor: 'middle' as const },
  { x: 712, y: 352, label: 'missing knowledge', anchor: 'middle' as const },
];

function Endpoint({ x, label }: { x: number; label: string }) {
  return (
    <g>
      <circle cx={x} cy={180} r={11} fill="rgb(40,44,53)" stroke="rgba(255,255,255,0.85)" strokeWidth={2} />
      <text
        x={x} y={222} textAnchor="middle" fontSize={15}
        fontFamily="ui-monospace,monospace" fill="rgba(255,255,255,0.6)"
        letterSpacing="0.12em"
      >
        {label}
      </text>
    </g>
  );
}

function TracingSlide() {
  const { act } = useSlideActs();
  const straight = act >= 4;

  const fadeIn = (from: number, until = Infinity) => {
    const on = act >= from && act < until;
    return {
      initial: { opacity: 0, y: 6 },
      animate: { opacity: on ? 1 : 0, y: on ? 0 : 6 },
      transition: { duration: 0.35, ease: 'easeOut' as const },
    };
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Caption row: changes with the act */}
      <div className={`${sans.className} relative h-8 text-xl text-white/75`}>
        <motion.div {...fadeIn(0, 1)} className="absolute inset-0">
          Agents are non-deterministic. Logs gave us what went in and what came out.
        </motion.div>
        <motion.div {...fadeIn(1, 4)} className="absolute inset-0">
          The trace shows the path it actually took.
        </motion.div>
        <motion.div {...fadeIn(4)} className="absolute inset-0" style={{ color: TEAL }}>
          Same task. Fix the path, and the run gets short and predictable.
        </motion.div>
      </div>

      {/* Path canvas */}
      {/* Fixed height: <Slide>'s content box has no definite height, so h-full would overflow */}
      <div className="relative w-full" style={{ height: 300 }}>
        <svg viewBox="0 0 1100 400" className="w-full h-full" preserveAspectRatio="xMidYMid meet" fill="none">
          {/* Act 0: the unknown middle */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: act === 0 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <line x1={100} y1={180} x2={1000} y2={180} stroke="rgba(255,255,255,0.18)" strokeWidth={2} strokeDasharray="6 8" />
            <rect x={470} y={150} width={160} height={60} rx={10} fill="rgb(40,44,53)" stroke="rgba(255,255,255,0.25)" strokeDasharray="5 5" />
            <text x={550} y={190} textAnchor="middle" fontSize={30} fill="rgba(255,255,255,0.55)" fontFamily="ui-monospace,monospace">?</text>
          </motion.g>

          {/* The path: draws in at act 1, morphs straight at act 4 */}
          <motion.path
            d={TANGLED}
            stroke={PINK}
            strokeWidth={3.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              d: straight ? STRAIGHT : TANGLED,
              stroke: straight ? TEAL : PINK,
              pathLength: act >= 1 ? 1 : 0,
              opacity: act >= 1 ? 1 : 0,
            }}
            transition={{
              pathLength: { duration: act >= 1 && act < 4 ? 1.8 : 0.3, ease: 'easeInOut' },
              d: { duration: 1.1, ease: EASE },
              stroke: { duration: 0.6 },
              opacity: { duration: 0.2 },
            }}
          />

          {/* Act 2–3: detours called out */}
          {DETOURS.map((d, i) => (
            <motion.g
              key={d.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: act >= 2 && act < 4 ? 1 : 0 }}
              transition={{ duration: 0.3, delay: act >= 2 && act < 4 ? i * 0.18 : 0 }}
            >
              <text
                x={d.x} y={d.y} textAnchor={d.anchor} fontSize={18} fontWeight={600}
                fontFamily="ui-monospace,monospace" fill={PINK}
              >
                {d.label}
              </text>
            </motion.g>
          ))}

          <Endpoint x={80} label="INPUT" />
          <Endpoint x={1020} label="OUTPUT" />
        </svg>
      </div>

      {/* Act 3: AutoResearch reads the trace (stays visible through act 4) */}
      <motion.div
        {...fadeIn(3)}
        className="border border-white/15 rounded-lg px-6 py-4 grid items-center gap-6"
        style={{ gridTemplateColumns: 'auto 1fr auto 1fr' }}
      >
        <div className="font-mono text-sm uppercase tracking-widest" style={{ color: TEAL }}>
          AutoResearch
        </div>
        <div className={`${sans.className} text-lg text-white/80 leading-snug`}>
          reads the traces: the fix agent spawns sub-agents that ignore its turn cap
        </div>
        <div className="font-mono text-xl text-white/40">→</div>
        <div className="font-mono text-lg text-white/90">
          prompt: <span style={{ color: TEAL }}>&quot;do not spawn sub-agents&quot;</span>
        </div>
      </motion.div>

    </div>
  );
}

const slides: SlideData[] = [
  {
    id: 20,
    title: 'Learning #1: Tracing',
    acts: 5,
    content: <TracingSlide />,
    notes:
      "We are building inherently non-deterministic systems. Run the same task twice and the agent can take two different routes. With plain logs you see the input and the output. You don't see the path in between, so when a run is slow or expensive you can't say why.\n\nEach agent run produces a full turn-by-turn trace, and we wired those through Datadog LLM Observability, so every decision is inspectable. Once you can see the path, the waste is obvious: turns spent going in circles, places where the agent was missing knowledge, places where it misread what we wanted.\n\nThen the payoff: AutoResearch. It's a Claude Code skill that reads those traces and proposes specific improvements. One of the first things it caught: turn counts spiking well above the configured cap, inconsistently across re-runs of the same repo. The trace showed why. The fix agent was spawning sub-agents when it hit repos with multiple pipeline directories, and sub-agent turns aren't bounded by the parent's cap. The fix was one line in the prompt: 'do not spawn sub-agents'. Turn variance collapsed.\n\nNo human would think to write that constraint, and you'd never find it from the output alone. It only shows up in the shape of the trace. You can't fix a path you can't see.\n\nTools for the audience: Datadog LLM Observability, LangSmith, or Helicone for traces; Claude Code skills for the AutoResearch loop.",
  },
];

export default slides;
