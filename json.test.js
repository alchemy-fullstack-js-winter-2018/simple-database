const fs = require('fs');
const { 
    readJSON,
    writeJSON,
 } = require('./json.js');

describe('json function', () => {
    it('reading json objects', done => {
        const obj = { name: 'ryan' };
        const objString = JSON.stringify(obj);
        fs.writeFile('./testData/test', objString, err => {
            expect(err).toBeFalsy();
            readJSON('./testData/test', (err, data) => {
                expect(err).toBeFalsy();
                expect(data).toEqual(obj);
                done();

            })
        })
    })
})

describe('writeJSON', () => {
    it ('writes JSON to disk', done =>{
        const obj = { name: 'boi' };
        writeJSON('./testData/testWrite', obj, err =>{
            expect(err).toBeFalsy();
            readJSON('./testData/testWrite', (err, data) => {
                expect(err).toBeFalsy();
                expect(data).toEqual(obj);
                done();
            })

        })
    })
})

