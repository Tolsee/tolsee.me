'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { sans } from '@/lib/fonts';

export interface SlideProps {
  title?: string | null;
  /** Speaker notes — read by <Deck> to render the side-panel overlay; not rendered inline. */
  notes?: string;
  /** When true, removes the default p-4 padding so content can bleed to the slide edges. */
  fullBleed?: boolean;
  children?: React.ReactNode;
}

export function Slide({ title, children, fullBleed }: SlideProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`absolute inset-0 flex flex-col ${fullBleed ? '' : 'px-12 pt-14 pb-8'} ${sans.className}`}
      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -8 }}
      transition={{ duration: reduced ? 0.1 : 0.25, ease: 'easeOut' }}
    >
      {title && (
        <div
          className={`${sans.className} text-lg uppercase tracking-widest mb-4`}
          style={{ color: 'rgb(0,175,154)' }}
        >
          {title}
        </div>
      )}
      <div className="flex-1 flex flex-col justify-center">
        {children}
      </div>
    </motion.div>
  );
}
