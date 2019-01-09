const fs = require('fs');
const { 
  readJSON, 
  writeJSON } = require('./jsonFs');

describe('readJSON', () => {
  it('write file created', done => {
    //1. Create an object
    const tweet = { tweet: 'delete your account' };
    //2. stringify object with JSON.stringify
    const string = JSON.stringify(tweet);
    //3. write a new file, put the objString in file
    fs.writeFile('./classwork/test', string, err => {
      expect(err).toBeFalsy();
      //4. read it
      readJSON('./classwork/test', (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual(tweet);
        done();
      });
    });
  });
});

describe('writeJSON', () => {
  it('writes JSON to disk', done => {
    //create an object to save const obj
    const obj = { name: 'paige' };

    //invoke writeJSON(pathToFile, obj, err => {}
    writeJSON('./classwork/banana', obj, err => {
      expect(err).toBeFalsy();
      
      //inside callback use readJSON to verify write 
      readJSON('./classwork/banana', (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual(obj);
        // call done
        done();
      });
    });
  });
});
