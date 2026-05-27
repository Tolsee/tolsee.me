'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSlideActs } from './slide-acts-context';

// ─── Counts (TODO: swap from research/05-impact.md) ──────────────────────────
const C = { scanned: 120, violations: 50, changes: 40, approved: 40, prs: 40 } as const;

// ─── Brand tokens ────────────────────────────────────────────────────────────
const GREEN    = 'rgb(0, 175, 154)';
const PINK     = 'rgb(255, 167, 196)';
const GREEN_85 = 'rgba(0,175,154,0.85)';
const PINK_85  = 'rgba(255,167,196,0.85)';

// ─── Motion tokens ───────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];
const SPRING_LAYOUT = { type: 'spring' as const, stiffness: 220, damping: 24 };
const SPRING_POP    = { type: 'spring' as const, stiffness: 380, damping: 22 };

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// ─── Types ───────────────────────────────────────────────────────────────────
type Verdict  = 'none' | 'approved' | 'retrying' | 'rejected';
type ItemLane = 'pre' | 'impl' | 'review' | 'pr';

interface FunnelItem {
  id:           number;
  lane:         ItemLane;
  dropped:      boolean;
  showProgress: boolean;
  progressDone: boolean;
  verdict:      Verdict;
}

const TOTAL     = 15;
const SURVIVORS = new Set([0, 1, 2, 3, 4, 5]);

function makeAllPre(): FunnelItem[] {
  return Array.from({ length: TOTAL }, (_, id): FunnelItem => ({
    id, lane: 'pre', dropped: false,
    showProgress: false, progressDone: false, verdict: 'none',
  }));
}

// ─── Act snapshots ───────────────────────────────────────────────────────────
interface AnimState {
  items:      FunnelItem[];
  arrows:     { preToImpl: boolean; reviewToPr: boolean };
  counters:   { pre: string; impl: string; review: string; pr: string };
  laneActive: { pre: boolean; impl: boolean; review: boolean; pr: boolean };
}

function stateForAct(act: number): AnimState {
  const s: AnimState = {
    items:      [],
    arrows:     { preToImpl: false, reviewToPr: false },
    counters:   { pre: '', impl: '', review: '', pr: '' },
    laneActive: { pre: false, impl: false, review: false, pr: false },
  };
  if (act === 0) return s;

  s.items = makeAllPre();
  s.counters.pre = `${C.scanned} scanned`;
  s.laneActive.pre = true;
  if (act === 1) return s;

  s.items = s.items.map((item): FunnelItem => ({
    ...item,
    lane:    SURVIVORS.has(item.id) ? 'impl' : 'pre',
    dropped: !SURVIVORS.has(item.id),
  }));
  s.arrows.preToImpl = true;
  s.counters.pre = `${C.violations} violations`;
  s.laneActive = { pre: false, impl: true, review: false, pr: false };
  if (act === 2) return s;

  s.items = s.items.map((item): FunnelItem => ({
    ...item,
    showProgress: item.lane === 'impl',
    progressDone: item.lane === 'impl',
  }));
  s.counters.impl = `${C.changes} changes implemented and reviewed`;
  s.counters.review = '';
  s.laneActive = { pre: false, impl: true, review: true, pr: false };
  if (act === 3) return s;

  s.items = [
    ...Array.from({ length: 5 }, (_, i): FunnelItem => ({
      id: i, lane: 'pr', dropped: false,
      showProgress: false, progressDone: true, verdict: 'approved',
    })),
    {
      id: 5, lane: 'review', dropped: true,
      showProgress: false, progressDone: false, verdict: 'rejected',
    },
    ...Array.from({ length: 9 }, (_, i): FunnelItem => ({
      id: i + 6, lane: 'pre', dropped: true,
      showProgress: false, progressDone: false, verdict: 'none',
    })),
  ];
  s.counters.review = '';
  s.laneActive = { pre: false, impl: false, review: false, pr: true };
  if (act === 4) return s;

  s.arrows.reviewToPr = true;
  s.counters.pr = `${C.prs} PRs`;
  return s;
}

