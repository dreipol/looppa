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

    it('leave untouched row arrays', () => {
        const iter = looppa([1, 2, 3]);
        assert.ok(iter.map);
        assert.equal(iter.length, 3);
    });

    it('convert numbers into arrays', () => {
        const iter = looppa(3);
        assert.ok(iter.map);
        assert.equal(iter.length, 3);
    });

    it('convert strings into arrays', () => {
        const iter = looppa('ciao');
        assert.ok(iter.map);
        assert.equal(iter.length, 4);
    });

    it('convert objects into arrays', () => {
        const iter = looppa({ foo: 'bar', baz: 'buz' });
        assert.ok(iter.map);
        assert.equal(iter.length, 2);
    });

    it('convert Maps into arrays', () => {
        const iter = looppa(new Map().set(NaN, 'foo'));
        assert.ok(iter.map);
        assert.equal(iter.length, 1);
    });

    it('convert Sets into arrays', () => {
        const set = new Set();
        set.add('foo');
        set.add('bar');
        const iter = looppa(set);
        assert.ok(iter.map);
        assert.equal(iter.length, 2);
    });
});
