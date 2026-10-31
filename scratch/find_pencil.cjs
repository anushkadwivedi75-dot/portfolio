const fs = require('fs');
const css = fs.readFileSync('samay_style.css', 'utf8');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

// Find all CSS rules with pencil
const pencilCss = [];
for (const rule of css.split('}')) {
  if (rule.includes('pencil')) {
    pencilCss.push(rule + '}');
  }
}
console.log('--- Pencil CSS ---');
console.log(pencilCss.join('\n'));

// Find Pencil component CW in JS
const cwIdx = js.indexOf('function CW(');
if (cwIdx !== -1) {
  console.log('\n--- Pencil Component in JS ---');
  console.log(js.substring(cwIdx, cwIdx + 2000));
}

