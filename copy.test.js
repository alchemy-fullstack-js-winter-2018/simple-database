
const fs = require('fs');
const copy = require('./copy');

describe('copy function', () => {
  afterEach(() => {

  });
  it('test coped filed', done => {
    copy('./writing.txt', 'destination.txt', (err)=> {
      expect(err).toBeFalsy();
      fs.readFile('./writing.txt',{ encoding: 'utf8' }, (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual('I am writing');
        done();
      });
    });
  });
});