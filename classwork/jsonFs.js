const fs = require('fs');

function readJSON(pathToFile, callback) {
  fs.readFile(pathToFile, { encoding: 'utf8' }, (err, data) => {
    if(err) {
      return callback(err);
    }
    try {
    const json = JSON.parse(data);
    callback(null, json);
    } catch (e) {
      callback(e)
    }
  });
}

function writeJSON(pathToFile, obj, callback) {
  const strObject = JSON.stringify(obj);
  fs.writeFile(pathToFile, strObject, err => {
    callback(err)
  });

} catch(e) {
  callback(e)
}
module.exports = {
  readJSON
};
