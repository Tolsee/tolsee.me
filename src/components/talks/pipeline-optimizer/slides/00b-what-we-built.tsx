'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, GitPullRequest } from 'lucide-react';
import { sans } from '@/lib/fonts';
import { useSlideActs } from '../slide-acts-context';
import type { SlideData } from './_types';

function WhatWeBuilt() {
  const { act } = useSlideActs();

  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center gap-8">
      {/* Bot icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: act >= 1 ? 1 : 0, scale: act >= 1 ? 1 : 0.75 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="flex items-center justify-center w-20 h-20 rounded-2xl border"
        style={{
          borderColor: 'rgba(0,175,154,0.4)',
          backgroundColor: 'rgba(0,175,154,0.08)',
          color: 'rgb(0,175,154)',
        }}
      >
        <Bot size={40} strokeWidth={1.5} />
      </motion.div>

      {/* One-sentence descriptor */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: act >= 1 ? 1 : 0, y: act >= 1 ? 0 : 12 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}
        className={`${sans.className} text-3xl md:text-4xl font-semibold text-white leading-snug max-w-2xl`}
      >
        An agent that monitors our CI pipelines, spots inefficiencies, and ships PRs to fix them.
      </motion.p>

      {/* Output chip — → PRs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: act >= 1 ? 1 : 0, y: act >= 1 ? 0 : 8 }}
        transition={{ duration: 0.38, ease: 'easeOut', delay: 0.25 }}
        className="flex items-center gap-2 border rounded-full px-4 py-2"
        style={{
          borderColor: 'rgba(0,175,154,0.35)',
          backgroundColor: 'rgba(0,175,154,0.07)',
        }}
      >
        <span
          className={`${sans.className} text-sm font-mono tracking-wide`}
          style={{ color: 'rgba(0,175,154,0.8)' }}
        >
          output
        </span>
        <span className="text-white/30 text-xs">→</span>
        <GitPullRequest size={15} style={{ color: 'rgb(0,175,154)' }} strokeWidth={1.8} />
        <span
          className={`${sans.className} text-sm font-semibold`}
          style={{ color: 'rgb(0,175,154)' }}
        >
          PRs
        </span>
      </motion.div>
    </div>
  );
}

const whatWeBuiltSlide: SlideData[] = [
  {
    id: 18,
    title: 'What we built',
    acts: 2,
    content: <WhatWeBuilt />,
    notes:
      'One sentence landing before the results hit. Give the audience a concrete mental model: this is an autonomous agent — not a script, not a dashboard — that closes the loop end-to-end, from observing CI to raising the fix.',
  },
];

export default whatWeBuiltSlide;
