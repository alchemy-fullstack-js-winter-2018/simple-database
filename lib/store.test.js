const Store = require('./store');
const fs = require('fs');

describe('store', () => {
  let store = null;
  beforeEach(() => {
    store = new Store('emojis');
  });

  it('creates new object', done => {
    store.create({ name: 'Happy' }, (err, saved) => {
      const happy = { name: 'Happy', _id: expect.any(String) };
      expect(err).toBeFalsy();
      expect(saved).toEqual(happy);
      done();
    });
  });

  it('finds object by id', done => {
    store.findById('3f13fa', (err, data) => {
      expect(err).toBeFalsy();
      expect(data).toEqual({ name:'sad', _id:'3f13fa' });
      done();
    });
  });

  it('finds object as null', done => {
    store.findById('e35d96', (err, data) => {
      // expect(err).toBeFalsy();
      // expect(data).toEqual(null);
      console.log('null object', data);
      done();
    });
  });  
});
