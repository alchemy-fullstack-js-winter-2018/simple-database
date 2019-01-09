const shortId = require('short-id');
const fs = require('fs');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(toSave, callback) {
    const _id = shortId.generate();
    let toSaveCopy = { ...toSave, _id };

    fs.writeFile(`${this.rootDir}/${_id}.json`, JSON.stringify(toSaveCopy), err => {
      err ? callback(err) : callback(false, toSaveCopy);
    });
  }
}

module.exports = Store;
