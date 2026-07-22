import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const OUT = ".claude/shots";

const pages = [
  ["home", "/"],
  ["about", "/about"],
  ["research", "/research"],
  ["division", "/research/toxicology"],
  ["services", "/services"],
  ["sector", "/services/agrochemical"],
  ["products", "/products"],
  ["facilities", "/facilities"],
  ["downloads", "/downloads"],
  ["news", "/news"],
  ["careers", "/careers"],
  ["contact", "/contact"],
  ["notfound", "/definitely-missing"],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));

for (const [name, path] of pages) {
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/v2-${name}-hero.png` });
  await page.screenshot({ path: `${OUT}/v2-${name}-full.png`, fullPage: true });
  console.log("shot", name);
}

if (errors.length) console.log("PAGE ERRORS:\n" + errors.join("\n"));
await browser.close();
