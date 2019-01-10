const fs = require('fs');
const copy = require('../lib/copy');


describe('copy function', () => {
  afterEach(() => {
    // clean up each file
  });
 
  it('copies a file', done => {
    copy('./writing.txt', './writing-copy.txt', err => {
      expect(err).toBeFalsy();

      fs.readFile('./writing-copy.txt', { encoding: 'utf8' }, (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual('I am written\n');
        done();
      });
    });
  });
});