// ─── VerdictGlyph — popping symbol in top-right of an item ───────────────────
function VerdictGlyph({ verdict }: { verdict: Exclude<Verdict, 'none'> }) {
  let symbol: string;
  let style: React.CSSProperties | undefined;
  let extraClass = '';
  switch (verdict) {
    case 'approved':
      symbol = '✓';
      style = { color: GREEN };
      break;
    case 'retrying':
      symbol = '↺';
      style = { color: PINK };
      break;
    case 'rejected':
      symbol = '✕';
      extraClass = 'text-red-400';
      break;
  }
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={SPRING_POP}
      className={`absolute top-1 right-1.5 text-[12px] font-bold leading-none ${extraClass}`}
      style={style}
    >
      {symbol}
    </motion.span>
  );
}

// ─── ItemDot ─────────────────────────────────────────────────────────────────
function ItemDot({ item, staggerIdx }: { item: FunnelItem; staggerIdx: number }) {
  const isPr      = item.lane === 'pr';
  const isDropped = item.dropped;
  const delay     = staggerIdx * 0.055;
  // approved verdict is implied by the pink PR pill — hide the ✓ in that lane
  const showVerdict = item.verdict !== 'none' && !(item.verdict === 'approved' && isPr);

  return (
    <motion.div
      layoutId={`fi-${item.id}`}
      layout
      className="relative flex-shrink-0 overflow-hidden"
      style={{ width: 72, height: 32, borderRadius: 6 }}
      initial={{ opacity: 0, y: -16, scale: 0.88 }}
      animate={{
        backgroundColor: isPr
          ? 'rgba(255,167,196,0.85)'
          : isDropped ? 'rgba(255,255,255,0.04)' : 'rgba(54,60,72,0.9)',
        borderColor: isPr ? 'rgba(255,167,196,0.55)' : 'rgba(255,255,255,0.30)',
        borderWidth: 1, borderStyle: 'solid',
        opacity: isDropped ? 0.22 : 1,
        y: isDropped ? 5 : 0,
        scale: 1,
      }}
      exit={{ opacity: 0, y: 32, scale: 0.88, transition: { duration: 0.22, ease: EASE } }}
      transition={{
        layout:          SPRING_LAYOUT,
        opacity:         { duration: 0.28, delay },
        scale:           { ...SPRING_POP, delay },
        y:               { type: 'spring', stiffness: 260, damping: 22, delay },
        backgroundColor: { duration: 0.22 },
        borderColor:     { duration: 0.22 },
      }}
    >
      {item.showProgress && (
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] w-full"
          style={{ backgroundColor: GREEN, transformOrigin: 'left', borderRadius: '0 0 6px 6px' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: item.progressDone ? 1 : 0 }}
          transition={{ duration: 0.52, ease: [0.35, 0, 0.25, 1], delay: (item.id % 6) * 0.06 }}
        />
      )}
      {showVerdict && <VerdictGlyph verdict={item.verdict as Exclude<Verdict, 'none'>} />}
    </motion.div>
  );
}

// ─── ScanLine ────────────────────────────────────────────────────────────────
function ScanLine({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute left-0 right-0 z-10 pointer-events-none"
          style={{ height: 2, backgroundColor: GREEN }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 180, opacity: 0.85 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.52, ease: 'linear' }}
        />
      )}
    </AnimatePresence>
  );
}

// ─── PinkPulse — single dramatic pulse at PR exit ────────────────────────────
function PinkPulse({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          style={{ backgroundColor: PINK, borderRadius: 8 }}
          initial={{ opacity: 0.45, scale: 0.88 }}
          animate={{ opacity: 0, scale: 2.4 }}
          exit={{}}
          transition={{ duration: 0.65, ease: EASE }}
        />
      )}
    </AnimatePresence>
  );
}

// ─── ModelPill ───────────────────────────────────────────────────────────────
function ModelPill({ model }: { model: 'Haiku' | 'Sonnet' }) {
  const color = model === 'Haiku' ? GREEN : PINK;
  return (
    <span
      className="rounded-full font-mono px-2 py-0.5 flex-shrink-0"
      style={{ fontSize: 11, lineHeight: 1.6, border: `1px solid ${color}`, color }}
    >
      {model}
    </span>
  );
}

// ─── ToolDots ────────────────────────────────────────────────────────────────
// Dots = tools/integrations per stage. REVIEWER = ∅ (no MCP). PR = 👤 (human).
function ToolDots({ count, isEmpty, isHuman }: { count?: number; isEmpty?: boolean; isHuman?: boolean }) {
  if (isHuman) {
    return <span style={{ fontSize: 15, lineHeight: 1, color: PINK }}>👤</span>;
  }
  if (isEmpty) {
    return <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.38)', lineHeight: 1 }}>∅</span>;
  }
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count ?? 0 }, (_, i) => (
        <div key={i} style={{
          width: 10, height: 10, borderRadius: 2,
          backgroundColor: 'rgba(255,255,255,0.55)', flexShrink: 0,
        }} />
      ))}
    </div>
  );
}

