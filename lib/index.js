const shortid = require('shortid');
const fs = require('fs');


class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(obj, callback) {
    // create _id and put it into obj
    const _id = shortid.generate();
    const newObj = { ...obj, _id };
    // JSON.stringify my obj with id
    console.log('index', newObj);
    const objString = JSON.stringify(newObj);
    // fs.writeFile to save object on disk
    //    this.rootDir + / ${_id}.json
    const path = `${this.rootDir}/ ${_id}`;
    fs.writeFile(path, objString, err => {
      if(err) return callback(err);
      callback(err, newObj);
    // invoke callback(err, obj with id)
    });
  } 
  
  findById(_id, callback) {
    // readJSON
    // fs.readFile to read the this.rootDir
    // JSON.parse to turn string into object
    // callback(err, parsedJSON)

  }
}  
  
module.exports = Store;
    
  




