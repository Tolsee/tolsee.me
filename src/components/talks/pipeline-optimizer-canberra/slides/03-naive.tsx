// Slide — Learning #2: Specialized agents, not one big agent.
// Before / after: each failure of the single agent (Apr 1) maps to the split that fixed it (Apr 16).
// Acts: 0 = one agent + failures · 1 = three agents appear · 2 = fixes for rows 1–2 · 3 = rows 3–4
import React from 'react';
import { motion } from 'framer-motion';
import type { SlideData } from './_types';
import { useSlideActs } from '../slide-acts-context';
import { sans } from '@/lib/fonts';

const TEAL     = 'rgb(0,175,154)';
const TEAL_85  = 'rgba(0,175,154,0.85)';
const PINK     = 'rgb(255,167,196)';
const PINK_DIM = 'rgba(255,167,196,0.35)';

type Owner = 'all' | 'reviewer';

const ROWS: {
  icon: string;
  failure: string;
  failureDetail: string;
  fix: string;
  fixDetail: string;
  owner: Owner;
  act: number;
}[] = [
  {
    icon: '⏱',
    failure: 'Turn budget exploded',
    failureDetail: 'No cap: 200+ turn runs chasing context it already had.',
    fix: 'A turn cap per agent',
    fixDetail: '30 · 100 · 20, sized to one job each.',
    owner: 'all',
    act: 2,
  },
  {
    icon: '🧨',
    failure: 'CI-green, but wrong',
    failureDetail: 'depends_on silently dropped, caught 6 builds later.',
    fix: 'A separate reviewer',
    fixDetail: 'Checks the diff against the playbook rule. One re-fix, then it stops.',
    owner: 'reviewer',
    act: 2,
  },
  {
    icon: '🪞',
    failure: 'Rationalized bad diffs',
    failureDetail: 'Green CI let it convince itself the change was fine.',
    fix: 'Reviewer gets no tools',
    fixDetail: 'Only the diff and the rule. Nothing to rationalize with.',
    owner: 'reviewer',
    act: 3,
  },
  {
    icon: '🔍',
    failure: 'Opaque when it broke',
    failureDetail: 'Hundreds of turns, no signal on which step failed.',
    fix: 'One trace per stage',
    fixDetail: 'A failure points at one agent, not one giant run.',
    owner: 'all',
    act: 3,
  },
];

const AGENTS = [
  { name: 'PRE-SCREEN',  meta: 'Haiku · 30',           color: TEAL_85 },
  { name: 'IMPLEMENTER', meta: 'Sonnet · 100',         color: TEAL },
  { name: 'REVIEWER',    meta: 'Haiku · 20 · no tools', color: PINK },
];

function ColumnLabel({ date, children, color }: { date: string; children: React.ReactNode; color: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-2">
      <span className="font-mono text-xs text-white/40 tracking-widest">{date}</span>
      <span className="font-mono text-sm uppercase tracking-widest font-semibold" style={{ color }}>
        {children}
      </span>
    </div>
  );
}

