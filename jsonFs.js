const fs = require('fs');

function readJSON(pathToFile, callback) {
  fs.readFile(pathToFile, { encoding: 'utf8' }, (err, data) => {
    if(err) {
      return callback(err);
    }
    //JSON.parse to create JSON object from data
    //invoke callback with no error
    try {
      const result = JSON.parse(data);
      callback(null, result);
    }
    catch(e) {
      callback(e);
    }
  });
}

function writeJSON(pathToFile, obj, callback) {
  try {
    const strObject = JSON.stringify(obj);
    fs.writeFile(pathToFile, strObject, (err, data) => {
      if(err) {
        return callback(err);
      }
      callback(null, data);
    });
  }
  catch(e) {
    callback(e);
  }
}

module.exports = {
  readJSON,
  writeJSON
};
