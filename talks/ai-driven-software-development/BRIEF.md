# Talk brief — AI-driven software development

## Working title

**AI-Driven Software Development**

Alternatives to test later:

- *Preparing Engineering for AI*
- *From AI-Assisted to Agent-Ready*
- *The Environment Behind Useful Agents*

## Premise

Most engineers begin with an AI coding assistant and a repository. That is useful, but it is not enough for dependable agent work. The engineering environment must supply the right context at the right time, prove whether work succeeded, and preserve what it learned for the next run.

The talk presents this as a progression, not a leap to autonomy:

```text
Personal AI use
  → agent-ready engineering environment
  → bounded agent roles
  → repeatable automation
  → increasingly trusted autonomy
```

"Loop engineering" is a later-stage capability in this progression, not the title or the starting point.

## Audience

External engineering audience. General software-engineering literacy is assumed. Familiarity with coding agents, CLIs, or MCP is helpful but not required.

Use Linktree as the work context, but keep examples capability-level and externally safe:

- no internal repository names, URLs, tickets, customer data, source code, screenshots, or metrics that have not been explicitly cleared;
- name public technologies only when they improve understanding;
- use generic system descriptions on slides, with sanitized architecture diagrams;
- link to the existing Pipeline Optimizer deck as a separate, deeper case study rather than retelling it.

## Audience outcome

Attendees should leave with an actionable maturity path:

1. Improve individual AI-assisted development with better context.
2. Make repository, platform, and organisational knowledge discoverable in layers.
3. Give agents only the live tools and code paths needed for a bounded job.
4. Package reliable work as skills before automating it.
5. Add triggers, verification, observability, and escalation only when the workflow has earned them.

## Core idea: progressive context

An agent should not receive the whole company, whole repository, and every production tool at session start. Context is progressively disclosed through the task:

```text
Task and definition of done
  ├─ Repository guidance: where to start and which local rules apply
  ├─ Knowledge: repo conventions → platform constraints → curated prior learnings
  ├─ Tools: live logs, metrics, build/deploy status, targeted actions
  └─ Code: the smallest relevant implementation and validation surface
```

The exact directory names do not matter. The invariants do:

- a discoverable entry point (`AGENTS.md`, `CLAUDE.md`, or equivalent);
- local guidance close to the subsystem it governs;
- durable human-and-agent documentation;
- freshness and executable verification where possible;
- purpose-shaped tools that return decision-ready evidence;
- explicit safety boundaries around write access and verification.

## Example placement

Examples appear where they demonstrate a concept; they are not collected into a product-tour section.

| Concept | External-safe Linktree example |
|---|---|
| Repository context | Root and subsystem-level agent guidance that routes work to the right architecture knowledge and commands. |
| Knowledge layers | A session-learning knowledge system: capture useful engineering lessons, curate/deduplicate them, then make them searchable in later sessions. |
| Tools | Purpose-built CLI/MCP capabilities that gather decision-ready logs, metrics, build status, and other live evidence. |
| Skills | Human-triggered, reusable procedures such as reviewing a PR through CI and review completion, or producing a release update from verified inputs. |
| Bounded agents | An autonomous PR-testing agent that combines repository-provided test context with the current PR and an ephemeral environment. |
| Automation | Event- or schedule-driven agent work with explicit budgets, verification gates, and human escalation. |
| Deep dive | Link to *Replace Yourself with Agents* / Pipeline Optimizer after the talk. |

## What the talk is not

- Not a vendor or MCP tool roundup.
- Not a claim that every team should build autonomous agents immediately.
- Not a generic "write better prompts" talk.
- Not a second presentation of the Pipeline Optimizer.

## Open decisions

- Final title.
- Slot length and the intended depth of the architecture diagrams.
- Whether a small live demo is useful; default is no live demo.
- Which external-safe tool or skill examples can be named on screen.
