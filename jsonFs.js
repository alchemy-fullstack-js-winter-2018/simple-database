const fs = require('fs');

function readJSON(pathToFile, callback) {
  fs.readFile(pathToFile, { encoding: 'utf8' }, (err, data) => {
    if(err) {
      return callback(err);
    }

    try {
      const json = JSON.parse(data);
      callback(null, json);
    } catch(err) {
      callback(err);
    }
  });
}

function writeJSON(pathToFile, obj, callback) {
  try {
    const data = JSON.stringify(obj);
    fs.writeFile(pathToFile, data, err => {
      if(err) {
        callback(err);
      }
      callback();
    });

  } catch(err) {
    callback(err);
  }
}

module.exports = { readJSON, writeJSON };
