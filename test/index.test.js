
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Store = require('../lib/index');


describe('Store', () => {
    let store = null; //starts with clean store, remove e
    beforeEach(done => {
        rimraf('./testData/store', err => {
            done(err);
        });

    });
//recreates store directory
    beforeEach(() => {
        mkdirp('./testData/store', err => {

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
        const animal = {name: 'tommy'};
        //after done creating -> findById
        const createdAnimal = store.create(animal);
        const foundAnimal = store.findById(createdAnimal._id, err => {

            expect(foundAnimal).toEqual(createdAnimal);
            done();
        });
        //after found check that it is the same one that we created
        //then call done
    });
})