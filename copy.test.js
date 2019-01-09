const fs = require('fs');
const copy = require('./copy');

describe('copy function', () => {
  afterEach(() => {
    fs.unlink('./message2.txt', (err) => {
      if(err) throw err;
      console.log('message2.txt was deleted');
    });
  });

  it('test copied file', done => {
    copy('./messagecopy.txt', './message2.txt', err => {
      expect(err).toBeFalsy();
      
      fs.readFile('./messagecopy.txt', { encoding: 'utf8' }, (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual('Hello Node.js');
        done();
      });
    });
  });

});
