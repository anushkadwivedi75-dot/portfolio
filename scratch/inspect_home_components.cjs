const fs = require('fs');
const js = fs.readFileSync('samay_bundle.js', 'utf8');

const components = ['yV', 'LV', 'DB', 'Ig', 'bW', 'sv', 'TV', 'lv', 'CW'];

components.forEach(name => {
  const funcRegex = new RegExp(`function\\s+${name}\\s*\\([^)]*\\)\\s*\\{`, 'g');
  const match = funcRegex.exec(js);
  if (match) {
    const start = match.index;
    console.log(`\n================= Component ${name} =================`);
    console.log(js.substring(start, start + 400));
  } else {
    // maybe var name = ...
    const varRegex = new RegExp(`var\\s+${name}\\s*=`, 'g');
    const vmatch = varRegex.exec(js);
    if (vmatch) {
      console.log(`\n================= Var ${name} =================`);
      console.log(js.substring(vmatch.index, vmatch.index + 300));
    }
  }
});

