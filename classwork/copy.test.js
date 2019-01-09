const fs = require('fs');

describe('copy function', () => {
  afterEach(() => {
    //clean up copied file
  });

  it('test copied file', done => {
    copy('./writing.txt', './writing-copy.txt', err =>{
      //test our copy function
      expect(err).toBeFalsy();

      fs.readFile('./writing.txt', { encoding: 'utf8' }, (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual('I Am Written');
        done();
    });
  });
});
