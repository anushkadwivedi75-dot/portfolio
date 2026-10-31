const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

const wbIdx = js.indexOf('function wB(');
console.log('wB function (first 1000 chars):');
console.log(js.substring(wbIdx, wbIdx + 1000));

// Find Three.js or WebGL in wB
const threeMatches = js.substring(wbIdx, wbIdx + 3000).match(/THREE\.[A-Za-z0-9]+|WebGLRenderer|PerspectiveCamera|GLTFLoader/g);
console.log('Three.js / WebGL tokens in wB:', threeMatches);

