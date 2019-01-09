const fs = require('fs');

function readJSON(pathToFile, callback) {
  fs.readFile(pathToFile, { encoding: 'utf8' }, (err, data) => {
    if(err) {
      return callback(err);
    }
    // JSON.parse to create a JSON object from data
    const json = JSON.parse(data);
    // invoke callback(null, json)
    callback(null, json);
  });
}

function writeJSON(pathToFile, obj, callback) {
  const data = JSON.stringify(obj);
  fs.writeFile(pathToFile, data, err => {
    if(err) {
      callback(err);
    }
    callback();
  });
}

module.exports = { readJSON, writeJSON };
