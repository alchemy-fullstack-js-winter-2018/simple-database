const Store = require('../lib/index');
const mkdirp = require('mkdirp');
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
    store = new Store('./testData/store');
  });

  it('creates an object', done => {
    store.create({ name: 'abel' }, (err, createdPerson) => {
      expect(err).toBeFalsy();
      expect(createdPerson).toEqual({ name: 'abel', _id: expect.any(String) });
      done();
    });
  });
});
