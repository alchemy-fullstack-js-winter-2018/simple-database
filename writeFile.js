const fs = require('fs');


fs.writeFile('./writing.txt', 'I am writing', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});