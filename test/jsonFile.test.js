const fs = require('fs');
const { 
  readJSON,
  writeJSON 
} = require('../lib/jsonFS');


describe('readJSON', () => {
  it('reads JSON from a file', done => {
    const cat = { name: 'Ollie', age: 1 };
    const jsonCat = JSON.stringify(cat);
    fs.writeFile('./jsonfile.txt', jsonCat, err => {
      expect(err).toBeFalsy();
      readJSON('./jsonfile.txt', (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual(cat);
        done();
      });
    });
  });
  // it('can return an error if not JSON', () => {
  //   const obj = { name: 'Ollie' };
  //   const objStr = JSON.stringify(obj);
  //   readJSON('./jsonfile.txt', (err, data) => {
  //     expect(err).toBeTruthy();
  //     expect(data).toEqual(obj);
  //   });
  // });
});

describe('writeJSON', () => {
  it('writes Json to disk', done => {
    const obj = { name: 'Teonna' };

    writeJSON('./writeJSON', obj, err => {
      expect(err).toBeFalsy();

      readJSON('./writeJSON', (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual(obj);
        done();
      });
    });
  });
});
