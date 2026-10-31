const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

const jgIdx = js.indexOf('var jg');
console.log('jg definition:', js.substring(jgIdx, jgIdx + 200));

// Let's print the entire Fg component!
const fgIdx = js.indexOf('function Fg(');
console.log('Fg full code:');
console.log(js.substring(fgIdx, fgIdx + 2500));

// Let's print Pg full code!
const pgIdx = js.indexOf('function Pg(');
console.log('Pg full code:');
console.log(js.substring(pgIdx, pgIdx + 1500));

