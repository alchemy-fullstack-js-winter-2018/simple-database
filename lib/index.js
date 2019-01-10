const fs = require('fs');
const shortid = require('shortid');
const path = require('path');
const rootDir = path.join(__dirname, 'snacks');

class Store {

    constructor(rootDir) {
        this.rootDir = rootDir;
    }

    create(obj, callback) {
        const _id = shortid.generate();
        // add id to object by using spread inside object brackets
        const objWithId = {...obj, _id};
        const objStr = JSON.stringify(objWithId)
        fs.writeFile(`${this.rootDir}/${_id}`, objStr, err => {
            if(err) return callback(err);
            callback(null, objWithId);
        })
    };

    findById(_id, callback) {
        fs.readFile(`${this.rootDir}/${_id}`, { encoding: 'utf8' }, (err, obj) => {
            const parsedObj = JSON.parse(obj);
            callback(err, parsedObj);
        })
        
    }

    findByIdAndDelete(_id, callback) {
        fs.readFile(rootDir, { encoding: 'utf8' }, (err, obj) => {
            fs.unlink(`${this.rootDir}/${_id}`, (err) => {
                callback(null, { deleted: 1 });
            });
        })
    };
};


module.exports = Store;