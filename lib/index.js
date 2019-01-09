const shortid = require('shortid');
const fs = require('fs');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.shortid = shortid;
  }
  create(obj, callback) {
    const _id = shortid.generate();
    const object = { ... obj, _id };
    const strObject = JSON.stringify(object);

    fs.writeFile(`${this.rootDir}/${_id}`, strObject, err => {
      
      return callback(err, object); 

    });
  }
  findById(_id, callback) {
    fs.readFile(`${this.rootDir}/${_id}`, _id, err => {
      return callback(err, _id);
    });
  }
}

module.exports = { 
  
  Store 

};
