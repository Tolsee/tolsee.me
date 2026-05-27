'use client';

// Slide 04 — "The full picture"
// Faithful reproduction of tulsi-architecture-diagram.excalidraw.json
//
// Three-column layout (left → right):
//   Col 1: Result → GitHub PR
//   Col 2: Agentic Pipelines/Loops (nested)
//           └─ Main loop (dashed): Pre Screen/Plan → Implementation ↔ Review
//           └─ Verification Loop (red dashed): Comment Triage/Fix, CI Failure, Fix Verification
//   Col 3: Contexts (orange dashed, top) + Playbooks (orange dashed, bottom)
//           Contexts: Pipeline Logs/Metrics, PR Request Reviews, Lint/Policies
//           Playbooks: stacked nested cards with optimisation items
//
// Acts: 0=all-dimmed  1=playbooks  2=pre-screen/plan  3=impl↔review
//       4=contexts  5=github-pr  6=verification-loop

import React from 'react';
import { motion } from 'framer-motion';
import type { SlideData } from './_types';
import { FunnelAnimation } from '../funnel-animation';
import { useSlideActs } from '../slide-acts-context';

// ── Brand ─────────────────────────────────────────────────────────────────────
const GREEN  = 'rgb(0,175,154)';
const PINK   = 'rgb(255,167,196)';
const ORANGE = 'rgb(240,140,0)';
const RED    = 'rgb(224,49,49)';

// ── Helpers ───────────────────────────────────────────────────────────────────
type R = { x: number; y: number; w: number; h: number };
const cx = (r: R) => r.x + r.w / 2;
const cy = (r: R) => r.y + r.h / 2;

// ── Geometry (viewBox 1000 × 520) ────────────────────────────────────────────
const VW = 1000;
const VH  = 520;
const P   = 12; // outer padding

// Three columns:
//  C1 x=10..118 (w=108)   gap=30   C2 x=148..468 (w=320)   gap=30   C3 x=498..988 (w=490)
const C1 = { x: 10,  w: 108 };
const C2 = { x: 148, w: 320 };
const C3 = { x: 498, w: 490 };

// Col 1 — Result
const RES_BOX:  R = { x: C1.x,      y: P,   w: C1.w,      h: VH - P * 2 };
const PR_BLOCK: R = { x: C1.x + 8,  y: 162, w: C1.w - 16, h: 96 };

// Col 2 — Agentic Pipelines/Loops outer
const AGT_BOX:  R = { x: C2.x,      y: P,   w: C2.w,      h: VH - P * 2 };

// Main loop inner section
const ML_BOX:   R = { x: C2.x + 9,  y: 38,  w: C2.w - 18, h: 208 };
const PLAN_B:   R = { x: C2.x + 18, y: 54,  w: C2.w - 36, h: 48 };
const IMPL_B:   R = { x: C2.x + 18, y: 110, w: C2.w - 36, h: 48 };
const REV_B:    R = { x: C2.x + 18, y: 166, w: C2.w - 36, h: 48 };

// After PR created inner section
const APR_BOX:  R = { x: C2.x + 9,  y: 264, w: C2.w - 18, h: 232 };
const TRG_B:    R = { x: C2.x + 18, y: 280, w: C2.w - 36, h: 48 };
const CIF_B:    R = { x: C2.x + 18, y: 336, w: C2.w - 36, h: 48 };
const FVR_B:    R = { x: C2.x + 18, y: 392, w: C2.w - 36, h: 48 };

// Col 3 — Contexts (top half)
const CTX_BOX:  R = { x: C3.x,      y: P,   w: C3.w,      h: 242 };
const CTX_B1:   R = { x: C3.x + 10, y: 38,  w: C3.w - 20, h: 58 };
const CTX_B2:   R = { x: C3.x + 10, y: 104, w: C3.w - 20, h: 58 };
const CTX_B3:   R = { x: C3.x + 10, y: 170, w: C3.w - 20, h: 58 };

