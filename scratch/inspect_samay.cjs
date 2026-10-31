const fs = require('fs');
const html = fs.readFileSync('samaymaurya_direct.html', 'utf8');
console.log('HTML Length:', html.length);

const idMatches = html.match(/id="[^"]+"/g);
console.log('IDs in HTML:', [...new Set(idMatches)]);

// Check for script tags or root elements
const root = html.match(/<div id="root"[^>]*>([\s\S]*?)<\/div>/);
console.log('Root div:', root ? root[0].substring(0, 500) : 'No root div directly rendered in static HTML (SSR or SPA)');

// Let's check samay_bundle.js or samay_style.css
console.log('samay_style.css exists:', fs.existsSync('samay_style.css'));
console.log('samay_bundle.js exists:', fs.existsSync('samay_bundle.js'));
