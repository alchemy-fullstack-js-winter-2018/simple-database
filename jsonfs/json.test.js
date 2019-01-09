const fs = require('fs');
const { readJSON } = require('json.js');

describe('json function', () => {
    it('reading json objects', (done) => {
        const obj = { name: 'ryan'};

        const ojbString = Json.stringify(obj);

        fs.writeFile('test.json', (err, data) => {
            expect (err).toBeFalsy();
            readJSON('test.json', (err, data) => {
                expect(err).toBeFalsy();
                expect(data).toEqual(obj);
                done();

            })
         })
    })
})