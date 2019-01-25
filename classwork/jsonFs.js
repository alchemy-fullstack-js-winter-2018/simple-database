const fs = require('fs');

function readJSON(pathToFile, callback) {
  fs.readFile(pathToFile, { encoding: 'utf8' }, (err, data) => {
    if(err) {
      return callback(err);
    }
    const json = JSON.parse(data);
    return callback(null, json);
  });
}

function writeJSON(pathToFile, obj, callback) {
  const string = JSON.stringify(obj);
  fs.writeFile(pathToFile, string, err => {
    if(err) {
      return callback(err);
    }
    return callback(null, string);
  });
}

module.exports = { 
  readJSON, 
  writeJSON
};
