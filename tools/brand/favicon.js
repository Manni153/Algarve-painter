#!/usr/bin/env node
// Rasterise the mascot into the site's icon set.
//
//     node tools/brand/favicon.js
//
// The favicon used to be two generated paint swipes (see generate.py, which
// no longer writes icons). The mascot replaced it because the header, the
// tab and the home-screen icon should be the same mark — and the mascot was
// drawn to survive 32px precisely so it could do this job.
//
// Chromium does the SVG -> PNG step because it is the same renderer the
// badge is judged in; Playwright is already a dev dependency of nothing —
// it ships with the environment this repo is built in. If you are running
// this elsewhere: any SVG rasteriser at 1024px will do, then feed the PNG
// to sharp/PIL for the resizes.
const { chromium } = require('playwright-core');
const fs = require('fs');

(async () => {
  const svg = fs.readFileSync('src/assets/brand/mascot.svg', 'utf8');
  const b = await chromium.launch({
    executablePath: process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  });
  const ctx = await b.newContext({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.setContent(
    '<style>html,body{margin:0;background:transparent}svg{width:1024px;height:1024px;display:block}</style>' + svg
  );
  await p.waitForTimeout(150);
  const png = await p.screenshot({ omitBackground: true });
  fs.writeFileSync('/tmp/mascot-1024.png', png);
  await b.close();
  console.log('rasterised to /tmp/mascot-1024.png — resizing');
})();
