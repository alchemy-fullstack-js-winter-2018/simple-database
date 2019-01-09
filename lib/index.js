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
      const objectThatSaved = JSON.parse(strObj);
      callback(null, objectThatSaved);
    });
  }

  // findById(_id, callback) {
  //   const objectFromFile = this.rootDir[_id];
  //   if(objectFromFile) {
  //     return objectFromFile;
  //   }
  //   else {
  //     return null;
  //   }
  //   callback(null, objectFromFile)
  // }


}

module.exports = Store;
