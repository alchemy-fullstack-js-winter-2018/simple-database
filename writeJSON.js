const fs = require('fs');

function writeJSON(pathFile, obj, callback) {
  try {
    // JSON.stringify my obj
    const strObject = JSON.stringify(obj);
    // fs.writeFile to write file to disk
    fs.writeFile(pathFile, strObject, err => {
      callback(err);
    });
  } 
  catch(err) {
    callback(err);
  }
}

module.exports = { writeJSON };
