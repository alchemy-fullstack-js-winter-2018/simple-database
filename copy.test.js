const fs = require('fs'); 

describe('copy function', () => {
  afterEach(() => {

  });
  it('test coped filed', done => {
    fs.readFile('./writing.txt', { encoding: 'utf8'}, (err, data) => {
      expect(err).toBeUndefined();
      expect(data).toBeEqual('I am writing');
    })
    done();
  });
});