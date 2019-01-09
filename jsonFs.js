const fs = require('fs');

function readJSON(pathToFile, callback) {
  fs.readFile(pathToFile, { encoding: 'utf8' }, (err, data) => {
    if(err) {
      return callback(err);
    }
    //JSON.parse to create JSON object from data
    //invoke callback with no error
    const result = JSON.parse(data);
    callback(null, result);
  });
  callback(err, result);
}

module.exports = {
  readJSON
};