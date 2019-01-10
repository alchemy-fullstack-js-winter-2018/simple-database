const fs = require('fs');

// fs.readFile('./writing.txt', { encoding: 'utf8' }, (err, data) => {
//     if (err) {
//         throw err;
//     }
//     console.log(data);
//     fs.writeFile('writingCopied.txt', (data), (err) => {
//         if (err) {
//             throw `error reading file: ${err}`;
//         }
//     })
    
// })
//





//callback is saying that were done
function copy (src, dst, callback) {
    false.readFile(src, { encoding: 'utf8'}, (err, data) => {
        if(err){
            return callback(err);
        }

        false.writeFile(dst, data, err =>{
            if(err){
                return callback(err);
            }
           return callback();
        })
    })
}

module.exports = copy;

