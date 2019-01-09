const fs = require('fs');


function readJSON(pathFile, callback) {
  fs.readFile(pathFile, { encoding: 'utf8' }, (err, data) => {
    if(err) {
      return callback(err);
    }
      const json = JSON.parse(data);
      callback(null, json);
    });
 }

 module.exports = { readJSON };

