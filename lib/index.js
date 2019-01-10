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
        fs.readFile(`${this.rootDir}/${_id}`, { encoding: 'utf8'}, (err, data) => {
            try {
                const obj = JSON.parse(data);
                callback(err, obj);

            } catch (e) {
                callback(e);
            }
            
        });
        
    }
    find(callback) {
        //fs.readdir list of files in directory
        fs.readdir(this.rootDir, (err, listOfIds) => {
            let count = listOfIds.length;
            if(count < 1) return callback(err, []);

            const items = []
            listOfIds.forEach(_id => {
                this.forById(_id, (err, item) => {
                    count--;
                    items.push(item);
                    if (count === 0) callback(null, items);
                });
                //this.findById(_id)
                //-> decrement count
                // -> push the item to items
                // -> if count == 0 return callback(null, items)
            })
        })
        
    }

}

module.exports = Store


