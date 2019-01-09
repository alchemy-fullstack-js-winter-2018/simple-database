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

  it('finds an object by id', done => {
    //create an object (use same method)
    store.create({ name: 'uncle bob' }, (err, createdUncle) => {
      store.findById(createdUncle._id, (err, foundUncle) => {
        expect(err).toBeFalsy();
        expect(foundUncle).toEqual({ name: 'uncle bob', _id: createdUncle._id });

        done();
      });
    });

  });
  //after done creating -> findById
  //after found, check that is the same one that we created
  //then call done
});

