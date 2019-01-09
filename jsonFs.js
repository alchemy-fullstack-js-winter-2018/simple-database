const fs = require('fs');

function readJSON(path, callback) {
    //read the file
    fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
        //return the error if there is one
        if(err) return callback(err);
        //parse and store the json data
        const jsonObj = JSON.parse(data);
        //invoke the callback with null as error and the json as the data
        callback(null, jsonObj);
    });
};

function writeJSON(path, obj, callback) {
    const str = JSON.stringify(obj);
    fs.writeFile(path, str, err => {
        if(err) return callback(err);
        callback();
    });
};

module.exports = {
    readJSON,
    writeJSON
};