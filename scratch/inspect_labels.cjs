const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

let pos = 0;
let count = 0;
while ((pos = js.indexOf('section-label', pos + 1)) !== -1 && count < 10) {
  console.log(`\n--- Match ${count} (around index ${pos}) ---`);
  console.log(js.substring(Math.max(0, pos - 200), Math.min(js.length, pos + 300)));
  count++;
}

