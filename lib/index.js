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
    fs.writeFile(`${this.rootDir}/${_id}`, objWithIdStr, err => {
      return callback(err, objWithId);
    //  if(err) return callback(err);
    });    
  }

  // findById(_id, callback) {
  //   //readJSON
  //   //fs.readFile()  ///this.dootDir + / + ${id} find
  //   //JSON.parse to turn string into an object
  //   //callback(err, parsedJSON)
  // };
}

module.exports = Store;
