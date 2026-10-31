const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

// Find where Hero or Ig or the section with id="experience" is rendered
const searchTerms = ['summit', 'browser-section', 'hero-stage'];
for (const term of searchTerms) {
  const idx = js.indexOf(term);
  console.log(`Term "${term}" found at index ${idx}`);
}

// Let's find the main homepage JSX
// Let's look around index 1574000 (near Hero) and index 1617000 (near Summit)
console.log('--- Around Summit (02 / UI snippets) ---');
const sIdx = js.indexOf('02 / UI snippets');
console.log(js.substring(Math.max(0, sIdx - 300), Math.min(js.length, sIdx + 1200)));

