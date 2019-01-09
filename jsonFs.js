const fs = require('fs');

function readJSON(path, callback) {
    fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
        if(err) return callback(err);
        JSON.parse(data);
    });
};

module.exports = {
    readJSON
};