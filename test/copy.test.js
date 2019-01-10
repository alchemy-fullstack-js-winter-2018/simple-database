const copy = require('../lib/copy');

describe('copy function', () => {
  afterEach(() => {
it('test copied file', done => {
  copy('./writing.txt', './writing-copy.txt', err => {
    expect(err).toBeFalsy();  
  

  fs.readFile('./writing-copy.txt', { encoding: 'utf8' }, (err, data) => {
    expect(err).toBeFalsy();
    expect(data).toEqual('I am written\n');
    done();
  });
});
});
