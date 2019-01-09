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

    //read file and return parsed object
  }

  findById(_id, callback) {
    fs.readFile(`${this.rootDir}/${_id}.json`, { encoding: 'utf8' }, (err, data) => {
      err ? callback(err) : data ? callback(false, JSON.parse(data)) : callback(false, null);
    });
  }
}

module.exports = Store;
