const shortid = require('shortId');
const fs = require('fs');





class Store {
    constructor(rootDir) {
        this.rootDir = rootDir;
    }

    create(obj, callback) {
        //create _id and put it into obj
        const _id = shortid.generate();
        const objWithId = { ...obj, _id};
        //JSON.stringfy my obj with id
        const objWithIdStr = JSON.stringify(objWithId);
        //fs.writeFile to save object on disk
        fs.writeFile(`${this.rootDir}/${_id}`, objWithIdStr, err => {
            if(err) return callback(err)
            callback(null, objWithId);
        });
    }

    findById(_id, callback) {
       //readJSON
       //fs.readFile to read the this.rootDir +/+
       fs.readFile(`${this.rootDir}/${_id}`, objWithIdStr, err => {
           if(err) return callback
       })
       //JSON.parse to turn strings into object
       // callback(err, parsedJSON)
    }
}

module.exports = Store


