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
    store.create({ name: 'Carmen' }, (err, createdPerson) => {
      expect(err).toBeFalsy();
      expect(createdPerson).toEqual({ name: 'Carmen', _id: expect.any(String) });
      done();
    });
  });

  it('finds an object by id', done => {
    // create an object
    store.create({ name: 'Carmen' }, (err, createdObj) => {
      // after done creating -> findBy Id
      store.findById(createdObj._id, (err, foundObj) => {
        // after found check that it is the same one that we created
        expect(err).toBeFalsy();
        expect(foundObj).toEqual({ name: 'Carmen', _id: createdObj._id });
        // call done
        done();
      });
    });
  });

  it('find all objects tracked by the store', () => {
    // create a bunch of objects (at least 5)
    store.create({ name: 'Carmen' }, (err, createdObj1) => {
      store.create({ name: 'Carly' }, (err, createdObj2) => {
        store.create({ name: 'Carla' }, (err, createdObj3) => {
          store.create({ name: 'Carina' }, (err, createdObj4) => {
            store.create({ name: 'Carmela' }, (err, createdObj5) => {
              store.find((err, foundObjects) => {
                expect(err).toBeFalsy();
                expect(foundObjects).toHaveLength(5);
                expect(foundObjects).toContain(createdObj1);
                expect(foundObjects).toContain(createdObj2);
                expect(foundObjects).toContain(createdObj3);
                expect(foundObjects).toContain(createdObj4);
                expect(foundObjects).toContain(createdObj5);
              });
            });
          });   
        });
      }); 
    });

  }
  
  );
});
