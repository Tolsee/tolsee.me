'use client';
// results-regrounder: slides/07-results.tsx → slot 14 (receipts / proof beat)
import React from 'react';
import { motion } from 'framer-motion';
import type { SlideData } from './_types';
import { useSlideActs } from '../slide-acts-context';
import { sans } from '@/lib/fonts';

// ── Brand ─────────────────────────────────────────────────────────────────────
const TEAL     = 'rgb(0,175,154)';
const PINK     = 'rgb(255,167,196)';
const PINK_DIM = 'rgba(255,167,196,0.55)';

// ── Types ─────────────────────────────────────────────────────────────────────

type PlaybookKind = 'parallelization' | 'standard' | 'reliability';

interface PlaybookRow {
  slug: string;       // actual playbook id from the codebase
  kind: PlaybookKind;
  before: string;
  after: string;
  pct: string;
}

interface PlaybookGroup {
  kind: PlaybookKind;
  rows: PlaybookRow[];
}

// ── Win data — organized by PlaybookKind ──────────────────────────────────────
// Numbers sourced from docs/savings/2026-05-23.md (and 2026-04-24.md).
// "Clean" = single-playbook PR; "combined" = multiple playbooks in same repo window.
//
// TODO(tulsi): minimize-sequential-wait row uses arbor Apr-24 combined result
//   (5-playbook bundle); isolate individual contribution before the talk if possible.
// TODO(tulsi): monorepo-skip-unchanged row uses cmp Apr-27 combined result
//   (dockerfile-optimization + monorepo-skip-unchanged + docker-compose-plugin).

const GROUPS: PlaybookGroup[] = [
  {
    kind: 'parallelization',
    rows: [
      // arbor Apr 2026 · 5-playbook bundle incl. minimize-sequential-wait · feature 81 builds
      { slug: 'minimize-sequential-wait', kind: 'parallelization', before: '13 min', after: '5 min', pct: '−62%' },
    ],
  },
  {
    kind: 'standard',
    rows: [
      // frontyard Apr 2026 · artifact-caching only · feature 2,832 builds ✓ clean
      { slug: 'artifact-caching',        kind: 'standard', before: '14 min', after: '7 min', pct: '−49%' },
      // chat Apr 2026 · buildkit-registry-cache only · feature 1,101 builds ✓ clean
      { slug: 'buildkit-registry-cache', kind: 'standard', before: '6 min',  after: '4 min', pct: '−32%' },
      // cmp Apr 2026 · 3 standard playbooks combined · feature 131 builds
      { slug: 'monorepo-skip-unchanged', kind: 'standard', before: '22 min', after: '8 min', pct: '−63%' },
    ],
  },
  {
    kind: 'reliability',
    rows: [
      { slug: 'automatic-retry',     kind: 'reliability', before: '—', after: '—', pct: 'no reruns' },
      { slug: 'assign-upload-queue', kind: 'reliability', before: '—', after: '—', pct: 'no reruns' },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function kindColor(kind: PlaybookKind): string {
  if (kind === 'parallelization') return TEAL;
  if (kind === 'reliability')     return PINK;
  return 'rgba(255,255,255,0.45)';
}

function kindLabel(kind: PlaybookKind): string {
  if (kind === 'parallelization') return 'parallelization';
  if (kind === 'reliability')     return 'reliability';
  return 'standard';
}

// ── Sub-components ────────────────────────────────────────────────────────────

function KindTag({ kind, visible }: { kind: PlaybookKind; visible: boolean }) {
  const color = kindColor(kind);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="font-mono text-[11px] uppercase tracking-[0.18em] px-4 pt-3 pb-0.5"
      style={{ color: color.replace('rgb', 'rgba').replace(')', ', 0.6)').replace('rgba(rgba', 'rgba') }}
    >
      {kindLabel(kind)}
    </motion.div>
  );
}

function PlaybookRow({
  row,
  visible,
  delay = 0,
}: {
  row: PlaybookRow;
  visible: boolean;
  delay?: number;
}) {
  const isReliability = row.kind === 'reliability';

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -8 }}
      transition={{ duration: 0.30, delay, ease: 'easeOut' }}
      className="grid items-center gap-x-4 py-1.5 px-4"
      style={{ gridTemplateColumns: '1fr auto auto auto' }}
    >
      {/* slug */}
      <span
        className="font-mono text-[14px] truncate"
        style={{ color: isReliability ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.85)' }}
      >
        {row.slug}
      </span>

      {/* before */}
      <span className="font-mono text-[13.5px] text-white/40 text-right tabular-nums">
        {row.before}
      </span>

      {/* after */}
      <span className="font-mono text-[13.5px] text-white/60 text-right tabular-nums">
        {isReliability ? '' : `→ ${row.after}`}
      </span>

      {/* pct / outcome */}
      <span
        className="font-mono text-[14px] font-bold text-right tabular-nums"
        style={{
          color: isReliability ? PINK_DIM : TEAL,
          minWidth: '4.5rem',
        }}
      >
        {row.pct}
      </span>
    </motion.div>
  );
}

