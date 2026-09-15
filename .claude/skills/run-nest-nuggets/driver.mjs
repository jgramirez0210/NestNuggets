// Minimal Playwright REPL driver for Nest Nuggets (Next.js web app).
// Reads newline-delimited commands from stdin, drives headless Chromium
// against a running `npm run dev` server, and writes screenshots to
// .claude/skills/run-nest-nuggets/screenshots/.
//
// Commands:
//   nav <path>                 - goto http://localhost:3000<path>
//   wait-for <selector>        - wait for selector to be visible
//   wait-for text=<text>       - wait for text to be visible
//   click <selector>           - click selector
//   fill <selector> <text...>  - fill input
//   press <key>                - press a key on the focused element
//   screenshot [name]          - save a full-page screenshot
//   console                    - print collected console messages so far
//   eval <js>                  - evaluate JS in the page, print result
//   quit                       - close the browser and exit
//
// Usage:
//   node .claude/skills/run-nest-nuggets/driver.mjs <<'EOF'
//   nav /
//   wait-for text=Nest Nuggets
//   screenshot home
//   EOF

import { chromium } from 'playwright';
import readline from 'node:readline';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
const consoleMsgs = [];
page.on('console', (msg) => consoleMsgs.push(`[${msg.type()}] ${msg.text()}`));
page.on('pageerror', (err) => consoleMsgs.push(`[pageerror] ${err.message}`));

let shotCount = 0;

async function run(line) {
  const [cmd, ...rest] = line.trim().split(/\s+/);
  const arg = rest.join(' ');
  switch (cmd) {
    case 'nav': {
      const url = arg.startsWith('http') ? arg : BASE_URL + arg;
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      console.log(`navigated to ${url}`);
      break;
    }
    case 'wait-for': {
      if (arg.startsWith('text=')) {
        await page.getByText(arg.slice(5), { exact: false }).first().waitFor({ timeout: 15000 });
      } else {
        await page.locator(arg).first().waitFor({ timeout: 15000 });
      }
      console.log(`found: ${arg}`);
      break;
    }
    case 'click': {
      await page.locator(arg).first().click();
      console.log(`clicked: ${arg}`);
      break;
    }
    case 'fill': {
      const [sel, ...text] = rest;
      await page.locator(sel).first().fill(text.join(' '));
      console.log(`filled: ${sel}`);
      break;
    }
    case 'press': {
      await page.keyboard.press(arg);
      console.log(`pressed: ${arg}`);
      break;
    }
    case 'screenshot': {
      shotCount += 1;
      const name = arg || `shot-${shotCount}`;
      const file = path.join(SCREENSHOT_DIR, `${name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`screenshot: ${file}`);
      break;
    }
    case 'console': {
      console.log(consoleMsgs.join('\n') || '(no console output)');
      break;
    }
    case 'eval': {
      const result = await page.evaluate(arg);
      console.log(`eval result: ${JSON.stringify(result)}`);
      break;
    }
    case 'quit': {
      await browser.close();
      process.exit(0);
      break;
    }
    case '':
      break;
    default:
      console.log(`unknown command: ${cmd}`);
  }
}

// Commands are queued and run one at a time — stdin can deliver every
// piped line before the first `await` inside run() resolves, so without
// a queue a later `quit` can close the browser mid-navigation.
let queue = Promise.resolve();
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {
  queue = queue.then(async () => {
    try {
      await run(line);
    } catch (err) {
      console.log(`error running "${line}": ${err.message}`);
    }
  });
});
rl.on('close', async () => {
  await queue;
  if (browser.isConnected()) await browser.close();
  process.exit(0);
});