// ─── ForwardArrow (animated path-draw) ───────────────────────────────────────
function ForwardArrow({ active, color = 'rgba(255,255,255,0.8)' }: { active: boolean; color?: string }) {
  return (
    <div style={{
      flexShrink: 0, width: 26,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'flex-start', paddingTop: 96,
    }}>
      <svg width="26" height="14" viewBox="0 0 26 14" fill="none" style={{ overflow: 'visible' }}>
        <motion.path
          d="M0 7 H18 M13 3 L23 7 L13 11"
          stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.35, 0, 0.25, 1] }}
        />
      </svg>
    </div>
  );
}

// ─── LoopArcs — closed oval loop between IMPL and REVIEWER ──────────────────
// Top half  (IMPL→REVIEWER): solid teal,  arrowhead at REVIEWER (right) end.
// Bottom half (REVIEWER→IMPL): dashed pink, arrowhead at IMPL (left) end.
// Single closed ellipse reads as a cycle, not two separate U shapes.
// Extends via overflow:visible into the lane bodies above the SVG element.
function LoopArcs() {
  const cx = 21;         // center of 42px column
  const lx = cx - 152;  // left connection (IMPL side)
  const rx = cx + 152;  // right connection (REVIEWER side)
  const cy = -260;       // oval center y — negative = above SVG origin (mid-lane)
  const oa = 152;        // horizontal semi-axis (half the lane-to-lane span)
  const ob = 90;         // vertical semi-axis → 304×180px oval, ~1.7:1 aspect

  const TEAL     = GREEN;
  const PINK_ARC = PINK;

  return (
    <div style={{
      flexShrink: 0, width: 42, alignSelf: 'stretch',
      display: 'flex', alignItems: 'flex-end',
      paddingBottom: 28,
    }}>
      <svg width={42} height={55} fill="none" style={{ overflow: 'visible' }}>

        {/* Top half: IMPL → REVIEWER — solid teal, sweeps over the top */}
        <path
          d={`M ${lx},${cy} A ${oa},${ob},0,0,1,${rx},${cy}`}
          stroke={TEAL} strokeWidth={1.8} strokeLinecap="round" fill="none"
        />
        {/* Arrowhead at REVIEWER (right) — tip at connection point, opens upward */}
        <path
          d={`M ${rx-7},${cy-10} L ${rx},${cy} L ${rx+7},${cy-10}`}
          stroke={TEAL} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" fill="none"
        />

        {/* Bottom half: REVIEWER → IMPL — dashed pink, sweeps under */}
        <path
          d={`M ${rx},${cy} A ${oa},${ob},0,0,1,${lx},${cy}`}
          stroke={PINK_ARC} strokeWidth={1.8} strokeLinecap="round" strokeDasharray="6 4" fill="none"
        />
        {/* Arrowhead at IMPL (left) — tip at connection point, opens downward */}
        <path
          d={`M ${lx-7},${cy+10} L ${lx},${cy} L ${lx+7},${cy+10}`}
          stroke={PINK_ARC} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" fill="none"
        />

        {/* "⟲ 2×" at oval center */}
        <text
          x={cx} y={cy + 4}
          textAnchor="middle" fontSize="9"
          fontFamily="ui-monospace,monospace" fill="rgba(255,255,255,0.55)"
        >⟲ 2×</text>

      </svg>
    </div>
  );
}

// ─── useArrivalGlow — briefly flashes when `active` flips false→true ─────────
function useArrivalGlow(active: boolean): boolean {
  const [glowing, setGlowing] = useState(false);
  const wasActive = useRef(false);
  useEffect(() => {
    if (active && !wasActive.current) {
      setGlowing(true);
      wasActive.current = true;
      const t = window.setTimeout(() => setGlowing(false), 650);
      return () => window.clearTimeout(t);
    }
    if (!active) wasActive.current = false;
  }, [active]);
  return glowing;
}

