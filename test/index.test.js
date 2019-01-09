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
    store.create({ name: 'peter' }, (err, createdPerson) => {
      expect(err).toBeFalsy();
      expect(createdPerson).toEqual({ name: 'peter', _id: expect.any(String) });
      done();
    });  
  });

  it('can find an object by id', done => {
    store.create({ name: 'babs' }, (err, createdPerson) => {
      store.findById(createdPerson._id, (err, foundPerson) => {
        expect(err).toBeFalsy();
        expect(foundPerson).toEqual({ name: 'babs', _id: createdPerson._id });
        done();
      });
    });
  });
  
});
