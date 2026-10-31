const fs = require('fs');
const html = fs.readFileSync('samaymaurya_direct.html', 'utf8');
console.log('HTML Length:', html.length);

// Extract all tags with id or class
const matches = html.match(/<(section|div|main|header|footer|nav)[^>]*(id="[^"]*"|class="[^"]*")[^>]*>/g);
if (matches) {
  console.log('Found structure tags:', matches.slice(0, 30));
}

// Let's also search for main landmark sections
const idMatches = html.match(/id="[^"]+"/g);
console.log('IDs in HTML:', [...new Set(idMatches)]);

const classMatches = html.match(/class="[^"]+"/g);
console.log('Classes count:', classMatches ? classMatches.length : 0);

