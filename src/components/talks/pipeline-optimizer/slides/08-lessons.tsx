// porter-C: slides/08-lessons.md → slide Learning #3
// Gotchas (id 13) and Three Lessons (id 15) removed per deck restructure.
import React from 'react';
import { motion } from 'framer-motion';
import type { SlideData } from './_types';
import { useSlideActs } from '../slide-acts-context';
import { sans } from '@/lib/fonts';

// ── Slide — Learning #3: AutoResearch — the agent that debugs agents ──────────
const traceDots = Array.from({ length: 14 }, (_, i) => ({ wasted: i >= 10 }));

function AutoresearchSlide() {
  const { act } = useSlideActs();

  const fadeIn = (atAct: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: act >= atAct ? 1 : 0, y: act >= atAct ? 0 : 8 },
    transition: { duration: 0.35, ease: 'easeOut' as const },
  });

  return (
    <div className="flex flex-col h-full w-full gap-4">
      {/* Row 1 — implementation agent + trace dots */}
      <motion.div
        {...fadeIn(1)}
        className="border border-white/15 rounded-lg px-5 py-4 flex items-center gap-5"
      >
        <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest w-36 shrink-0">
          impl. agent run
        </div>
        <div className="flex gap-1.5 items-center flex-1">
          {traceDots.map((d, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor: d.wasted ? 'rgba(255,167,196,0.65)' : 'rgba(255,255,255,0.22)',
              }}
            />
          ))}
          <div className={`${sans.className} text-xs text-white/40 ml-3 shrink-0`}>
            200+ turns
          </div>
        </div>
        <div className="font-mono text-xs shrink-0" style={{ color: 'rgba(255,167,196,0.8)' }}>
          ~50% success
        </div>
      </motion.div>

      {/* Connector */}
      <motion.div {...fadeIn(2)} className="flex items-center gap-3 pl-5">
        <div className="w-px h-4 bg-white/20" />
        <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
          traces logged → autoresearch skill invoked
        </div>
      </motion.div>

      {/* Row 2 — autoresearch skill */}
      <motion.div
        {...fadeIn(2)}
        className="border rounded-lg px-5 py-4 flex items-center gap-5"
        style={{ borderColor: 'rgba(0,175,154,0.45)' }}
      >
        <div
          className="font-mono text-[11px] uppercase tracking-widest w-36 shrink-0"
          style={{ color: 'rgb(0,175,154)' }}
        >
          autoresearch
        </div>
        <div className={`${sans.className} text-sm text-white/60`}>
          reads turn-by-turn traces · finds repeated failures · proposes targeted fix
        </div>
      </motion.div>

      {/* Diagnosis + before/after card */}
      <motion.div {...fadeIn(3)} className="border border-white/10 rounded-lg px-5 py-4 ml-8">
        {/* Diagnosis chip */}
        <div className="font-mono text-[10px] text-white/35 uppercase tracking-widest mb-4">
          diagnosis: turn counts spiked above cap · sub-agents inheriting unbounded budgets
        </div>

        {/* Before / After columns */}
        <div className="flex gap-6">
          {/* Before */}
          <div className="flex-1">
            <div className="font-mono text-[10px] text-white/30 mb-2">before</div>
            {/* Spiking bar chart */}
            <div className="flex gap-[3px] items-end h-9 mb-2">
              {[3, 4, 3, 5, 4, 7, 9, 13, 10, 14, 11, 13].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-sm shrink-0"
                  style={{
                    height: `${h * 2.4}px`,
                    backgroundColor:
                      h > 7 ? 'rgba(255,167,196,0.65)' : 'rgba(255,255,255,0.22)',
                  }}
                />
              ))}
            </div>
            <div className={`${sans.className} text-xs text-white/55 leading-relaxed`}>
              turn explosion per run<br />
              inconsistent re-runs · cost variance
            </div>
          </div>

          <div className="border-l border-white/10 pl-6 flex-1">
            <div className="font-mono text-[10px] mb-2" style={{ color: 'rgb(0,175,154)' }}>
              after fix
            </div>
            {/* Flat bar chart */}
            <div className="flex gap-[3px] items-end h-9 mb-2">
              {[4, 4, 3, 4, 4, 3, 4, 4, 3, 4, 4, 3].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-sm shrink-0"
                  style={{
                    height: `${h * 2.4}px`,
                    backgroundColor: 'rgba(0,175,154,0.5)',
                  }}
                />
              ))}
            </div>
            <div
              className="font-mono text-[11px] mb-1 px-2 py-1 rounded inline-block"
              style={{ background: 'rgba(0,175,154,0.12)', color: 'rgba(255,255,255,0.75)' }}
            >
              &quot;do not spawn sub-agents&quot;
            </div>
            <div className={`${sans.className} text-xs text-white/55 mt-1`}>
              turn variance collapsed
            </div>
          </div>
        </div>

        {/* Punchline */}
        <div
          className={`${sans.className} text-xs text-white/40 mt-4 pt-3 border-t border-white/10 italic`}
        >
          What&apos;s obvious to humans isn&apos;t obvious to agents. Spell it out.
        </div>
      </motion.div>

      {/* Loop closes */}
      <motion.div {...fadeIn(4)} className="flex flex-col gap-2 mt-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-white/35 text-base">↺</span>
          <div className="font-mono text-[10px] text-white/35 uppercase tracking-widest">
            loop closes — no human reviewed the traces
          </div>
        </div>
        <div className={`${sans.className} text-lg italic text-white/70`}>
          The system debugs itself.
        </div>
      </motion.div>
    </div>
  );
}

const slides: SlideData[] = [
  {
    id: 14,
    title: 'Learning #3: AutoResearch — the agent that debugs agents',
    acts: 5,
    content: <AutoresearchSlide />,
    notes:
      "Observability is what made this whole feedback loop possible. Each agent run produces a full turn-by-turn trace. We wired those through Datadog LLM Observability, so every agent decision is inspectable. Then I built a custom Claude Code skill — a SKILL.md file in the project — that, when invoked, reads those traces and proposes specific improvements. Claude Code skills are an off-the-shelf mechanism: define the skill file, reference it in your CLAUDE.md, invoke it with the Skill tool. One of the first things autoresearch caught: turn counts spiking well above the configured cap, inconsistently across re-runs of the same repo. Tracing showed why — the fix agent was spawning sub-agents when it encountered repos with multiple pipeline directories. Sub-agent turns aren't bounded by the parent's turn cap. The fix was a single line added to the agent's prompt: 'do not spawn sub-agents'. Turn variance collapsed immediately. What's interesting here is that no human would think to write that constraint. It's completely obvious if you're a human — of course you don't spin up children that bypass your budget. But the model doesn't know that. It sees parallel work as helpful. Only autoresearch catches this — it shows up in the trace shape, not in the output. The design principle: the system owns correctness, not the playbook text. If the same mistake recurs across runs and repos, that's a signal about the system's design — a missing constraint, a missing tool, a missing feedback mechanism.\n\nTransferable building blocks for the audience: Claude Agent SDK (off-the-shelf agentic execution loop) · MCP Model Context Protocol (open standard for agent tool surfaces) · Datadog LLM Observability or equivalent (LangSmith, Helicone) for agent trace inspection.",
  },
];

export default slides;
