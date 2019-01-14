const fs = require('fs');
const shortid = require('shortid');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(obj, callback) {
    // create _id and put it into obj
    const _id = shortid.generate();
    const objWithId = { ...obj, _id };
    // JSON.stringify my obj with id
    const objWithIdStr = JSON.stringify(objWithId);
    // fs.writeFile to save object on disk
    //    this.rooDir + / + ${_id.json}
    fs.writeFile(this.rootDir(_id), objWithIdStr, err => {
      // invoke callback(err, obj with id)
      callback(err, objWithId);
    });
  }

  findById(_id, callback) {
    // readJSON
    // fs.readFile to read this.rootDir + / + ${_id} file
    fs.readFile(this.storedFilePath(_id), { encoding: 'utf8' }, (err, data) => {
      // JSON.parse to turn string into object
      try {
        const obj = JSON.parse(data);
        // callback(err, parseJSON)
        callback(err, obj);
      } catch(e) {
        callback(e);
      }
    });
  }

  
  find(callback) {
    // fs.readdir -> list of files -> list of _id
    //   -> forEach _id in listOfFiles call this.findById
    // keep a count of returned callbacks
    fs.readdir(this.rootDir, (err, listOfIds) => {
      //keep a count of the number of times findById has returned
      let count = listOfIds.length;
      if(count < 1) return callback(err, []);
      
      const items = [];
      listOfIds.forEach(_id => {
        this.findById(_id, (err, item) => {
          // -> decrement count
          count--;
          // -> push the item to an array
          items.push(item);
          // -> if count === 0 return callback(null, items)
          if(count === 0) callback(null, items);
        });
      });
    });
  }

  findByIdAndDelete(_id, callback) {
    // fs.unlink(pathToFile, callback)
    fs.unlink(this.storedFilePath(_id), err => {
      // -> callback(err, { deleted: 1})
      return callback(err, { deleted: 1 });
    });

    // BONUS: what if the file doesn't exist?
    // -> return callback(err, { deleted: 0 })
  }
  
  findByIdAndUpdate(_id, updatedObject, callback) {
    // this.findById
    this.findById(_id, (err, foundItem) => {
      // -> is there something to update?
      if(err) return callback(err);
      // -> fs.writeFile
      const objToWrite = { ...updatedObject, _id };
      const objToWriteStr = JSON.stringify(objToWrite);
      fs.writeFile(this.storedFilePath(_id, objToWrite, err => {
        // -> -> invoke callback
        callback(err, objToWrite);
      }));

    });
    return callback(updatedObject);
  }

  storedFilePath(_id) {
    return `${this.rootDir}/${_id}`;
  }
}

module.exports = Store;
