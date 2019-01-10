const fs = require('fs')

function readJSON(pathToFile, callback){
    //callback(err, data/JSON)
    fs.readFile(pathToFile, { encoding: 'utf8' }, (err, data)=>{
        if(err) {
            return callback(err);
        }
    //JSOn.arse to create a JSON object from data
    const json = JSON.parse(data);
    //invoke callback (null, json)
    //NULL is no error
     callback(null, json);
    })
}

function writeJSON(pathToFile, obj, callback) {
    // JSON.stringify my obj
    const str = JSON.stringify(obj);
    // fs.writeFile to write file to disk
    fs.writeFile(pathToFile, str, err => {
        if(err) return callback(err);
        callback();
    })
    // invoke callback
  }

module.exports = {
    readJSON,
    writeJSON
}

