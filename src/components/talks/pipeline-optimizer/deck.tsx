'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { sans } from '@/lib/fonts';
import { slides as slidesData } from '@/components/talks/pipeline-optimizer/slides-data';
import { SlideActsContext } from '@/components/talks/pipeline-optimizer/slide-acts-context';

const CHANNEL = 'pipeline-optimizer-talk-sync';

interface DeckProps {
  children: React.ReactElement | React.ReactElement[];
}

function clampIndex(n: number, total: number): number {
  return Math.min(Math.max(n, 0), total - 1);
}

function actsAt(index: number): number {
  return slidesData[index]?.acts ?? 1;
}

function parseHashIndex(): number | null {
  const match = window.location.hash.match(/^#(\d+)$/);
  return match ? parseInt(match[1], 10) - 1 : null;
}

export function Deck({ children }: DeckProps) {
  const slides = React.Children.toArray(children) as React.ReactElement[];
  const total = slides.length;

  const [current, setCurrent] = useState(0);
  const [currentAct, setCurrentAct] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [showNotes, setShowNotes] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Live refs — read inside the keyboard handler to avoid stale closures
  const currentRef = useRef(0);
  const currentActRef = useRef(0);
  // On back-nav across a slide boundary, land on the prior slide's last act
  const pendingActRef = useRef<number | null>(null);

  // BroadcastChannel — bidirectional sync with the presenter window
  const channelRef = useRef<BroadcastChannel | null>(null);
  const isRemoteNavUpdate = useRef(false);
  const isRemoteActUpdate = useRef(false);

  // Lift the active slide's notes prop into the side-panel overlay
  const activeNotes: string | undefined = (slides[current]?.props as { notes?: string })?.notes;
  const acts = actsAt(current);

  // Auto-close notes overlay when navigating to a slide without notes
  useEffect(() => {
    if (!activeNotes) setShowNotes(false);
  }, [activeNotes]);

  // Open BroadcastChannel once; handle nav / act / sync_request from the presenter
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const ch = new BroadcastChannel(CHANNEL);
    channelRef.current = ch;
    ch.onmessage = (e: MessageEvent) => {
      const { type, index, act } = (e.data ?? {}) as {
        type?: string;
        index?: number;
        act?: number;
      };
      if (type === 'nav' && typeof index === 'number') {
        isRemoteNavUpdate.current = true;
        setCurrent(clampIndex(index, total));
      } else if (type === 'act' && typeof act === 'number') {
        isRemoteActUpdate.current = true;
        setCurrentAct(act);
      } else if (type === 'sync_request') {
        ch.postMessage({ type: 'nav', index: currentRef.current });
      }
    };
    return () => ch.close();
  }, [total]);

  // On slide change: sync ref, broadcast (unless remote), then resolve the act
  useEffect(() => {
    currentRef.current = current;
    if (isRemoteNavUpdate.current) {
      isRemoteNavUpdate.current = false;
    } else {
      channelRef.current?.postMessage({ type: 'nav', index: current });
    }
    if (pendingActRef.current !== null) {
      setCurrentAct(pendingActRef.current);
      pendingActRef.current = null;
    } else {
      setCurrentAct(0);
    }
  }, [current]);

  // On act change: sync ref, broadcast (unless remote)
  useEffect(() => {
    currentActRef.current = currentAct;
    if (isRemoteActUpdate.current) {
      isRemoteActUpdate.current = false;
      return;
    }
    channelRef.current?.postMessage({ type: 'act', act: currentAct });
  }, [currentAct]);

  // Restore slide from URL hash on mount; the hash-sync effect below canonicalises #1
  useEffect(() => {
    const idx = parseHashIndex();
    if (idx !== null) setCurrent(clampIndex(idx, total));
  }, [total]);

  // Mirror the current slide to the URL hash (replaceState — back button steps slides)
  useEffect(() => {
    const url = new URL(window.location.href);
    url.hash = `${current + 1}`;
    window.history.replaceState(null, '', url.toString());
  }, [current]);

  // Browser back/forward hash navigation
  useEffect(() => {
    const handlePop = () => {
      const idx = parseHashIndex();
      if (idx !== null) setCurrent(clampIndex(idx, total));
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, [total]);

  // Fade nav hint after 4s
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': {
          e.preventDefault();
          // Advance act first; only move to next slide once all acts are exhausted
          const totalActs = actsAt(currentRef.current);
          if (currentActRef.current < totalActs - 1) {
            setCurrentAct((a) => a + 1);
          } else {
            setCurrent((c) => Math.min(c + 1, total - 1));
          }
          break;
        }
        case 'ArrowLeft':
        case 'ArrowUp': {
          e.preventDefault();
          if (currentActRef.current > 0) {
            setCurrentAct((a) => a - 1);
          } else if (currentRef.current > 0) {
            // Land on the prev slide's last act
            pendingActRef.current = actsAt(currentRef.current - 1) - 1;
            setCurrent((c) => Math.max(c - 1, 0));
          }
          break;
        }
        case 'Escape':
          e.preventDefault();
          if (showNotes) {
            setShowNotes(false);
          } else {
            setCurrent(0);
            setCurrentAct(0);
          }
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          // Silent no-op if active slide has no notes
          if (activeNotes) setShowNotes((v) => !v);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
          break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeNotes, showNotes, total]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#282c35] flex items-center justify-center px-12 py-8"
    >
      {/* 16:9 outer frame — letterboxes wider/narrower screens */}
      <div className="relative w-full aspect-video max-h-full bg-[#1c1e26] overflow-hidden">
        <div className="absolute inset-0 flex flex-row">
          {/* Slide column — shrinks to 65% when the notes panel is open */}
          <div
            className={`relative overflow-hidden h-full bg-[#1c1e26] transition-all duration-200 ease-out ${
              showNotes && activeNotes ? 'w-[65%]' : 'w-full'
            }`}
          >
            <SlideActsContext.Provider value={{ act: currentAct, totalActs: acts }}>
              <AnimatePresence mode="wait">
                {React.cloneElement(slides[current], { key: current })}
              </AnimatePresence>
            </SlideActsContext.Provider>

            {/* Slide counter — appends · n · when notes exist, · act/total when acts > 1 */}
            <div className="absolute bottom-3 right-4 font-mono text-sm text-white/40 select-none pointer-events-none z-30">
              {current + 1} / {total}
              {activeNotes && <span className="ml-2 opacity-60">· n ·</span>}
              {acts > 1 && (
                <span className="ml-2 opacity-60">· {currentAct + 1}/{acts}</span>
              )}
            </div>

            {/* Nav hint — fades out after 4s */}
            <div
              className={`absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-white/30 select-none pointer-events-none z-10 transition-opacity duration-700 whitespace-nowrap ${
                showHint ? 'opacity-100' : 'opacity-0'
              }`}
            >
              ← → navigate &nbsp;·&nbsp; Space &nbsp;·&nbsp; F fullscreen
            </div>
          </div>

          {/* Speaker notes side panel — fills the remaining 35% when active */}
          <AnimatePresence>
            {showNotes && activeNotes && (
              <motion.div
                role="region"
                aria-live="polite"
                aria-label="Speaker notes"
                className={`flex-1 h-full bg-[#1a1d25] border-l border-white/10 p-10 overflow-y-auto z-20 ${sans.className}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.15, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="font-mono text-xs text-white/40 uppercase tracking-wider mb-6">
                  Speaker notes
                </p>
                <p className="text-base leading-relaxed text-white/85 whitespace-pre-wrap">
                  {activeNotes}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
