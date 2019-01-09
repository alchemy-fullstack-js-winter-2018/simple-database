const fs = require('fs');
const copy = require('./copy');

describe('copy function', () => {
    afterEach(() => {
        //clean up copied file
        
    });

    it('test copied file', done => {
        //call the copy fn, give it a src and a dst and a callback (err)
        copy('./writing.txt', './writing-copy.txt', err => {
            // test failed if error
            expect(err).toBeFalsy();
           
            fs.readFile('./writing.txt', {encoding: 'utf8'}, (err, data) => {
                expect(err).toBeFalsy();
                //check that the content is as expected
                expect(data).toEqual('I am writing!!')
                //announce that the test is finished
                done() 
            });
        });
    });
});