// ─── LanePanel ───────────────────────────────────────────────────────────────
interface LanePanelProps {
  label:          string;
  subLabel?:      string;
  model?:         'Haiku' | 'Sonnet';
  toolCount?:     number;
  toolsEmpty?:    boolean;
  toolsHuman?:    boolean;
  stageColor:     string;
  active:         boolean;
  counter:        string;
  counterBright?: boolean;
  showScanLine?:  boolean;
  showPulse?:     boolean;
  /** Narrow fixed-width column — used for output zones like PR OPENED */
  compact?:       boolean;
  /** Suppress the built-in bottom counter (used when a merged counter is rendered outside) */
  hideCounter?:   boolean;
  /** Force border-right even when last child (prevents last:border-r-0 from removing it) */
  forceBorderRight?: boolean;
  children:       React.ReactNode;
}

function LanePanel({
  label, subLabel, model, toolCount, toolsEmpty, toolsHuman,
  stageColor, active, counter, counterBright = false,
  showScanLine = false, showPulse = false, compact = false,
  hideCounter = false, forceBorderRight = false,
  children,
}: LanePanelProps) {
  const glowing = useArrivalGlow(active);

  const counterColor = counterBright
    ? stageColor
    : active
      ? 'rgba(255,255,255,1.0)'
      : 'rgba(255,255,255,0.22)';

  return (
    <div
      className={`min-w-0 flex flex-col p-5 gap-3 border-r border-white/[0.07] ${forceBorderRight ? '' : 'last:border-r-0'} relative overflow-hidden`}
      style={compact ? { flex: '0 0 192px', borderLeft: '1px dashed rgba(255,167,196,0.25)' } : { flex: '1 1 0' }}
    >

      {/* Lane arrival glow */}
      <AnimatePresence>
        {glowing && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0.18 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            style={{ backgroundColor: stageColor }}
          />
        )}
      </AnimatePresence>

      {/* Chrome: label, model pill, turn cap, tool dots */}
      <div className="relative flex-shrink-0 space-y-2 z-10">
        <div
          className="font-mono font-bold uppercase tracking-wide leading-none"
          style={{ fontSize: 22, color: stageColor }}
        >
          {label}
        </div>
        {subLabel && (
          <div
            className="font-mono leading-none"
            style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}
          >
            {subLabel}
          </div>
        )}
        <div className="flex items-center gap-2 flex-wrap min-h-[20px]">
          {model && <ModelPill model={model} />}
        </div>
        <div className="flex items-center" style={{ height: 16 }}>
          <ToolDots count={toolCount} isEmpty={toolsEmpty} isHuman={toolsHuman} />
        </div>
      </div>

      {/* Items track */}
      <div className="relative flex-1 overflow-hidden min-h-0 z-10">
        <ScanLine visible={showScanLine} />
        <PinkPulse visible={showPulse} />
        <div className="flex flex-wrap content-start gap-2">{children}</div>
      </div>

      {/* Counter — ticks on change via key remount */}
      {!hideCounter && (
        <AnimatePresence mode="wait">
          <motion.div
            key={counter || 'zero'}
            className="relative font-mono font-semibold flex-shrink-0 leading-none z-10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{ fontSize: 20, color: counterColor }}
          >
            {counter || '0'}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

// ─── FunnelAnimation ─────────────────────────────────────────────────────────
function FunnelAnimation() {
  const reduced = useReducedMotion();
  const mounted = useRef(true);
  const lastAct = useRef(0);

  const { act } = useSlideActs();
  const [items,        setItems]        = useState<FunnelItem[]>([]);
  const [showScanLine, setShowScanLine] = useState(false);
  const [arrows,       setArrows]       = useState({ preToImpl: false, reviewToPr: false });
  const [counters,     setCounters]     = useState({ pre: '', impl: '', review: '', pr: '' });
  const [laneActive,   setLaneActive]   = useState({ pre: false, impl: false, review: false, pr: false });
  const [showPulse,    setShowPulse]    = useState(false);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // Reduced motion: snap to final act on mount
  useEffect(() => {
    if (!reduced) return;
    const s = stateForAct(5);
    setItems(s.items);
    setArrows(s.arrows);
    setCounters(s.counters);
    setLaneActive(s.laneActive);
    lastAct.current = 5;
  }, [reduced]);

  // Snap to act state instantly (backward / reset)
  const snapToAct = useCallback((n: number) => {
    const s = stateForAct(n);
    setItems(s.items);
    setShowScanLine(false);
    setArrows(s.arrows);
    setCounters(s.counters);
    setLaneActive(s.laneActive);
    setShowPulse(false);
  }, []);

  // Per-act async animation
  const runAct = useCallback(async (n: number) => {
    if (!mounted.current) return;

    const patchAll = (compute: (i: FunnelItem) => Partial<FunnelItem>) =>
      setItems(prev => prev.map(i => ({ ...i, ...compute(i) })));

    if (n === 1) {
      setItems(makeAllPre());
      setLaneActive(l => ({ ...l, pre: true }));
      await wait(1500);
      if (!mounted.current) return;
      setCounters(c => ({ ...c, pre: `${C.scanned} scanned` }));

    } else if (n === 2) {
      setShowScanLine(true);
      await wait(550);
      if (!mounted.current) return;
      setShowScanLine(false);
      patchAll(i => ({ dropped: !SURVIVORS.has(i.id) }));
      await wait(380);
      setCounters(c => ({ ...c, pre: `${C.violations} violations` }));
      await wait(320);
      setArrows(a => ({ ...a, preToImpl: true }));
      await wait(350);
      patchAll(i => ({ lane: SURVIVORS.has(i.id) ? 'impl' : 'pre' }));
      setLaneActive({ pre: false, impl: true, review: false, pr: false });

    } else if (n === 3) {
      patchAll(i => ({ showProgress: i.lane === 'impl' }));
      setLaneActive(l => ({ ...l, review: true }));
      await wait(160);
      patchAll(i => ({ progressDone: i.lane === 'impl' }));
      await wait(900);
      if (!mounted.current) return;
      setCounters(c => ({ ...c, impl: `${C.changes} changes implemented and reviewed` }));

    } else if (n === 4) {
      // Batch: all impl items jump to review
      patchAll(i => ({
        lane: i.lane === 'impl' ? 'review' : i.lane,
        showProgress: false, progressDone: false,
      }));
      setLaneActive(l => ({ ...l, impl: false }));
      await wait(280);
      if (!mounted.current) return;

      // Batch verdict: survivors approved, item 5 rejected
      patchAll(i => {
        if (i.lane !== 'review') return {};
        return i.id === 5
          ? { verdict: 'rejected', dropped: true }
          : { verdict: 'approved' };
      });
      await wait(220);
      if (!mounted.current) return;

      // Batch: approved items → PR
      patchAll(i =>
        i.lane === 'review' && i.verdict === 'approved' ? { lane: 'pr' as ItemLane } : {}
      );
      await wait(350);
      if (!mounted.current) return;
      setLaneActive(l => ({ ...l, review: false, pr: true }));

    } else if (n === 5) {
      setArrows(a => ({ ...a, reviewToPr: true }));
      await wait(380);
      setCounters(c => ({ ...c, pr: `${C.prs} PRs` }));
      await wait(400);
      setShowPulse(true);
      await wait(700);
      if (!mounted.current) return;
      setShowPulse(false);
      setLaneActive({ pre: false, impl: false, review: false, pr: true });
    }
  }, []);

  // Act transition: forward → animate, backward → snap
  useEffect(() => {
    if (reduced) return;
    if (act > lastAct.current) {
      lastAct.current = act;
      runAct(act);
    } else if (act < lastAct.current) {
      lastAct.current = act;
      snapToAct(act);
    }
  }, [act, reduced, runAct, snapToAct]);

  // Deck owns all navigation — act comes from SlideActsContext via useSlideActs().

  // Lane slices
  const preItems  = items.filter(i => i.lane === 'pre');
  const implItems = items.filter(i => i.lane === 'impl');
  const revItems  = items.filter(i => i.lane === 'review');
  const prItems   = items.filter(i => i.lane === 'pr');

  return (
    <div className="w-full h-full flex flex-col overflow-hidden select-none">
      {/* 4-lane row */}
      <div className="relative flex flex-row flex-1 overflow-hidden">

        {/* ── Funnel cone: narrows Pre-screen → Impl → Reviewer ───────────────
            PR Open lives OUTSIDE this cone (right 25% of row, after the Reviewer).
            75% ≈ (3 flex-1 lanes + 26px arrow + 42px loop-arcs) / total row width. */}
        <svg
          aria-hidden="true"
          style={{
            position: 'absolute', left: 0, top: 0,
            width: '75%', height: '100%',
            pointerEvents: 'none',
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Interior teal tint */}
          <path
            d="M 0,10 L 100,30 L 100,70 L 0,90 Z"
            fill="rgba(0,175,154,0.05)"
            vectorEffect="non-scaling-stroke"
          />
          {/* Top converging edge */}
          <line x1="0" y1="10" x2="100" y2="30"
            stroke="rgba(0,175,154,0.22)" strokeWidth="1.5" strokeLinecap="round"
            vectorEffect="non-scaling-stroke" />
          {/* Bottom converging edge */}
          <line x1="0" y1="90" x2="100" y2="70"
            stroke="rgba(0,175,154,0.22)" strokeWidth="1.5" strokeLinecap="round"
            vectorEffect="non-scaling-stroke" />
          {/* Narrow-end closing line (Reviewer right edge) */}
          <line x1="100" y1="30" x2="100" y2="70"
            stroke="rgba(0,175,154,0.22)" strokeWidth="1.5" strokeLinecap="round"
            vectorEffect="non-scaling-stroke" />
        </svg>

        <LanePanel
          label="PRE-SCREEN"
          subLabel="scans every repo × every playbook"
          model="Haiku"
          toolCount={2}
          stageColor={GREEN_85}
          active={laneActive.pre}
          counter={counters.pre}
          showScanLine={showScanLine}
        >
          <AnimatePresence>
            {preItems.map((item, idx) => (
              <ItemDot key={item.id} item={item} staggerIdx={idx} />
            ))}
          </AnimatePresence>
        </LanePanel>

        <ForwardArrow active={arrows.preToImpl} color={GREEN} />

        {/* IMPL + LoopArcs + REVIEWER column group — shared merged counter at bottom */}
        <div style={{ flex: '2 2 0', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'row', overflow: 'hidden', minHeight: 0 }}>
            <LanePanel
              label="IMPLEMENTATION"
              model="Sonnet"
              toolCount={4}
              stageColor={GREEN}
              active={laneActive.impl}
              counter={counters.impl}
              hideCounter
            >
              <AnimatePresence>
                {implItems.map((item, idx) => (
                  <ItemDot key={item.id} item={item} staggerIdx={idx} />
                ))}
              </AnimatePresence>
            </LanePanel>

            {/* Loop arcs — static chrome, visible from Act 0 */}
            <LoopArcs />

            <LanePanel
              label="REVIEWER"
              model="Haiku"
              toolsEmpty
              stageColor={PINK_85}
              active={laneActive.review}
              counter={counters.review}
              hideCounter
              forceBorderRight
            >
              <AnimatePresence>
                {revItems.map((item, idx) => (
                  <ItemDot key={item.id} item={item} staggerIdx={idx} />
                ))}
              </AnimatePresence>
            </LanePanel>
          </div>

          {/* Merged counter spanning IMPL + REVIEWER width */}
          <AnimatePresence mode="wait">
            <motion.div
              key={counters.impl || 'zero'}
              className="flex-shrink-0 font-mono font-semibold leading-none px-5 pb-5 pt-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE }}
              style={{
                fontSize: 20,
                color: (laneActive.impl || laneActive.review) ? 'rgba(255,255,255,1.0)' : 'rgba(255,255,255,0.22)',
              }}
            >
              {counters.impl ? (
                <>
                  {counters.impl}{' '}
                  <span style={{ color: GREEN }}>&#x2713;</span>
                </>
              ) : '0'}
            </motion.div>
          </AnimatePresence>
        </div>

        <ForwardArrow active={arrows.reviewToPr} color={PINK} />

        <LanePanel
          label="PR OPENED"
          subLabel="output"
          toolsHuman
          stageColor={PINK}
          active={laneActive.pr}
          counter={counters.pr}
          counterBright
          showPulse={showPulse}
          compact
        >
          <AnimatePresence>
            {prItems.map((item, idx) => (
              <ItemDot key={item.id} item={item} staggerIdx={idx} />
            ))}
          </AnimatePresence>
        </LanePanel>
      </div>

      {/* Bottom bar — act progress indicator */}
      <div className="flex-shrink-0 flex items-center justify-end px-5 py-2">
        {act > 0 && act < 5 && (
          <div
            className="font-mono text-xs pointer-events-none"
            style={{ color: 'rgba(255,255,255,0.38)' }}
          >
            {act}/5
          </div>
        )}
      </div>
    </div>
  );
}

export default FunnelAnimation;
export { FunnelAnimation };
