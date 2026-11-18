// porter-B: slides/05-key-insight.md → slide Learning #2
import React from 'react';
import { motion } from 'framer-motion';
import type { SlideData } from './_types';
import { useSlideActs } from '../slide-acts-context';
import { sans } from '@/lib/fonts';

// ── Slide — Learning #2: One custom tool, not a chain of MCP calls ────────────
// BEFORE: 4 generic MCP calls just to get logs for one failed step.
// AFTER:  1 purpose-built tool replaces the chain.

// Four arrows fanning from a center dot in the "before" panel.
const BEFORE_ARROWS = [
  { d: 'M 150 100 L 55 28', delay: 0 },
  { d: 'M 150 100 L 245 28', delay: 0.13 },
  { d: 'M 150 100 L 55 172', delay: 0.26 },
  { d: 'M 150 100 L 245 172', delay: 0.39 },
];

function CustomToolVisual() {
  const { act } = useSlideActs();

  const fadeIn = (atAct: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: act >= atAct ? 1 : 0, y: act >= atAct ? 0 : 8 },
    transition: { duration: 0.35, ease: 'easeOut' as const },
  });

  return (
    <div className="flex flex-col h-full w-full gap-6">
      <div className="grid grid-cols-2 gap-8 flex-1 min-h-0">
        {/* ── BEFORE column ── */}
        <motion.div
          {...fadeIn(1)}
          className="border border-white/15 rounded-lg p-6 flex flex-col items-center justify-between"
        >
          <div className="font-mono text-xs uppercase tracking-widest text-white/40">Before</div>

          {/* SVG: center dot + 4 arrows fanning out */}
          <div className="relative w-full flex-1 flex items-center justify-center">
            <svg viewBox="0 0 300 200" className="w-full h-full">
              <defs>
                <marker
                  id="ct-ah-before"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.5)" />
                </marker>
              </defs>

              {/* center dot */}
              <circle cx="150" cy="100" r="8" fill="rgba(255,255,255,0.6)" />

              {/* 4 fanning arrows — staggered pathLength */}
              {BEFORE_ARROWS.map((arrow, i) => (
                <motion.path
                  key={i}
                  d={arrow.d}
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#ct-ah-before)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: act >= 1 ? 1 : 0,
                    opacity: act >= 1 ? 1 : 0,
                  }}
                  transition={{
                    pathLength: {
                      duration: 0.5,
                      delay: act >= 1 ? arrow.delay : 0,
                      ease: 'easeOut',
                    },
                    opacity: { duration: 0.15, delay: act >= 1 ? arrow.delay : 0 },
                  }}
                />
              ))}

              {/* tool labels at arrow endpoints */}
              <text x="55"  y="18"  fontSize="10" fill="rgba(255,255,255,0.45)" textAnchor="middle" fontFamily="monospace">list_pipelines</text>
              <text x="245" y="18"  fontSize="10" fill="rgba(255,255,255,0.45)" textAnchor="middle" fontFamily="monospace">list_builds</text>
              <text x="55"  y="190" fontSize="10" fill="rgba(255,255,255,0.45)" textAnchor="middle" fontFamily="monospace">get_build</text>
              <text x="245" y="190" fontSize="10" fill="rgba(255,255,255,0.45)" textAnchor="middle" fontFamily="monospace">get_step_logs</text>
            </svg>
          </div>

          <div className="font-mono text-xs text-white/40 mt-2 text-center">
            4 calls just to fetch logs for one step
          </div>
        </motion.div>

        {/* ── AFTER column ── */}
        <motion.div
          {...fadeIn(2)}
          className="border rounded-lg p-6 flex flex-col items-center justify-between"
          style={{ borderColor: 'rgba(0,175,154,0.4)' }}
        >
          <div
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'rgb(0,175,154)' }}
          >
            After
          </div>

          {/* SVG: center dot + single arrow down */}
          <div className="relative w-full flex-1 flex items-center justify-center">
            <svg viewBox="0 0 300 200" className="w-full h-full">
              <defs>
                <marker
                  id="ct-ah-after"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(0,175,154,0.8)" />
                </marker>
              </defs>

              <circle cx="150" cy="60" r="8" fill="rgba(0,175,154,0.8)" />

              {/* one arrow straight down */}
              <motion.path
                d="M 150 75 L 150 130"
                stroke="rgba(0,175,154,0.8)"
                strokeWidth="2.5"
                fill="none"
                markerEnd="url(#ct-ah-after)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: act >= 2 ? 1 : 0,
                  opacity: act >= 2 ? 1 : 0,
                }}
                transition={{
                  pathLength: { duration: 0.5, ease: 'easeOut' },
                  opacity: { duration: 0.15 },
                }}
              />

              {/* function name */}
              <text
                x="150"
                y="158"
                fontSize="11"
                fill="rgba(255,255,255,0.85)"
                textAnchor="middle"
                fontFamily="monospace"
              >
                get_step_logs_for_branch
              </text>
            </svg>
          </div>

          <div className="font-mono text-xs text-white/50 mt-2">
            1 call · purpose-built · tight schema
          </div>
        </motion.div>
      </div>

      {/* tagline */}
      <motion.div
        {...fadeIn(3)}
        className={`${sans.className} text-xl text-white/70 italic text-center mt-2`}
      >
        &ldquo;shape the API to the consumer, not the upstream&rdquo;
      </motion.div>
    </div>
  );
}

const slides: SlideData[] = [
  {
    id: 10,
    title: 'Learning #2: One custom tool, not a chain of MCP calls',
    acts: 4,
    content: <CustomToolVisual />,
    notes:
      "We started by giving each agent the Buildkite MCP — Buildkite's official tool surface, with about ten methods. The agent could call any of them. And to do one logical thing — like \"get the logs for this failing step\" — it had to chain four of them: list the pipelines, then list the builds, then get the build, then get the step logs. Four decisions. Four round-trips. Four chances to go off-script.\n\nSo we wrote one custom tool that does that whole chain internally. The agent now calls `get_step_logs_for_branch` once. It gets a single aggregated response shaped for what it actually needs to do. One decision. One round-trip.\n\nThe second half of this principle is about the response shape. The Buildkite MCP returns generic schemas — fields for every possible consumer, of which the agent reads maybe a quarter. Every field that goes into the context costs tokens, and worse, every field is a decision the agent might branch on. If a field exists in the response, the agent might cite it, weigh it, get confused by it. Our custom tool returns only what the agent uses to do its job — the failed step, the relevant log lines, the playbook rule. Tight schema. Nothing extra. The agent has less to read and fewer ways to wander.\n\nThe principle: shape the API to the consumer, not the upstream. The \"consumer\" is the agent. Each category of agent need becomes one of our purpose-built tools that wraps several upstream MCP calls and trims the response.\n\nThe reviewer takes this to its limit — zero MCP at all. The principle scales: every upstream tool you wrap is a decision you remove from the agent. Smaller surface, fewer wrong moves, cheaper context, narrower blast radius.",
  },
];

export default slides;
