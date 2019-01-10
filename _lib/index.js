const fs = require('fs');
const shortid = require('shortid');





class Store {
    constructor(rootDir) {
        this.rootDir = rootDir;
    }
    //callback is for once your done with creating file 
    create(obj, callback) {
        const _id = shortid.generate();
        const copiedObj = { ...obj, _id };
        const objWithStrID = JSON.stringify(copiedObj);
        fs.writeFile(`${this.rootDir}/${_id}`, objWithStrID, err => {
            if(err) return callback(err);
            //to user we want to return the copied obj and not the stringified version.
            callback(null, copiedObj);

        })

    }
    findById(_id, callback){
        //readJson
        fs.readFile(`${this.rootDir}/${_id}`, { encoding: 'utf8' }, (err, data) =>{
            const parsedJson = JSON.parse(data);
            callback(err, parsedJson);
            //in case the JSON doesnt read  enclose the above in a try catch block;
        })  
    }

}

module.exports = { 
    Store
}





