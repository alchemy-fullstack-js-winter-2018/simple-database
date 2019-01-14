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
    store.create({ name: 'scratchy' }, (err, createdScratchy) => {
      // after done creating -> findById
      store.findById(createdScratchy._id, (err, foundScratchy) => {
        // after found check that it is the same one that we created
        expect(err).toBeFalsy();
        expect(foundScratchy).toEqual({ name: 'scratchy', _id: createdScratchy._id });
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
// it('deletes an object with an id', done => {
//   //create an item in
//   delete that item 
//   findbyid(itfromcreated item)
//   expect(foundItem).toBeFalsy()
// })

//Find By ID and Update:
it('updates an existing object', () => {
  //call store.create
  store.create( { name: 'itchy' }, (err, updateItchy) => {
    // -> store.findByIdAndUpdate(_id, objectToUpdate, callback(error, updatedObject))
    store.findByIdAndUpdate(updateItchy._id,{ name: 'Scratchy' }, (error, updatedToScratchy) => {
      //-> -> expect updatedObject returned in callback
      expect(err).toBeFalsy();
      expect(updatedToScratchy).toEqual({ name: 'scratchy', _id: updateItchy_.id });
    //-> -> store.findById(createObject._id)
    store.findById(updatedToScratchy._id, (err, foundScratchy))
    //-> -> -> expect updated object
    expect(foundScratchy).toEqual(updatedToScratchy);
    done();
    })
});
});

}) 