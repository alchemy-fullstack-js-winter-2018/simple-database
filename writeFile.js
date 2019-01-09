const fs = require('fs');


fs.writeFile('./writing.txt', "I am written", err => {
  if(err) {
    throw err;
  }
});
