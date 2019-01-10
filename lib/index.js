const fs = require('fs');
const shortId = require('shortid');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  } 

  create(obj, callback) {
    const _id = shortId.generate();
    const objId = { ... obj, _id };
    const objIdStr = JSON.stringify(objId);

    fs.writeFile(`${this.rootDir}/${_id}`, objIdStr, err => {
      if(err) return callback(err);
      callback(null, objId);
    });
  }

  findById(_id, callback){
    fs.readFile(`${this.rootDir}/${_id}`, { encoding: 'utf8' }, (err, data) => {
      try {
        const obj = JSON.parse(data);
        callback(err, obj);
      } catch(e) {
        callback(e);
      }
    }); 
  }

  find(callback){
    fs.readdir(this.rootDir, (err, listOfIds) => {
      let count = listOfIds.length;
      if(count < 1) return callback(err, []);

      const items = [];
      listOfIds.forEach(_id => {
        this.findById(_id, (err, item) => {
          count--;
          items.push(item);
          if(count === 0) callback(null, items);
        });
      });
    });
  }

  findAndDelete(_id, callback){
    fs.unlink(`${this.rootDir}/${_id}`, (err) => {
      if(err) {
        if(err === 'enonet') callback(null, { deleted: 0 });
        return callback(err);
      }
      callback(null, { deleted: 1 });
    });
  }
}
module.exports = Store;
