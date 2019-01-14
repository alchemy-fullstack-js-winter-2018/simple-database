
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
    //    this.rootDir + / + ${_id}.json
    fs.writeFile(`${this.rootDir}/${_id}`, objWithIdStr, err => {
      // invoke callback(err, obj with id)
      // if(err) return callback(err)
      callback(err, objWithId);
    });

  }
  findById(_id, callback) {
    // readJSON
    // fs.readFile to read the this.rootDir + / + ${_id} file
    fs.readFile(this.storedFilePath(_id), { encoding: 'utf8' }, (err, data) => {
      // JSON.parse to turn string into object
      try {
        const obj = JSON.parse(data);
        callback(err, obj);
      } catch (err) {
        callback(err);
      }
    });
  }

  find(callback) {
    fs.readdir(this.rootDir, (err, listOfIds) => {
      let count = listOfIds.length;
      if (count < 1) return callback(err, []);

      const items = []
      listOfIds.forEach(_id => {
        this.findById(_id, (err, item) => {
          // -> decrement the count 
          count--;
          // -> push the item to items
          items.push(item);
          // -> if count === 0 return callback(null, items)
          if (count === 0) callback(null, items);
        });
      })
    })
  }
  // findByIdAndDelete(_id, callback{ 
  //   //fs.unlink(pathtoFile, callback
  //   //callback(err, {deleted: 1}))
  // })

  //Find by ID and Update
  findByIdAndUpdate(_id, updatedObject, callback) {
    //this.findById
    this.findById(_id, (err, foundItem => {
      //->is there something to update??
      if (err) return callback(err);
      //->fs.writeFile
      const objToWrite = { ...updatedObject, _id };
      const objToWrite = JSON.stringify(objToWrite);
      fs.writeFile(this.storedFilePath(_id), objToWriteStr, err => {
        //-> -> invoke callback

      })

    }))
  }

  storedFilePath(_id) {
    return `${this.rootDir}/${_id}`
  }
}

module.exports = Store