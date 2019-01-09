const fs = require('fs');


// writeFile takes a file path to send the data to - then data (which is the string in this case) then a callback which is just an error
fs.writeFile('./writing.txt', 'I am writing!!', err => {
    if(err) {
        throw err;
    };
});

