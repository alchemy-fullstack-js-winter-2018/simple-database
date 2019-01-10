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
    store.create({ name: 'ryan' }, (err, createdPerson) => {
      store.findById(createdPerson._id, (err, foundPerson) => {
        expect(err).toBeFalsy(); //
        expect(foundPerson).toEqual({ name: 'ryan', _id: createdPerson._id });
        done();
      });
    });
  });

  //it('finds all objects tracked by the store', () => {
  // create a bunch of objec ts (at least 5)
  //  create ->
  //    create ->
  //      create ->
  //        create ->
  //          create ->
  //            find ->
  //              write our real tests (expects)
  //              expect an array with 5 items
  //              expect an array containing item 1
  //              expect an array containing item 2, ETC...
  //              done()
  //});

});
