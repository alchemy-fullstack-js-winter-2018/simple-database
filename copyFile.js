const fs = require('fs');

// creates new lab copy and writes contents of lab.md to it
fs.readFile('./LAB.md', { encoding: 'utf8' }, (err, data) => {
  if(err) throw err;
  return data = fs.writeFile('LAB-copy.md', data, err => {
    if(err) throw err;
  });
});
