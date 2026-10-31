const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

// Find the main App component or router
// Look for where header, hero, work, about, etc. are assembled together
const idx = js.indexOf('function dv('); // let's find the route components
console.log('Searching for main page layout...');

// Let's search for "01 / Featured work" or "section-label"
let match;
const re = /"([0-9]{2}\s*\/\s*[^"]+)"/g;
const sectionHeaders = [];
while (match = re.exec(js)) {
  sectionHeaders.push(match[1]);
}
console.log('Section numbers/headers:', [...new Set(sectionHeaders)]);

// Let's find all occurrences of section-label or similar in CSS/JS
const labelMatches = js.match(/className:`[^`]*section-label[^`]*`/g);
console.log('Section label classes:', [...new Set(labelMatches || [])]);

