const fs = require('fs');

const css = fs.readFileSync('samay_style.css', 'utf8');
console.log('CSS length:', css.length);

// Extract key selectors and custom properties from css
const vars = css.match(/--[a-zA-Z0-9_-]+:[^;]+;/g);
console.log('Unique CSS vars (sample 30):', [...new Set(vars || [])].slice(0, 30));

const keyframes = css.match(/@keyframes\s+([a-zA-Z0-9_-]+)/g);
console.log('Keyframes:', keyframes);

// Let's check classes
const classes = css.match(/\.[a-zA-Z0-9_-]+/g);
const uniqueClasses = [...new Set(classes || [])];
console.log('Unique classes count:', uniqueClasses.length);
console.log('Sample classes:', uniqueClasses.filter(c => !c.startsWith('.lucide') && !c.startsWith('.w-') && !c.startsWith('.h-')).slice(0, 40));

// Let's analyze samay_bundle.js for component names, section names, text, structure
const js = fs.readFileSync('samay_bundle.js', 'utf8');
console.log('JS length:', js.length);

// Find strings or section titles
const stringLiterals = js.match(/"([^"\\]|\\.)*"/g) || [];
console.log('Number of string literals in JS:', stringLiterals.length);

// Let's search for interesting strings like sections, navigation, headings
const interesting = stringLiterals.filter(s => {
  const lower = s.toLowerCase();
  return lower.includes('work') || lower.includes('about') || lower.includes('contact') || lower.includes('scroll') || lower.includes('sticky') || lower.includes('rail') || lower.includes('track');
});
console.log('Interesting strings count:', interesting.length);
console.log('Sample interesting strings:', [...new Set(interesting)].slice(0, 30));

