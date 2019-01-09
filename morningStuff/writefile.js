const fs = require('fs');

const stuff = new Uint8Array(Buffer.from('Hello Node World .js'));
fs.writeFile('message.txt', stuff, (err) => {
    if(err) throw err;
    console.log('file has be written');
});
