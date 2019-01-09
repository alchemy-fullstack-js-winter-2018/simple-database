const fs = require('fs');

function copy(src, dst, callback) {
  fs.readFile('./LAB.md', { encoding: 'utf8' }, (err, data) => {
    if (err) {
      callback(err);
    }
    fs.writeFile(dst, data, err => {
      if(err) {
        callback(err);
      }
      callback();
    });
   });
}


module.exports = copy;

