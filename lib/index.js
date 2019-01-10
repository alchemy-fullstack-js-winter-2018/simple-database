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
      callback(err, objWithId);
    });
    
  }

  findById(_id, callback) {
    fs.readFile(this.storedFilePath(_id), { encoding: 'utf8' }, (err, data) => {
      try {
        const obj = JSON.parse(data);
        callback(err, obj);
      } catch(e) {
        callback(e);
      }
    });
  }

  find(callback) {
    fs.readdir(this.rootDir, (err, listOfIds) => {
      let count = listOfIds.length;
      if(count < 1) return callback(err, []);

      const dogs = [];
      listOfIds.forEach(_id => {
        this.findById(_id, (err, dog) => {
          count--;
          dogs.push(dog);
          if(count === 0) callback(null, dogs);
        });
      });
    });
  }

  storedFilePath(_id) {
    return `${this.rootDir}/${_id}`;
  }
}

module.exports = Store;
