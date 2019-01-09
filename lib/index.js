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
    fs.readFile(`${this.rootDir}/${_id}.json`, (err, data) => {
      const objectFromFile = JSON.parse(data);
      if(err) {
        return null;
      }
      callback(null, objectFromFile);
    });
    // if(objectFromFile) {
    //   callback(null, objectFromFile);
    // }
    // else {
    //   return null;
    // }
    
  }


}

module.exports = Store;
