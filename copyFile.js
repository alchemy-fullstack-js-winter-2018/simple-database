const fs = require('fs');

fs.readFile('./LAB.md', { encoding: 'utf8' }, (err, data) => {
  if(err) {
    throw `Error reading fle: ${err}`;
  }
  fs.writeFile('./LAB-copy.md', data, err => {
    if(err) {
      throw err;
    }
    console.log('source file copied to destination file');
  });
 
});



// Shorter way using actual copyFile
// fs.copyFile('./LAB.md', './LAB-copy.md', (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('source file copied to destination file');
// });
