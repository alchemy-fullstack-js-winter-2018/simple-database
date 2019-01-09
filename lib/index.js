const shortid = require('shortid');
const fs = require('fs');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }
  create(obj, callback) {
    const _id = shortid.generate();
    const copyObj = { ...obj, _id };
    const data = JSON.stringify(copyObj);
    fs.writeFile(`${this.rootDir}/${_id}`, data, err => {
      callback(err, copyObj);
    });
  }

  findById(_id, callback) {
    fs.readFile(`${this.rootDir}/${_id}`, { encoding: 'utf8' }, (err, data) => {
      if(err) {
        return callback(err);
      }
      const json = JSON.parse(data);
      return callback(null, json);
    });
  }
}

module.exports = Store;
