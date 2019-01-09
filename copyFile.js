const fs = require('fs');

fs.copyFile('./writing.txt', 'destination.text', (err) => {
  if (err) throw 'cannot read error';
  console.log('writing.txt has been copied');
}); 
