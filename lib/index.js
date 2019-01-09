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
    console.log('hello', strObject);

    fs.writeFile(`${this.rootDir}/${_id}`, strObject, err => {
      
      return callback(err, object); 

    });
  }
}

module.exports = { 
  
  Store 

};
