const fs = require('fs');

const css = fs.readFileSync('samay_style.css', 'utf8');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

// Let's search for all CSS rules for work-card, more-work, fg-, hero, etc.
const relevantCss = [];
const lines = css.split('}');
for (const block of lines) {
  if (block.includes('work-') || block.includes('hero') || block.includes('fg-') || block.includes('more-work') || block.includes('more-preview') || block.includes('dock') || block.includes('log-') || block.includes('outro') || block.includes('texture')) {
    relevantCss.push(block + '}');
  }
}
fs.writeFileSync('scratch/extracted_styles.css', relevantCss.join('\n'));
console.log('Extracted relevant CSS lines:', relevantCss.length);

// Let's also inspect all React component names or function definitions in JS
const funcMatches = js.match(/function\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*\{[^}]*return\s*\(0,[A-Za-z]\.jsx/g);
console.log('Component functions found:', funcMatches ? funcMatches.length : 0);
if (funcMatches) {
  console.log('Sample component functions:', funcMatches.slice(0, 15));
}

