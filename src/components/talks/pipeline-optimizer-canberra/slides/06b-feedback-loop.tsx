'use client';

// Slide — Verification Loop: GitHub PR conversation timeline.
// Progressive reveal via useSlideActs(), 9 acts (0-8).
// Story: agent PR fails CI → agent self-corrects → CI passes → cursor[bot] code review → agent resolves → agent verification → merged.
// Sanitized: no internal repo names, no real handles, no real bot account names.

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, GitMerge, GitCommit, Loader2 } from 'lucide-react';
import type { SlideData } from './_types';
import { useSlideActs } from '../slide-acts-context';
import { sans } from '@/lib/fonts';

// ── Brand ────────────────────────────────────────────────────────────────────
const SLIDE_BG    = '#1c1e26'; // slide content background — used to mask timeline line
const TEAL        = 'rgb(0,175,154)';
const TEAL_BG     = 'rgba(0,175,154,0.10)';
const TEAL_BORDER = 'rgba(0,175,154,0.40)';
const PINK        = 'rgb(255,167,196)';
const PINK_BORDER = 'rgba(255,167,196,0.40)';
const BLUE        = 'rgb(88,166,255)';
const BLUE_BORDER = 'rgba(88,166,255,0.35)';
const PURPLE      = 'rgb(163,113,247)';
const PURPLE_BG   = 'rgba(163,113,247,0.10)';
const PURPLE_BDR  = 'rgba(163,113,247,0.35)';
const CARD_BG     = '#161b22';
const EDGE        = '#30363d';
const TEXT        = 'rgba(255,255,255,0.88)';
const MUTED       = 'rgba(255,255,255,0.45)';
const GHOST       = 'rgba(255,255,255,0.22)';

// ── Animation helpers ────────────────────────────────────────────────────────
const ENTER = {
  initial: { opacity: 0, y: 7 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, transition: { duration: 0.12 } },
  transition: { duration: 0.32, ease: 'easeOut' as const },
};

// ── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({
  initials,
  color = TEAL,
  size = 24,
}: {
  initials: string;
  color?: string;
  size?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color.replace('rgb', 'rgba').replace(')', ', 0.14)'),
        border: `1.5px solid ${color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Math.round(size * 0.37),
        fontFamily: 'monospace',
        color,
        fontWeight: 700,
        flexShrink: 0,
        lineHeight: 1,
        position: 'relative',
        zIndex: 1,
        boxShadow: `0 0 0 3px ${SLIDE_BG}`,
      }}
    >
      {initials}
    </div>
  );
}

// ── PR Header Card ────────────────────────────────────────────────────────────
function PRHeaderCard() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
      <Avatar initials="PO" color={TEAL} size={24} />
      <div
        style={{
          flex: 1,
          background: CARD_BG,
          border: `1px solid ${EDGE}`,
          borderLeft: `3px solid ${TEAL_BORDER}`,
          borderRadius: '0 8px 8px 0',
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
          minWidth: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 11, color: MUTED }}>
            pipeline-optimizer-agent[bot]
          </span>
          <span style={{ fontSize: 11, color: GHOST }}>opened this pull request</span>
          <span
            style={{
              marginLeft: 'auto',
              background: TEAL_BG,
              border: `1px solid ${TEAL_BORDER}`,
              borderRadius: 12,
              padding: '2px 9px',
              fontSize: 11,
              fontFamily: 'monospace',
              color: TEAL,
              fontWeight: 600,
            }}
          >
            Open
          </span>
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, lineHeight: 1.35 }}>
          Enable cache plugin on build pipeline
        </div>

        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 10.5,
            color: MUTED,
            lineHeight: 1.55,
            borderTop: `1px solid ${EDGE}`,
            paddingTop: 7,
          }}
        >
          Applies <span style={{ color: TEXT }}>cache-buildkite-plugin</span> to the unit-test step in{' '}
          <span style={{ color: TEXT }}>.buildkite/pipeline.yml</span>.
          &nbsp;Estimated savings: 30–60s per warm cache hit.
          <br />
          <span style={{ color: GHOST }}>Co-authored-by: Claude Sonnet &lt;noreply@anthropic.com&gt;</span>
        </div>
      </div>
    </div>
  );
}

// ── CI Status Row ──────────────────────────────────────────────────────────────
type CIStatus = 'running' | 'success' | 'failure';

function CIRow({
  status,
  runLabel,
  duration,
}: {
  status: CIStatus;
  runLabel: string;
  duration?: string;
}) {
  const isRunning = status === 'running';
  const isSuccess = status === 'success';
  const accentColor = isRunning ? GHOST : isSuccess ? TEAL : PINK;
  const leftBorder = isRunning
    ? `1px solid ${EDGE}`
    : isSuccess
    ? `1px solid ${EDGE}`
    : `3px solid ${PINK_BORDER}`;

  return (
    <div
      style={{
        background: CARD_BG,
        border: `1px solid ${EDGE}`,
        borderLeft: leftBorder,
        borderRadius: 6,
        padding: '9px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginLeft: 34,
      }}
    >
      {isRunning ? (
        <Loader2
          size={13}
          color={GHOST}
          strokeWidth={2}
          className="animate-spin"
          style={{ flexShrink: 0 }}
        />
      ) : isSuccess ? (
        <Check size={13} color={TEAL} strokeWidth={2.5} style={{ flexShrink: 0 }} />
      ) : (
        <X size={13} color={PINK} strokeWidth={2.5} style={{ flexShrink: 0 }} />
      )}

      <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: MUTED }}>buildkite</span>
      <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: TEXT }}>{runLabel}</span>

      {duration && (
        <span style={{ fontFamily: 'monospace', fontSize: 10, color: accentColor }}>
          · {duration}
        </span>
      )}

      <span
        style={{
          marginLeft: 'auto',
          fontFamily: 'monospace',
          fontSize: 10,
          color: accentColor,
          opacity: isRunning ? 0.5 : 1,
        }}
      >
        {isRunning ? 'In progress…' : 'Details'}
      </span>
    </div>
  );
}

// ── Comment Card ──────────────────────────────────────────────────────────────
function CommentCard({
  initials,
  handle,
  timestamp,
  leftBorderColor = GHOST,
  avatarColor = TEAL,
  resolved = false,
  badge,
  children,
}: {
  initials: string;
  handle: string;
  timestamp: string;
  leftBorderColor?: string;
  avatarColor?: string;
  resolved?: boolean;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <Avatar initials={initials} color={avatarColor} size={24} />
      <div
        style={{
          flex: 1,
          background: CARD_BG,
          border: `1px solid ${EDGE}`,
          borderLeft: `3px solid ${resolved ? TEAL_BORDER : leftBorderColor}`,
          borderRadius: '0 6px 6px 0',
          padding: '11px 15px',
          minWidth: 0,
          opacity: resolved ? 0.65 : 1,
          transition: 'opacity 0.3s ease, border-left-color 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', gap: 7, alignItems: 'center', marginBottom: 5 }}>
          <span style={{ fontFamily: 'monospace', fontSize: 11, color: TEXT, fontWeight: 600 }}>
            {handle}
          </span>
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: GHOST }}>
            {timestamp}
          </span>
          {resolved && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 3,
                background: TEAL_BG,
                border: `1px solid ${TEAL_BORDER}`,
                borderRadius: 10,
                padding: '1px 6px',
                fontSize: 9,
                color: TEAL,
                fontWeight: 600,
                marginLeft: 2,
              }}
            >
              <Check size={7} strokeWidth={3} />
              Resolved
            </span>
          )}
          {badge && !resolved && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 3,
                background: TEAL_BG,
                border: `1px solid ${TEAL_BORDER}`,
                borderRadius: 10,
                padding: '1px 6px',
                fontSize: 9,
                color: TEAL,
                fontWeight: 600,
                marginLeft: 2,
              }}
            >
              <Check size={7} strokeWidth={3} />
              {badge}
            </span>
          )}
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: TEXT, lineHeight: 1.6 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Commit Push Row ───────────────────────────────────────────────────────────
function CommitPushRow({ hash, message }: { hash: string; message: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'monospace',
        fontSize: 10,
        color: GHOST,
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          borderRadius: '50%',
          background: SLIDE_BG,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <GitCommit size={18} color={GHOST} />
      </div>
      <span>pipeline-optimizer-agent[bot]</span>
      <span style={{ color: MUTED }}>pushed</span>
      <span
        style={{
          color: TEAL,
          background: TEAL_BG,
          border: `1px solid ${TEAL_BORDER}`,
          padding: '1px 5px',
          borderRadius: 3,
          fontWeight: 600,
        }}
      >
        {hash}
      </span>
      <span style={{ color: MUTED }}>·</span>
      <span style={{ color: TEXT }}>{message}</span>
    </div>
  );
}

// ── Merge Badge ───────────────────────────────────────────────────────────────
function MergeBadge() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        paddingLeft: 2,
      }}
    >
      {/* Purple merge icon circle */}
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: SLIDE_BG,
          border: `1.5px solid ${PURPLE_BDR}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
          zIndex: 1,
          boxShadow: `0 0 0 3px ${SLIDE_BG}`,
        }}
      >
        <GitMerge size={12} color={PURPLE} strokeWidth={2.2} />
      </div>

      {/* Inline sentence */}
      <span style={{ fontFamily: 'monospace', fontSize: 11, color: MUTED, lineHeight: 1.4 }}>
        <span style={{ color: TEXT, fontWeight: 600 }}>John Doe</span>
        {' '}merged commit{' '}
        <span
          style={{
            color: PURPLE,
            background: PURPLE_BG,
            border: `1px solid ${PURPLE_BDR}`,
            padding: '1px 5px',
            borderRadius: 3,
            fontWeight: 700,
          }}
        >
          abc1234
        </span>
        {' '}into{' '}
        <span
          style={{
            color: MUTED,
            background: 'rgba(255,255,255,0.06)',
            border: `1px solid ${EDGE}`,
            padding: '1px 6px',
            borderRadius: 3,
          }}
        >
          main
        </span>
      </span>
    </div>
  );
}

