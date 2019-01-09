const fs = require('fs');

fs.readFile('./LAB.md', {encoding: 'UTF8' }, (err, data) => {
  if(err) {
    throw err;
  }
  console.log(data);
});