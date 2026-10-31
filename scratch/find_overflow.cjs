const fs = require('fs');
const css = fs.readFileSync('samay_style.css', 'utf8');

const regex = /(html|body|#root|main|\.page|\.shell)[^{}]*\{[^{}]*overflow[^{}]*\}/g;
let m;
while (m = regex.exec(css)) {
  console.log(m[0]);
}

// Check how sticky is maintained
const stickyMatches = css.match(/[^{}]*sticky[^{}]*\{[^{}]*\}/g);
console.log('\nSticky elements:', stickyMatches);

