const fs = require('fs');


function readJSON(pathFile, callback) {
  fs.readFile(pathFile, { encoding: 'utf8' }, (err, data) => {
    if(err) {
      return callback(err);
    }

    // JSON.parse to create a JSON object from data
    try {
      const json = JSON.parse(data);
      // invoke callback(null, json)
      callback(null, json);
    }
    catch(err) {
      callback(err);
    }
  });
}

module.exports = { readJSON };

