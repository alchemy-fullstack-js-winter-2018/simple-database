const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Store = require('../lib/index');

describe.only('Store', () => {
  let store = null;
  beforeEach((done) => {
    rimraf('./testData/store', err => {
      done(err);
    });
  });

  beforeEach((done) => {
    mkdirp('./testData/store', err => {
      done(err);
    });
  });

  beforeEach(() => {
    //tell our app where to save things on our disk
    store = new Store('./testData/store');
  });

  it('creates an object in my store', done => {
    store.create({ movie: 'lord of the rings' }, (err, createdMovie) => {
      expect(err).toBeFalsy();
      expect(createdMovie).toEqual({ movie: 'lord of the rings', _id: expect.any(String) });
      done();
    });
  });

  it('finds an object in the store by id', done => {
    store.create({ movie: 'Homeward Bound' }, (err, createdMovie) => {
      store.findById((createdMovie._id), (err, foundMovie) => {
        expect(err).toBeFalsy();
        expect(foundMovie).toEqual({ movie: 'Homeward Bound', _id: createdMovie._id });
        done();
      });

    });
  });

  it('finds an object in the store by id and deletes it', done => {
    store.create({ movie: 'Home Alone' }, (err, createdMovie) => {
      store.findByIdAndDelete(createdMovie._id, (err, deletedMovie) => {
        expect(err).toBeFalsy();
        expect(deletedMovie).toEqual({ deleted: 1 });
        done();
      });
    });
  });

  it('can return an array of all the objects in the directory', done => {
    store.create({ movie: 'Air Bud' }, (err, item1) => {
      store.create({ movie: 'Home Alone' }, (err, item2) => {
        store.create({ movie: 'Lion King' }, (err, item3) => {
          store.create({ movie: 'Sword In The Stone' }, (err, item4) => {
            store.create({ movie: 'Little Mermaid' }, (err, item5) => {
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
});
