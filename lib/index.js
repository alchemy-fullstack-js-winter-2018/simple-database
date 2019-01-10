const shortId = require('short-id');
const fs = require('fs');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(objectToSave, callback) {
    const _id = shortId.generate();
    const copiedObj = { ...objectToSave, _id };
    const strObj = JSON.stringify(copiedObj);
    fs.writeFile(`${this.rootDir}/${_id}.json`, strObj, (err) => {
      if(err) {
        callback(err);
      }
      callback(null, copiedObj);
    });
  }

  findById(_id, callback) {
    fs.readFile(`${this.rootDir}/${_id}.json`, { encoding: 'utf8' }, (err, data) => {
      try {
        const objectFromFile = JSON.parse(data);
        callback(err, objectFromFile);
      }
      catch(e) {
        callback(e);
      }
    });
  }

  findByIdAndDelete(_id, callback) {
    console.log('rootdir', this.rootDir);
    fs.unlink(`${this.rootDir}/${_id}.json`, (err) => {
      if(err) {
        return callback(err);
      }
      callback(null, { deleted: 1 });
  
    });
  }

  // find(_id, callback) {

  // }
}

module.exports = Store;
