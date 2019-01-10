const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Store = require('../lib/index');


describe('Store', () => {
    let store = null;
    beforeEach(done => {
        //clear out all files before you start testing using rimraf node module then call done
        rimraf('./testData/store', err => {
            done(err);
        })
    });

    beforeEach(done => {
        //make new directories using mkdirp node module then call done
        mkdirp('./testData/store', err => {
            done(err);
        });
    });

    beforeEach(() => {
        //tell it where to save stuff 
        store = new Store('./testData/store');
    });

    it('creates an object in my store', done => {
        //use the create function to make a new object in the store - return a falsy error and return the new object
        store.create({ snack: 'plaintain chips' }, (err, createdSnack) => {
            expect(err).toBeFalsy();
            expect(createdSnack).toEqual({ snack: 'plaintain chips', _id: expect.any(String) });
            done(err);
        });
    });

    it('finds an object by id', done => {
        store.create({ snack: 'plaintain chips' }, (err, createdSnack) => {
            const id = createdSnack._id;
            store.findById(id, (err, foundSnack) => {
                expect(err).toBeFalsy();
                expect(foundSnack).toEqual({ snack: 'plaintain chips', _id: id });
                done(err);
            });
        });
    });

    it('finds an object by id and deletes the object', done => {
        store.create({ snack: 'almonds' }, (err, createdSnack) => {
            const id = createdSnack._id;
            store.findByIdAndDelete(id, (err, foundSnack) => {
                expect(err).toBeFalsy();
                expect(foundSnack).toEqual({ deleted: 1 });
                done(err);
            })
        })
    })
});
