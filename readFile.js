const fs = require('./LAB.md');

readIt = fs.readFile('/LAB.md',[err, data]);
console.log(readIt);

//fs.readFile(path[, options], callback)

//or:
//fs.readFile('./LAB.md', { encoding: 'utf8' }, (err, data) => {
//  console.log(data);   // data named on above line
//});
