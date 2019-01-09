const fs = require('fs');

fs.writeFile('./writing.txt', 'I am banana', err => {
  if(err) throw err;
});
