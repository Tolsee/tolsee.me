'use client';

import { motion } from 'framer-motion';

const PURPLE = '#a78bfa';

type MotionOption = 'still' | 'draw' | 'arrival';

function ArrowStudy({ option }: { option: MotionOption }) {
  const path = 'M 6 24 H 100';
  const arrowhead = 'M 90 16 L 100 24 L 90 32';

  return (
    <svg aria-hidden className="my-8 h-12 w-full overflow-visible" viewBox="0 0 106 48" fill="none">
      {option === 'draw' ? (
        <motion.path
          d={path}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.65 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          stroke={PURPLE}
          strokeWidth="1.5"
        />
      ) : (
        <path d={path} stroke={PURPLE} strokeWidth="1.5" opacity="0.65" />
      )}
      <path d={arrowhead} stroke={PURPLE} strokeWidth="1.5" opacity="0.65" />
      {option === 'arrival' && (
        <motion.circle
          cx="100"
          cy="24"
          r="2"
          fill={PURPLE}
          initial={{ opacity: 0, r: 2 }}
          animate={{ opacity: [0, 0.9, 0], r: [2, 6, 10] }}
          transition={{ delay: 0.25, duration: 0.7, ease: 'easeOut' }}
        />
      )}
    </svg>
  );
}

const options: Array<{ option: MotionOption; title: string; description: string }> = [
  {
    option: 'still',
    title: 'Still',
    description: 'Cards reveal. The connector is already there.',
  },
  {
    option: 'draw',
    title: 'Draw once',
    description: 'The connector traces in when that step is introduced, then rests.',
  },
  {
    option: 'arrival',
    title: 'Arrival cue',
    description: 'A single, soft pulse marks the destination. No looping motion.',
  },
];

export function MotionStudy() {
  return (
    <main className="min-h-screen bg-[#111315] px-8 py-12 text-white md:px-16 md:py-16">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00af9a]">Interaction study · knowledge flow</p>
      <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight md:text-6xl">Three quieter arrow treatments.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/55">All keep the branching connector static. These only test what happens when a new path is introduced.</p>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {options.map(({ option, title, description }) => (
          <article key={option} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-[#a78bfa]">{option}</p>
            <h2 className="mt-4 text-2xl font-bold">{title}</h2>
            <ArrowStudy option={option} />
            <p className="text-base leading-relaxed text-white/55">{description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
