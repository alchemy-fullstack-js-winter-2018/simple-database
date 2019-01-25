const fs = require('fs');

// readFile takes the path of the file to read, how it should show the data and then a callback function that is asynchronous that takes an err and the data from the file
fs.readFile('./lab.md', { encoding: 'utf8' }, err => {
    if(err) {
        throw err;
    }
});
