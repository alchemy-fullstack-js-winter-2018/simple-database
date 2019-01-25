const fs = require('fs');
// const copy = require('./copy');

fs.readFile('./lab.md', { encoding: 'utf8' }, (err, data) => {
    if(err) throw err;
    fs.writeFile('./LAB-copy.md', data, err => {
        if(err) throw err;
    });
});

