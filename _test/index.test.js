const fs = require('fs');
//used to mkdirectories 
const mkdirp = require('mkdirp')

const { Store } = require('../_lib/index.js')

//used to remove files 
const rimraf = require('rimraf');

//mkdir -p 

describe('Store', () =>{
    let store = null;
    //because we dont want several files on our comp
    beforeEach( done => {
        rimraf('./testData/store', err => {
            done(err);
        })
    })
    //creates  new dir
    beforeEach((done) =>{
        mkdirp('./testData/store', err => {
            done(err);
        })
    })

    beforeEach(() => {
        store = new Store('./testData/store')

    })
    it('creates an object in my store', done => {
        store.create({ name: 'johnny'}, (err, createdPerson) => {
            expect(err).toBeFalsy();
            expect(createdPerson).toEqual({ name: 'johnny', _id: expect.any(String) });
            done();


        })
    })
    it('finds an object by id', done => {
        store.create({ name: 'Hangers'},  (err, name) =>{
            store.findById(name._id, (err, foundId) =>{
                expect(err).toBeFalsy();
                expect(foundId).toEqual({ name: 'Hangers', _id: name._id });
                done();
            })
        })
    })
})
    

