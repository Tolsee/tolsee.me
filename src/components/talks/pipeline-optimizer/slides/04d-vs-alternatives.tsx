'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { SlideData } from './_types';
import { useSlideActs } from '../slide-acts-context';
import { sans } from '@/lib/fonts';

// ── Slide — vs. general agents ────────────────────────────────────────────────

const TEAL = 'rgb(0,175,154)';
const PINK = 'rgb(255,167,196)';

const axes = ['Control', 'Customization', 'Context', 'Verification'];

const rows = [
  {
    label: 'Devin',
    cells: ['Single agent · re-runs fixes', 'Plugin limits', 'Generic browsing', 'Self-assessed + CI'],
    highlight: false,
  },
  {
    label: 'Claude routines',
    cells: ['Single agent · re-runs fixes', 'Prompt + tools', 'You paste it', 'Self-assessed + CI'],
    highlight: false,
  },
  {
    label: 'Ours',
    cells: ['Multi-agent + run dedup', 'Custom MCPs', 'Anything we wire in', 'CI + AI review + agent verify'],
    highlight: true,
  },
];

function VsAlternativesSlide() {
  const { act } = useSlideActs();

  const fadeIn = (atAct: number) => ({
    initial: { opacity: 0, y: 6 },
    animate: { opacity: act >= atAct ? 1 : 0, y: act >= atAct ? 0 : 6 },
    transition: { duration: 0.3, ease: 'easeOut' as const },
  });

  return (
    <div className="flex flex-col h-full w-full gap-6">
      {/* Table */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Axis header row */}
        <div className="grid grid-cols-5 mb-2 px-1">
          <div />
          {axes.map((axis) => (
            <div
              key={axis}
              className={`${sans.className} text-xs uppercase tracking-widest font-semibold text-center pb-2`}
              style={{ color: TEAL }}
            >
              {axis}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-3" />

        {/* Data rows */}
        <div className="flex flex-col gap-3 flex-1">
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              {...fadeIn(i + 1)}
              className="grid grid-cols-5 rounded-xl overflow-hidden"
              style={{
                border: row.highlight
                  ? `1.5px solid ${TEAL}`
                  : '1px solid rgba(255,255,255,0.1)',
                background: row.highlight
                  ? 'rgba(0,175,154,0.08)'
                  : 'rgba(255,255,255,0.03)',
              }}
            >
              {/* Row label */}
              <div
                className={`${sans.className} flex items-center px-5 py-5 text-sm font-semibold`}
                style={{ color: row.highlight ? TEAL : 'rgba(255,255,255,0.6)' }}
              >
                {row.label}
              </div>

              {/* Cells */}
              {row.cells.map((cell, j) => {
                const isNegative = cell === 'Self-assessed + CI' || cell === 'Generic browsing';
                const cellColor = row.highlight
                  ? 'rgba(255,255,255,0.9)'
                  : isNegative
                  ? PINK
                  : 'rgba(255,255,255,0.55)';

                return (
                  <div
                    key={j}
                    className={`${sans.className} flex items-center justify-center px-3 py-5 text-sm text-center leading-snug`}
                    style={{
                      borderLeft: '1px solid rgba(255,255,255,0.07)',
                      color: cellColor,
                    }}
                  >
                    {cell}
                  </div>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Punchline */}
      <motion.div {...fadeIn(4)} className="pt-3 border-t border-white/10">
        <div className="font-mono text-xs text-white/35 uppercase tracking-widest mb-1">
          the unlock
        </div>
        <div
          className={`${sans.className} text-xl font-semibold`}
          style={{ color: TEAL }}
        >
          Control was the unlock — specificity beats generality.
        </div>
      </motion.div>
    </div>
  );
}

const slides: SlideData[] = [
  {
    id: 18,
    title: 'vs. general agents',
    acts: 5,
    content: <VsAlternativesSlide />,
    notes:
      "Why not just use Devin automations or Claude routines? They both run agents on a schedule — so what's the difference? Control is the axis that matters. Devin gives you vendor-defined behavior: you can configure plugins, but the agent's judgment and context are opaque. Claude routines give you prompt-level control — better, but the agent only knows what you paste in. Our agent is different on every axis: per-stage playbooks define exactly what each sub-agent does; custom MCP tools give it exactly the right tool surface; and Buildkite data plus repo knowledge is injected automatically — no pasting required. The biggest difference is verification. The alternatives self-assess: the agent decides whether it succeeded. Ours re-runs CI, reads AI review comments, and confirms the fix actually worked before closing the loop. That specificity is what earns trust fast enough to scale. We didn't pick a general agent and prompt-engineer our way to safety. We built something narrow enough to be right.",
  },
];

export default slides;
