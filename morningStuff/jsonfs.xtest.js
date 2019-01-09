const fs = require('fs');
const {
    readJSON, 
    writeJSON
} = require('./jsonfs');


describe('writes an object as a string', () => {
    it('can return a string', done => {
        const obj = { tweet: 'hello World' };
        const jsonObj = JSON.stringify(obj);

        fs.writeFile('./test.txt', jsonObj, err => {
            expect(err).toBeFalsy();
            readJSON('./test.txt', (err, data) => {
                expect(err).toBeFalsy();
                expect(data).toEqual(obj);
                done();

            }); 
        });
    });
});

describe('reads json', () => {
    it('writes json to disk', done => {
        const obj = { tweet: 'hello World' };

        writeJSON('./writeJSON', obj, err => {
            expect(err).toBeFalsy();

            readJSON('./writeJSON', (err, data) => {
                expect(err).toBeFalsy();
                expect(data).toEqual(obj);
                done();
            }); 
        });
    });
});

