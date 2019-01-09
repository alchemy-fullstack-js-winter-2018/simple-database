const fs = require('fs');
const shortid = require('shortid');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(obj, callback) {
    //create _id and put it into obj
    const _id = shortid.generate();
    const objWithId = { ...obj, _id };
    // JSON.stringify my obj
    const objWithIdStr = JSON.stringify(objWithId);
    // fs.writeFile to save object on disk
    fs.writeFile(`${this.rootDir}/${_id}`, objWithIdStr, err => {
      if(err) return callback(err);
      callback(null, objWithId);
    });
    //  this.rootDir + / + _id.json
    // invoke callback(err, obj with _id)
  }

  findById(_id, callback) {
    //readJSON
  }
}

module.exports = Store;
