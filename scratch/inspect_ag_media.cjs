const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

const agIdx = js.indexOf('function Ag(');
console.log('Ag media part:');
console.log(js.substring(agIdx + 1200, agIdx + 2400));

