const http = require('http');
const { spawn } = require('child_process');

console.log('Starting preview server...');
const child = spawn('cmd.exe', ['/c', 'npm', 'run', 'preview', '--', '--port', '4173'], { stdio: 'pipe' });

child.stdout.on('data', (d) => {
  // console.log('[server stdout]:', d.toString());
});
child.stderr.on('data', (d) => {
  // console.log('[server stderr]:', d.toString());
});

setTimeout(() => {
  http.get('http://127.0.0.1:4173', (res) => {
    console.log('HTTP Status Code:', res.statusCode);
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log('HTML Body Length:', body.length);
      console.log('Contains root div:', body.includes('id="root"'));
      console.log('Contains title:', body.includes('<title>'));
      child.kill();
      process.exit(0);
    });
  }).on('error', (err) => {
    console.error('Connection error:', err.message);
    child.kill();
    process.exit(1);
  });
}, 2500);

