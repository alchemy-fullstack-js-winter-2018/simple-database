// const fs = require('fs');
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
  describe('Create', () => {
    it('creates an  obj in store', done => {
      store.create({ name: 'Teonna' }, (err, createdPerson) => {
        expect(err).toBeFalsy();
        expect(createdPerson).toEqual({ name: 'Teonna', _id: expect.any(String) });
        done();
      });
    });
  
    it('finds an object by id', done => {
      store.create({ name: 'Tiana' }, (err, createdPerson) => {
        store.findById(createdPerson._id, (err, foundPerson) => {
          expect(err).toBeFalsy();
          expect(foundPerson).toEqual({ name: 'Tiana', _id: createdPerson._id });
          done();
        });
      });
    });

    it('find all', done => {
      store.create({ name: 'dad' }, (err, createdDad) => {
        store.create({ name: 'mum' }, (err, createdMum) => {
          store.create({ name: 'son' }, (err, createdSon) => {
            store.create({ name: 'daughter' }, (err, createdDaughter) => {
              store.create({ name: 'baby' }, (err, createdBaby) => {
                store.find((err, listOfItems) => {
                  expect(err).toBeFalsy();
                  expect(listOfItems).toHaveLength(5);
                  expect(listOfItems).toContainEqual(createdDad);
                  expect(listOfItems).toContainEqual(createdMum);
                  expect(listOfItems).toContainEqual(createdSon);
                  expect(listOfItems).toContainEqual(createdDaughter);
                  expect(listOfItems).toContainEqual(createdBaby);
                  done();
                });
              });
            });
          });
        });
      });
    });

    it('deletes the file by id', done => {
      store.create({ name: 'Tatiana' }, (err, createdPerson) => {
        store.findById(createdPerson._id, (err, foundPerson) => {
          store.findAndDelete(createdPerson._id, (err, deletedPerson) => {
            expect(err).toBeFalsy();
            expect(deletedPerson).toEqual({ deleted: 1 });
            done();
          });
        });
      });
    });

  });
});
