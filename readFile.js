const fs = require('fs');

//readFile takes the path of the file to read, how it should show the data and then a function that is asynchronous 
fs.readFile('./lab.md', { encoding: 'utf8' }, (err, data) => {
  console.log(data);  
});




