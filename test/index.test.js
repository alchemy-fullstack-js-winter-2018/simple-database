const mkdirp = require ('mkdir');
const rimraf = require('rimraf');

describe('Store', () => {
  let store = null;
  beforeEach(done => {
    rimraf('./testData/store', err => {
      done(err);
    });
  });
  
  beforeEach(done => {
    mkdirp('./testData/store', err => {
      done(err);
    });
  });
  
  beforeEach(() => {
    store = new store('./testData/store');
  });

  it('creates an object in my store', done => {
    store.create({ name:'ryan' }, (err, createdPerson) => {
      expect(err).toBeFalsy();
      expect(createdPerson).toEqual({ name: 'ryan', _id: expect.any(String) });
      done();
    });
  });
});
