const Store = require('./store');
const fs = require('fs');

describe('emoji file storing', () => {
  describe('create', () => {
    let store = null;
    beforeEach(() => {
      store = new Store('emojis');
    });

    it('stores emoji', done => {
      store.create({ name: 'Happy' }, (err, saved) => {
        const happy = { name: 'Happy', _id: expect.any(String) };
        expect(err).toBeFalsy();
        expect(saved).toEqual(happy);
        done();
      });
    });
  });
});
