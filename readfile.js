const fs = require('fs');

fs.readFile('./LAB.md', (err, data) => {
    if(err) throw err;
    console.log(data);
});

