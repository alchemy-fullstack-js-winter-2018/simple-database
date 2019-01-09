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
    store.create({ name: 'motley' }, (err, createdDog) => {
      expect(err).toBeFalsy();
      expect(createdDog).toEqual({ name: 'motley', _id: expect.any(String) });
      done();
    });
  });

  it('finds an object by id', done => {
    // create an object
    store.create({ name: 'motley' }, (err, createdDog) => {
      // after done creating -> findById
      store.findById(createdDog._id, (err, foundDog) => {
        // after found check that is it the same on that we created
        expect(err).toBeFalsy();
        expect(foundDog).toEqual({ name: 'motley', _id: createdDog._id });
        //then call done
        done();
      });
    });
  });
});
