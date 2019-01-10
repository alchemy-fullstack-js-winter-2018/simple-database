const fs = require('fs');
const shortid = require('shortid');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }
  create(obj, callback) {
    //create_id and put it into obj
    const _id = shortid.generate();
    const objString = { ...obj, _id };
    const objStringIdWithString = JSON.stringify(objString);
    fs.writeFile(this.storedFilePath(_id), objStringIdWithString, err => {
      callback(err, objString);
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

  find(callback) {
    //fs.readdir list of files in directory
    fs.readdir(this.rootDir, (err, listOfIds) => {
      let count = listOfIds.length;
      if(count < 1) return callback(err, []);
      const items = [];
      listOfIds.forEach(_id => {
      });
    });
    //for each file we can call findById
  }

  storedFilePath(_id) {
    return `${this.rootDir}/${_id}`;
  }
}
module.exports = Store;
