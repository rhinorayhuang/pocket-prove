# Channels

## Purpose

This project now uses three explicit channels so one agent can keep moving without corrupting the workspace:

1. `development`
   Active writer for the repo. Right now this terminal owns it.
2. `handoff`
   Human-readable status channel. Update [demo-status.md](/C:/Users/ray.hr.huang/Documents/Codex/2026-05-07/new-chat/docs/demo-status.md) and [handoff.md](/C:/Users/ray.hr.huang/Documents/Codex/2026-05-07/new-chat/docs/handoff.md) before switching control.
3. `mobile`
   Read and operate the running project from a phone through Lunel or a hosted Vite preview.

## Ownership Rules

1. Pause Codex Desktop automation before letting this terminal write code.
2. Do not run two coding agents against the same workspace at the same time.
3. Only hand control back after `npm run build` passes and the demo checklist is updated.

## Switching Procedure

1. Pause the currently active automation.
2. Record current goal, blockers, and last verified command in [handoff.md](/C:/Users/ray.hr.huang/Documents/Codex/2026-05-07/new-chat/docs/handoff.md).
3. Update [demo-status.md](/C:/Users/ray.hr.huang/Documents/Codex/2026-05-07/new-chat/docs/demo-status.md) with what is actually demo-ready.
4. Start the next channel.

## Mobile Entry Points

- `npm run dev:host`
  Use for rapid preview from devices on the same network.
- `npm run demo`
  Build first, then serve a stable preview on `0.0.0.0:4173`.
- `npm run lunel`
  Launch Lunel's QR-based phone connection from the project root.
- `npm run lunel:forward`
  Launch a Lunel session that exposes the demo preview port `4177`.
