const fs = require('fs');
const css = fs.readFileSync('samay_style.css', 'utf8');

const regex = /--work-[a-z0-9_-]+:[^;]+;|--stage-vh:[^;]+;/g;
const matches = css.match(regex);
console.log('Work CSS vars:', [...new Set(matches || [])]);

