const fs = require('fs');

describe('copy function', () => {
  afterEach(() => {
    //clean up copied file
  });

  it('test copied file', done => {
    fs.readFile('./writing.txt', { encoding: 'utf8' }, (err, data) => {
      expect(err).toBeFalsy();
      expect(data).toEqual('42');
      done()
    })
  });
});
