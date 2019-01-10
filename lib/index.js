const fs = require('fs');
const shortid = require('shortid');

class Store {

    constructor(rootDir) {
        this.rootDir = rootDir;
    };

    create(obj, callback) {
        const _id = shortid.generate();
        // add id to object by using spread inside object brackets
        const objWithId = {...obj, _id};
        const objStr = JSON.stringify(objWithId);
        fs.writeFile(`${this.rootDir}/${_id}`, objStr, err => {
            if(err) return callback(err);
            callback(null, objWithId);
        });
    };

    findById(_id, callback) {
        fs.readFile(`${this.rootDir}/${_id}`, { encoding: 'utf8' }, (err, obj) => {
            try {
                const parsedObj = JSON.parse(obj);
                callback(null, parsedObj);  
            } catch(e) {
                callback(e);
            };
        });
    };

    findByIdAndDelete(_id, callback) {
        fs.readFile(storedFilePath(), { encoding: 'utf8' }, (err, obj) => {
            fs.unlink(storedFilePath(), (err) => {
                callback(null, { deleted: 1 });
            });
        });
    };

    find(callback) {
        fs.readdir(this.rootDir, (err, listOfIds) => {
            if (err) return callback(err);
            let count = listOfIds.length;
            if(count < 1) return callback(err, []);

            const items = [];
            listOfIds.forEach(_id => {
                this.findById(_id, (err, item) => {
                    count--;
                    items.push(item);
                    if (count === 0) callback(null, items);  
                });
            });
        });
    };
};

function storedFilePath(_id) {
    return `${this.rootDir}/${_id}`;
}


module.exports = Store;