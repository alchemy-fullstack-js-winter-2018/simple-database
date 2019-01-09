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

  it('finds an object by id', done => {
    store.create({ name: 'Bobby' }, (err, person) => {
      store.findById(person._id, (err, foundPerson) => {
        expect(err).toBeFalsy();
        expect(foundPerson).toEqual({ name: 'Bobby', _id: person._id });
        done();
      });
    });
  });
});
