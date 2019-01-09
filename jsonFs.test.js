const fs = require('fs');
const { readJSON, writeJSON } = require('./jsonFs');

describe('jsonFs', () => {
  it('it can write json to a file', (done) => {
    //create an object
    const obj = {
      name: 'Roxy', 
      age: 4, 
      city: 'Tualatin' 
    };

    //stringify object
    const json = JSON.stringify(obj);

    //write object string to file
    fs.writeFile('./testData/test.json', json, (err) => {
      expect(err).toBeFalsy();

      //invoke readJSON
      readJSON('./testData/test.json', (err, data) => {
        expect(err).toBeFalsy();

        //test that readJSON worked right
        expect(data).toEqual(obj);
        done();
      });
    });
  });

  describe('writeJSON', () => {
    it('writes JSON to disk', (done) => {
      //create an object to save
      const obj = {
        name: 'Roxy'
      };

      //invoke writeJSON(pathToFile, obj, err)
      writeJSON('./testData/test2', obj, err => {
        expect(err).toBeFalsy();
      
        readJSON('./testData/test2', (err, data) => {
          expect(err).toBeFalsy();
          expect(data).toEqual(obj);
          done();
        });
      });
    });
  });
});