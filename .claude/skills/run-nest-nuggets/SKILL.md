---
name: run-nest-nuggets
description: Build, run, and drive Nest Nuggets (Next.js 12 rental-review web app). Use when asked to start Nest Nuggets, run the dev server, take a screenshot of the UI, or interact with the running app.
---

Nest Nuggets is a Next.js 12 + Firebase web app. There's no `chromium-cli`
on this machine (Windows, not a Linux container), so it's driven via a
small Playwright REPL driver at
`.claude/skills/run-nest-nuggets/driver.mjs`: start the dev server, pipe
commands to the driver over stdin, read screenshots back from
`.claude/skills/run-nest-nuggets/screenshots/`.

All paths below are relative to the repo root
(`C:\Users\Jesse\workspace\NestNuggets`).

## Prerequisites

Windows machine, PowerShell available. Node v24 / npm 11 confirmed working.
`npm run dev` on this host uses **Git Bash** (`sh`) via the Bash tool, not
`cmd`/PowerShell, for the `&`-backgrounding shown below.

Playwright + Chromium are dev dependencies (already added to
`package.json`); if missing:

```bash
npm install -D playwright
npx playwright install chromium
```

## Setup

```bash
npm install
```

Firebase config comes from `.env.local` (Next.js auto-loads it) with the
`NEXT_PUBLIC_FIREBASE_*` vars — already present in this checkout, values
are the project's public Firebase web config (safe to be client-exposed).
Don't confuse it with the tracked `env.local` (no dot) at repo root, which
is a stale/unused file — Next.js only reads `.env.local`.

No separate build step is needed to run the dev server.

## Run (agent path)

1. Kill anything already bound to port 3000, then start the dev server in
   the background and wait for it to actually serve (don't `sleep`, poll):

```bash
npm run dev > /tmp/nestnuggets-dev.log 2>&1 &
disown
timeout 30 bash -c 'until curl -sf http://localhost:3000 -o /dev/null; do sleep 1; done'
```

2. Drive it with the Playwright driver — pipe a command script to stdin:

```bash
node .claude/skills/run-nest-nuggets/driver.mjs <<'EOF'
nav /
wait-for text=Nest Nuggets
screenshot home
console
quit
EOF
```

Screenshots land in `.claude/skills/run-nest-nuggets/screenshots/<name>.png`.
Read the file back with the Read tool to actually look at it — a blank
canvas or error page is a failed run even if the driver printed no error.

| command | what it does |
|---|---|
| `nav <path>` | goto `http://localhost:3000<path>` (or a full URL) |
| `wait-for <selector>` | wait for a CSS selector to be visible |
| `wait-for text=<text>` | wait for text to be visible |
| `click <selector>` | click an element |
| `fill <selector> <text>` | fill a form input (goes through Playwright's real input pipeline — required for React controlled inputs) |
| `press <key>` | press a key on the focused element |
| `screenshot [name]` | full-page screenshot → `screenshots/<name or shot-N>.png` |
| `console` | print collected `console.log`/`pageerror` messages so far |
| `eval <js>` | evaluate JS in the page, print the JSON result |
| `quit` | close the browser and exit |

Commands run **sequentially** (queued internally) even though the whole
heredoc arrives on stdin at once — see Gotchas below for why that matters.

To stop the dev server (PowerShell — this Bash environment has no `lsof`):

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
```

(Filter to `-State Listen` — TIME_WAIT/closed leftovers on the same port
report bogus or PID-0 owners and make plain `Get-NetTCPConnection -LocalPort
3000` throw `Cannot find a process` / `Access is denied` noise.)

## Run (human path)

```bash
npm run dev
```

Opens on http://localhost:3000 (or the next free port — see Gotchas).
Ctrl-C to stop.

## Test

No test suite is configured (`package.json` has no `test` script).
`npm run lint` exists but **currently fails** on pre-existing errors
in `components/CommentsSection.js` (missing prop-types, `arrow-parens`)
unrelated to any run/driver changes — don't treat pre-existing lint
failures there as something you broke.

## Gotchas

- **Stray dev servers accumulate.** Each `npm run dev &` that isn't
  cleanly killed leaves a `next dev` process holding its port; the next
  `npm run dev` then silently falls back to port 3001 (logged as `warn -
  Port 3000 is in use, trying 3001 instead`) while your driver is still
  pointed at 3000, hitting a stale server. Always kill port 3000 first
  (see PowerShell command above) before starting a new one, and check
  `/tmp/nestnuggets-dev.log` for the actual `started server on` port if
  `curl localhost:3000` doesn't come up.
- **The driver's readline handler must queue commands.** `rl.on('line',
  async ...)` without a queue fires concurrently for every line in a
  piped heredoc (they all arrive before the first `await` resolves), so
  a `quit` at the end of the script can close the browser mid-`nav`,
  producing `net::ERR_ABORTED` / "Target page ... has been closed".
  `driver.mjs` chains each command onto a `Promise` queue to force
  sequential execution — don't remove that if you touch the driver.
- **Home page renders blank (nav bar only) when signed out** — this is
  correct, not a bug. `pages/index.js` only fetches/renders reviews when
  `useAuth()` returns a `user`. Confirmed via `screenshot home` — nav bar
  with logo + "Sign In" button, empty body below.
- **"Sign In" opens a real Firebase Google OAuth popup** (`utils/auth.js`
  `signIn`). It can't be driven headlessly without a live Google test
  account, so authenticated flows (dashboard, add/edit review, comments)
  aren't reachable via this driver as-is. If a task needs authenticated
  screens, the practical path is to seed Firebase Auth with a test user
  and sign in via the Firebase Auth REST API to get a token, then inject
  it — not yet built here.
- **`imgix` image loader** (`next.config.js`) expects `next/image` URLs
  to be pre-optimized elsewhere; not an issue for the no-auth home page
  but can 404 broken-looking images once authenticated content renders.

## Troubleshooting

- **`page.goto: net::ERR_ABORTED`** immediately followed by "Target page,
  context or browser has been closed": the queueing bug above — check
  `driver.mjs` still serializes commands.
- **Driver hangs on `wait-for`**: dev server is up but that route/text
  never appears — check `/tmp/nestnuggets-dev.log` for a compile error
  first (Next.js compiles routes on first hit, so first `nav` can take a
  few seconds; `wait-for`'s 15s timeout normally covers this).
- **`npx playwright install chromium` re-downloads every time**: browsers
  cache at `%LOCALAPPDATA%\ms-playwright`; if that's cleared it's a real
  ~190MB download, not an error.