// Col 3 — Playbooks (bottom half)
const PLB_BOX:  R = { x: C3.x,      y: 268, w: C3.w,      h: VH - P - 268 };
const PLB_CARD1:R = { x: C3.x + 10, y: 298, w: C3.w - 20, h: 110 }; // back card
const PLB_CARD2:R = { x: C3.x + 22, y: 312, w: C3.w - 44, h: 110 }; // front card

// Gap X mid-points for elbow connectors
const GAP1_X = C1.x + C1.w + 15; // 133  (in the gap between Col1 and Col2)

// ── ArchMap ───────────────────────────────────────────────────────────────────
function ArchMap() {
  const { act } = useSlideActs();

  const FONT = 'Montserrat,ui-sans-serif,system-ui';
  const MONO = 'ui-monospace,monospace';

  const DIM = 0.20;

  /** Dim-then-highlight: act 0 = all visible at DIM; each act brightens one section cumulatively */
  const highlight = (n: number, delay = 0) => ({
    initial:    { opacity: DIM },
    animate:    { opacity: act >= n ? 1 : DIM },
    transition: { duration: 0.4, ease: 'easeOut' as const, delay: act >= n ? delay : 0 },
  });

  // Shared sub-label style
  const sub = { fontSize: 8.5, fill: 'rgba(255,255,255,0.40)', fontFamily: MONO } as const;

  return (
    <div style={{ flex: 1, width: '100%', minHeight: 0, overflow: 'hidden' }}>
      <svg viewBox={`0 0 ${VW} ${VH}`} style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <marker id="am-teal"   viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10z" fill={GREEN} />
          </marker>
          <marker id="am-pink"   viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10z" fill={PINK} />
          </marker>
          <marker id="am-orange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L10 5 L0 10z" fill={ORANGE} />
          </marker>

          <linearGradient id="am-g-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(0,175,154,0.22)" />
            <stop offset="100%" stopColor="rgba(0,175,154,0.06)" />
          </linearGradient>
          <linearGradient id="am-g-pink" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(255,167,196,0.22)" />
            <stop offset="100%" stopColor="rgba(255,167,196,0.06)" />
          </linearGradient>
          <linearGradient id="am-g-white" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.09)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
        </defs>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ACT 5 — GitHub PR (Result column)                                 */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <motion.g {...highlight(5)}>
          {/* Outer dashed container */}
          <rect x={RES_BOX.x} y={RES_BOX.y} width={RES_BOX.w} height={RES_BOX.h} rx={8}
            fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.22)" strokeWidth={1.5}
            strokeDasharray="6 4" />
          <text x={RES_BOX.x + 6} y={RES_BOX.y + 15}
            fontSize="7.5" fill="rgba(255,255,255,0.38)" fontFamily={FONT} fontWeight="600">
            Result
          </text>

          {/* GitHub PR block */}
          <rect x={PR_BLOCK.x} y={PR_BLOCK.y} width={PR_BLOCK.w} height={PR_BLOCK.h} rx={6}
            fill="url(#am-g-green)" stroke={GREEN} strokeWidth={1.5} />
          <text x={cx(PR_BLOCK)} y={cy(PR_BLOCK) - 10}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontWeight="700" fill={GREEN} fontFamily={FONT}>
            GitHub PR
          </text>
          <text x={cx(PR_BLOCK)} y={cy(PR_BLOCK) + 10}
            textAnchor="middle" dominantBaseline="middle" {...sub}>
            review · merge
          </text>
        </motion.g>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ACT 2 — Agentic outer + Main loop container + Pre Screen / Plan   */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <motion.g {...highlight(2)}>
          {/* Outer dashed container */}
          <rect x={AGT_BOX.x} y={AGT_BOX.y} width={AGT_BOX.w} height={AGT_BOX.h} rx={8}
            fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.28)" strokeWidth={1.5}
            strokeDasharray="6 4" />
          <text x={AGT_BOX.x + 8} y={AGT_BOX.y + 15}
            fontSize="7.5" fontWeight="700" fill="rgba(255,255,255,0.55)" fontFamily={FONT}>
            Agentic Pipelines / Loops
          </text>

          {/* Main loop inner dashed container */}
          <rect x={ML_BOX.x} y={ML_BOX.y} width={ML_BOX.w} height={ML_BOX.h} rx={6}
            fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.22)" strokeWidth={1.2}
            strokeDasharray="5 3" />
          <text x={ML_BOX.x + 7} y={ML_BOX.y + 12}
            fontSize="7" fill="rgba(255,255,255,0.38)" fontFamily={FONT}>
            Main loop
          </text>

          {/* Pre Screen / Plan */}
          <rect x={PLAN_B.x} y={PLAN_B.y} width={PLAN_B.w} height={PLAN_B.h} rx={6}
            fill="url(#am-g-green)" stroke={GREEN} strokeWidth={1.5} />
          <text x={cx(PLAN_B)} y={cy(PLAN_B) - 8}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="12" fontWeight="600" fill={GREEN} fontFamily={FONT}>
            Pre Screen / Plan
          </text>
          <text x={cx(PLAN_B)} y={cy(PLAN_B) + 9}
            textAnchor="middle" dominantBaseline="middle" {...sub}>
            triage · scope · intent
          </text>
        </motion.g>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ACT 3 — Implementation, Review + Plan→Impl arrow + bidir arrows   */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <motion.g {...highlight(3)}>
          {/* Arrow: Plan → Implementation */}
          <path d={`M${cx(PLAN_B)} ${PLAN_B.y + PLAN_B.h + 1} L${cx(IMPL_B)} ${IMPL_B.y - 1}`}
            stroke={GREEN} strokeWidth={1.5} fill="none"
            markerEnd="url(#am-teal)" strokeLinecap="round" />

          {/* Implementation */}
          <rect x={IMPL_B.x} y={IMPL_B.y} width={IMPL_B.w} height={IMPL_B.h} rx={6}
            fill="url(#am-g-green)" stroke={GREEN} strokeWidth={1.5} />
          <text x={cx(IMPL_B)} y={cy(IMPL_B) - 8}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="12" fontWeight="600" fill={GREEN} fontFamily={FONT}>
            Implementation
          </text>
          <text x={cx(IMPL_B)} y={cy(IMPL_B) + 9}
            textAnchor="middle" dominantBaseline="middle" {...sub}>
            write · diff · commit
          </text>

          {/* Review */}
          <rect x={REV_B.x} y={REV_B.y} width={REV_B.w} height={REV_B.h} rx={6}
            fill="url(#am-g-green)" stroke={GREEN} strokeWidth={1.5} />
          <text x={cx(REV_B)} y={cy(REV_B) - 8}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="12" fontWeight="600" fill={GREEN} fontFamily={FONT}>
            Review
          </text>
          <text x={cx(REV_B)} y={cy(REV_B) + 9}
            textAnchor="middle" dominantBaseline="middle" {...sub}>
            compliance · correctness · security
          </text>

          {/* Left side: Impl → Review (elbow down-left) */}
          <path
            d={`M${IMPL_B.x} ${cy(IMPL_B)} L${IMPL_B.x - 14} ${cy(IMPL_B)} L${IMPL_B.x - 14} ${cy(REV_B)} L${REV_B.x} ${cy(REV_B)}`}
            stroke={PINK} strokeWidth={1.8} fill="none"
            markerEnd="url(#am-pink)" strokeLinecap="round" strokeLinejoin="round" />
          {/* Right side: Review → Impl (elbow up-right) */}
          <path
            d={`M${REV_B.x + REV_B.w} ${cy(REV_B)} L${REV_B.x + REV_B.w + 14} ${cy(REV_B)} L${REV_B.x + REV_B.w + 14} ${cy(IMPL_B)} L${IMPL_B.x + IMPL_B.w} ${cy(IMPL_B)}`}
            stroke={PINK} strokeWidth={1.8} fill="none"
            markerEnd="url(#am-pink)" strokeLinecap="round" strokeLinejoin="round" />
          {/* "Verification Loop" rotated label (between the two arrows) */}
          <text
            x={IMPL_B.x - 16}
            y={(cy(IMPL_B) + cy(REV_B)) / 2}
            textAnchor="middle" fontSize="7" fill={PINK} fontFamily={MONO}
            transform={`rotate(-90,${IMPL_B.x - 16},${(cy(IMPL_B) + cy(REV_B)) / 2})`}>
            Verification Loop
          </text>
        </motion.g>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ACT 6 — Verification Loop section + After-PR→PR connector         */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <motion.g {...highlight(6)}>
          {/* "Verification Loop" red label above container */}
          <text x={APR_BOX.x + 7} y={APR_BOX.y - 6}
            fontSize="7.5" fontWeight="700" fill={RED} fontFamily={FONT}>
            Verification Loop
          </text>

          {/* Red dashed container */}
          <rect x={APR_BOX.x} y={APR_BOX.y} width={APR_BOX.w} height={APR_BOX.h} rx={6}
            fill="rgba(224,49,49,0.05)" stroke={RED} strokeWidth={1.5}
            strokeDasharray="6 4" />

          {/* Comment Triage / Fix */}
          <rect x={TRG_B.x} y={TRG_B.y} width={TRG_B.w} height={TRG_B.h} rx={6}
            fill="url(#am-g-pink)" stroke={PINK} strokeWidth={1.5} />
          <text x={cx(TRG_B)} y={cy(TRG_B) - 8}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="12" fontWeight="600" fill={PINK} fontFamily={FONT}>
            Comment Triage / Fix
          </text>
          <text x={cx(TRG_B)} y={cy(TRG_B) + 9}
            textAnchor="middle" dominantBaseline="middle" {...sub}>
            parse · prioritise · apply
          </text>

          {/* CI Failure */}
          <rect x={CIF_B.x} y={CIF_B.y} width={CIF_B.w} height={CIF_B.h} rx={6}
            fill="url(#am-g-pink)" stroke={PINK} strokeWidth={1.5} />
          <text x={cx(CIF_B)} y={cy(CIF_B) - 8}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="12" fontWeight="600" fill={PINK} fontFamily={FONT}>
            CI Failure
          </text>
          <text x={cx(CIF_B)} y={cy(CIF_B) + 9}
            textAnchor="middle" dominantBaseline="middle" {...sub}>
            diagnose · patch · re-run
          </text>

          {/* Fix Verification */}
          <rect x={FVR_B.x} y={FVR_B.y} width={FVR_B.w} height={FVR_B.h} rx={6}
            fill="url(#am-g-pink)" stroke={PINK} strokeWidth={1.5} />
          <text x={cx(FVR_B)} y={cy(FVR_B) - 8}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="12" fontWeight="600" fill={PINK} fontFamily={FONT}>
            Fix Verification
          </text>
          <text x={cx(FVR_B)} y={cy(FVR_B) + 9}
            textAnchor="middle" dominantBaseline="middle" {...sub}>
            confirm · update PR
          </text>

          {/* After PR → GitHub PR (dashed pink elbow) */}
          <path
            d={`M${AGT_BOX.x} ${cy(APR_BOX)} L${GAP1_X} ${cy(APR_BOX)} L${GAP1_X} ${cy(PR_BLOCK) + 14} L${C1.x + C1.w} ${cy(PR_BLOCK) + 14}`}
            stroke={PINK} strokeWidth={1.5} fill="none"
            strokeDasharray="5 3" markerEnd="url(#am-pink)"
            strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        {/* ACT 5 (delayed) — Main loop → GitHub PR connector                 */}
        <motion.g {...highlight(5, 0.1)}>
          <path
            d={`M${AGT_BOX.x} ${cy(ML_BOX)} L${GAP1_X} ${cy(ML_BOX)} L${GAP1_X} ${cy(PR_BLOCK) - 14} L${C1.x + C1.w} ${cy(PR_BLOCK) - 14}`}
            stroke={GREEN} strokeWidth={1.5} fill="none"
            strokeDasharray="5 3" markerEnd="url(#am-teal)"
            strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ACT 4 — Contexts section                                           */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <motion.g {...highlight(4)}>
          {/* Orange dashed outer container */}
          <rect x={CTX_BOX.x} y={CTX_BOX.y} width={CTX_BOX.w} height={CTX_BOX.h} rx={8}
            fill="rgba(240,140,0,0.04)" stroke={ORANGE} strokeWidth={1.5}
            strokeDasharray="6 4" />
          <text x={CTX_BOX.x + 8} y={CTX_BOX.y + 15}
            fontSize="7.5" fontWeight="700" fill={ORANGE} fontFamily={FONT}>
            Contexts
          </text>

          {/* Pipeline Logs / Metrics */}
          <rect x={CTX_B1.x} y={CTX_B1.y} width={CTX_B1.w} height={CTX_B1.h} rx={6}
            fill="url(#am-g-white)" stroke="rgba(255,255,255,0.26)" strokeWidth={1.2} />
          <text x={cx(CTX_B1)} y={cy(CTX_B1) - 9}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="12" fontWeight="600" fill="rgba(255,255,255,0.82)" fontFamily={FONT}>
            Pipeline Logs / Metrics
          </text>
          <text x={cx(CTX_B1)} y={cy(CTX_B1) + 9}
            textAnchor="middle" dominantBaseline="middle" {...sub}>
            build output · timings · failures
          </text>

          {/* PR Request Reviews */}
          <rect x={CTX_B2.x} y={CTX_B2.y} width={CTX_B2.w} height={CTX_B2.h} rx={6}
            fill="url(#am-g-white)" stroke="rgba(255,255,255,0.26)" strokeWidth={1.2} />
          <text x={cx(CTX_B2)} y={cy(CTX_B2) - 9}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="12" fontWeight="600" fill="rgba(255,255,255,0.82)" fontFamily={FONT}>
            PR Request Reviews
          </text>
          <text x={cx(CTX_B2)} y={cy(CTX_B2) + 9}
            textAnchor="middle" dominantBaseline="middle" {...sub}>
            comments · approvals · history
          </text>

          {/* Lint / Best Practices / Policies */}
          <rect x={CTX_B3.x} y={CTX_B3.y} width={CTX_B3.w} height={CTX_B3.h} rx={6}
            fill="url(#am-g-white)" stroke="rgba(255,255,255,0.26)" strokeWidth={1.2} />
          <text x={cx(CTX_B3)} y={cy(CTX_B3) - 9}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="12" fontWeight="600" fill="rgba(255,255,255,0.82)" fontFamily={FONT}>
            Lint / Best Practices / Policies
          </text>
          <text x={cx(CTX_B3)} y={cy(CTX_B3) + 9}
            textAnchor="middle" dominantBaseline="middle" {...sub}>
            rules · style guides · CI docs
          </text>

          {/* Arrow: Contexts → Agentic (left-pointing dashed) */}
          <path
            d={`M${CTX_BOX.x} ${cy(CTX_BOX)} L${AGT_BOX.x + AGT_BOX.w} ${cy(CTX_BOX)}`}
            stroke={ORANGE} strokeWidth={1.5} fill="none"
            strokeDasharray="5 3" markerEnd="url(#am-orange)" strokeLinecap="round" />
        </motion.g>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ACT 1 — Playbooks section                                          */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <motion.g {...highlight(1)}>
          {/* Orange dashed outer container */}
          <rect x={PLB_BOX.x} y={PLB_BOX.y} width={PLB_BOX.w} height={PLB_BOX.h} rx={8}
            fill="rgba(240,140,0,0.04)" stroke={ORANGE} strokeWidth={1.5}
            strokeDasharray="6 4" />
          <text x={PLB_BOX.x + 8} y={PLB_BOX.y + 15}
            fontSize="7.5" fontWeight="700" fill={ORANGE} fontFamily={FONT}>
            Playbooks
          </text>

          {/* Back card (stacked depth effect) */}
          <rect x={PLB_CARD1.x} y={PLB_CARD1.y} width={PLB_CARD1.w} height={PLB_CARD1.h} rx={6}
            fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.18)" strokeWidth={1}
            strokeDasharray="5 3" />
          {/* Front card (slightly offset) */}
          <rect x={PLB_CARD2.x} y={PLB_CARD2.y} width={PLB_CARD2.w} height={PLB_CARD2.h} rx={6}
            fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.30)" strokeWidth={1.2}
            strokeDasharray="5 3" />

          {/* Content: item 1 */}
          <text x={PLB_CARD2.x + 14} y={PLB_CARD2.y + 22}
            fontSize="11" fontWeight="600" fill="rgba(255,255,255,0.78)" fontFamily={FONT}>
            Use container layer caching
          </text>
          <text x={PLB_CARD2.x + 14} y={PLB_CARD2.y + 40}
            fontSize="8.5" fill="rgba(255,255,255,0.35)" fontFamily={MONO}>
            registry-level cache per step
          </text>

          {/* Divider */}
          <line x1={PLB_CARD2.x + 14} y1={PLB_CARD2.y + 54}
            x2={PLB_CARD2.x + PLB_CARD2.w - 14} y2={PLB_CARD2.y + 54}
            stroke="rgba(255,255,255,0.12)" strokeWidth={1} />

          {/* Content: item 2 */}
          <text x={PLB_CARD2.x + 14} y={PLB_CARD2.y + 72}
            fontSize="11" fontWeight="600" fill="rgba(255,255,255,0.78)" fontFamily={FONT}>
            Parallelise CI steps
          </text>
          <text x={PLB_CARD2.x + 14} y={PLB_CARD2.y + 90}
            fontSize="8.5" fill="rgba(255,255,255,0.35)" fontFamily={MONO}>
            fan-out where dependency graph allows
          </text>

          {/* Arrow: Playbooks → Agentic (left-pointing dashed) */}
          <path
            d={`M${PLB_BOX.x} ${cy(PLB_BOX)} L${AGT_BOX.x + AGT_BOX.w} ${cy(PLB_BOX)}`}
            stroke={ORANGE} strokeWidth={1.5} fill="none"
            strokeDasharray="5 3" markerEnd="url(#am-orange)" strokeLinecap="round" />
        </motion.g>

      </svg>
    </div>
  );
}

