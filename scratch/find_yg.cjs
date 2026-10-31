const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

const ygIdx = js.indexOf('function yg(');
if (ygIdx !== -1) {
  console.log('yg function:', js.substring(ygIdx, ygIdx + 1000));
}

const ngIdx = js.indexOf('var Ng=');
if (ngIdx !== -1) {
  console.log('Ng var:', js.substring(ngIdx, ngIdx + 300));
}

