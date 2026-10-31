const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

// Find router or route definitions
const routeMatches = js.match(/path:\s*`[^`]+`|path:\s*"[^"]+"/g);
console.log('Routes:', [...new Set(routeMatches)]);

// Find the main home page component
// Let's search for the component that renders Hero or Fg (the work rail)
const fgIdx = js.indexOf('function Fg(');
console.log('Fg index:', fgIdx);
if (fgIdx !== -1) {
  console.log('Fg code (first 600 chars):');
  console.log(js.substring(fgIdx, fgIdx + 600));
}

// Where is <Fg called?
const fgCalls = [];
let callIdx = 0;
while ((callIdx = js.indexOf('Fg,', callIdx + 1)) !== -1) {
  fgCalls.push(js.substring(Math.max(0, callIdx - 100), Math.min(js.length, callIdx + 200)));
}
console.log('Fg calls count:', fgCalls.length);
fgCalls.forEach((c, i) => console.log(`Call ${i}:`, c));

