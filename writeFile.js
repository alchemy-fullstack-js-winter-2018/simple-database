const fs = require('fs');

const data = new Uint8Array(Buffer.from('Hello Node.js'));

fs.writeFile('writing.txt', data, (err) => {
  if(err) throw err;
  console.log('I am writing!!!');
});
