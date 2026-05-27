// porter-A: slides/03-naive-approach.md → slide Learning #1 (merged)
import React from 'react';
import { motion } from 'framer-motion';
import type { SlideData } from './_types';
import { useSlideActs } from '../slide-acts-context';
import { sans } from '@/lib/fonts';

// ── Slide — Learning #1: One big agent. Everything. ───────────────────────────
// Widened: viewBox 1100×280, nodes on oval rx≈440 ry≈95, center 550 135.
// Container aspect-ratio drives near-full-width fill; maxHeight caps vertical space.
const spokeNodes = [
  { x: 204, y:  64, dy: -12, label: 'read pipeline YAML' },
  { x: 550, y:  35, dy: -12, label: 'check CI docs' },
  { x: 896, y:  64, dy: -12, label: 'understand context' },
  { x: 1040, y: 135, dy:   5, label: 'apply playbook' },
  { x: 896, y: 206, dy:  20, label: 'commit + push' },
  { x: 550, y: 235, dy:  20, label: 'decide when done' },
  { x: 204, y: 206, dy:  20, label: 'self-correct on error' },
  { x:  60, y: 135, dy:   5, label: 'pick which tools' },
];

const failures = [
  {
    icon: '⏱',
    title: 'Turn budget exploded',
    detail: 'No cap — runs of 200+ turns chasing context the agent already had.',
  },
  {
    icon: '🧨',
    title: 'Confidently wrong YAML',
    detail: 'Pipeline-valid, semantically broken — depends_on silently dropped, caught 6 builds later.',
  },
  {
    icon: '🪞',
    title: 'Rationalized bad diffs',
    detail: 'CI green + no turn pressure = agent convincing itself the change was fine.',
  },
  {
    icon: '🔍',
    title: 'Opaque when it broke',
    detail: 'Hundreds of turns to read, no clean signal on which reasoning step failed.',
  },
];

function Learning1Slide() {
  const { act } = useSlideActs();

  const fadeIn = (atAct: number, delay = 0) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: act >= atAct ? 1 : 0, y: act >= atAct ? 0 : 8 },
    transition: { duration: 0.4, delay: delay / 1000, ease: 'easeOut' as const },
  });

  return (
    <div className="flex flex-col h-full w-full gap-4">
      {/* ── Row 1: Agent diagram — full width, act 1 ── */}
      {/*
        aspect-ratio: 1100/280 (very flat) + maxHeight: 370 lets SVG render at scale ~1.32,
        giving ~85% content-width fill (nodes at x=60..1040 span most of the slide).
        370px leaves ~370px below for stats + cards.
      */}
      <div
        className="w-full shrink-0"
        style={{ aspectRatio: '1100 / 280', maxHeight: 370 }}
      >
        <svg
          viewBox="0 0 1100 280"
          style={{ width: '100%', height: '100%' }}
          overflow="visible"
        >
          {/* center agent circle — always visible */}
          <circle
            cx="550" cy="135" r="42"
            fill="rgba(0,175,154,0.9)"
            stroke="rgba(0,175,154,0.5)"
            strokeWidth="2.5"
          />
          <text
            x="550" y="141"
            textAnchor="middle"
            fontSize="16"
            fontFamily="monospace"
            fill="white"
          >
            agent
          </text>

          {/* 8 responsibility spokes — appear act 1, staggered */}
          {spokeNodes.map((node, i) => (
            <motion.g key={node.label} {...fadeIn(1, i * 60)}>
              <line
                x1="550" y1="135"
                x2={node.x} y2={node.y}
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="2"
              />
              <circle cx={node.x} cy={node.y} r="4" fill="rgba(255,255,255,0.55)" />
              <text
                x={node.x} y={node.y}
                dy={node.dy}
                textAnchor="middle"
                fontSize="16"
                fontFamily="monospace"
                fill="rgba(255,255,255,0.75)"
              >
                {node.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      {/* ── Row 2: Stats trio — act 2 ── */}
      <motion.div {...fadeIn(2)} className="grid grid-cols-3 gap-4 shrink-0">
        <div className="border border-white/15 rounded-lg p-4 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-white/40 mb-2">model</div>
          <div className="font-mono text-xl text-white">Sonnet</div>
        </div>
        <div className="border border-white/15 rounded-lg p-4 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-white/40 mb-2">turn cap</div>
          <div className="font-mono text-xl text-white">unbounded</div>
        </div>
        <div className="border rounded-lg p-4 text-center" style={{ borderColor: 'rgba(255,167,196,0.4)' }}>
          <div className="font-mono text-xs uppercase tracking-widest text-white/40 mb-2">success rate</div>
          <div className="font-mono text-xl" style={{ color: 'rgb(255,167,196)' }}>~50%</div>
        </div>
      </motion.div>

      {/* ── Row 3: Failure cards — acts 3–4 ── */}
      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        {failures.map((f, i) => (
          <motion.div
            key={f.title}
            {...fadeIn(i < 2 ? 3 : 4, (i % 2) * 100)}
            className="border border-white/15 rounded-lg p-5 flex gap-4 items-start"
          >
            <div className="text-2xl shrink-0">{f.icon}</div>
            <div className="flex flex-col gap-1.5">
              <div className={`${sans.className} text-base font-semibold text-white`}>{f.title}</div>
              <div className={`${sans.className} text-sm text-white/60 leading-relaxed`}>{f.detail}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const slides: SlideData[] = [
  {
    id: 5,
    title: 'Learning #1: Specialized agents, not one big agent',
    acts: 4,
    content: <Learning1Slide />,
    notes:
      "The first implementation was exactly what you'd build if you hadn't yet learned any of the lessons this talk is about. One agent. One prompt. Full Buildkite API access. No turn cap. Told to read the pipeline, understand the context, apply the fix, and commit — all in a single pass. We used Sonnet, which is capable, and we gave it everything we thought it might need. It ran. It produced outputs. And about half the time, those outputs were technically correct. The CI passed. The YAML was valid. And something was subtly wrong.\n\nThree failures showed up quickly. First: CI-valid-but-wrong diffs. The agent would produce a change that passed linting and CI, but had subtly broken a dependency chain — treating an implicit wait barrier as something that could be removed, or dropping a depends_on relationship that a downstream step actually needed. Second: turn explosion. One agent trying to answer everything simultaneously would spend turns exploring history it didn't need. Third — and this is the one that really stuck — when it went wrong, I had no idea where. Hundreds of turns to read, no clean signal about which reasoning step had failed. You can't improve what you can't see. You can't trust what you can't understand. The funnel is the answer to all three of these.",
  },
];

export default slides;
