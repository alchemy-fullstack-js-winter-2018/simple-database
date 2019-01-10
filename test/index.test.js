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
    store.create({ name: 'motley' }, (err, createdDog) => {
      expect(err).toBeFalsy();
      expect(createdDog).toEqual({ name: 'motley', _id: expect.any(String) });
      done();
    });
  });

  it('finds an object by id', done => {
    store.create({ name: 'motley' }, (err, createdDog) => {
      store.findById(createdDog._id, (err, foundDog) => {
        expect(err).toBeFalsy();
        expect(foundDog).toEqual({ name: 'motley', _id: createdDog._id });
        done();
      });
    });
  });

  it('find all objects tracked by the store', done => {
    store.create({ dog: 1 }, (err, item1) => {
      store.create({ dog: 2 }, (err, item2) => {
        store.create({ dog: 3 }, (err, item3) => {
          store.create({ dog: 4 }, (err, item4) => {
            store.create({ dog: 5 }, (err, item5) => {
              store.find((err, listOfDogs) => {
                expect(err).toBeFalsy();
                expect(listOfDogs).toHaveLength(5);
                expect(listOfDogs).toContainEqual(item1);
                expect(listOfDogs).toContainEqual(item2);
                expect(listOfDogs).toContainEqual(item3);
                expect(listOfDogs).toContainEqual(item4);
                expect(listOfDogs).toContainEqual(item5);
                done();
              });
            });
          }); 
        });
      });
    });
  });
});
