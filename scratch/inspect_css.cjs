const fs = require('fs');
const css = fs.readFileSync('samay_style.css', 'utf8');

function findCssRules(selector) {
  let idx = 0;
  while ((idx = css.indexOf(selector, idx)) !== -1) {
    const start = Math.max(0, idx - 50);
    const end = Math.min(css.length, idx + 450);
    console.log(`=== CSS FOR: ${selector} ===`);
    console.log(css.substring(start, end));
    console.log('\n---------------------------------\n');
    idx += selector.length + 10;
    break;
  }
}

findCssRules('.work-scroll');
findCssRules('.work-stage');
findCssRules('.work-rail');
findCssRules('.work-card');
findCssRules('.sound-dock');
findCssRules('.sound-bars');
findCssRules('.worklog');
findCssRules('.fg-cursor');

