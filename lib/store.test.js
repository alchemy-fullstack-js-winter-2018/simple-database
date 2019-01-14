const Store = require('./store');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

describe('store', () => {
  let store = null;

  beforeEach(done => {
    rimraf('./emojis', err => {
      done(err);
    });
  });

  beforeEach(done => {
    mkdirp('./emojis', err => {
      done(err);
    });
  });

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
    store.create({ name: 'Happs' }, (cErr, emoji) => {
      store.findById(emoji._id, (err, data) => {
        expect(err).toBeFalsy();
        expect(data).toEqual(emoji);
        done();
      });
    });
  });

  it('finds object as null', done => {
    store.findById('5', (err, data) => {
      expect(err).toBeTruthy();
      expect(data).toEqual(null);
      done();
    });
  });
  
  it('deletes object', done => {
    store.create({ name: 'Happy' }, (cErr, emoji) => {
      store.delete(emoji._id, (dErr, message) => {
        expect(dErr).toBeFalsy();
        expect(message).toEqual({ deleted: 1 });
        done();
      });
    });
  });

  it('does not delete object', done => {
    store.create({ name: 'Happy' }, () => {
      store.delete('2', (dErr, message) => {
        expect(dErr).toBeTruthy();
        expect(message).toEqual({ deleted: 0 });
        done();
      });
    });
  });

  it('finds objects', done => {
    store.create({ name: 'Happs' }, (hErr, emoji1) => {
      store.create({ name: 'Saddy' }, (sErr, emoji2) => {
        store.find((fErr, emojis) => {
          expect(fErr).toBeFalsy();
          expect(emojis).toEqual([`${emoji1._id}.json`, `${emoji2._id}.json`].sort());
          done();
        });
      });
    });
  });

  it('empty array', done => {
    store.find((fErr, emojis) => {
      expect(fErr).toBeFalsy();
      expect(emojis).toEqual([]);
      done();
    });
  });

  it('updates object', done => {
    store.create({ name: 'Happy' }, (cErr, emoji) => {
      const newEmoji = { name: 'Saddy', _id: emoji._id };
      store.update(emoji._id, newEmoji, (uErr, updated) => {
        expect(uErr).toBeFalsy();
        expect(updated).toEqual(newEmoji);
        done();
      });
    });
  });
});
