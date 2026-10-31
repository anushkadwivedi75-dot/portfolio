const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

const bwIdx = js.indexOf('function bW(');
console.log('bW function full:');
console.log(js.substring(bwIdx, bwIdx + 2000));

