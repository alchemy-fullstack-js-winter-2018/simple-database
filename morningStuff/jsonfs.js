const fs = require('fs');

function readJSON(dst, callback) {
    fs.readFile(dst, { encoding: 'utf8' }, (err, data) => {
        if(err)  {
            return callback(err);
        }
        const json = JSON.parse(data);
        callback(null, json);
    });

}

function writeJSON(dst, obj, callback) {
    const string = JSON.stringify(obj);
    fs.writeFile(dst, string, (err) => {
        if(err)  {
            return callback(err);
        }
        callback(null, string);
    });
}


module.exports = {
    readJSON, 
    writeJSON
};


