const fsPromises = require('fs').promises;

fsPromises.copyFile('./LAB.md', 'CopyLab.txt')
    .then(() => console.log('file has been copied'))
    .catch(() => console.log('there was an error'));
