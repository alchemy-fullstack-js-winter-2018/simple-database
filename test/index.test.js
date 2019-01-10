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

  it('creates an object in my store', done => {
    store.create({ name: 'cat' }, (err, createdAnimal) => {
      expect(err).toBeFalsy();
      expect(createdAnimal).toEqual({ name: 'cat', _id: expect.any(String) });
      done();
    });
  });

  it('finds and object by id', done => {
    store.create({ name: 'sugar' }, (err, createdCookie) => {
      store.findById(createdCookie._id, (err, foundCookie) => {
        expect(err).toBeFalsy();
        expect(foundCookie).toEqual({ name: 'sugar', _id: createdCookie._id });
        done();
      });
    });
  });
});
