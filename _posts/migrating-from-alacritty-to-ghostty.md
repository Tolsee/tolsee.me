---
title: 'Getting my terminal ready for AI agents'
publishedAt: '2026-06-24'
updatedAt: '2026-06-25'
author: 'Tulsi Sapkota'
tags:
  - Ghostty
  - tmux
  - Neovim
  - Claude Code
  - dotfiles
---

I was already mostly happy with my setup — tmux, Neovim, zsh, years of muscle
memory. It did everything I needed. But once I started spending most of my day
driving an AI agent (Claude Code) *inside* that terminal, small rough edges I'd
tolerated forever started to matter: a slow shell I paid for on every new pane,
no idea when the agent finished, keys that didn't reach it. None of it was
broken — it just wasn't built for an agent living in the terminal full time.

So I spent a session making the terminal a better home for an agent. Here's
what changed, and why.

### A terminal that doesn't fight the OS

First I moved from Alacritty to Ghostty. The trigger was a warning Alacritty has
shipped with for years on macOS:

```
[WARN] Unable to store text in clipboard: NSPasteboard#writeObjects: returned false
```

Harmless — your copy still lands — but it's a known, unresolved upstream bug
([#5824](https://github.com/alacritty/alacritty/issues/5824),
[#8041](https://github.com/alacritty/alacritty/issues/8041)) that not even
`log_level` silences. Ghostty uses the native AppKit clipboard, so it just
doesn't happen. It also handles Shift+Enter, Option keys, and desktop
notifications natively — all things an agent leans on.

### Match the theme to your editor (the honest way)

My terminal and my editor were two different color schemes and I'd never
noticed until I cared. Ghostty ships TokyoNight built in, so no hand-copying
hex:

```
theme = TokyoNight Moon
```

The gotcha: I assumed `colorscheme tokyonight` meant **Storm**, but with no
explicit `style` it actually renders **Moon** (`#222436`, not Storm's
`#24283b`). Don't eyeball it — ask nvim what it's actually drawing:

```
nvim --headless "+lua print(('#%06x'):format(vim.api.nvim_get_hl(0,{name='Normal'}).bg))" +q
```

It printed `#222436` → `TokyoNight Moon`. Keep `background-opacity = 1` if you
want the true solid color; opacity + blur wash that blue-grey lighter.

### Let tmux actually talk to the agent

This is the part specific to running an agent in the terminal. By default, when
Claude Code runs inside tmux, two things break: Shift+Enter submits instead of
inserting a newline, and the agent's desktop notifications never reach the outer
terminal. Three lines fix it:

```tmux
set -g allow-passthrough on
set -s extended-keys on
set -as terminal-features 'xterm*:extkeys'
```

`allow-passthrough` lets notifications and progress escape tmux to Ghostty;
the `extended-keys` pair lets tmux tell Shift+Enter apart from plain Enter.

### Know when the agent is done

The biggest quality-of-life win: I no longer babysit the agent. When it finishes
or needs a decision, I get told. I layered three signals so it works wherever I
am:

- **Desktop banner** — Ghostty forwards Claude Code's notification to macOS
  Notification Center (`preferredNotifChannel: "ghostty"` + the passthrough
  above). Reaches me on another Space or app.
- **Sound** — a `Notification` hook in `~/.claude/settings.json`:

  ```json
  { "hooks": { "Notification": [ { "hooks": [
    { "type": "command",
      "command": "afplay /System/Library/Sounds/Glass.aiff >/dev/null 2>&1 & printf '\\a' >/dev/tty 2>/dev/null; true" }
  ] } ] } }
  ```

- **tmux window-flag** — that `printf '\a'` rings the bell in the pane, and with
  `monitor-bell on` + `visual-bell on` tmux lights up the agent's window in the
  status bar when I'm off in another window.

### Make new panes instant

I open panes constantly, and each one spawns a fresh shell — so a slow `.zshrc`
is a tax I pay dozens of times a day. Mine took **~2.3s**. Profiling
(`zmodload zsh/zprof`) put ~1.7s of that on **nvm**.

The culprit wasn't loading node — it was `zsh-nvm`'s lazy-load *setup*
enumerating every global binary across all nine installed node versions on every
shell, before I'd touched node once. I dropped the plugin for a ten-line manual
lazy-loader that stubs only the package managers:

```zsh
export NVM_DIR="$HOME/.nvm"
_nvm_lazy() {
  unset -f nvm node npm npx pnpm pnpx yarn yarnpkg corepack 2>/dev/null
  [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
}
for _c in nvm node npm npx pnpm pnpx yarn yarnpkg corepack; do
  eval "${_c}() { _nvm_lazy; ${_c} \"\$@\"; }"
done
unset _c
```

First `node`/`npm` call sources nvm once; everything else starts cold-free.
**~2.3s → ~0.6s.** (nvim's LSPs come from Mason, not nvm globals, so nothing
broke.) Lesson: lazy-loading only helps if nothing *triggers* the load during
startup — measure, don't assume.

### Jump to any project in two keystrokes

I used to keep a static alias per project. That doesn't scale. Borrowing
ThePrimeagen's `tmux-sessionizer`, `prefix + f` now fuzzy-finds any repo under
my project roots and creates-or-switches a tmux session named after it:

```bash
selected=$(find ~/dev/linktree ~/dev/hobby -mindepth 1 -maxdepth 1 -type d | fzf)
# … create the session if absent, then switch to it
```

New repo shows up automatically — no new alias.

### The bug that wasn't the terminal's fault

One detour worth keeping. tmux's `#{pane_current_path}` was stuck on whatever
directory each pane started in, no matter how much I `cd`'d. My first instinct
was OSC 7 — have the shell announce its cwd. That does nothing here: **tmux
derives `pane_current_path` from the pane process's kernel cwd, not from OSC 7.**

The real cause was a shell wrapper — my panes run through
`devin shell run zsh --parent /bin/zsh`, and tmux samples the *wrapper*
process's cwd (which never moves) while my `cd` happens in the child shell
underneath. No terminal swap could fix that; it lived entirely in the process
tree. The reminder: before you change tools, confirm where the problem actually
lives.

---

None of this is revolutionary, and my setup looks almost the same as before. But
it's now quiet, fast, and aware of the agent I spend all day with — which is
exactly the point. The terminal is my home; it should be a good one to share
with a robot.
