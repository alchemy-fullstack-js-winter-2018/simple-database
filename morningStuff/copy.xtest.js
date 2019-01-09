const copy = require('./copy');
const fs = require('fs');

describe('test copy function', () => {
    afterEach(() => {

    });

    it('tests that a file is copied', done => {
        copy('./src.txt', './newSrc.txt', callback => {
            expect(callback).toBeFalsy();
            
            fs.readFile('./src.txt', { encoding: 'utf8' }, (err, data) => {
                if(err) throw err;
                expect(err).toBeFalsy();
                expect(data).toEqual('something');
                done();
            });
        });
    });
});
