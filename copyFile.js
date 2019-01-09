const fs = require('fs');

fs.readFile('./message.txt', { encoding: 'utf8' }, (err, data) => {
  if(err) throw `Error reading file: ${err}`;
  console.log(data);
  fs.writeFile('./messagecopy.txt', data, err => {
    if(err) throw `Error reading file: ${err}`;
  });
});

