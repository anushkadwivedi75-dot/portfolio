const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

const idx = js.indexOf('page-nameplate');
if (idx !== -1) {
  console.log('--- Context around page-nameplate (Hero / Top section) ---');
  console.log(js.substring(Math.max(0, idx - 400), Math.min(js.length, idx + 1200)));
}

const workIdx = js.indexOf('page page-work');
if (workIdx !== -1) {
  console.log('--- Context around page page-work ---');
  console.log(js.substring(Math.max(0, workIdx - 400), Math.min(js.length, workIdx + 1200)));
}

