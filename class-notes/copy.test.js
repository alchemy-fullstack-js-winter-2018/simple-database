const fs = require('fs');
const copy = require('./copyFile');

describe('copy function', () => {
  afterEach(() => {
    // clean up copied file
  });

  it.skip('test copied file', done => {
    copy('./writing.txt', './writing-copy.txt', err => {
      expect(err).toBeFalsy();

      fs.readFile('./writing.txt', { encoding: 'utf8' }, (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual('50');
        done()
      });
    });
  });
});