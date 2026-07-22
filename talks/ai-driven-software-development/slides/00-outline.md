# Slide outline — AI-driven software development

This is framework-agnostic content. All examples are descriptions, not internal source or screenshots.

## Narrative structure

```text
Start with the individual engineer
  → show why raw model + repository is insufficient
  → establish progressive context as the foundation
  → show skills as the bridge to automation
  → show bounded agents and automation as later steps
  → leave a practical path, then link the deeper case study
```

## Slide map

| # | Title | Purpose | Example / visual |
|---|---|---|---|
| 1 | AI-Driven Software Development | Set the promise: dependable agent work is an engineering-environment problem. | Minimal title card; progression ladder faintly behind the title. |
| 2 | Most of us start here | A coding assistant plus an open repository is valuable, but it has weak context, no live evidence, and no durable learning. | Simple two-node diagram: engineer ↔ model ↔ repository. Show the missing layers as dashed outlines. |
| 3 | Autonomy is a progression | Make the maturity path explicit: personal use → prepared environment → bounded roles → automation → trusted autonomy. | Staircase. Do not imply that every team needs the final step. |
| 4 | Context is a layered search | Introduce the context architecture. The agent starts with the task, then reaches for tools, knowledge, and the smallest relevant code surface only when needed. | A simple vertical stack: task → tools (CI/CD, logs, metrics) → knowledge → codebase → verify. |
| 5 | Make the repository navigable | Explain the entry-point/local-guidance pattern. A root file routes; subsystem guidance constrains local work; docs hold durable architecture knowledge. | Repo tree with root guidance, a subsystem guide, docs, and test/validation command. Callout: directory name is incidental; discoverability is not. |
| 6 | Knowledge should compound, not accumulate | Explain the two destinations for reusable knowledge: repository guidance for local truth, and shared organisational knowledge for cross-repository constraints and learnings. | Engineering work → extract reusable guidance → in repository / across organisation → future task retrieves the relevant layer. |
| 7 | Live tools complete the context | Code tells you how the system is written. Tools tell you what it is doing now: CI/CD, logs, and metrics. | Live evidence → task-shaped tool → decision-ready evidence. |
| 8 | A tool surface is a job description | Generic APIs create many choices and irrelevant context. Purpose-shaped tools constrain the work and return only what the role needs. | Before/after: many generic calls and noisy responses vs one focused capability and a compact result. |
| 9 | Skills are the bridge | Skills package a reliable, human-triggered workflow before the team tries to automate it. | Flow: explicit invocation → known procedure → real validation → result. Examples: PR shepherding, release update, recurring investigation. |
| 10 | A bounded agent owns one role | Once context and procedures are prepared, an agent can own a narrow role. | Sanitized PR-test example: repository test context + current PR + temporary environment → targeted test plan/results. Explicit human handoff on uncertain judgement. |
| 11 | Automation earns its trust | Trigger a bounded agent only when the job has a clear event, safe scope, verification, observability, and escalation path. | Five-gate checklist: trigger, context, budget, verify, escalate. Mention event/schedule-driven work without a product tour. |
| 12 | What we learned building this | Synthesize: context is product; knowledge must stay fresh; tools should remove decisions; skills precede autonomy; traces reveal what to improve. | Five short principles, each paired with the layer it strengthens. |
| 13 | What to build first | Give a non-grandiose first move: choose one recurring task and make its context, validation, and boundaries explicit. | A small implementation ladder: write guidance → expose one evidence tool → package as a skill → automate only after repeated success. |
| 14 | The deeper case study | Close the loop and point people to the complete Pipeline Optimizer presentation. | Link/QR code and a one-sentence description; no replay of its architecture. |

## Diagram direction

Use a consistent visual language across the talk:

- **Repository guidance:** neutral/document colour.
- **Knowledge:** muted purple or blue, layered cards.
- **Tools/live evidence:** teal/green, directional arrows toward the agent.
- **Code:** neutral white/grey, appearing only after context has narrowed the path.
- **Verification and escalation:** amber/pink; visually separate "agent can continue" from "human judgement required".

Animate only state changes that matter: context layers becoming available, a skill becoming an automated workflow, and a human gate stopping escalation. Avoid decorative motion.

## Evidence and speaker-note guardrails

- Treat examples as patterns, not claims of universal success.
- State a capability only when it is both accurate and externally shareable.
- When describing the knowledge system, distinguish repository-local guidance from shared organisational knowledge; both need clear scope and discoverability.
- When describing automation, name the non-happy path: time/token budgets, failed verification, stale context, and escalation.
- Put implementation names, source references, and project-specific evidence in private speaker notes only if they are needed at rehearsal time.
