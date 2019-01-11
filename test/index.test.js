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
    store.create({ name: 'brutus' }, (err, createdDog) => {
      expect(err).toBeFalsy();
      expect(createdDog).toEqual({ name: 'brutus', _id: expect.any(String) });
      done();
    });  
  });

  it('can find an object by id', (done)=> {
    store.create({ name: 'Lilo' }, (err, createdDog) => {
      store.findById(createdDog._id, (err, foundDog) => {
        expect(err).toBeFalsy();
        expect(foundDog).toEqual({ name: 'Lilo', _id: createdDog._id });
        done();
      });
    });
  });

  it('throws an error when there is no obj at that id', () => {
    store.findById(1234, (err) => {
      expect(err).toBeTruthy();
    });
  });

  it('updates an existing object', (done) => {
    store.create({ name: 'Flido' }, (err, createdDog) => {
      store.findByIdAndUpdate(createdDog._id, { name: 'Fido' }, (err, updatedWithoutTypo) => {
        expect(err).toBeFalsy();
        expect(updatedWithoutTypo).toEqual({ name: 'Fido', _id: createdDog._id });
        store.findById(createdDog._id, (err, foundDog) => {
          expect(foundDog).toEqual(updatedWithoutTypo);
          done();
        });

      });

    });
  });

  it('can find an object by id and delete it', done => {
    store.create({ name: 'Thor' }, (err, createdDog) => {
      store.findById(createdDog._id, (err, foundDog) => {
        store.findByIdAndDelete(foundDog._id, (err, removedDog) => {
          expect(err).toBeFalsy();
          expect(removedDog).toEqual({ deleted: 1 });
          done();
        });
      });
    });
  });

  it('can find all objects tracked by the store', done => {
    store.create({ name: 'Snooky' }, (err, dog1) => {
      store.create({ name: 'Fido' }, (err, dog2) => {
        store.create({ name: 'Spot' }, (err, dog3) => {
          store.create({ name: 'Rufus' }, (err, dog4) => {
            store.create({ name: 'Marley' }, (err, dog5) => {
              store.find((err, listOfItems) => {
                expect(err).toBeFalsy();
                expect(listOfItems).toHaveLength(5);
                expect(listOfItems).toContainEqual(dog1);
                expect(listOfItems).toContainEqual(dog2);
                expect(listOfItems).toContainEqual(dog3);
                expect(listOfItems).toContainEqual(dog4);
                expect(listOfItems).toContainEqual(dog5);
                done();
              });
            });
          });
        });
      });
    });       
  });
});
