const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

const bgIdx = js.indexOf('function bg(');
console.log('bg full:', js.substring(bgIdx, bgIdx + 1200));

const hgIdx = js.indexOf('function hg(');
console.log('hg full:', js.substring(hgIdx, hgIdx + 500));

const _gIdx = js.indexOf('function _g(');
console.log('_g full:', js.substring(_gIdx, _gIdx + 1000));

