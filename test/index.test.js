const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Store = require('../lib/index');


describe('Store', () => {

    beforeEach(done => {
        //clear out all files before you start testing using rimraf node module
        rimraf('./testData/store', err => {
            done(err);
        })
    });

    beforeEach(() => {
        //make new directories using mkdirp node module
        mkdirp('./testData/store', err => {
            done(err);
        });
    });

    beforeEach(() => {
        //tell it where to save stuff
        store = new Store('./testData/store');
    })

    it('creates an object in my store', done => {
        //use the create function to make a new object in the store - return a falsy error and return the new object
        store.create({ }, (err, createdObj) => {
            expect(err).toBeFalsy();
            expect(createObj).toEqual({ _id: expect.any(String) });
        });
    });
});