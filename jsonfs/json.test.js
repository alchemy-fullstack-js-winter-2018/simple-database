const fs = require('fs');
const { readJSON } = require('/.json.js');

describe('json function', () => {
    it('reading json objects', (done) => {
        const obj = { name: 'ryan' };
        const objString = JSON.stringify(obj);
        fs.writeFile('test.json', objString, err => {
            expect(err).toBeFalsy();
            readJSON('test.json', (err, data) => {
                expect(err).toBeFalsy();
                expect(data).toEqual(obj);
                done();

            })
        })
    })
})

// describe('writeJSON', () => {
//     it ('writes JSON to disk', done =>{

//     })
// })