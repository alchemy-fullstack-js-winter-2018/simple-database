
const fs = ('fs');
const copy = ('./copy')

describe('copy function', () =>{ 
    // afterEach(() => {
    //     const fileCopied = 
    // })
    it('test copied file', done => {
        copy('./writing.txt', './writing-copy.txt', err =>{
            expect(err).toBeFalsy();
            fs.readFile('./writing.txt', { encoding: 'utf8' }, (err, data) => {
                expect(err).toBeFalsy();
                expect(data).toEqual('I am written');
                done();
            })    
        }) 
    })   
})