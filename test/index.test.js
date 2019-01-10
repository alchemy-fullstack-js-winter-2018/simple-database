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
    store.create({ name: 'sugar' }, (err, createdCookie) => {
      expect(err).toBeFalsy();
      expect(createdCookie).toEqual({ name: 'sugar', _id: expect.any(String) });
      done();
    });
  });

  it('finds and object by id', done => {
    store.create({ name: 'sugar' }, (err, createdCookie) => {
      store.findById(createdCookie._id, (err, foundCookie) => {
        expect(err).toBeFalsy();
        expect(foundCookie).toEqual({ name: 'sugar', _id: createdCookie._id });
        done();
      });
    });
  });

  it('find all objects tracked by the store', done => {
    store.create({ item: 1 }, (err, item1) => {
      store.create({ item: 2 }, (err, item2) => {
        store.create({ item: 3 }, (err, item3) => {
          store.create({ item: 4 }, (err, item4) => {
            store.create({ item: 5 }, (err, item5) => {
              store.find((err, listOfItems) => {
                expect(err).toBeFalsy();
                expect(listOfItems).toHaveLength(5);
                expect(listOfItems).toContainEqual(item1);
                expect(listOfItems).toContainEqual(item2);
                expect(listOfItems).toContainEqual(item3);
                expect(listOfItems).toContainEqual(item4);
                expect(listOfItems).toContainEqual(item5);
                done();
              });
            });
          });
        });
      });
    });
  });
  
  it('deletes an object with id', done => {
    store.create({ item: 'I am going to delete' }, (err, createdItem) => {
      store.findByIdAndDelete(createdItem._id, (err, result) => {
        expect(err).toBeFalsy();
        expect(result).toEqual({ deleted: 1 });
        store.findById(createdItem._id, (err, foundItem) => {
          expect(err).toBeTruthy();
          expect(foundItem).toBeFalsy();
          done();
        });
      });
    });
  });
});
