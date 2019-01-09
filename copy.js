const fs = require('fs');

function copy(src, dst, callback) {
  fs.readFile(src, { encoding: 'utf8' }, (err, data) => {
    if(err) {
      callback(err);
    }
    
    fs.writeFile(dst, data, err => {
      if(err) {
        callback(err);
      }
      return callback();
    });
  });
}

module.exports = copy;
