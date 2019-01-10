const fs = require('fs');
const shortid = require('shortid');

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

    findByIdAndDelete(_id, callback) {

        fs.unlink(`${this.rootDir}/${_id}`, (err) => {
            if(err) {
                return ENOENT;
            };
            callback(null, { deleted: 1 });
        });
    }
}


module.exports = Store;





