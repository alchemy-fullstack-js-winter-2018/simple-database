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
      try {
        const foundItem = JSON.parse(data);
        return callback(err, foundItem);
      }
      catch(e) {
        callback(e);
      }
    });
  }
  findByIdAndDelete(_id, callback) {
    fs.unlink(`${this.rootDir}/${_id}`, err => {
      if(err) {
        return callback(err);
      }
      callback(null, { deleted: 1 });
    });
  }
  // find(callback) {
  //   fs.readdir(`${this.rootDir}`, (err, listOfItems) => {
  //     let count = listOfItems.length;
  //     if(count < 1) return callback(err, []);
  //     listOfItems.forEach(_id => {
  //       this.findById(listOfItems._id => {
        
  //     });
  //   });
}

module.exports = { 
  
  Store 

};
