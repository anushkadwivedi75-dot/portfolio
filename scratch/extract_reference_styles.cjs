const fs = require('fs');
const css = fs.readFileSync('samay_style.css', 'utf8');

const terms = ['squiggle', 'intro-stage', 'intro-line', 'headset-stage', 'summit', 'browser-section', 'worklog', 'music', 'k2'];

terms.forEach(term => {
  const idx = css.indexOf(term);
  if (idx !== -1) {
    console.log(`\n================= ${term} =================`);
    console.log(css.substring(Math.max(0, idx - 80), Math.min(css.length, idx + 450)));
  }
});

