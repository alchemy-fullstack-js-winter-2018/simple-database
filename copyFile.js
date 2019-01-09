const fs = require('fs');

fs.readFile('./LAB.md', { encoding: 'utf8' }, (err, data) => {
  if(err) throw err;
  fs.writeFile('./LAB-copy.md', data, err => {
    if(err) throw err;
  });
});


