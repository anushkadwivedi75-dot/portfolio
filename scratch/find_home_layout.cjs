const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

// Find the component that renders Hero, Ig (Featured work), Summit, Experience, Outro
const outroIdx = js.indexOf('function dv(') || js.indexOf('outro');
// Let's search for '<Ig' or 'Ig,'
const igCalls = [];
let idx = 0;
while ((idx = js.indexOf('(0,G.jsx)(Ig', idx + 1)) !== -1) {
  igCalls.push(idx);
}
console.log('Ig calls:', igCalls);
if (igCalls.length > 0) {
  const callPos = igCalls[0];
  console.log('--- Context around Ig call (Homepage layout) ---');
  console.log(js.substring(Math.max(0, callPos - 400), Math.min(js.length, callPos + 1000)));
}

