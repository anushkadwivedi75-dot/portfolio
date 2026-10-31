const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

const svIdx = js.indexOf('function sv(');
console.log('sv function:');
console.log(js.substring(svIdx, svIdx + 2000));

