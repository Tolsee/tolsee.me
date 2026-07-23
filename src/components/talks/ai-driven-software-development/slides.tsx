import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ChevronRight, CircleDot, Code2, Database, FileText, Gauge, GitPullRequest, GraduationCap, Play, ShieldCheck, Wrench } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { sans } from '@/lib/fonts';
import type { TalkSlide } from './deck';
import { useTalkActs } from './slide-acts-context';

const TEAL = '#00af9a';
const PURPLE = '#a78bfa';
const PINK = '#ffa7c4';
const AMBER = '#fbbf24';

function Surface({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <div className={`rounded-2xl border border-white/10 bg-white/[0.035] ${className}`} style={style}>{children}</div>;
}

function SlideShell({ eyebrow, title, children }: { eyebrow?: string; title?: string; children: ReactNode }) {
  return (
    <section className={`absolute inset-0 flex flex-col px-10 pb-9 pt-12 md:px-16 md:pb-12 md:pt-16 ${sans.className}`}>
      {eyebrow && <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em]" style={{ color: TEAL }}>{eyebrow}</p>}
      {title && <h1 className="max-w-5xl text-4xl font-black leading-tight text-white md:text-6xl">{title}</h1>}
      <div className="min-h-0 flex-1 pt-7">{children}</div>
    </section>
  );
}

function Pill({ children, color = 'rgba(255,255,255,0.55)' }: { children: ReactNode; color?: string }) {
  return <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs" style={{ color }}>{children}</span>;
}

function Arrow() {
  return <ChevronRight className="h-6 w-6 shrink-0 text-white/30" />;
}

function FlowArrow({ branch = false }: { branch?: boolean }) {
  const path = branch
    ? 'M 4 130 H 46 M 46 130 V 65 H 126 M 46 130 V 195 H 126'
    : 'M 4 20 H 68';
  const arrowheads = branch
    ? ['M 116 57 L 126 65 L 116 73', 'M 116 187 L 126 195 L 116 203']
    : ['M 58 12 L 68 20 L 58 28'];

  return (
    <svg
      aria-hidden
      className={branch ? 'h-56 w-24 shrink-0 overflow-visible' : 'h-10 w-16 shrink-0 overflow-visible'}
      viewBox={branch ? '0 0 130 260' : '0 0 72 40'}
      fill="none"
    >
      <motion.path
        d={path}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.65 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        stroke={PURPLE}
        strokeWidth="1.5"
      />
      {branch && <circle cx="46" cy="130" r="3" fill={PURPLE} opacity="0.8" />}
      {arrowheads.map((arrowhead) => (
        <motion.path
          key={arrowhead}
          d={arrowhead}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.65 }}
          transition={{ duration: 0.2, delay: 0.45, ease: 'easeOut' }}
          stroke={PURPLE}
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

function Reveal({ at, children, className = '', style }: { at: number; children: ReactNode; className?: string; style?: CSSProperties }) {
  const { act } = useTalkActs();
  const visible = act >= at;
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function TitleSlide() {
  return (
    <section className={`absolute inset-0 flex items-center overflow-hidden px-14 md:px-24 ${sans.className}`}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.16) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      <div className="relative max-w-5xl">
        <p className="mb-7 font-mono text-sm uppercase tracking-[0.28em]" style={{ color: TEAL }}>Tulsi Sapkota · Linktree</p>
        <h1 className="text-6xl font-black leading-[0.98] text-white md:text-8xl">AI-Driven<br />Software Development</h1>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-white/60 md:text-3xl">What you need to build before agents can do useful work.</p>
      </div>
      <div className="absolute bottom-12 right-16 hidden gap-3 font-mono text-xs text-white/35 md:flex">
        <span>context</span><span>→</span><span>capability</span><span>→</span><span>confidence</span>
      </div>
    </section>
  );
}

function StartingSlide() {
  return (
    <SlideShell eyebrow="Where we start" title="A model and a repository are useful. They are not an engineering environment.">
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-5 md:gap-10">
        <Surface className="p-6 md:p-9">
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">Engineer</p>
          <p className="mt-5 text-2xl font-bold text-white md:text-4xl">A prompt<br />and a goal</p>
        </Surface>
        <Arrow />
        <Surface className="p-6 md:p-9">
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">Model + repository</p>
          <p className="mt-5 text-2xl font-bold text-white md:text-4xl">Can write code.<br />Often cannot know enough.</p>
        </Surface>
        <div className="col-span-3 mt-2 grid grid-cols-4 gap-3 md:gap-5">
          {[
            ['Live state', 'CI/CD · logs · metrics'],
            ['Local rules', 'repo and subsystem guidance'],
            ['Platform constraints', 'knowledge outside code search'],
            ['Proof it worked', 'tests, reviews, and runtime evidence'],
          ].map(([title, detail]) => (
            <div key={title} className="rounded-xl border border-dashed border-white/15 bg-white/[0.025] px-3 py-4 text-left">
              <p className="font-mono text-xs font-bold uppercase tracking-wide text-white/70 md:text-sm">{title}</p>
              <p className="mt-2 text-xs leading-snug text-white/40 md:text-sm">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function ProgressionSlide() {
  const stages = [
    ['01', 'Personal use', 'Ask AI to help with a task.'],
    ['02', 'Prepared environment', 'Make your codebase agent-friendly.'],
    ['03', 'Focused agent', 'Give it one clear job.'],
    ['04', 'Loops', 'Automate repeatable work with feedback and verification.'],
    ['05', 'Trusted autonomy', 'Raise scope only with evidence.'],
  ];
  return (
    <SlideShell eyebrow="The maturity path" title="Autonomy is a progression, not a switch.">
      <div className="flex h-full items-end gap-2 md:gap-4">
        {stages.map(([number, name, detail], index) => (
          <div key={number} className="flex flex-1 flex-col justify-end" style={{ height: `${48 + index * 12}%` }}>
            <Reveal at={index} className="h-full">
              <div className="h-full rounded-t-xl border border-white/10 border-b-0 bg-white/[0.04] p-4 md:p-6" style={{ boxShadow: index === 1 ? `inset 0 3px 0 ${TEAL}` : undefined }}>
                <p className="font-mono text-xs text-white/35">{number}</p>
                <p className="mt-3 text-lg font-bold text-white md:text-2xl">{name}</p>
                <p className="mt-2 hidden text-sm leading-snug text-white/55 md:block">{detail}</p>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
      <p className="mt-4 font-mono text-xs text-white/40">Most engineering teams should spend more time making step 02 good.</p>
    </SlideShell>
  );
}

function ContextSlide() {
  const layers = [
    { number: '01', title: 'Tools', detail: 'CI/CD · logs · metrics', color: TEAL },
    { number: '02', title: 'Knowledge', detail: 'repository guidance · platform constraints · prior learnings', color: PURPLE },
    { number: '03', title: 'Codebase', detail: 'the smallest relevant code and validation surface', color: '#e5e7eb' },
  ];
  return (
    <SlideShell eyebrow="The foundation" title="Context for agents">
      <div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center">
        <Reveal at={0} className="w-full max-w-2xl">
          <Surface className="border-white/20 bg-white/[0.07] px-7 py-5 text-center md:px-10 md:py-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: TEAL }}>Start with the task</p>
            <p className="mt-3 text-2xl font-bold text-white md:text-3xl">Goal and verification</p>
          </Surface>
        </Reveal>
        <div className="my-2 h-6 border-l border-dashed border-white/25" />
        <div className="w-full space-y-3">
          {layers.map(({ number, title, detail, color }, index) => (
            <Reveal key={title} at={index + 1}>
              <Surface className="grid grid-cols-[auto_1fr] items-center gap-5 px-6 py-4 md:px-8 md:py-5" style={{ borderLeftColor: color, borderLeftWidth: 4 }}>
                <span className="font-mono text-sm" style={{ color }}>{number}</span>
                <div className="flex items-baseline justify-between gap-6">
                  <p className="text-xl font-bold text-white md:text-2xl">{title}</p>
                  <p className="text-right font-mono text-xs leading-relaxed text-white/50 md:text-sm">{detail}</p>
                </div>
              </Surface>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 font-mono text-xs text-white/40">Expand only as the task requires—then change and verify.</p>
      </div>
    </SlideShell>
  );
}

function RepositorySlide() {
  return (
    <SlideShell eyebrow="Context layer 01" title="Make the repository navigable before asking an agent to change it.">
      <div className="grid h-full grid-cols-[1.05fr_.95fr] gap-10">
        <Surface className="flex flex-col justify-center p-6 md:p-9">
          <div className="font-mono text-sm leading-9 text-white/70 md:text-lg">
            <p><span style={{ color: TEAL }}>├─</span> AGENTS.md <span className="text-white/35">← entry point</span></p>
            <p><span style={{ color: TEAL }}>├─</span> docs/ <span className="text-white/35">← durable architecture knowledge</span></p>
            <p><span style={{ color: TEAL }}>├─</span> .agents/</p>
            <p className="pl-6"><span style={{ color: TEAL }}>├─</span> skills/ <span className="text-white/35">← repeatable workflows and verification</span></p>
            <p className="pl-6"><span style={{ color: TEAL }}>├─</span> agents/ <span className="text-white/35">← role instructions and boundaries</span></p>
            <p className="pl-6"><span style={{ color: TEAL }}>└─</span> tools/ <span className="text-white/35">← live-system integration setup</span></p>
            <p><span style={{ color: TEAL }}>└─</span> subsystem/</p>
            <p className="pl-6"><span style={{ color: TEAL }}>└─</span> AGENTS.md <span className="text-white/35">← local constraints</span></p>
          </div>
        </Surface>
        <div className="flex flex-col justify-center gap-4">
          {[
            ['Discoverability', 'An agent must encounter the route to the right knowledge.'],
            ['Scoped guidance', 'Rules live close to the code they govern.'],
            ['Real verification', 'Tell the agent exactly how to prove the change worked.'],
          ].map(([heading, detail]) => (
            <div key={heading} className="flex gap-4 border-l-2 pl-5" style={{ borderColor: TEAL }}>
              <div><p className="text-xl font-bold text-white">{heading}</p><p className="mt-1 text-base text-white/55">{detail}</p></div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function KnowledgeSlide() {
  return (
    <SlideShell eyebrow="Linktree example · context layer 02" title="Knowledge compounds with each session.">
      <div className="grid h-full grid-cols-[minmax(0,.8fr)_auto_minmax(0,1.15fr)_auto_minmax(0,.95fr)] items-center gap-3 md:gap-5">
        <Reveal at={0}>
          <Surface className="p-5 md:p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-white/40">Engineering work</p>
            <p className="mt-4 text-xl font-bold text-white md:text-2xl">Debugging<br />Decisions<br />Gotchas</p>
          </Surface>
        </Reveal>
        <Reveal at={1}><FlowArrow /></Reveal>
        <Reveal at={1} className="h-full">
          <Surface className="flex h-full flex-col justify-center p-5 md:p-6">
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: PURPLE }}>A Linktree knowledge system</p>
            <p className="mt-4 text-xl font-bold text-white md:text-2xl">Via a Claude plugin.</p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">Captures session learnings, then curates them for retrieval.</p>
          </Surface>
        </Reveal>
        <Reveal at={2}><FlowArrow branch /></Reveal>
        <div className="space-y-3">
          <Reveal at={2}>
            <Surface className="border-[#a78bfa]/30 bg-[#a78bfa]/[0.06] p-5">
              <p className="font-mono text-xs uppercase tracking-widest" style={{ color: PURPLE }}>In the repository</p>
              <p className="mt-3 text-lg font-bold text-white">Local rules and architecture context</p>
            </Surface>
          </Reveal>
          <Reveal at={3}>
            <Surface className="border-[#00af9a]/30 bg-[#00af9a]/[0.06] p-5">
              <p className="font-mono text-xs uppercase tracking-widest" style={{ color: TEAL }}>Across the organisation</p>
              <p className="mt-3 text-lg font-bold text-white">Platform constraints and reusable learnings</p>
            </Surface>
          </Reveal>
          <Reveal at={4}>
            <p className="pt-2 text-sm leading-relaxed text-white/55">Future Linktree engineers and agents retrieve the relevant layer—without rediscovering the same thing.</p>
          </Reveal>
        </div>
      </div>
    </SlideShell>
  );
}

function ToolsSlide() {
  const raw = ['CI/CD', 'Logs', 'Metrics'];
  const genericCalls = ['list_builds', 'get_build', 'get_job', 'read_logs', 'get_metrics'];
  const costs = ['5 tool calls', 'repeated IDs and lookups', 'more tokens and branches'];
  return (
    <SlideShell eyebrow="Live tools" title="Tool design">
      <div className="flex h-full flex-col">
        <Reveal at={0} className="mx-auto max-w-3xl">
          <p className="text-center text-xl font-bold text-white md:text-2xl">“Why did this deployment fail?”</p>
          <p className="mt-2 text-center text-sm text-white/50">CI/CD, logs, and metrics provide the live evidence. The tool design decides how much work the agent must do to use it.</p>
        </Reveal>
        <div className="mt-7 grid min-h-0 flex-1 grid-cols-2 gap-6 md:gap-10">
          <Reveal at={0}><Surface className="h-full border-white/10 p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-white/35">Raw tool surface</p>
          <p className="mt-5 text-2xl font-bold text-white">The agent has to assemble the answer.</p>
          <div className="mt-5 flex flex-wrap gap-2">{raw.map((item) => <Pill key={item}>{item}</Pill>)}</div>
          <div className="mt-6 space-y-2 font-mono text-sm text-white/45">
            {genericCalls.map((step, index) => <p key={step}>0{index + 1} · {step}</p>)}
          </div>
          <Reveal at={2} className="mt-7 flex flex-wrap gap-2">{costs.map((cost) => <Pill key={cost} color="#fda4af">{cost}</Pill>)}</Reveal>
        </Surface></Reveal>
          <Reveal at={1}><Surface className="h-full border-[#00af9a]/30 bg-[#00af9a]/[0.06] p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: TEAL }}>Task-shaped capability</p>
          <p className="mt-5 text-2xl font-bold text-white">The tool returns decision-ready context.</p>
          <div className="mt-8 rounded-xl border border-[#00af9a]/30 bg-black/20 p-5 font-mono text-sm text-white/75">
            <p style={{ color: TEAL }}>get relevant failure context</p>
            <p className="mt-3 text-white/50">→ affected job</p>
            <p className="text-white/50">→ relevant log lines</p>
            <p className="text-white/50">→ metric change and applicable rule</p>
          </div>
          <Reveal at={2} className="mt-7 flex flex-wrap gap-2"><Pill color="#4de5d1">1 tool call</Pill><Pill color="#4de5d1">one focused response</Pill></Reveal>
        </Surface></Reveal>
        </div>
      </div>
    </SlideShell>
  );
}

function SkillsSlide() {
  const cards = [
    ['Trigger', 'A person intentionally starts a known workflow.', Play],
    ['Procedure', 'The skill carries steps, constraints, and pause points.', FileText],
    ['Proof', 'It runs the real checks before it says “done”.', ShieldCheck],
  ];
  return (
    <SlideShell eyebrow="The bridge" title="Skills turn good individual practice into reusable capability.">
      <div className="flex h-full items-center">
        <div className="grid w-full grid-cols-3 gap-5">
          {cards.map(([title, detail, Icon], index) => {
            const CardIcon = Icon as typeof Play;
            return <Reveal key={title as string} at={index}><Surface className="h-full p-5 md:p-8"><CardIcon className="h-7 w-7" style={{ color: TEAL }} /><p className="mt-7 text-2xl font-bold text-white">{title as string}</p><p className="mt-3 text-base leading-relaxed text-white/55">{detail as string}</p></Surface></Reveal>;
          })}
        </div>
      </div>
      <p className="font-mono text-xs text-white/40">Examples: shepherd a PR to a clean state · write a release update from verified evidence · run a recurring investigation</p>
    </SlideShell>
  );
}

function FocusedAgentSlide() {
  return (
    <SlideShell eyebrow="Focused agent" title="Give an agent one clear job.">
      <div className="flex h-full flex-col justify-center">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 md:gap-5">
          <Reveal at={0}><Surface className="p-5"><FileText className="h-6 w-6" style={{ color: PINK }} /><p className="mt-4 font-bold text-white">Clear input</p><p className="mt-1 text-sm text-white/50">The change and relevant context</p></Surface></Reveal>
          <Reveal at={1}><Arrow /></Reveal>
          <Reveal at={1}><Surface className="border-[#a78bfa]/30 bg-[#a78bfa]/[0.06] p-5"><CircleDot className="h-6 w-6" style={{ color: PURPLE }} /><p className="mt-4 font-bold text-white">One job</p><p className="mt-1 text-sm text-white/50">A narrow, repeatable task</p></Surface></Reveal>
          <Reveal at={2}><Arrow /></Reveal>
          <Reveal at={2}><Surface className="border-[#00af9a]/30 bg-[#00af9a]/[0.06] p-5"><Check className="h-6 w-6" style={{ color: TEAL }} /><p className="mt-4 font-bold text-white">Clear output</p><p className="mt-1 text-sm text-white/50">Evidence and a recommendation</p></Surface></Reveal>
        </div>
        <Reveal at={3} className="mx-auto mt-7"><div className="flex items-center gap-3 rounded-full border border-[#ffa7c4]/30 bg-[#ffa7c4]/[0.06] px-5 py-3 font-mono text-sm text-[#ffa7c4]">
          <CircleDot className="h-4 w-4" /> uncertain judgement → human handoff
        </div></Reveal>
      </div>
    </SlideShell>
  );
}

function MigrationReviewerSlide() {
  const stages = [
    ['Trigger', 'A database migration changes', GitPullRequest, PINK],
    ['Context', 'Migration SQL, database facts, and safety rules', FileText, PURPLE],
    ['Focused job', 'Review for production safety', Database, TEAL],
    ['Output', 'Risk level and inline feedback', Check, AMBER],
  ];
  return (
    <SlideShell eyebrow="Migration reviewer workflow" title="A migration changes. The reviewer knows exactly what to do.">
      <div className="flex h-full flex-col justify-center">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2 md:gap-4">
          {stages.map(([label, detail, Icon, color], index) => {
            const StageIcon = Icon as typeof Check;
            return (
              <div key={label as string} className="contents">
                <Reveal at={index}>
                  <Surface className="min-h-40 p-4 md:p-5" style={{ borderTopColor: color as string, borderTopWidth: 3 }}>
                    <StageIcon className="h-6 w-6" style={{ color: color as string }} />
                    <p className="mt-4 font-mono text-xs uppercase tracking-widest text-white/45">{label as string}</p>
                    <p className="mt-3 text-lg font-bold leading-snug text-white">{detail as string}</p>
                  </Surface>
                </Reveal>
                {index < stages.length - 1 && <Reveal at={index + 1}><Arrow /></Reveal>}
              </div>
            );
          })}
        </div>
        <Reveal at={4} className="mx-auto mt-8"><p className="font-mono text-sm text-white/50">It does not review the whole PR. It reviews one risky change deeply.</p></Reveal>
      </div>
    </SlideShell>
  );
}

function AutomationSlide() {
  const gates = [
    ['Trigger', 'A clear event or schedule'],
    ['Context', 'Prepared, scoped inputs'],
    ['Budget', 'Time, tokens, scope'],
    ['Verify', 'Evidence outside the model'],
    ['Escalate', 'A deliberate human stop'],
  ];
  return (
    <SlideShell eyebrow="Automation" title="Automation earns its trust through gates.">
      <div className="flex h-full flex-col justify-center">
        <div className="grid grid-cols-5 gap-3 md:gap-5">
          {gates.map(([title, detail], index) => (
            <div key={title} className="relative">
              <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4 md:p-5" style={{ borderTopColor: index === 4 ? PINK : index === 3 ? AMBER : TEAL, borderTopWidth: 3 }}>
                <p className="font-mono text-xs text-white/35">0{index + 1}</p>
                <p className="mt-3 text-lg font-bold text-white">{title}</p>
                <p className="mt-2 text-sm leading-snug text-white/50">{detail}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-9 max-w-3xl text-center text-lg leading-relaxed text-white/60">The confidence comes from the system around the model: live evidence, bounded authority, verification, and a visible path back to human judgement.</p>
      </div>
    </SlideShell>
  );
}

function DevinLoopSlide() {
  const stages = [
    ['Slack handoff', '@guardian take over', CircleDot, PINK],
    ['Context', 'Thread and Devin session history', FileText, PURPLE],
    ['Guardian', 'Track progress and choose the next action', Wrench, TEAL],
    ['Green PR', 'CI and reviews provide outside evidence', GitPullRequest, AMBER],
  ];
  return (
    <SlideShell eyebrow="Devin handoff workflow" title="A loop in practice.">
      <div className="flex h-full flex-col justify-center">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2 md:gap-4">
          {stages.map(([label, detail, Icon, color], index) => {
            const StageIcon = Icon as typeof Check;
            return (
              <div key={label as string} className="contents">
                <Reveal at={index}>
                  <Surface className="min-h-40 p-4 md:p-5" style={{ borderTopColor: color as string, borderTopWidth: 3 }}>
                    <StageIcon className="h-6 w-6" style={{ color: color as string }} />
                    <p className="mt-4 font-mono text-xs uppercase tracking-widest text-white/45">{label as string}</p>
                    <p className="mt-3 text-lg font-bold leading-snug text-white">{detail as string}</p>
                  </Surface>
                </Reveal>
                {index < stages.length - 1 && <Reveal at={index + 1}><Arrow /></Reveal>}
              </div>
            );
          })}
        </div>
        <Reveal at={4} className="mx-auto mt-10">
          <div className="flex items-center gap-3 rounded-full border border-[#ffa7c4]/30 bg-[#ffa7c4]/[0.06] px-5 py-3 font-mono text-sm text-[#ffa7c4]">
            <CircleDot className="h-4 w-4" /> needs a decision → human response in Slack → Guardian continues
          </div>
        </Reveal>
      </div>
    </SlideShell>
  );
}

function LearningsSlide() {
  const learnings = [
    ['Context is product', 'Treat repository guidance, knowledge, and tools as part of the agent experience.'],
    ['Knowledge needs maintenance', 'Useful memory is curated, verified, and discoverable—not merely stored.'],
    ['Tools should remove decisions', 'Shape capabilities around the job, not an upstream API.'],
    ['Skills precede autonomy', 'First make a workflow repeatable under human control.'],
    ['Traces are feedback', 'Repeated failures reveal missing context, constraints, or verification.'],
  ];
  return (
    <SlideShell eyebrow="What we learned" title="Useful agent work is engineered, not prompted into existence.">
      <div className="grid h-full grid-cols-2 gap-x-10 gap-y-5 content-center">
        {learnings.map(([title, detail], index) => (
          <div key={title} className={`flex gap-4 ${index === 4 ? 'col-span-2 max-w-2xl' : ''}`}>
            <span className="mt-1 font-mono text-sm" style={{ color: TEAL }}>0{index + 1}</span>
            <div><p className="text-xl font-bold text-white md:text-2xl">{title}</p><p className="mt-1 text-base leading-relaxed text-white/55">{detail}</p></div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

function FirstStepSlide() {
  const steps = ['Choose one recurring task', 'Write its context and local constraints', 'Expose one live evidence capability', 'Package the workflow as a skill', 'Automate only after repeated, verified success'];
  return (
    <SlideShell eyebrow="Start here" title="Do not start by building an autonomous agent.">
      <div className="grid h-full grid-cols-[.85fr_1.15fr] items-center gap-10">
        <div><p className="text-3xl font-black leading-tight text-white md:text-5xl">Start with one task you already understand.</p><p className="mt-6 text-lg leading-relaxed text-white/55">The goal is not more AI surface area. The goal is one dependable loop you can improve.</p></div>
        <ol className="space-y-3">
          {steps.map((step, index) => <li key={step} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.035] px-5 py-4"><span className="font-mono text-sm" style={{ color: TEAL }}>0{index + 1}</span><span className="text-lg text-white/80">{step}</span></li>)}
        </ol>
      </div>
    </SlideShell>
  );
}

function CloseSlide() {
  return (
    <section className={`absolute inset-0 flex items-center overflow-hidden px-14 md:px-24 ${sans.className}`}>
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.16) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      <div className="relative max-w-5xl">
        <p className="font-mono text-sm uppercase tracking-[0.28em]" style={{ color: TEAL }}>The next step</p>
        <h1 className="mt-6 text-5xl font-black leading-[1.02] text-white md:text-7xl">Prepare the environment.<br />Then earn autonomy.</h1>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-white/60">For a deeper, concrete example of a bounded agent system, see the Pipeline Optimizer talk.</p>
        <Link href="/talks/replace-yourself-with-agents" className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#00af9a]/40 bg-[#00af9a]/10 px-5 py-3 font-mono text-sm text-[#4de5d1] transition-colors hover:bg-[#00af9a]/20">
          Replace Yourself with Agents <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

export const slides: TalkSlide[] = [
  { id: 'title', content: <TitleSlide />, notes: 'This is a talk about the engineering work behind useful agents. Not a tool roundup, and not a claim that every team should automate everything.' },
  { id: 'start', content: <StartingSlide />, notes: 'A model can reason over the code you show it. It cannot automatically know what changed in production, which local convention is important, or whether its change had the desired effect.' },
  { id: 'progression', acts: 5, content: <ProgressionSlide />, notes: 'The key is progression. Start with personal leverage, then make the environment reliable enough for a narrow role, then automate only the workflow that has earned it.' },
  { id: 'context', acts: 4, content: <ContextSlide />, notes: 'Context is a layered search: start with the task, then reach for live tools, knowledge, and the smallest relevant code surface only as the task requires.' },
  { id: 'repo', content: <RepositorySlide />, notes: 'The exact file names are less important than the behaviour: an agent finds an entry point, reaches local rules only when it enters that system, and can run the true validation command.' },
  { id: 'knowledge', acts: 5, content: <KnowledgeSlide />, notes: 'Knowledge can be published beside the code when it is repository-specific, or into a shared system when it is useful across the organisation. Both make the next relevant task less blind.' },
  { id: 'tools', acts: 3, content: <ToolsSlide />, notes: 'Use the BFF principle for agents: shape a capability around the job, not the upstream API. CI/CD, logs, and metrics are the live evidence, but a raw tool surface forces the agent to repeat lookups, receive excess context, spend more tokens, and make more routing decisions. A task-shaped tool does the orchestration internally and returns only the evidence it needs.' },
  { id: 'skills', acts: 3, content: <SkillsSlide />, notes: 'Skills are an important middle stage: a person still chooses to run them, but the procedure, verification, and pause points are repeatable.' },
  { id: 'agent', acts: 4, content: <FocusedAgentSlide />, notes: 'A focused agent has clear input, one narrow job, and a specific output. This makes it easier to inspect, test, and hand back to a human when judgement is needed.' },
  { id: 'migration-reviewer', acts: 5, content: <MigrationReviewerSlide />, notes: 'This is a concrete focused-agent example. The migration reviewer does not try to review everything in the PR: a migration change triggers it, it receives migration-specific context, evaluates production safety, and returns a risk level with inline feedback.' },
  { id: 'automation', content: <AutomationSlide />, notes: 'The model is only one component of automation. A trustworthy loop needs a trigger, scoped context, a budget, external verification, and escalation.' },
  { id: 'devin-loop', acts: 5, content: <DevinLoopSlide />, notes: 'This is the handoff loop in practice. An engineer asks Guardian to take over an existing Devin session in Slack. It distils the thread and session history, tracks the work and its decisions, then relies on CI and review evidence before treating the PR as green. When it needs judgement, it hands the decision back in Slack and continues with the response.' },
  { id: 'learnings', content: <LearningsSlide />, notes: 'These principles come from building different layers: skills, knowledge systems, task-shaped tools, testing agents, and autonomous workflows.' },
  { id: 'first-step', content: <FirstStepSlide />, notes: 'Pick a task you already understand. Make its context and verification explicit. Run it as a skill until you understand the failure modes. Then consider automation.' },
  { id: 'close', content: <CloseSlide />, notes: 'The deeper Pipeline Optimizer presentation is linked here. This talk is the preparation layer: the work that lets a more autonomous system be trusted later.' },
];
