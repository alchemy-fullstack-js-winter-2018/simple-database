const fs = require('fs');
const shortid = require('shortid');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(obj, callback) {
    //create _id and put it into object
    const _id = shortid.generate();  
    //

    //json stringify my object with id
    const objWithId = { ...obj, _id };
    const objWithIdStr = JSON.stringify(objWithId);

    //fs.writeFile to save object on disk, this.rootDir + / + ${_id}.json
    fs.writeFile(this.storedFilePath(_id), objWithIdStr, err => {
      return callback(err, objWithId);  // no return needed?
    //  if(err) return callback(err);
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

  // find() {
  //   //fs.deaddr list of files in directory
  //   //for each file we can call findById
  // }

  storedFilePath(_id) {
    return `${this.rootDir}/${_id}`;
  }
}

module.exports = Store;
