// porter-C: slides/06-demo.md → slide 13
import React from 'react';
import type { SlideData } from './_types';

// TODO(slide-designer): Decision needed — live demo, recorded, or 4-panel static walkthrough.
//   See 06-demo.md for all three options. Static fallback below.
// TODO(tulsi): Confirm demo format before the talk. Record or prepare 4-panel fallback.
interface JourneyTile {
  label: string;
  body: string;
}

const journeyTiles: JourneyTile[] = [
  {
    label: '① Pre-screen · Haiku',
    body: `→ violationPresent: true\n   reason: "No artifact cache configured\n            for the npm install step.\n            Median step duration: 3m 42s."`,
  },
  {
    label: '② Implementation diff',
    body: `+ - label: "Cache restore"\n+   plugins:\n+     cache#v1.4.0:\n+       key: "npm-{{ checksum \\"package-lock.json\\" }}"\n+       paths: [ "node_modules" ]`,
  },
  {
    label: '③ Reviewer · Haiku',
    body: `findings: []\npass: true\n\n→ No error-severity findings.\n  Pipeline proceeds to PR creation.`,
  },
  {
    label: '④ Resulting PR',
    body: `Title: "feat(ci): add npm cache to install step"\n\nEstimated saving: ~3m 30s per build\nVerification: CI logs should show "Cache hit"`,
  },
];

const slides: SlideData[] = [
  {
    id: 11,
    title: "End-to-end: one PR's journey",
    content: (
      <div className="grid grid-cols-2 gap-3 mt-2 text-sm h-full w-full">
        {journeyTiles.map(({ label, body }) => (
          <div key={label} className="border border-white/10 rounded p-3">
            <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">
              {label}
            </div>
            <pre className="font-mono text-xs text-white/75 whitespace-pre-wrap leading-relaxed">
              {body}
            </pre>
          </div>
        ))}
        <div className="col-span-2 mt-1">
          <p className="font-mono text-sm text-white/50 text-center">
            &ldquo;At no point in that sequence did I write anything.&rdquo;
          </p>
        </div>
      </div>
    ),
    notes:
      "Walk the audience through each stage as it runs. When the pre-screen outputs 'violationPresent: true,' say: 'That's the gate. This repo needs the fix. Sonnet gets called.' When the reviewer outputs its findings (or no findings), say: 'No blocking findings. The diff passes.' When the PR appears: 'That PR is now in the repo owner's inbox. I didn't write it. I didn't review it before it went out. The system reviewed it.' The key moment is the PR description — read the estimated saving line out loud, then: 'The agent computed that estimate from actual build log data, not from a formula. After the PR merges, a verification job checks whether those log patterns actually appear in the next CI run. Not we think it saved 3 minutes. We confirmed it saved 3 minutes.' Universal closing beat: 'At no point in that sequence did I write anything. I set up the playbook rule, I configured the service, and then I went to sleep. The funnel ran overnight. That's what the first slide was about.'",
  },
];

export default slides;
