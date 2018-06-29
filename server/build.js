const s = require('shelljs');
const fs = require('fs');

s.rm('-rf', 'build');
s.mkdir('build');
if (!fs.existsSync('build/.env')) {
  s.cp('.env', 'build/.env');
}