function Divider({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.18, delay: 0.1 }}
      className="border-t border-white/8 mt-1.5 mx-4"
    />
  );
}

// ── Main slide component ──────────────────────────────────────────────────────

function ResultsReceipt() {
  const { act } = useSlideActs();

  // act 0 → empty
  // act 1 → header + parallelization group
  // act 2 → + standard group
  // act 3 → + reliability group
  // act 4 → + totals bar + honesty note

  const fadeIn = (atAct: number, delay = 0) => ({
    initial: { opacity: 0 },
    animate: { opacity: act >= atAct ? 1 : 0 },
    transition: { duration: 0.35, delay, ease: 'easeOut' as const },
  });

  // map group index → act it reveals at
  const groupAct = [1, 2, 3];

  return (
    <div
      className={`${sans.className} flex flex-col h-full w-full justify-center max-w-3xl mx-auto`}
    >
      {/* ── Receipt header ─────────────────────────────────────────────────── */}
      <motion.div
        {...fadeIn(1)}
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 px-4 mb-3 flex justify-between"
      >
        <span>autonomous agent · first month · best case per playbook</span>
        <span>before → after</span>
      </motion.div>

      {/* ── Groups ─────────────────────────────────────────────────────────── */}
      <div
        className="border border-white/10 rounded-lg overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.022)' }}
      >
        {GROUPS.map((group, gi) => {
          const revealAct = groupAct[gi];
          const isLast    = gi === GROUPS.length - 1;
          return (
            <React.Fragment key={group.kind}>
              <KindTag kind={group.kind} visible={act >= revealAct} />
              {group.rows.map((row, ri) => (
                <PlaybookRow
                  key={row.slug}
                  row={row}
                  visible={act >= revealAct}
                  delay={ri * 0.05}
                />
              ))}
              {!isLast && <Divider visible={act >= revealAct} />}
            </React.Fragment>
          );
        })}

        {/* ── Totals bar ──────────────────────────────────────────────────── */}
        <motion.div
          {...fadeIn(4)}
          className="border-t border-white/12 mt-1 px-4 py-2.5 flex justify-between items-baseline"
          style={{ background: 'rgba(0,175,154,0.05)' }}
        >
          <span className="font-mono text-[12px] text-white/60">
            80+ PRs merged &nbsp;·&nbsp; 20+ repos &nbsp;·&nbsp; 12 playbooks &nbsp;·&nbsp; Buildkite-verified
          </span>
          <span className="font-mono text-[12px]" style={{ color: 'rgba(0,175,154,0.75)' }}>
            ~6 showed ∅ improvement
          </span>
        </motion.div>
      </div>

      {/* ── Honesty footnote ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: act >= 4 ? 1 : 0, y: act >= 4 ? 0 : 5 }}
        transition={{ duration: 0.4, delay: 0.12, ease: 'easeOut' }}
        className="text-sm text-white/65 italic text-center mt-4"
      >
        The system reports its non-wins. Every PR ships verification hints — pass or fail.
      </motion.div>
    </div>
  );
}

// ── Slide data export ─────────────────────────────────────────────────────────

const slides: SlideData[] = [
  {
    id: 12,
    acts: 5,
    title: 'What shipped',
    content: <ResultsReceipt />,
    notes: `Here's what shipped — organized by what the agent actually did, not where.

Parallelization: minimize-sequential-wait identifies independent pipeline steps that are blocked behind each other and restructures them to run concurrently. Best result: a feature branch that was taking 13 minutes averaged 5 minutes after. That's a 62% reduction on every PR in that repo.

Standard optimizations: artifact-caching — adding proper cache keys to install and build steps — cut a high-traffic feature pipeline from 14 minutes to 7. 2,800-plus builds measured. buildkit-registry-cache persisted Docker layer cache into the registry so cold builds stopped being painful: 6 minutes to 4 on another repo's feature runs across a thousand-plus builds. monorepo-skip-unchanged skips CI steps entirely when the relevant files haven't changed; best combined result: 22 minutes to 8.

Reliability: automatic-retry and assign-upload-queue don't save time per run — they prevent failures that force reruns. No time metric, but flaky reruns multiply wasted time across every developer.

Eighty-plus PRs across twenty-plus repos, all 12 playbooks active, every one verified against the actual Buildkite logs post-merge.

Roughly six PRs showed no measurable improvement. The system reports those too.`,
  },
];

export default slides;
