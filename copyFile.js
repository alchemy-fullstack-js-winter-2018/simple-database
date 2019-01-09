const fs = require('fs');

fs.readFile('./message.txt', { encoding: 'utf8' }, (err, data) => {
  if(err) {
    throw err;
  }
  fs.writeFile('messagecopy.txt', data, 'utf8', err => {
    if(err) throw err;
    console.log('The file has been saved!');
  });
});
