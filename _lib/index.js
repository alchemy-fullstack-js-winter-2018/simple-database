const fs = require('fs');
const shortid = require('shortid');

class Store {
    constructor(rootDir) {
        this.rootDir = rootDir;
    }
    //NOTETOSELF:callback is for once your done with creating file 
    create(obj, callback) {
        const _id = shortid.generate();
        const copiedObj = { ...obj, _id };
        const objWithStrID = JSON.stringify(copiedObj);
        fs.writeFile(`${this.rootDir}/${_id}`, objWithStrID, err => {
            if(err) return callback(err);
            //NOTETOSELF: to user we want to return the copied obj and not the stringified version.
            callback(null, copiedObj);

        })

    }
    findById(_id, callback){
        fs.readFile(this.storedFilePath(_id), { encoding: 'utf8' }, (err, data) =>{
            //NOTETOSELF: DONT forget to throw something in case file cant be found!!
            if(err) return callback(err);
            const parsedJson = JSON.parse(data);
            callback(err, parsedJson);
            //NOTETOSELF: in case the JSON doesnt read  enclose the above in a try catch block;
        })  
    }
    
    findAndDelete(_id, callback) {
        fs.unlink(this.storedFilePath(_id), err => {
            return callback(err, { deleted: 1 });
        })
    }
    storedFilePath(_id) {
        return `${this.rootDir}/${_id}`
      }
}
module.exports = { 
    Store
}





