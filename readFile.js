const fs = require('fs');

fs.readFile('./LAB.md', { encoding: 'utf8' }, (err, data) => {
  console.log(data);
});
