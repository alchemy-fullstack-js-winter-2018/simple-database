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

  it('throws an error if id does not exist', done => {
    store.findById(987654321, (err, foundUncle) => {
      expect(err).toBeTruthy();
      expect(!foundUncle).toBeTruthy();
      done;
    });
  });

  it('finds an object by id and deletes if object is removed', done => {
    // remove the file of the object with that id
    // takes a callback that takes an error and an object
  });
 
});

