const fs = require('fs');
const shortid = require('shortid');

module.exports = class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(obj, callback) {
    const _id = shortid.generate();
    const newObj = { ...obj, _id };
    try {
      const data = JSON.stringify(newObj);
      fs.writeFile(this.rootDir + '/' + `${_id}`, data, err => {
        if(err) {
          callback(err);
        }
        callback(null, newObj);
      });
    } catch(err) {
      callback(err);
    }
  }

  findById(_id, callback) {
    fs.readFile(this.rootDir + '/' + `${_id}`, { encoding: 'utf8' }, (err, data) => {
      if(err) {
        return callback(err);
      }
  
      try {
        const json = JSON.parse(data);
        callback(null, json);
      } catch(err) {
        callback(err);
      }
    });
  }

};
