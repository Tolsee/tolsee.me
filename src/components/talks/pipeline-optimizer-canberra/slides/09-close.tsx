// porter-C: slides/09-close.md → slide 19
import React from 'react';
import type { SlideData } from './_types';
import { sans } from '@/lib/fonts';

const slides: SlideData[] = [
  // ── Slide 16 — Q&A ───────────────────────────────────────────────────────
  // TODO(slide-designer): Full-bleed, dot-grid background (static). Identical aesthetic to
  //   slide 01 — visual bookend. "Q&A" in same large mono as title card. Static, no animation.
  {
    id: 16,
    title: undefined,
    content: (
      <div className="flex flex-col items-center justify-center h-full w-full text-center">
        <h2 className={`${sans.className} text-7xl font-bold text-white mb-8`}>Q&amp;A</h2>
        <div className="font-mono text-sm text-white/40">
          <div>Tulsi Sapkota · @tolsee · tolsee.me</div>
        </div>
      </div>
    ),
    notes:
      "Stay on this slide for the entire Q&A. If there's a natural moment to close before Q&A begins: \"To answer the title directly: yes, it replaced a real category of work I used to do manually. The interesting question isn't 'did it work.' It's 'what do you do now that the agent does the thing you used to do?' And the honest answer is: you build the next agent. You hold the bar higher. You give it harder problems. The job doesn't go away — it moves up a level. That's what I want to leave you with.\"",
  },
];

export default slides;
