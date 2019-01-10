const fs = require('fs');
//BREAK THIS DOWN!
//1.directory 2.utf 8 translates the binary code to actual language(try taking out this part) 3.callback function err goes first any data goes second, if you change the directorey then it should throw that err. 
fs.readFile('./LAB.md', { encoding: 'utf8' }, (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
    
})

