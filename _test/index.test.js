const fs = require('fs');
//NOTETOSELF:used to mkdirectories 
const mkdirp = require('mkdirp')
const { Store } = require('../_lib/index.js')
//NOTETOSELF:used to remove files 
const rimraf = require('rimraf');

describe('Store', () =>{
    let store = null;
    //NOTETOSELF:because we dont want several files on our comp
    beforeEach( done => {
        rimraf('./testData/store', err => {
            done(err);
        })
    })
    //NOTETOSELF:creates  new dir
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

    it('finds id and delete', done => {
        store.create({ name: "sherrys"}, (err, createdName) =>{
            store.findAndDelete(createdName._id, (err, foundId) =>{
                expect(err).toBeFalsy();
                expect(foundId).toEqual({ deleted: 1 });
                store.findById(createdName._id, (err, foundItem)=>{
                    expect(err).toBeTruthy();
                    expect(foundItem).toBeFalsy();
                    done();
                })
            })
        })
    })
 
    it('finds object by id and updates', () => {
        store.create({name: "johnny"}, (err, wrongName) => {
            store.findIdAndUpdate(wrongName._id, { name: "johnson" }, (err, updatedName) =>{
                expect(err).toBeFalsy();
                expect(updatedName).toEqual({ name: 'johnson', _id: updatedName._id });

            })
        })
    })

    
})



