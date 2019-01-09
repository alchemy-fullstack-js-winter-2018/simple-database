const fs = require('fs');

//without the encoding, you see the buffer version of the data in the console
//encoding lets us see it in the console in normal word version
//async function so it can do things while file is being read
fs.readFile('./LAB.md', { encoding: 'utf8' }, (err, data) => {
  if(err) {
    throw err;
  }
  console.log(data);
})