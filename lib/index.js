const fs = require('fs');
const shortid = require('shortid');
const path = require('path');
const rootDir = path.join('testData/store');

class Store {
    constructor(rootDir) {
        this.rootDir = rootDir;
    }


    create(obj, callback) {
        const _id = shortid();
        const copiedObj = { ...obj, _id };
        const string = JSON.stringify(copiedObj);

        fs.writeFile(`${this.rootDir}/${_id}`, string, (err) => {
            if(err) {
                return callback(err);
            }
            callback(null, copiedObj);
        });
    }

    findById(_id, callback) {
        
        fs.readFile(`${this.rootDir}/${_id}`, (err, data) => {
            if(err) {
                return callback(err);
            }
            const parsedJSON = JSON.parse(data);

            callback(null, parsedJSON);
        });
    }
}


module.exports = Store;





