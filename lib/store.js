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
      err ? callback(err, null) : callback(false, JSON.parse(data));
    });
  }

  delete(_id, callback) {
    fs.unlink(`${this.rootDir}/${_id}.json`, err => {
      err ? callback(err, { deleted: 0 }) : callback(err, { deleted: 1 });
    });
  }

  find(callback) {
    fs.readdir(`${this.rootDir}`, (err, files) => {
      files ? callback(err, files.sort()) : callback(err, []);
    });
  }

  update(_id, newEmoji, callback) {
    fs.writeFile(`${this.rootDir}/${_id}.json`, JSON.stringify(newEmoji), wErr => {
      if(!wErr) {
        fs.readFile(`${this.rootDir}/${_id}.json`, { encoding: 'utf8' }, (rErr, data) => {
          rErr ? callback(rErr) : callback(rErr, JSON.parse(data));
        });
      }
    });
  }
}

module.exports = Store;
