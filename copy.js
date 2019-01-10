const fs = require('fs');

//asynchronous reading and writing files

function copy(src, dst, callback) {
//read the src file
    fs.readFile(src, { encoding: 'utf8' }, (err, data) => {
        //call the callback function even if there's an error but pass the error as a param. Use return to stop the function because of the error
        if(err) return callback(err);
        //write the data to the dst file
        fs.writeFile(dst, data, err => {
            if(err) return callback(err);
            callback();
        });
    });
}

module.exports = copy;
