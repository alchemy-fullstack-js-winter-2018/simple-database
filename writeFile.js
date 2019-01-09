const fs = require('fs');

fs.writeFile('./writing.txt', 'I am writing!!! Magic!', err => {
  if(err) {
    throw err;
  }
});
