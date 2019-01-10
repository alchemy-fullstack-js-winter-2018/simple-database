const fs = require('fs');

function copy(src, dst, callback) {
  fs.readFile(src, { encoding: 'utf8' }, (err, data) => {
    if (err) throw `Error reading file: ${err}`;
    fs.writeFile(dst, data, err => {
      if (err) throw err;
      callback();
    });
  });
}

copy('message.txt', 'destination.txt');