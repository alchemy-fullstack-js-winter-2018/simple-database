const fs = require('fs');

// this one writes to the console AND creates the txt file
// const data = new Uint8Array(Buffer.from('Hello Node.js'));
fs.writeFile('writing.txt', 'I am written\n', (err) => {
  if(err) throw err;
});

// this creates the file, and adds the I am writing text into it
// fs.writeFile('writing.txt', 'I am writing baddabingbaddaboom!!!!!!', err => {
//   if(err) throw err;
// });
