const fs = require('fs');
const shortid = require('shortid');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(obj, callback) {
    //create id and put it into obj
    const _id = shortid.generate();
    const objWithId = { ... obj, _id };
    //json stringify my obj with id
    const objWithIdStr = JSON.stringify(objWithId);
    //fs.writeFile to save object on disk
    //    this.root dir + / + ${_id}. json
    fs.writeFile(`${this.rootDir}/${_id}`, objWithIdStr, err => {
      callback(err, objWithId);
    });
    //invoke callback(err, obj with id)
  }
}

module.exports = Store;
