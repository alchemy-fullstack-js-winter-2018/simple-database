const fs = require('fs');

function readJSON(pathToFile, callback) {
  fs.readFile(pathToFile, { encoding: 'utf8' }, (err, data) => {
    if(err) {
      return callback(err);
    }
    // JSON.parse to create a JSON object from data
    try {
      const json = JSON.parse(data);
      // invoke callback(null,json)
      callback(null, json);

    } catch(e) {
      callback(e);
    }
    
  });
}

function writeJSON(path, obj, callback) {
  const str = JSON.stringify(obj);
  fs.writeFile(path, str, err => {
    if(err) return callback(err);
    callback();
  });
}

module.exports = {
  readJSON,
  writeJSON
};
