const fs = require('fs');

fs.copyFile('./writing.txt', 'destination.text', (err) => {
  if (err) throw err;
  console.log('writing.txt has been copied');
}); 