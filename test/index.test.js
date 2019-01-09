const mkdirp = require('mkdirp');  //mkdir plus parent rm rf
const rimraf = require('rimraf');
const Store = require('../lib/index');

describe('Store',  () => {
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
    store.create({ name: 'ryan' }, (err, createdPerson) => {
      expect(err).toBeFalsy();
      expect(createdPerson).toEqual({ name: 'ryan', _id: expect.any(String) });
      done();
    });
  });

  it('finds an object by id', done => {
    store.create({ name: 'chris' }, (err, createdPerson) => {
      expect(err).toBeFalsy();
    });
    //after done creating -> findbyId
    store.findById(_id);
    //after found check that it is the same one we created
    //then call done
  });

  findById(_id) {
    const obj = this.store[_id];
    if(!obj) {
      throw `No object with _id ${_id}`;
    }
    return obj;
  }

});
