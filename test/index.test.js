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

  it('finds an object by id and deletes it', done => {
    store.create({ name: 'ryan' }, (err, createdPerson) => {
      store.findByIdAndDelete(createdPerson._id, (err, foundPerson) => {
        expect(err).toBeFalsy();
        expect(foundPerson).toEqual({});
        done();
      });
    });

  });

  // it('finds all objects tracked by the store', () => {
  //   store.create({ item: 1 }, (err, item1) => {
  //     store.create({ item: 2 }, (err, item2) => {
  //       store.create({ item: 3 }, (err, item3) => {
  //         store.create({ item: 4 }, (err, item4) => {
  //           store.create({ item: 5 }, (err, item5) => {
  //             store.find((err, listOfItems) => {
  //               expect(err).toBeFalsy;
  //               expect(listOfItems).toHaveLength(5);
  //               expect(listOfItems).toContainEqual(item1);
  //               expect(listOfItems).toContainEqual(item2);
  //               expect(listOfItems).toContainEqual(item3);
  //               expect(listOfItems).toContainEqual(item4);
  //               expect(listOfItems).toContainEqual(item5);
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  // });

});
