const fs = require('fs');
const css = fs.readFileSync('samay_style.css', 'utf8');

const idx = css.indexOf('.work-scroll');
console.log(css.substring(idx - 100, idx + 2500));
