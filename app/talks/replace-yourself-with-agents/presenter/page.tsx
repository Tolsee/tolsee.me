'use client';

/**
 * Presenter view for "Replace Yourself with Agents"
 *
 * Open this route in a second window (/talks/replace-yourself-with-agents/presenter).
 * It syncs slide position bidirectionally with the audience window via
 * BroadcastChannel('pipeline-optimizer-talk-sync').
 *
 * Layout:
 *   Header: PRESENTER label | slide counter | elapsed timer
 *   Body:   left 30% = current slide thumbnail + next preview
 *           right 70% = speaker notes (large, scrollable)
 *   Footer: keyboard hint
 */

import { useEffect, useRef, useState } from 'react';
import { Slide } from '@/components/talks/pipeline-optimizer/slide';
import { slides } from '@/components/talks/pipeline-optimizer/slides-data';
import { sans } from '@/lib/fonts';

const CHANNEL = 'pipeline-optimizer-talk-sync';
const TOTAL = slides.length;
/** Native slide dimensions (matches <Deck> frame) */
const SLIDE_W = 1280;
const SLIDE_H = 720;

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// ─── Slide thumbnail ─────────────────────────────────────────────────────────

interface ThumbnailProps {
  index: number;
  /** Rendered pixel width — height is derived from 16:9 aspect ratio */
  width: number;
}

function SlideThumbnail({ index, width }: ThumbnailProps) {
  const scale = width / SLIDE_W;
  const height = Math.round(SLIDE_H * scale);
  const slide = slides[index];

  return (
    <div
      style={{ width, height, flexShrink: 0 }}
      className="relative overflow-hidden rounded-lg bg-[#1c1e26] border border-white/10"
    >
      {slide ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: SLIDE_W,
            height: SLIDE_H,
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {/* <Slide> uses absolute inset-0, so needs a relative-positioned parent */}
          <div className="relative w-full h-full">
            <Slide title={slide.title}>{slide.content}</Slide>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-mono text-xs text-white/25">End</span>
        </div>
      )}
    </div>
  );
}

// ─── Presenter page ───────────────────────────────────────────────────────────

export default function PresenterPage() {
  const [current, setCurrent] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  // BroadcastChannel state — isRemoteUpdate prevents echo loops when the
  // audience window pushes a nav and we shouldn't broadcast it back.
  const channelRef = useRef<BroadcastChannel | null>(null);
  const isRemoteUpdate = useRef(false);

  // Thumbnail width — measured from the left-column container
  const thumbContainerRef = useRef<HTMLDivElement>(null);
  const [thumbWidth, setThumbWidth] = useState(400);

  const activeSlide = slides[current];
  const nextSlide = slides[current + 1];

  // Elapsed timer — auto-starts on mount
  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Measure left column for responsive thumbnail width
  useEffect(() => {
    const el = thumbContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setThumbWidth(Math.round(w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // BroadcastChannel — bidirectional sync with audience window
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const ch = new BroadcastChannel(CHANNEL);
    channelRef.current = ch;
    ch.onmessage = (e: MessageEvent) => {
      const { type, index } = (e.data ?? {}) as { type?: string; index?: number };
      if (type === 'nav' && typeof index === 'number') {
        isRemoteUpdate.current = true;
        setCurrent(Math.min(Math.max(index, 0), TOTAL - 1));
      }
    };
    // Ask audience window for its current position
    ch.postMessage({ type: 'sync_request' });
    return () => ch.close();
  }, []);

  // Broadcast local navigation to audience window
  useEffect(() => {
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      return;
    }
    channelRef.current?.postMessage({ type: 'nav', index: current });
  }, [current]);

  // Keyboard navigation — mirrors deck.tsx bindings
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          setCurrent((c) => Math.min(c + 1, TOTAL - 1));
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          setCurrent((c) => Math.max(c - 1, 0));
          break;
        case 'Escape':
          e.preventDefault();
          setCurrent(0);
          break;
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div
      className={`w-full h-full flex flex-col bg-[#0d0f14] text-white overflow-hidden ${sans.className}`}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 shrink-0">
        <span className="font-mono text-xs text-white/35 uppercase tracking-wider">
          Presenter
        </span>
        <span className="font-mono text-sm text-white/55">
          {current + 1}
          <span className="text-white/25"> / {TOTAL}</span>
        </span>
        <span className="font-mono text-2xl font-bold tabular-nums text-white/80">
          {formatTime(elapsed)}
        </span>
      </div>

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0">
        {/* Left column — current + next thumbnails (30%) */}
        <div className="flex flex-col shrink-0 w-[30%] border-r border-white/10 overflow-y-auto">
          {/* Inner div measured for thumbnail width */}
          <div ref={thumbContainerRef} className="flex flex-col gap-5 p-5">
            {/* Current slide */}
            <div>
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-2 truncate">
                Current{activeSlide?.title ? ` — ${activeSlide.title}` : ''}
              </p>
              <SlideThumbnail key={`curr-${current}`} index={current} width={thumbWidth} />
            </div>

            {/* Next slide */}
            {nextSlide && (
              <div>
                <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest mb-2 truncate">
                  Next{nextSlide.title ? ` — ${nextSlide.title}` : ''}
                </p>
                <SlideThumbnail
                  key={`next-${current}`}
                  index={current + 1}
                  width={Math.round(thumbWidth * 0.6)}
                />
              </div>
            )}

            {!nextSlide && current === TOTAL - 1 && (
              <p className="font-mono text-xs text-white/20 italic">Last slide</p>
            )}
          </div>
        </div>

        {/* Right column — speaker notes (70%) */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto p-8">
          <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-6 shrink-0">
            Speaker notes
          </p>
          {activeSlide?.notes ? (
            <p className="text-xl leading-relaxed text-white/88 whitespace-pre-wrap">
              {activeSlide.notes}
            </p>
          ) : (
            <p className="text-lg italic text-white/25">No notes for this slide.</p>
          )}
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <div className="flex items-center px-6 py-3 border-t border-white/10 shrink-0">
        <span className="font-mono text-[10px] text-white/20">
          ← → Space &nbsp;navigate &nbsp;·&nbsp; Esc &nbsp;restart
        </span>
      </div>
    </div>
  );
}