// ── Main Slide Component ──────────────────────────────────────────────────────
function FeedbackLoopSlide() {
  const { act } = useSlideActs();

  // Build #2139: running at act 1, fails at act 2+
  const build1Status: CIStatus = act >= 2 ? 'failure' : 'running';
  // Build #2145: running at act 3, passes at act 4+
  const build2Status: CIStatus = act >= 4 ? 'success' : 'running';

  return (
    // Scroll container — full slide height, zoom applied here
    <div
      className={sans.className}
      style={{
        height: '100%',
        overflowY: 'auto',
        paddingRight: 2,
        zoom: 1.05,
      }}
    >
      {/* Inner flex column — height shrinks to content so spine ends at last card */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {/* Timeline spine — z-index 0 so avatars (z-index 1) render on top */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            bottom: 12,
            left: 11.5,
            width: 1,
            background: EDGE,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

      <AnimatePresence initial={false}>

        {/* Act 0 — PR Header */}
        {act >= 0 && (
          <motion.div key="pr-header" {...ENTER}>
            <PRHeaderCard />
          </motion.div>
        )}

        {/* Act 1 — Build #2139 starts running */}
        {act >= 1 && (
          <motion.div key="ci-build-1" {...ENTER}>
            <CIRow
              status={build1Status}
              runLabel="build #2139 · unit-tests"
              duration={act >= 2 ? '32s' : undefined}
            />
          </motion.div>
        )}

        {/* Act 2 — Build #2139 FAILS + agent pushes fix */}
        {act >= 2 && (
          <motion.div key="agent-fix-1" {...ENTER}>
            <CommitPushRow
              hash="e2f8a1c"
              message="fix: correct yaml indentation in cache step"
            />
          </motion.div>
        )}

        {/* Act 3 — Build #2145 starts running */}
        {act >= 3 && (
          <motion.div key="ci-build-2" {...ENTER}>
            <CIRow
              status={build2Status}
              runLabel="build #2145 · unit-tests"
              duration={act >= 4 ? '87s' : undefined}
            />
          </motion.div>
        )}

        {/* Act 5 — cursor[bot] review comment */}
        {act >= 5 && (
          <motion.div key="cursor-comment" {...ENTER}>
            <CommentCard
              initials="C"
              handle="cursor[bot]"
              timestamp="T+9 min"
              leftBorderColor={BLUE_BORDER}
              avatarColor={BLUE}
              resolved={act >= 6}
            >
              <span style={{ color: MUTED }}>Suggested change —</span>
              <br />
              Cache key is missing the lockfile hash. You&apos;ll get false cache hits
              when dependencies change between runs.
              <br />
              <span style={{ color: GHOST, fontSize: 10 }}>
                Consider:{' '}
                <span style={{ color: BLUE }}>
                  {'{{ runner.os }}-{{ hashFiles(\'**/yarn.lock\') }}'}
                </span>
              </span>
            </CommentCard>
          </motion.div>
        )}

        {/* Act 6 — Agent commits fix + resolves cursor[bot] thread */}
        {act >= 6 && (
          <motion.div key="agent-fix-2" {...ENTER}>
            <CommitPushRow
              hash="abc1234"
              message="fix: add lockfile hash to cache key"
            />
          </motion.div>
        )}

        {act >= 6 && (
          <motion.div key="agent-resolve" {...ENTER} transition={{ ...ENTER.transition, delay: 0.12 }}>
            <CommentCard
              initials="PO"
              handle="pipeline-optimizer-agent[bot]"
              timestamp="T+10 min"
              leftBorderColor={TEAL}
              avatarColor={TEAL}
            >
              Fixed in commit{' '}
              <span
                style={{
                  color: TEAL,
                  background: TEAL_BG,
                  padding: '1px 4px',
                  borderRadius: 3,
                  fontWeight: 600,
                }}
              >
                abc1234
              </span>
              . Resolved.{' '}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 3,
                  background: TEAL_BG,
                  border: `1px solid ${TEAL_BORDER}`,
                  borderRadius: 10,
                  padding: '1px 6px',
                  fontSize: 9.5,
                  color: TEAL,
                  fontWeight: 600,
                  verticalAlign: 'middle',
                }}
              >
                <Check size={8} strokeWidth={3} />
                Resolved
              </span>
            </CommentCard>
          </motion.div>
        )}

        {/* Act 7 — Agent verification comment */}
        {act >= 7 && (
          <motion.div key="agent-verify" {...ENTER}>
            <CommentCard
              initials="PO"
              handle="pipeline-optimizer-agent[bot]"
              timestamp="T+8 min"
              leftBorderColor={TEAL}
              avatarColor={TEAL}
              badge="Verified"
            >
              I verified this works. Build{' '}
              <span style={{ color: TEAL, fontWeight: 600 }}>#2145</span>{' '}
              passed in 87s — no regressions, cache hit confirmed.
            </CommentCard>
          </motion.div>
        )}

        {/* Act 8 — Merge badge + punchline */}
        {act >= 8 && (
          <motion.div key="merge-badge" {...ENTER}>
            <MergeBadge />
          </motion.div>
        )}

        {act >= 8 && (
          <motion.div key="punchline" {...ENTER} transition={{ ...ENTER.transition, delay: 0.18 }}>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: 10.5,
                color: GHOST,
                fontStyle: 'italic',
                paddingLeft: 34,
                lineHeight: 1.5,
              }}
            >
              CI failed.{' '}
              <span style={{ color: MUTED }}>Agent fixed it.</span>
              {'  '}cursor[bot] flagged.{' '}
              <span style={{ color: MUTED }}>Agent fixed that too.</span>
              {'  '}The loop closed without you.
            </div>
          </motion.div>
        )}

      </AnimatePresence>
      </div>{/* end inner flex column */}
    </div>
  );
}

// ── Slide export ──────────────────────────────────────────────────────────────
const feedbackLoopSlides: SlideData[] = [
  {
    id: 20,
    title: 'The verification loop',
    acts: 9,
    content: <FeedbackLoopSlide />,
    notes:
      "This is a sanitized real PR from the pipeline-optimizer system. The agent opens the PR. CI fires — build #2139. It fails.\n\nThe agent reads its own CI failure, identifies the issue — a YAML indentation error in the cache step — pushes a fix commit, and CI fires again. Build #2145 passes.\n\nThen cursor[bot] posts a code review comment. Not a human. Another bot. It catches something the pipeline-optimizer missed in the implementation: the cache key doesn't include the lockfile hash. False cache hits when dependencies change.\n\nThe pipeline-optimizer reads the comment, pushes a second fix — abc1234 — and resolves the thread itself. No human mediation. No Slack message.\n\nMerged.\n\nTwo verification cycles. Both closed by the agent. That's the loop. And the critical point: neither cycle required a human. The agent caught its own CI failure. An AI reviewer caught a correctness bug. The agent resolved it. You're watching the trust threshold play out in real time — the system didn't ship broken code, but it also didn't need you to tell it that.",
  },
];

export default feedbackLoopSlides;
