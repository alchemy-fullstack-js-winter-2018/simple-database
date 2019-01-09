const fs = require('fs');

function readJSON(path, callback) {
    //read the file
    fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
        //return the error if there is one
        if(err) return callback(err);
        //parse and store the json data
        try {
            //invoke the callback with null as error and the json as the data
           return callback(null, JSON.parse(data)); 
        } catch(e) {
            return callback(e);
        }
    });
};

function writeJSON(path, obj, callback) {
    try {
       const str = JSON.stringify(obj); 
        fs.writeFile(path, str, err => {
            //don't have to check for an error because it will be null if there's no error
            callback(err);
        });
    } catch (e) {
        callback(e)
    } 
};

module.exports = {
    readJSON,
    writeJSON
};