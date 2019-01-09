const fs = require('fs');
const copy = require('./copy');

describe('jsonFs', () => {
  describe('readJSON', () => {
    it('reads a JSON file from disk', done => {
      //create an object const obj = {name: "ryan"}
      create obj = { name: 'Ryan' };
      //stringify object with JSON.stringify(obj)
      const objString = JSON.stringify(obj);
      //write object string to file system with fs.write
      fs.writeFile('./testData/test.json', objString, err => {
        expect(err).toBeFalsy();
        //invoke readJSON(pathToFil, (err, data) => {})
        readJSON('./testDate/test.json', (err, data) => {
          //test that readJSON read the right thing
          expect(err).toBeFalsy();
          expect(data),toEqual(obj);
          done();
        });
      });
    });
  });
});

escribe('writeJSON', () => {
  it('writes JSON to disk', done => {
    const obj = { name: 'ryan' };
    writeJSON('./testData/testWrite', obj, err => {
      readJSON('./testData/test', (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toBeFalsy();
        
      })
    })
  })
})
