const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

const cwIdx = js.indexOf('pencil-progress-pencil');
if (cwIdx !== -1) {
  console.log('--- Context around pencil SVG ---');
  console.log(js.substring(Math.max(0, cwIdx - 200), Math.min(js.length, cwIdx + 1200)));
}

