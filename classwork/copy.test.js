const fs = require('fs');
const copy = require('./copy');

describe('copy function', () => {
  afterEach(() => {
    //clean up copied file
  });

  it('copy file created', done => {
    copy('./classwork/writing.txt', './classwork/writing-copy.txt', err => {
      expect(err).toBeFalsy();
      fs.readFile('./classwork/writing-copy.txt', { encoding: 'utf8' }, (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual('I am banana');
        done();
      });
    });
  });
});
