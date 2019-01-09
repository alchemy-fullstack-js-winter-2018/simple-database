const fs = require('fs');
const shortid = require('shortid');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(obj, callback) {
    // create _id and put it into obj
    const _id = shortid.generate();
    const objWithId = { ...obj, _id };
    // JSON.stringify my obj with id
    const objWithIdStr = JSON.stringify(objWithId);
    // fs.writeFile to save object on disk
    //    this.rooDir + / + ${_id.json}
    fs.writeFile(`${this.rootDir}/${_id}`, objWithIdStr, err => {
      // invoke callback(err, obj with id)
      callback(err, objWithId);
    });
  }
}

module.exports = Store;
