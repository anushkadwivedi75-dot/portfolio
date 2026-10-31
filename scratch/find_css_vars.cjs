const fs = require('fs');
const css = fs.readFileSync('samay_style.css', 'utf8');

// Find :root definition or theme variables
const rootIdx = css.indexOf(':root');
if (rootIdx !== -1) {
  console.log('--- :root CSS variables ---');
  console.log(css.substring(rootIdx, rootIdx + 1200));
}

// Find dark mode or color schemes
const darkMatches = css.match(/\[data-theme=[^\]]+\]|\.dark\s*\{|@media\s*\(prefers-color-scheme:\s*dark\)/g);
console.log('Dark mode selectors:', darkMatches);

// Find fonts
const fontFaces = css.match(/@font-face\s*\{[^}]+\}/g);
console.log('Font faces count:', fontFaces ? fontFaces.length : 0);
if (fontFaces) {
  fontFaces.forEach((f, i) => console.log(`Font ${i}:`, f.substring(0, 150)));
}

