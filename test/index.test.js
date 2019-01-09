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
    store.create({ name: 'Carmen' }, (err, createdPerson) => {
      expect(err).toBeFalsy();
      expect(createdPerson).toEqual({ name: 'Carmen', _id: expect.any(String) });
      done();
    });
  });

  it('finds an object by id', done => {
    // create an object
    store.create({ name: 'Carmen' }, (err, createdObj) => {
      // after done creating -> findBy Id
      store.findById(createdObj._id, (err, foundObj) => {
        // after found check that it is the same one that we created
        expect(err).toBeFalsy();
        expect(foundObj).toEqual({ name: 'Carmen', _id: createdObj._id });
        // call done
        done();
      });
    });
  });
});
