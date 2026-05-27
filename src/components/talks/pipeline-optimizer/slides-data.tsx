/**
 * slides-data.tsx — deck assembler.
 *
 * Imports per-section slide arrays and merges them into a single ordered list.
 * Each section file lives in slides/<N>-<topic>.tsx and exports a SlideData[].
 *
 * To add or edit a slide: open the corresponding section file.
 * To add a new section: create the file, import it here, and spread it in order.
 */

'use client';

import React from 'react';
import { sans } from '@/lib/fonts';
import type { SlideData } from './slides/_types';

import whatWeBuilt from './slides/00b-what-we-built';
import hook from './slides/01-hook';
import naive from './slides/03-naive';
import { archMap, funnel } from './slides/04-architecture';
import playbookSlides from './slides/04c-playbooks';
import feedbackLoopSlides from './slides/06b-feedback-loop';
import whyCi from './slides/04b-why-ci';
import vsAlternatives from './slides/04d-vs-alternatives';
import keyInsight from './slides/05-key-insight';
import results from './slides/07-results';
import lessons from './slides/08-lessons';
import close from './slides/09-close';

// Re-export SlideData so page.tsx can import it from a single path if needed.
export type { SlideData };

// ── Slide 01 — Title card (full-bleed, owned by assembler) ──────────────────
// TODO(slide-designer): Full-bleed, centered, large mono title, dot-grid background (static),
//   fade-in title 400ms then byline 600ms offset. Bookend aesthetic — identical to slide 19.
const titleSlide: SlideData = {
  id: 1,
  title: undefined,
  acts: 1,
  content: (
    // `absolute inset-0` escapes <Slide>'s p-12 for full-bleed effect.
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12">
      <h1 className={`${sans.className} text-6xl md:text-7xl font-bold text-white mb-8`}>
        Replace Yourself with Agents
      </h1>
      <p className={`${sans.className} text-lg md:text-xl font-mono text-white/50 mb-16 tracking-wide`}>
        trust · confidence thresholds · the agent that became better at my job
      </p>
      <div className="font-mono text-sm text-white/40 flex flex-col gap-1">
        <div>Tulsi Sapkota</div>
        <div>Senior Software Engineer @ Linktree</div>
      </div>
    </div>
  ),
  notes:
    'How we built an agent that monitors our Buildkite pipelines, reasons about inefficiencies, and raises PRs to fix it. A practical story about trust, confidence thresholds, and what happens when the agent is better at your job than you are.\n\nThe synopsis lives in speaker notes — slide face shows only the compressed tagline.',
};

// ── Full-bleed transforms ────────────────────────────────────────────────────
// page.tsx renders <Slide title={s.title} notes={s.notes}>{s.content}</Slide>
// and doesn't forward a fullBleed prop. As a workaround, we embed an
// `absolute inset-0` wrapper directly in the content so slides can escape the
// <Slide> p-12 padding without editing deck.tsx or page.tsx.

/** Slides 4 & 7: pull the title into the content, wrap everything absolute. */
function withInlineTitle(s: SlideData): SlideData {
  if (s.id !== 4 && s.id !== 7) return s;
  const savedTitle = s.title;
  return {
    ...s,
    title: undefined,
    content: (
      <div className={`${sans.className} absolute inset-0 flex flex-col px-12 pt-14 pb-8`}>
        {savedTitle != null && (
          <div
            className={`${sans.className} text-lg uppercase tracking-widest mb-6 shrink-0`}
            style={{ color: 'rgb(0,175,154)' }}
          >
            {savedTitle}
          </div>
        )}
        <div className="flex-1 min-h-0 flex flex-col">{s.content}</div>
      </div>
    ),
  };
}

/** Slide 16 (Q&A): wrap content absolute so it covers the full slide. */
function withFullBleedWrapper(s: SlideData): SlideData {
  if (s.id !== 16) return s;
  return {
    ...s,
    content: <div className="absolute inset-0">{s.content}</div>,
  };
}

const archMapSlides = archMap.map(withInlineTitle);
const funnelSlides = funnel.map(withInlineTitle);
const closeSlides = close.map(withFullBleedWrapper);

export const slides: SlideData[] = [
  titleSlide,            // 1. Title
  ...whatWeBuilt,        // 2. What we built (intro)
  ...hook,               // 3. Hook · 4. Cycle
  ...whyCi,              // 5. Why CI is the right first domain
  ...archMapSlides,      // 6. ArchMap (Full picture)
  ...playbookSlides,     // 7. Playbooks
  ...funnelSlides,       // 8. Main loop
  ...feedbackLoopSlides, // 9. Verification loop
  ...vsAlternatives,     // 10. vs. Devin / Claude routines
  ...naive,              // 11. Learning #1 — Specialized agents, not one big agent
  ...keyInsight,         // 12. Learning #2 — One custom tool, not a chain of MCP calls
  ...lessons,            // 13. Learning #3 — AutoResearch
  ...results,            // 14. Results
  ...closeSlides,        // 15. Q&A
];
