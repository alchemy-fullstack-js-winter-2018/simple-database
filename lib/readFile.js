const fs = require('fs');

// once file is read, read this function; until then do other things
fs.readFile('./LAB.md', { encoding: 'utf8' }, (err, data) => {
  if(err) throw err;
  console.log(data);
});
// returns text content of LAB.md to Terminal 
