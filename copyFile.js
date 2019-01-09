const fs = require('fs');

fs.readFile('./Lab.md', { encoding: 'utf8' }, (err, data) => {
  if(err) throw err;
  
  fs.writeFile('./copyLab.txt', data, err => {
    if(err) throw err;
    console.log('copied ');
  });
});


