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
    store.create({ name: 'ryan' }, (err, createdPerson) => {
      expect(err).toBeFalsy();
      expect(createdPerson).toEqual({ name: 'ryan', _id: expect.any(String) });
      done();
    });
  });

  it('finds an object by id', done => {
    // create an object
    store.create({ name: 'uncle bob' }, (err, createdUncle) => {
      // after done creating -> findById
      store.findById(createdUncle._id, (err, foundUncle) => {
        expect(err).toBeFalsy();
        // after found check that it is the same one that we created
        expect(foundUncle).toEqual({ name: 'uncle bob', _id: createdUncle._id });
        // then call done
        done();
      });
    });
  });

  it('finds all objects tracked by the store', done => {
    // create a bunch of objects (at least 5)
    store.create({ name: 'personOne' }, (err, createdPersonOne) => {
      store.create({ name: 'personTwo' }, (err, createdPersonTwo) => {
        store.create({ name: 'personThree' }, (err, createdPersonThree) => {
          store.create({ name: 'personFour' }, (err, createdPersonFour) => {
            store.create({ name: 'personFive' }, (err, createdPersonFive) => {
              store.find((err, listOfItems) => {
                expect(err).toBeFalsy();
                expect(listOfItems).toHaveLength(5);
                expect(listOfItems).toContainEqual(createdPersonOne);
                expect(listOfItems).toContainEqual(createdPersonTwo);
                expect(listOfItems).toContainEqual(createdPersonThree);
                expect(listOfItems).toContainEqual(createdPersonFour);
                expect(listOfItems).toContainEqual(createdPersonFive);
                done();
              });
            });
          });
        });
      });
    });
  });

  it('deletes an object with an id', done => {
    // create an item in store
    store.create({ item: 'I am going to delete' }, (err, createdItem) => {
      // -> delete that item
      store.findByIdAndDelete(createdItem._id, (err, createdItem) => {
        expect(err).toBeFalsy();
        // -> -> findById(IdFromCreatedItem)
        store.findById(createdItem._id, (err, foundItem) => {
          // -> -> -> expect(foundItem).toBeFalsy
          expect(err).toBeTruthy();
          expect(foundItem).toBeFalsy();
          done();
        });
      });
    });
  });
  //////////////////////
  it('updates and existing object', () => {
    // store.create
    store.create({ item: 'I am going to update an existing object' }, (err, createdObject) => {
      // -> store.findByIDAndUpdate(createdObject._id, updatedObject, callback)
      store.findByIdAndUpdate(createdObject._id, { item: 'I am now updated' }, (err, updatedObject) => {
        // -> -> expect updatedObject returned in callback
        expect(err).toBeFalsy();
        expect(updatedObject).toEqual({ item: 'I am now updated', _id: createdObject._id });
        // -> -> store.findById(createdObject._id)
        store.findById(createdObject._id, (err, foundObj) => {
          // -> -> -> expect updatedObject
          expect(foundObj).toEqual(updatedObject);
        });
      });
    });
  });
});
