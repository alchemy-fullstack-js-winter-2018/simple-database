const fs = require('fs');
const copy = require('./copy');

describe('copy function', () => {
  afterEach(() => {
    fs.unlink('./messagecopy.txt', (err) => {
      if(err) throw 'Error, file not deleted';
    });
    console.log('file deleted');
  });

  it('tests copied files', (done) => {
    copy('./message.txt', './messagecopy.txt', (err) => {
      expect(err).toBeFalsy();

      fs.readFile('./messagecopy.txt', { encoding: 'utf8' }, (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual('hello from the other side');
        done();
      });
    });
  });
});
