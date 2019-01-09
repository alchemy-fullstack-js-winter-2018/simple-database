const fs = require('fs');
const copy = require('./copy');

describe('copy function', () => {
  afterEach(() => {
    //clean up copied file
  });

  it('copy file created', done => {
    copy('./writing.txt', './writing-copy.txt', err => {
      expect(err).toBeFalsy();
      fs.readFile('./writing-copy.txt', { encoding: 'utf8' }, (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual('YELLOWWWWWW');
        done();
      });
    });
  });
});
