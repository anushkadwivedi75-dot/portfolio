const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

const lvIdx = js.indexOf('function LV(');
console.log('LV function full:');
console.log(js.substring(lvIdx, lvIdx + 1200));

const dbIdx = js.indexOf('function DB(');
console.log('DB function full:');
console.log(js.substring(dbIdx, dbIdx + 1500));

