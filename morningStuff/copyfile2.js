const fs = require('fs');


fs.readFile('./LAB.md', { encoding: 'utf8' }, (err, data) => {
    if(err) throw err;

    fs.writeFile('message.txt', data, (err) => {
        if(err) throw err;
        console.log('file had been RE has be written');
    });
});

