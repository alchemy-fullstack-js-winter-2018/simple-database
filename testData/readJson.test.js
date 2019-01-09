const fs = require('fs');
const { readJSON } = require('../readJson');
const { writeJSON } = require('../writeJson');

describe('read function', () => {
  describe('readJson', () => {
    it('test read JSON file', done => {
      const obj = { name: 'Marcy', age: 22, city: 'Portland' };
      const objString = JSON.stringify(obj);
      fs.writeFile('./testData/test', objString, err => {
        expect(err).toBeFalsy();
        readJSON('./testData/test', (err, data) => {
          expect(err).toBeFalsy();
          expect(data).toEqual(obj);
          done();
        });
      });
    });
    it('fails if the file does not contain JSON', done => {
      fs.writeFile('./testData/testNotJSON', 'tenoahusenothu', err => {
        expect(err).toBeFalsy();
        readJSON('./testData/testNotJSON', (err, json) => {
          expect(err).toBeTruthy();
          done();
        });
      });
    });
  });

  describe('writeJson', () => {
    it('writing the file', done => {
      const obj = { name: 'Marcy', age: 22, city: 'Portland' };
      // const objString = JSON.stringify(obj);
      writeJSON('./testData/test', obj, err => {
        expect(err).toBeFalsy();
        readJSON('./testData/test', (err, data) => {
          expect(err).toBeFalsy();
          expect(data).toEqual(obj);
          done(); 
        });
      });
    });
  });
});


