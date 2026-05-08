# Mobile Preview

## Option 1: Browser Preview on Phone

1. Start the hosted dev server:

```bash
npm run dev:host
```

2. Find the laptop's private IP address:

```bash
ipconfig
```

3. On the phone, open:

```text
http://<your-private-ip>:4173
```

Use this when you only need to see and play the current build.

## Option 2: Lunel

1. Install the Lunel app on the phone.
2. From the project root, run:

```bash
npm run lunel
```

3. Scan the QR code shown in the terminal.

Use this when you want more than preview:

- terminal access
- browser and devtools
- file browsing
- git inspection

## Option 3: Lunel Forwarded Port

Use this when you want a VS Code-like forwarded port for the demo preview.

```bash
npm run build
npm run preview:forward
npm run lunel:forward
```

The forwarded demo port is `4177`.

## When To Use Which

- Use hosted Vite preview for quick visual checks.
- Use Lunel when you want to inspect the environment from the phone and keep working away from the desk.
- Use Lunel forwarded port when you want the phone to open the running demo through a forwarded URL.
