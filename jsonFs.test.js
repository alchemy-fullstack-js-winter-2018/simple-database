const fs = require('fs');
const { readJSON, writeJSON } = require('./jsonFs');

describe('jsonFs', () => {
  describe('readJSON', () => {
    it('reads a JSON file from disk', done => {
      const obj = { name: 'poopoo' };
      const objStr = JSON.stringify(obj);
      fs.writeFile('./testData/test', objStr, err => {
        expect(err).toBeFalsy();
        readJSON('./testData/test', (err, data) => {
          expect(err).toBeFalsy();
          expect(data).toEqual(obj);
          done();
        });
      });
    });
  });

  describe('writeJSON', () => {
    it('writes a JSON file to disk', done => {
      const obj = { name: 'Shirleyy' };
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
