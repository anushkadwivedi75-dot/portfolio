const fs = require('fs');
const code = fs.readFileSync('samay_bundle.js', 'utf8');

const idx = code.indexOf('hero-stage');
console.log('hero-stage area:');
console.log(code.substring(idx, idx + 2500));
