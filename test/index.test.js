
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Store = require('../lib/index');


describe('Store', () => {
  let store = null; //starts with clean store
  beforeEach(done => {
    rimraf('./testData/store', err => {
      done(err);
    });
  });
  //recreates store directory
  beforeEach(done => {
    mkdirp('./testData/store', err => {
      done(err);
    });
  });
  //once removed this is where the new store goes
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
    //create an object
    store.create({ name: 'tommy' }, (err, createdAnimal) => {
            
      store.findById(createdAnimal._id, (err, foundAnimal) => {
        expect(err).toBeFalsy();
        expect(foundAnimal).toEqual({ name: 'tommy', _id: createdAnimal._id });
        done();
      });
    }); 
  });

  it('find all objects tracked by the store', done => {
    //create a bunch of objects (at least 5) nested
    store.create({ name: 'fluffy' }, (err, createdAnimal1) => {
      store.create({ name: 'snowball' }, (err, createdAnimal2) => {
        store.create({ name: 'grumpy' }, (err, createdAnimal3) => {
          store.create({ name: 'sleepy' }, (err, createdAnimal4) => {
            store.create({ name: 'woffy' }, (err, createdAnimal5) => {
              store.find((err, listOfItems) => {
                expect(err).toBeFalsy();
                expect(listOfItems).toHaveLength(5);
                expect(listOfItems).toContainEqual(createdAnimal1);
                expect(listOfItems).toContainEqual(createdAnimal2);
                expect(listOfItems).toContainEqual(createdAnimal3);
                expect(listOfItems).toContainEqual(createdAnimal4);
                expect(listOfItems).toContainEqual(createdAnimal5);
                done();
              });
            });
          });
        });
      });
    });
  });

  it('will find an object by id and delete', done => {
    store.create({ item: 'I am going to delete' }, (err, createdItem) => {
      store.findByIdAndDelete(createdItem._id, (err, result) => {
        //expect to not get an error when deleting
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

  it('will update an existing object', done => {
    store.create({ item: 'I am going to update' }, (err, createdItem) => {
      store.findByIdAndUpdate(createdItem._id, { item: 'updated object' }, (err, result) => {
        expect(err).toBeFalsy();
        expect(result).toEqual({ item: 'updated object' });
        store.findById(createdItem._id, (err, updatedItem) => {
          expect(updatedItem).toEqual({ item: 'updated object' });
          done(); 
        });
      });
    });
  });

  it('will update', done => {
    store.create({ name: 'rayn' }, (err, typoCreated) =>{
      store.findByIdAndUpdate(typoCreated._id, { name: 'ryan' }, (err, updatedWithoutTypo) => {
        expect(err).toBeFalsy();
        expect(updatedWithoutTypo).toEqual({ name: 'ryan', _id: typoCreated._id });
        store.findById(typoCreated._id, (err, foundObj) => {
          expect(foundObj).toEqual(updatedWithoutTypo);
          done();
        });
      });
    });
  });
});
