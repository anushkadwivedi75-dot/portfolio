const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

// Find where <main> or the top-level page layout is rendered
const mainMatches = [];
let idx = 0;
while ((idx = js.indexOf('<main', idx + 1)) !== -1) {
  mainMatches.push(js.substring(Math.max(0, idx - 100), Math.min(js.length, idx + 400)));
}
console.log('Main matches count:', mainMatches.length);
mainMatches.forEach((m, i) => {
  console.log(`--- Match ${i} ---`);
  console.log(m);
});

// Let's also search for the main page component that renders Hero, Work, About, etc.
const sections = js.match(/className:`(?:page|home|layout|portfolio|shell)[^`]*`/g);
console.log('Page/home classes:', sections);

