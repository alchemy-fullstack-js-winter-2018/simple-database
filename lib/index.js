const shortid = require('shortid');
const fs = require('fs');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
    
  }

  create(obj, callback) {
  
    
    const _id = shortid.generate();
    const objWithId = { ...obj, _id };
    const objWithIdStr = JSON.stringify(objWithId);
  
    fs.writeFile(`${this.rootDir}/${_id}`, objWithIdStr, err => {
      if(err) return callback(err);
      callback(null, objWithId);
    });

  }

  findById(_id, callback) {
    
    fs.readFile(`${this.rootDir}/${_id}`, { encoding: 'utf8' }, (err, data) => {
      if(err) return callback(err);

      try {
        const parsedJSON = JSON.parse(data);
        callback(null, parsedJSON);
      } catch(err) {
        callback(err);
      }
    
    });
   
  }

}

module.exports = Store;
