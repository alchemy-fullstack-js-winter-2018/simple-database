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
    // it('finds array of objects', done => {
    //     store.create({ item: 1 }, (err, item1) => {
    //         store.create({ item: 2 }, (err, item2) => {
    //             store.create({ item: 3 }, (err, item3) => {
    //                 store.create({ item: 4 }, (err, item4) => {
    //                     store.create({ item: 5 }, (err, item5) => {
    //                         expect(err).toBeFalsey();
    //                         //NOTETOSELF: expect listOfItems.toHaveLength(5);
    //                         expect(listOfItems).toHaveLength(5);
    //                         expect(listOfItems).toContainEqual(item1);
    //                         expect(listOfItems).toContainEqual(item2);
    //                         expect(listOfItems).toContainEqual(item3);
    //                         expect(listOfItems).toContainEqual(item4);
    //                         expect(listOfItems).toContainEqual(item5);
                            
    //                     })
    //                 })
    //             })
    //         })  
    //     })
    // })
    it('finds object by id and updates', () => {
        store.create({name: "johnny"}, (err, wrongName) => {
            store.findIdAndUpdate(wrongName._id, { name: "johnson" }, (err, updatedName) =>{
                expect(err).toBeFalsy();
                expect(updatedName).toEqual({ name: 'johnson', _id: updatedName._id });

            })
        })
    })

    
})

// it('find all objects tracked by the store', done => {
//     store.create({ item: 1 }, (err, item1) => {
//       store.create({ item: 2 }, (err, item2) => {
//         store.create({ item: 3 }, (err, item3) => {
//           store.create({ item: 4 }, (err, item4) => {
//             store.create({ item: 5 }, (err, item5) => {
//               store.find((err, listOfItems) => {
//                 expect(err).toBeFalsy();
//                 expect(listOfItems).toHaveLength(5);
//                 expect(listOfItems).toContainEqual(item1);
//                 expect(listOfItems).toContainEqual(item2);
//                 expect(listOfItems).toContainEqual(item3);
//                 expect(listOfItems).toContainEqual(item4);
//                 expect(listOfItems).toContainEqual(item5);
//                 done();
//               });
//             });
//           });
//         });
//       });
//     });



