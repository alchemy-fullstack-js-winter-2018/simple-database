const fs = require('fs');
const { readJSON } = require('./jsonFs');

describe('jsonFs', () => {
  describe('readJSON', () => {
    it('reads a JSON file from disk', done => {
      const obj = { name: 'Aaron', city: 'Portland' };
      const json = JSON.stringify(obj);
      fs.writeFile('./testData/name', json, err => {
        if(err) throw err;
        readJSON('./testData/name', (err, data) => {
          expect(err).toBeFalsy();
          expect(data).toEqual(obj);
        });
        done();
      });
    });
  });

  // describe('writeJSON', () => {
  //   it('writes JSON to disk', done => {
  //     const object = { name: 'Pete', city: 'San Diego' };
  //     writeJSON('./testData/pete', object, err => {
  //       expect(err).toBeFalsy();

  //       readJSON('./testData/pete', (err, data) => {
  //         expect(err).toBeFalsy();
  //         expect(data).toEqual(object);
  //       });
  //       done();
  //     });
  //   });
  // });
});
