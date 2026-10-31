const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

const bgIdx = js.indexOf('function bg(');
console.log('--- bg full ---');
console.log(js.substring(bgIdx, bgIdx + 1100));

const fgIdx = js.indexOf('function Fg(');
console.log('\n--- Fg full ---');
console.log(js.substring(fgIdx, fgIdx + 1400));

