const fs = require('fs');
const code = fs.readFileSync('samay_bundle.js', 'utf8');

function findContext(pattern, maxLen = 800) {
  const idx = code.indexOf(pattern);
  if (idx === -1) {
    console.log(`Pattern not found: ${pattern}`);
    return;
  }
  console.log(`=== FOUND PATTERN: ${pattern} (at ${idx}) ===`);
  console.log(code.substring(Math.max(0, idx - 100), Math.min(code.length, idx + maxLen)));
  console.log('\n===========================================\n');
}

findContext('work-stage');
findContext('work-rail');
findContext('work-stacked');
findContext('ff-hero');
findContext('fg-cursor');
findContext('sound-dock');
findContext('worklog');

