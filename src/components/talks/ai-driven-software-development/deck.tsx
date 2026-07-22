'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { sans } from '@/lib/fonts';

export interface TalkSlide {
  id: string;
  content: ReactNode;
  notes?: string;
}

function clamp(value: number, max: number) {
  return Math.min(Math.max(value, 0), max - 1);
}

function slideFromHash() {
  const match = window.location.hash.match(/^#(\d+)$/);
  return match ? Number.parseInt(match[1], 10) - 1 : null;
}

export function TalkDeck({ slides }: { slides: TalkSlide[] }) {
  const [current, setCurrent] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const currentRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const active = slides[current];

  useEffect(() => {
    const fromHash = slideFromHash();
    if (fromHash !== null) setCurrent(clamp(fromHash, slides.length));
  }, [slides.length]);

  useEffect(() => {
    currentRef.current = current;
    const url = new URL(window.location.href);
    url.hash = String(current + 1);
    window.history.replaceState(null, '', url.toString());
  }, [current]);

  useEffect(() => {
    const handlePopState = () => {
      const fromHash = slideFromHash();
      if (fromHash !== null) setCurrent(clamp(fromHash, slides.length));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [slides.length]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowHint(false), 4000);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          event.preventDefault();
          setCurrent((index) => clamp(index + 1, slides.length));
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          setCurrent((index) => clamp(index - 1, slides.length));
          break;
        case 'Escape':
          event.preventDefault();
          if (showNotes) setShowNotes(false);
          else setCurrent(0);
          break;
        case 'n':
        case 'N':
          if (active.notes) {
            event.preventDefault();
            setShowNotes((value) => !value);
          }
          break;
        case 'f':
        case 'F':
          event.preventDefault();
          if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
          else containerRef.current?.requestFullscreen().catch(() => {});
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active.notes, showNotes, slides.length]);

  return (
    <main ref={containerRef} className="fixed inset-0 flex items-center justify-center bg-[#282c35] px-5 py-4 md:px-12 md:py-8">
      <div className="relative aspect-video max-h-full w-full overflow-hidden bg-[#1c1e26] shadow-2xl">
        <div className={`absolute inset-0 transition-all duration-200 ${showNotes && active.notes ? 'right-[35%]' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="absolute inset-0"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
              transition={{ duration: reducedMotion ? 0.1 : 0.28, ease: 'easeOut' }}
            >
              {active.content}
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute bottom-3 right-4 z-20 font-mono text-xs text-white/35 md:text-sm">
            {current + 1} / {slides.length}
            {active.notes && <span className="ml-2 opacity-60">· n ·</span>}
          </div>
          <div className={`pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-white/30 transition-opacity duration-700 md:text-xs ${showHint ? 'opacity-100' : 'opacity-0'}`}>
            ← → navigate&nbsp;&nbsp;·&nbsp;&nbsp;N notes&nbsp;&nbsp;·&nbsp;&nbsp;F fullscreen
          </div>
        </div>

        <AnimatePresence>
          {showNotes && active.notes && (
            <motion.aside
              aria-label="Speaker notes"
              className={`absolute inset-y-0 right-0 w-[35%] overflow-y-auto border-l border-white/10 bg-[#171a21] p-7 md:p-10 ${sans.className}`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: reducedMotion ? 0 : 0.18 }}
            >
              <p className="mb-5 font-mono text-xs uppercase tracking-wider text-white/35">Speaker notes</p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/85 md:text-base">{active.notes}</p>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
