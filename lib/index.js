const shortid = require('shortid');
const fs = require('fs');
class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }
  create(obj, callback) {
    //create_id and put it into obj
    const _id = shortid.generate();
    //JSON stringify obj
    const objString = { ...obj, _id };
    const objStringIdWithString = JSON.stringify(objString);
    //fs.writeFile to save object
    fs.writeFile(`${this.rootDir}/${_id}`, objStringIdWithString, err => {
    //invoke callback(err, obj with id)
      // if(err) return callback(err);
      callback(err, objString);
    }
    );}
}   

module.exports = Store;
