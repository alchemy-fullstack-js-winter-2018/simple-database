const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Store = require('../lib/index');

describe('Store', () => {
  let store = null;
  beforeEach((done) => {
    rimraf('./testData/store', err => {
      done(err);
    });
  });

  beforeEach((done) => {
    mkdirp('./testData/store', err => {
      done(err);
    });
  });

  beforeEach(() => {
    //tell our app where to save things on our disk
    store = new Store('./testData/store');
  });

  it('creates an object in my store', done => {
    store.create({ movie: 'lord of the rings' }, (err, createdMovie) => {
      expect(err).toBeFalsy();
      expect(createdMovie).toEqual({ movie: 'lord of the rings', _id: expect.any(String) });
      done();
    });
  });

  it('finds an object in the store by id', done => {
    store.create({ movie: 'Homeward Bound' }, (err, createdMovie) => {
      store.findById((createdMovie._id), (err, foundMovie) => {
        expect(err).toBeFalsy();
        expect(foundMovie).toEqual({ movie: 'Homeward Bound', _id: createdMovie._id });
        done();
      });

    });
  });
});
