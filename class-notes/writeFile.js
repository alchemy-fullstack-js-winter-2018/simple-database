const fs = require('fs');

fs.writeFile('message.txt', 'I am writing!!!', (err) => {
  if (err) throw err;
  console.log('I am writing!!!');
});
