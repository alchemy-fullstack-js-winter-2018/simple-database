const fs = require('fs');

function writeJSON(pathFile, obj, callback) {
  const objString = JSON.stringify(obj);

  fs.writeFile(pathFile, objString, err => {
    if(err) {
      return callback(err);
    }
    // const json = JSON.parse(data);
    callback();
  });
}

module.exports = { writeJSON };