// ── Slide exports ─────────────────────────────────────────────────────────────

/** Slide 04 — ArchMap "The full picture" (assembler places this at slot 4) */
export const archMap: SlideData[] = [
  {
    id: 4,
    acts: 7,
    title: 'The full picture',
    content: <ArchMap />,
    notes:
      "Three-column layout. Left: the output — a GitHub PR. Centre: Agentic Pipelines — the main loop (Pre Screen, Implementation, Review in a tight cycle) and the After PR loop (Comment Triage, CI Failure response, Fix Verification). Right: what feeds the agent — Contexts (pipeline logs, PR reviews, lint policies) and Playbooks (optimisation strategies like layer caching and step parallelisation).\n\nThe bidirectional arrows between Implementation and Review are the Verification Loop — the agent doesn't just write code, it reviews its own output and iterates before opening a PR.\n\nContexts and Playbooks both point left into the Agentic Pipelines — they're the signal and the rulebook that the agent consults on every cycle.",
  },
];

/** Slide 07 — FunnelAnimation "The main loop" (assembler places this at slot 7) */
export const funnel: SlideData[] = [
  {
    id: 7,
    acts: 7,
    title: 'The main loop',
    content: (
      <div className="flex-1 flex min-h-0 w-full">
        <FunnelAnimation />
      </div>
    ),
    notes:
      "The answer to the 'one big agent' failure is a funnel. Not a funnel for performance — though it helps with cost — but a funnel for confidence. Each stage has exactly one job. One output schema. One model choice matched to the difficulty of that job. And each stage can fail in a visible way: the pre-screen says 'no violation' and that decision is logged. The reviewer rejects a diff and you see exactly which rule it failed and why. The funnel makes agent behavior understandable, and understandable behavior is the prerequisite for trust.",
  },
];

export default [...archMap, ...funnel];
