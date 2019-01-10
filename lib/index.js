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
    fs.writeFile(`${this.rootDir}/${_id}`, strObj, (err) => {
      if(err) {
        callback(err);
      }
      callback(null, copiedObj);
    });
  }

  findById(_id, callback) {
    fs.readFile(`${this.rootDir}/${_id}`, { encoding: 'utf8' }, (err, data) => {
    
      const objectFromFile = JSON.parse(data);
      callback(err, objectFromFile);
    });
  }

  findByIdAndDelete(_id, callback) {
    console.log('rootdir', this.rootDir);
    fs.unlink(`${this.rootDir}/${_id}`, (err) => {
      if(err) {
        return callback(err);
      }
      callback(null, { deleted: 1 });
  
    });
  }

  find(callback) {
    fs.readdir(this.rootDir, (err, listOfIds) => {
      let count = listOfIds.length;
      if(count < 1) return callback(err, []);

      const items = [];
      listOfIds.forEach(_id => {
        this.findById(_id, (err, item) => {
          count--;
          items.push(item);
          if(count === 0) callback(null, items);
        });
      });
    });
  }
}

module.exports = Store;
