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
    fs.readFile(`${this.rootDir}/${_id}`, (err, data) => {
      const foundItem = JSON.parse(data);
      return callback(err, foundItem);
    });
  }
}

module.exports = { 
  
  Store 

};
