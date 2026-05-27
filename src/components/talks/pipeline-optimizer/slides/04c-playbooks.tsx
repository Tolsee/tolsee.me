'use client';

// Slide 04c — "Playbooks" (definition + principles + examples)
// Acts: 0=empty  1=definition  2=principles  3=examples
// Rebuilt per task #94: NOT a catalog grid.

import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Key,
  RefreshCw,
  BookOpen,
  Crosshair,
  Layers,
  GitPullRequest,
  BarChart2,
} from 'lucide-react';
import type { SlideData } from './_types';
import { useSlideActs } from '../slide-acts-context';
import { sans } from '@/lib/fonts';

// ── Brand ─────────────────────────────────────────────────────────────────────
const TEAL        = 'rgb(0,175,154)';
const PINK        = 'rgb(255,167,196)';
const TEAL_BG     = 'rgba(0,175,154,0.08)';
const TEAL_BORDER = 'rgba(0,175,154,0.22)';
const PINK_BG     = 'rgba(255,167,196,0.08)';
const PINK_BORDER = 'rgba(255,167,196,0.22)';

// ── Principles ─────────────────────────────────────────────────────────────────
// 5 load-bearing principles from the research
const PRINCIPLES = [
  { Icon: BookOpen,    label: 'Documented — not in heads' },
  { Icon: Crosshair,   label: 'Trigger + recipe' },
  { Icon: Layers,      label: 'Bounded scope' },
  { Icon: GitPullRequest, label: 'Reversible — ships as PR' },
  { Icon: BarChart2,   label: 'Evidence-backed' },
] as const;

// ── Examples ───────────────────────────────────────────────────────────────────
const EXAMPLES = [
  {
    Icon: Zap,
    title: 'Parallelize test steps',
    tag: 'parallelization',
  },
  {
    Icon: Key,
    title: 'Cache key includes lockfile hash',
    tag: 'standard',
  },
  {
    Icon: RefreshCw,
    title: 'Retry budget on flaky steps',
    tag: 'reliability',
  },
] as const;

// ── PrincipleChip ─────────────────────────────────────────────────────────────
function PrincipleChip({
  Icon,
  label,
  visible,
  delay,
}: {
  Icon: React.ElementType;
  label: string;
  visible: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
      transition={{ duration: 0.25, ease: 'easeOut', delay: visible ? delay : 0 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        background: TEAL_BG,
        border: `1px solid ${TEAL_BORDER}`,
        borderRadius: 999,
        padding: '7px 14px',
        whiteSpace: 'nowrap',
      }}
    >
      <Icon size={13} color={TEAL} strokeWidth={2} style={{ flexShrink: 0 }} />
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.85)',
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ── ExampleCard ───────────────────────────────────────────────────────────────
function ExampleCard({
  Icon,
  title,
  tag,
  visible,
  delay,
}: {
  Icon: React.ElementType;
  title: string;
  tag: string;
  visible: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
      transition={{ duration: 0.3, ease: 'easeOut', delay: visible ? delay : 0 }}
      style={{
        flex: 1,
        background: PINK_BG,
        border: `1px solid ${PINK_BORDER}`,
        borderRadius: 10,
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <Icon size={18} color={PINK} strokeWidth={2} />
      <div
        style={{
          fontSize: 13.5,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.90)',
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 10.5,
          color: 'rgba(255,255,255,0.35)',
          fontFamily: 'ui-monospace,monospace',
          letterSpacing: '0.03em',
        }}
      >
        {tag}
      </div>
    </motion.div>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────
function Divider({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{
        height: 1,
        background: 'rgba(255,255,255,0.07)',
        margin: '2px 0',
      }}
    />
  );
}

// ── SectionLabel ──────────────────────────────────────────────────────────────
function SectionLabel({ children, visible }: { children: React.ReactNode; visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        color: TEAL,
        marginBottom: 6,
      }}
    >
      {children}
    </motion.div>
  );
}

// ── Main slide component ──────────────────────────────────────────────────────
function PlaybooksSlide() {
  const { act } = useSlideActs();

  const showDefinition = act >= 1;
  const showPrinciples = act >= 2;
  const showExamples   = act >= 3;

  return (
    <div
      className={`${sans.className} flex flex-col h-full w-full`}
      style={{ gap: 20, paddingBottom: 4 }}
    >
      {/* ── Section 1: Definition ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showDefinition ? 1 : 0, y: showDefinition ? 0 : 10 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <SectionLabel visible={showDefinition}>What's a playbook?</SectionLabel>
        <div
          style={{
            fontSize: 19,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.90)',
            lineHeight: 1.5,
            letterSpacing: '-0.02em',
          }}
        >
          A documented optimization pattern — a{' '}
          <span style={{ color: TEAL, fontWeight: 700 }}>trigger condition</span>{' '}
          the agent checks for, and a{' '}
          <span style={{ color: TEAL, fontWeight: 700 }}>fix recipe</span>{' '}
          it applies when the trigger fires.
        </div>
      </motion.div>

      {/* ── Divider ───────────────────────────────────────────────────────────── */}
      <Divider visible={showPrinciples} />

      {/* ── Section 2: Principles ─────────────────────────────────────────────── */}
      <div>
        <SectionLabel visible={showPrinciples}>Principles</SectionLabel>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          {PRINCIPLES.map(({ Icon, label }, i) => (
            <PrincipleChip
              key={label}
              Icon={Icon}
              label={label}
              visible={showPrinciples}
              delay={i * 0.055}
            />
          ))}
        </div>
      </div>

      {/* ── Divider ───────────────────────────────────────────────────────────── */}
      <Divider visible={showExamples} />

      {/* ── Section 3: Examples ───────────────────────────────────────────────── */}
      <div>
        <SectionLabel visible={showExamples}>Examples</SectionLabel>
        <div style={{ display: 'flex', gap: 12 }}>
          {EXAMPLES.map(({ Icon, title, tag }, i) => (
            <ExampleCard
              key={title}
              Icon={Icon}
              title={title}
              tag={tag}
              visible={showExamples}
              delay={i * 0.07}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Slide export ──────────────────────────────────────────────────────────────
const playbookSlides: SlideData[] = [
  {
    id: 17,
    title: 'Playbooks',
    acts: 4,
    content: <PlaybooksSlide />,
    notes:
      "A playbook is a documented optimization pattern — a named trigger condition and a fix recipe. The agent reads the playbook to know what to look for and exactly how to fix it.\n\nFive principles make a playbook good: it must be documented (not tribal knowledge), it must have a clear trigger and recipe, it must have bounded scope (one focused fix), it must be reversible (ships as a PR that humans can reject), and it must be evidence-backed (we have baseline data to measure the win).\n\nThree examples from the working set: parallelize test steps, make cache keys include lockfile hashes so they auto-invalidate, and set a retry budget on flaky steps so CI noise is bounded.\n\nThe catalog has twelve today. Each one started as a human observation — 'we keep doing this manually.' The playbook format is how you turn that observation into something an agent can act on autonomously.",
  },
];

export default playbookSlides;
