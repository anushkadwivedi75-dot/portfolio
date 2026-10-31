const fs = require('fs');
const css = fs.readFileSync('samay_style.css', 'utf8');

const classNames = [
  'work-scroll',
  'work-stage',
  'work-rail',
  'work-card',
  'work-card-header',
  'work-card-media',
  'work-card-title',
  'work-card-tags',
  'work-stage-label',
  'work-stage-skip',
  'more-work',
  'more-preview',
  'dark-register',
  'work-stacked'
];

classNames.forEach(cn => {
  console.log(`\n=================== .${cn} ===================`);
  const regex = new RegExp(`(\\.[^{}]*${cn}[^{}]*\\{[^{}]*\\})`, 'g');
  let match;
  let count = 0;
  while ((match = regex.exec(css)) !== null && count < 5) {
    console.log(match[1]);
    count++;
  }
});

