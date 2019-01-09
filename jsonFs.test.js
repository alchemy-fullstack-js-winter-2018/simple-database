const fs = require('fs');
const { readJSON, writeJSON } = require('./jsonFS.js');

describe('jsonFs', () => {
  describe('readJSON', () => {
    it('reads a JSON file from dist', done => {
      // Create an object const  obj = { name: 'Carmen'};
      const obj = { name: 'Carmen' };

      // Stringify object with JSON.stringify(obj)
      const objString = JSON.stringify(obj);

      // write object string to file system with fs.writeFile
      fs.writeFile('./testData/test', objString, err => {
        expect(err).toBeFalsy();
        // invoke readJSON(pathToFile, (err, data) => {})
        readJSON('./testData/test', (err, data) => {
          // test that readJSON read the right thing 
          expect(err).toBeFalsy();
          expect(data).toEqual(obj);
          done();
        });
      });
    });
  });

  describe('writeJSON', () => {
    it('writes JSON to disk', done => {
      // create an object to save const obj = { name: 'Carmen'}
      const obj = { name : 'Carmen' };

      // invoke writeJSON(pathToFile, obj, err => {})
      // inside callback use readJSON to verify write
      // call done
      writeJSON('./testData/testWrite', obj, err => {
        expect(err).toBeFalsy();
        const writtenJSON = obj;
        readJSON('./testData/testWrite', (err, data) => {
          expect(err).toBeFalsy();
          expect(data).toEqual(writtenJSON);
          done();
        });
      });
    });
  });
});
