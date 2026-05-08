# Demo Status

## Target

The demo target is a stable vertical slice:

- world exploration
- NPC and sign interaction
- wild encounter battle loop
- trainer battle loop
- quest progression across the current map chain
- save and restore from local storage
- desktop and phone preview paths

## Current Checklist

- [x] Build passes with `npm run build`
- [x] Researcher intro can now advance the first quest flag
- [x] Save data is restored on startup
- [x] Hosted Vite scripts exist for phone preview
- [x] Lunel script exists for QR-based mobile access
- [x] Forwarded-port Lunel flow exists on port `4177`
- [x] User-facing game copy is readable Traditional Chinese
- [x] Demo Assist button can trigger a wild battle on demand
- [x] Demo Guide button can jump to the next quest interaction point
- [ ] Full manual walkthrough of the entire quest chain on a running client
- [x] Final polish pass on copy and HUD presentation

## Demo Commands

```bash
npm install
npm run dev:host
```

For a more stable review build:

```bash
npm run demo
```

For phone control through Lunel:

```bash
npm run lunel
```

For forwarded-port mobile preview:

```bash
npm run build
npm run preview:forward
npm run lunel:forward
```

## Demo Notes

- The default phone-friendly port is `4173`.
- The active forwarded preview is currently serving on `http://localhost:4177`.
- Keep the laptop awake while using Lunel from a phone.
- If Windows asks for firewall access, allow Node on private networks or the phone preview will fail.
- Use `Demo Guide：前往下一步` during live demos if the player gets lost or needs to skip travel time.
