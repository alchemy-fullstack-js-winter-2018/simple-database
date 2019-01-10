const fs = require('fs');
const shortid = require('shortid');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(obj, callback) {
    const _id = shortid.generate();
    const objWithId = { ...obj, _id };
    const objWithIdStr = JSON.stringify(objWithId);
    fs.writeFile(this.storedFilePath(_id), objWithIdStr, err => {
      if(err) return callback(err);
      callback(null, objWithId);
    });
    
  }

  findById(_id, callback) {
     
  }


  storedFiledPath(_id) {
    return `${this.rootDir}/${_id}`;
  }
}

module.exports = Store;
