// const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const store = require('../lib/index');

describe('Store', () => {
  let store = null;

  beforeEach(done => {
    rimraf('./testData/store', err => {
      done(err);
    });
  });
  beforeEach(() => {
    mkdirp('./testData/store', err => {
      done(err);
    });
  });
  beforeEach(() => {
    store = new store('./testData/store');
  });
  describe('Create', () => {
    it('creates an  obj in store', done => {
      store.create({ name: 'Teonna' }, (err, createdPerson) => {
        expect(err).toBeFalsy();
        expect(createdPerson).toEqual({ name: 'Teonna', _id: expect.any(String) });
        done();
      });

    });
  });
});
