const { Store } = require('../lib/index.js');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf'); 


describe('database', () => {
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
    store = new Store('./testData/store');
  });
  it('creates an object in my store', () => {
    store.create({ name: 'toy' }, (err, createdItem) => {
      expect(err).toBeFalsy();
      expect(createdItem).toEqual({ name: 'toy', _id: expect.any(String) });
    });
  });
  it('should be able to find an item by the idea', () => {

  });
});

