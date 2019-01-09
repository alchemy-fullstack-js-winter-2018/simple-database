const fs = require('fs');

fs.readFile('./LAB.md', {encoding: 'utf8' }, (err, data) => {
  if (err) throw `Error reading file: ${err}`;
  fs.writeFile('./LAB-copy.md', data, err => {
    if (err) throw err;
  });
});