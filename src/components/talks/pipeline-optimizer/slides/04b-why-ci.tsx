'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { SlideData } from './_types';
import { useSlideActs } from '../slide-acts-context';
import { sans } from '@/lib/fonts';

// ── Slide — Why CI is the right first domain ─────────────────────────────────
const ciProperties = [
  {
    icon: '🛡',
    title: 'Bounded blast radius',
    detail: 'Wrong fix breaks CI immediately, visibly, reversibly. Nothing downstream burns.',
  },
  {
    icon: '✅',
    title: 'Machine-verifiable',
    detail: 'Did it work? CI pass or fail. Build logs are ground truth — no ambiguity.',
  },
  {
    icon: '🔀',
    title: 'Human checkpoint',
    detail: 'Agent opens PRs. A human reviews and merges. The agent cannot merge its own work.',
  },
];

function WhyCISlide() {
  const { act } = useSlideActs();

  const fadeIn = (atAct: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: act >= atAct ? 1 : 0, y: act >= atAct ? 0 : 8 },
    transition: { duration: 0.35, ease: 'easeOut' as const },
  });

  return (
    <div className="flex flex-col h-full w-full gap-8">
      <div className="grid grid-cols-3 gap-5 flex-1">
        {ciProperties.map((p, i) => (
          <motion.div
            key={p.title}
            {...fadeIn(i + 1)}
            className="border border-white/15 rounded-lg p-6 flex flex-col gap-3"
          >
            <div className="text-3xl">{p.icon}</div>
            <div className={`${sans.className} text-xl text-white font-semibold leading-tight`}>
              {p.title}
            </div>
            <div className={`${sans.className} text-sm text-white/60`}>{p.detail}</div>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeIn(4)} className="flex flex-col gap-2">
        <div className="font-mono text-xs text-white/35 uppercase tracking-widest">
          this is the trust architecture
        </div>
        <div className={`${sans.className} text-lg italic text-white/70`}>
          Trust isn&apos;t &ldquo;it will never be wrong.&rdquo; It&apos;s &ldquo;the failure modes
          are visible, bounded, and recoverable.&rdquo;
        </div>
      </motion.div>
    </div>
  );
}

const slides: SlideData[] = [
  {
    id: 9,
    title: 'Why CI is the right first domain',
    acts: 5,
    content: <WhyCISlide />,
    notes:
      "There's a reason we started with CI optimization rather than automated code refactoring or infra changes. CI optimization has three properties that make autonomous operation unusually safe. One: the blast radius is bounded. If the optimizer produces a wrong fix, CI breaks immediately. Someone looks at the PR, reverts it, and nothing else is affected. Two: the outcome is machine-verifiable. Does CI pass? Yes or no. There's no ambiguity about whether the optimization worked. The build logs are ground truth. Three: the output is always a pull request, and a human reviews that PR before it merges. The agent cannot merge its own work. Put those three together and you have a domain where you can build trust incrementally — start with high scrutiny, lower it as the track record grows. That architecture is deliberate. It's not just a safety feature. It's how you get from 'this is interesting' to 'I trust this enough to merge without reviewing every line.'",
  },
];

export default slides;
