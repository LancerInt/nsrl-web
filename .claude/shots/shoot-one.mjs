import { chromium } from "playwright";

const [, , path = "/", name = "check"] = process.argv;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto("http://localhost:3000" + path, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.screenshot({ path: `.claude/shots/${name}-hero.png` });
await page.screenshot({ path: `.claude/shots/${name}-full.png`, fullPage: true });
if (errors.length) console.log("CONSOLE ERRORS:\n" + errors.join("\n---\n"));
else console.log("no console errors");

await browser.close();
