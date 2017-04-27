const assert = require('assert');
const looppa = require('./');
describe('looppa the looper', () => {
    it('nomalize null and undefined values into arrays', () => {
        const nullIter = looppa(null);
        assert.ok(nullIter.map);
        assert.equal(nullIter.length, 0);

        const undefinedIter = looppa(undefined); // eslint-disable-line
        assert.ok(undefinedIter.map);
        assert.equal(undefinedIter.length, 0);
    });

    it('convert arrays into array entries', () => {
        const iter = looppa([1, 2, 3]);
        assert.ok(iter.map);
        assert.equal(iter.length, 3);
        assert.deepEqual(iter, [[0, 1], [1, 2], [2, 3]]);
    });

    it('convert numbers into arrays', () => {
        const iter = looppa(3);
        assert.ok(iter.map);
        assert.equal(iter.length, 3);
        assert.deepEqual(iter, [[0, 0], [1, 1], [2, 2]]);
    });

    it('convert strings into arrays', () => {
        const iter = looppa('ciao');
        assert.ok(iter.map);
        assert.equal(iter.length, 4);
        assert.deepEqual(iter, [[0, 'c'], [1, 'i'], [2, 'a'], [3, 'o']]);
    });

    it('convert objects into arrays', () => {
        const iter = looppa({ foo: 'bar', baz: 'buz' });
        assert.ok(iter.map);
        assert.equal(iter.length, 2);
        assert.deepEqual(iter, [['foo', 'bar'], ['baz', 'buz']]);
    });

    it('convert Maps into arrays', () => {
        const iter = looppa(new Map().set({}, 'foo'));
        assert.ok(iter.map);
        assert.equal(iter.length, 1);
        assert.deepEqual(iter, [[{}, 'foo']]);
    });

    it('convert Sets into arrays', () => {
        const set = new Set();
        set.add('foo');
        set.add('bar');
        const iter = looppa(set);
        assert.ok(iter.map);
        assert.equal(iter.length, 2);
        assert.deepEqual(iter, [['foo', 'foo'], ['bar', 'bar']]);
    });
});
