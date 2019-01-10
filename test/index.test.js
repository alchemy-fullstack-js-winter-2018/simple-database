
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
                expect(foundAnimal).toEqual({ name: 'tommy', _id: createdAnimal._id});
                done();
            });
        }); 
    });

    it('find all objects tracked by the store', () => {
        //create a bunch of objects (at least 5) nested
        store.create({ name: 'fluffy' }, (err, createdAnimal) => {
            store.create({ name: 'snowball' }, (err, createdAnimal) => {
                store.create({ name: 'grumpy' }, (err, createdAnimal) => {
                    store.create({ name: 'sleepy'}, (err, createdAnimal) => {
                        store.create({ name: 'woffy'}, (err, createdAnimal) => {
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
});