function Learning2Slide() {
  const { act } = useSlideActs();

  const show = (atAct: number, delay = 0) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: act >= atAct ? 1 : 0, y: act >= atAct ? 0 : 8 },
    transition: { duration: 0.4, delay: act >= atAct ? delay : 0, ease: 'easeOut' as const },
  });

  return (
    <div className="w-full flex flex-col gap-3">
      {/* ── Header row: before | after ─────────────────────────────────── */}
      <div className="grid items-end gap-x-4" style={{ gridTemplateColumns: '1fr 56px 1fr' }}>
        <div>
          <ColumnLabel date="APR 1" color={PINK}>One agent</ColumnLabel>
          <div
            className="rounded-lg px-4 py-3 flex items-center gap-3 border"
            style={{ borderColor: PINK_DIM, background: 'rgba(255,167,196,0.05)' }}
          >
            <span className="w-3 h-3 rounded-full shrink-0" style={{ background: PINK }} />
            <span className="font-mono text-base text-white/85">Sonnet · no turn cap · raw Buildkite API · does everything</span>
          </div>
        </div>
        <div />
        <motion.div {...show(1)}>
          <ColumnLabel date="APR 16" color={TEAL}>Three agents</ColumnLabel>
          <div className="grid grid-cols-3 gap-2">
            {AGENTS.map((a, i) => (
              <motion.div
                key={a.name}
                {...show(1, i * 0.12)}
                className="rounded-lg px-3 py-2.5 border text-center"
                style={{ borderColor: a.color, background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="font-mono text-[13px] font-bold tracking-wide" style={{ color: a.color }}>{a.name}</div>
                <div className="font-mono text-[12px] text-white/60 mt-0.5 whitespace-nowrap">{a.meta}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Failure → fix rows ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-2.5 mt-2">
        {ROWS.map((r, i) => {
          const fixed = act >= r.act;
          const fixColor = r.owner === 'reviewer' ? PINK : TEAL;
          return (
            <div key={r.failure} className="grid items-stretch gap-x-4" style={{ gridTemplateColumns: '1fr 56px 1fr' }}>
              {/* Failure (visible from act 0, dims once fixed) */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: fixed ? 0.55 : 1, x: 0 }}
                transition={{ duration: 0.4, delay: act === 0 ? 0.1 + i * 0.1 : 0 }}
                className="rounded-lg px-4 py-3 flex gap-3 items-start border border-white/12"
              >
                <span className="text-xl leading-none shrink-0 mt-0.5">{r.icon}</span>
                <div className="min-w-0">
                  <div className={`${sans.className} text-[17px] font-semibold text-white`}>{r.failure}</div>
                  <div className={`${sans.className} text-sm text-white/55 leading-snug mt-0.5`}>{r.failureDetail}</div>
                </div>
              </motion.div>

              {/* Connector */}
              <div className="flex items-center justify-center">
                <svg width="56" height="16" viewBox="0 0 56 16" fill="none" style={{ overflow: 'visible' }}>
                  <motion.path
                    d="M2 8 H46 M39 2 L50 8 L39 14"
                    stroke={fixColor} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: fixed ? 1 : 0, opacity: fixed ? 1 : 0 }}
                    transition={{ duration: 0.45, delay: fixed ? (i % 2) * 0.25 : 0, ease: 'easeInOut' }}
                  />
                </svg>
              </div>

              {/* Fix */}
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: fixed ? 1 : 0, x: fixed ? 0 : 8 }}
                transition={{ duration: 0.4, delay: fixed ? 0.25 + (i % 2) * 0.25 : 0, ease: 'easeOut' }}
                className="rounded-lg px-4 py-3 border flex flex-col justify-center"
                style={{ borderColor: r.owner === 'reviewer' ? PINK_DIM : 'rgba(0,175,154,0.4)', background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="flex items-center gap-2">
                  <span className={`${sans.className} text-[17px] font-semibold`} style={{ color: fixColor }}>{r.fix}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">
                    {r.owner === 'reviewer' ? 'reviewer' : 'every agent'}
                  </span>
                </div>
                <div className={`${sans.className} text-sm text-white/60 leading-snug mt-0.5`}>{r.fixDetail}</div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const slides: SlideData[] = [
  {
    id: 5,
    title: 'Learning #2: Specialized agents, not one big agent',
    acts: 4,
    content: <Learning2Slide />,
    notes:
      "The first version, on April 1st, was exactly what you'd build if you hadn't learned any of this yet. One agent, Sonnet, no turn cap, raw Buildkite API access. Read the pipeline, understand the context, apply the fix, commit and push, all in one pass. About half the time the output was technically correct, CI passed, and something was still subtly wrong.\n\nFour failures showed up. Turn budgets exploded: one agent trying to answer everything spent turns re-exploring context it already had. Diffs were CI-green but wrong: a depends_on silently dropped that nobody caught for six builds. The agent rationalized its own bad diffs, because green CI let it convince itself the change was fine. And when it broke, it was opaque: hundreds of turns, no signal on which step failed.\n\nBy April 16th it was three agents, and each failure maps to a split. Every agent got its own turn cap sized to one job: 30 for pre-screen, 100 for the implementer, 20 for the reviewer. A separate reviewer checks the diff against the playbook rule, with one re-fix before it gives up. The reviewer gets no tools at all, only the diff and the rule, so there's nothing to rationalize with. And each stage produces its own trace, so a failure points at one agent instead of one giant run. That's what made the tracing work from Learning #1 possible.",
  },
];

export default slides;
