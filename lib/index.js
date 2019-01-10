const shortId = require('shortid');
const fs = require('fs');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;

  }

  create(obj, callback) {
    const _id = shortId.generate();
    const objWithId = { ...obj, _id };
    const objWithIdStr = JSON.stringify(objWithId);

    fs.writeFile(`${this.rootDir}/${_id}.json`, objWithIdStr, err => {
      callback(err, objWithId);
    });
  }

  findById(_id, callback) {
    fs.readFile(`${this.rootDir}/${_id}`, { encoding: 'utf8' }, (err, data) => {
      try {
        const obj = JSON.parse(data);
        callback(err, obj);
      } catch(e) {
        callback(e);
      }
    });
  }

  findByIdAndDelete(_id, callback) {
    fs.unlink(`${this.rootDir}/${_id}`, err => {
      callback(err, { deleted: 1 });
    });
  }
}

module.exports = Store;
