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
    store.create({ dog: 1 }, (err, dog1) => {
      store.create({ dog: 2 }, (err, dog2) => {
        store.create({ dog: 3 }, (err, dog3) => {
          store.create({ dog: 4 }, (err, dog4) => {
            store.create({ dog: 5 }, (err, dog5) => {
              store.find((err, listOfDogs) => {
                expect(err).toBeFalsy();
                expect(listOfDogs).toHaveLength(5);
                expect(listOfDogs).toContainEqual(dog1);
                expect(listOfDogs).toContainEqual(dog2);
                expect(listOfDogs).toContainEqual(dog3);
                expect(listOfDogs).toContainEqual(dog4);
                expect(listOfDogs).toContainEqual(dog5);
                done();
              });
            });
          }); 
        });
      });
    });
  });
});
