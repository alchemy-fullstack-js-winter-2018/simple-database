const fs = require('fs');
const { readJSON } = require('./jsonFs');

describe('jsonFs', () => {
  it('it can write json to a file', () => {
    //create an object
    const obj = {
        name: "Roxy", 
        age: 4, 
        city: "Tualatin" 
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
});