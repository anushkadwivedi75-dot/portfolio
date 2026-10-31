const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

const agIdx = js.indexOf('function Ag(');
console.log('Ag full code:');
console.log(js.substring(agIdx, agIdx + 1500));

