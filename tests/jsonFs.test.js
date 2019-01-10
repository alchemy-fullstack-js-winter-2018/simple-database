const fs = require('fs');
const { readJSON, writeJSON } = require('../lib/jsonFs');

describe('jsonFs', () => {
  describe('readJSON', () => {
    it('reads a JSON file from disk', done => {
      const obj = { name: 'Shirleyyyyy' };
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

    it('fails if file does not contain JSON', done => {
      fs.writeFile('./testData/testNotJSON', 'blah', err => {
        expect(err).toBeFalsy();
        readJSON('./testData/testNotJSON', (err, data) => {
          expect(err).toBeTruthy();
          expect(data).toBeFalsy();
          done();
        });
      });
    });
  });

  describe('writeJSON', () => {
    it('writes a JSON file to disk', done => {
      const obj = { name: 'Shirleyyyyy' };
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
