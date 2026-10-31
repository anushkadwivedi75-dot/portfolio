const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

// Find all components rendered in the main page router
// In react-router, look for routes
const routerIdx = js.indexOf('createBrowserRouter') || js.indexOf('Routes');
console.log('Router search...');

// Let's search for the component that has hero, work, summit, experience
const allSections = ['hero-stage', 'work-scroll', 'summit', 'browser-section', 'outro'];
allSections.forEach(s => {
  const i = js.indexOf(s);
  console.log(`${s}: ${i}`);
});

// Let's find the function that contains both 'work-scroll' or 'work' AND 'experience'
// Let's look for the main page return statement
const pageMatches = [];
let pIdx = 0;
while ((pIdx = js.indexOf('id:`experience`', pIdx + 1)) !== -1) {
  pageMatches.push(js.substring(Math.max(0, pIdx - 300), Math.min(js.length, pIdx + 300)));
}
console.log('Experience matches:', pageMatches.length);
pageMatches.forEach((m, idx) => console.log(`Match ${idx}:\n`, m));

