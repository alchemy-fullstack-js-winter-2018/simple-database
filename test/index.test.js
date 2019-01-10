const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Store = require('../lib/index');

describe('Store', () => {
  
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
  })
  it('creates an object in my store', done => {
    store.create({ name: 'itchy' }, (err, createdPerson) => {
      expect(err).toBeFalsy();
      expect(createdPerson).toEqual({ name: 'itchy', _id: expect.any(String) });
      done();

    });
  });

  it('finds an object by id', done => {
    // create an object
    store.create({ name: 'uncle bob' }, (err, createdUncle) => {
      // after done creating -> findById
      store.findById(createdUncle._id, (err, foundUncle) => {
        // after found check that it is the same one that we created
        expect(err).toBeFalsy();
        expect(foundUncle).toEqual({ name: 'uncle bob', _id: createdUncle._id });
        // then call done
        done();
      });
    });
  });
  it('find all objects tracked by the store', done => {
    store.create({ item: 1 }, (err, item_01) => {
      store.create({ item: 1 }, (err, item_02) => {
        store.create({ item: 1 }, (err, item_03) => {
          store.create({ item: 1 }, (err, item_04) => {
            store.create({ item: 1 }, (err, item_05) => {
              store.find((err, listOfItems) => {
                expect(err).toBeFalsy();
                expect(listOfItems).toHaveLength(5);
                expect(listOfItems).toContainEqual(item_01);
                expect(listOfItems).toContainEqual(item_02);
                expect(listOfItems).toContainEqual(item_03);
                expect(listOfItems).toContainEqual(item_04);
                expect(listOfItems).toContainEqual(item_05);
                done();
              });
            });
          });
        });
      });
    });
  });

})