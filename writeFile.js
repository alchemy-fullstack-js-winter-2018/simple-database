const fs = require('fs');
const data = 'hello from the other side';

fs.writeFile('./message.txt', data, (err) => {
  if(err) {
    throw err;
  }
  console.log(data);
})