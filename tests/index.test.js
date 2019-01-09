const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Store = require('../lib/index');

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
    store = new Store('./testData/store');
  });

  it('creates object in store', done => {
    store.create({ name: 'Cari' }, (err, person) => {
      expect(err).toBeFalsy();
      expect(person).toEqual({ name: 'Cari', _id: expect.any(String) });
      done();
    });
  });
});
