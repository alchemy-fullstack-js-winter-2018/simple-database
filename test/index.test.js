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
});
