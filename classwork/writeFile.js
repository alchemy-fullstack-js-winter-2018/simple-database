const fs = require('fs');

fs.writeFile('./classwork/writing.txt', 'I am banana', err => {
  if(err) throw err;
});
