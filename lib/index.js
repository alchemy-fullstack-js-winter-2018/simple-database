const fs = require('fs');
const shortid = require('shortid');
const readdir = require('readdir');

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
            try {
                const parsedObj = JSON.parse(obj);
                callback(null, parsedObj);  
            } catch(e) {
                callback(e);
            }
        })
    }

    findByIdAndDelete(_id, callback) {
        fs.readFile(`${this.rootDir}/${_id}`, { encoding: 'utf8' }, (err, obj) => {
            fs.unlink(`${this.rootDir}/${_id}`, (err) => {
                callback(null, { deleted: 1 });
            });
        })
    };

    find(err, callback) {
        fs.readdir(storedFilePath(), (err, items) => {
            console.log(items);
            callback(items);
        })
    }
};

function storedFilePath(_id) {
    return `${this.rootDir}/${_id}`
}
module.exports = Store;