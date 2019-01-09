const Store = require('../lib/index');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');


describe('store', () => {
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



    it('can create a new file', done => {
        store.create({ tweet: 'hello World' }, (err, createdTweet) => {
            expect(err).toBeFalsy();
            expect(createdTweet).toEqual({ tweet: 'hello World', _id: expect.any(String) });
            done();
        });
    });

    it('finds an object by id', done => {
        store.create({ tweet: 'hello World' }, (err, createdTweet) => {

            store.findById(createdTweet._id, (err, objectFromFile) => {
                expect(err).toBeFalsy();
                expect(objectFromFile).toEqual({ tweet: 'hello World', _id: createdTweet._id });
                done();
            });
        });
    });
});



