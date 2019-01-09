const fs = require('fs');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(obj, callback) {
    // create _id and put it into obj
    // JSON.stringify my obj with id
    // fs.writeFile to save object on disk
    //    this.rooDir + / + ${_id.json}
    // invoke callback(err, obj with id)
  }
}

module.exports = Store;
