/* eslint-disable max-lines-per-function */

const assert = require('assert');
const looppa = require('./');

function serializeArgs(...args) {
    return args;
}

// Because the assert.deepEqual is not strict enough for us
function realDeepEqual(left, right) {
    return JSON.stringify(left) === JSON.stringify(right);
}

assert.realDeepEqual = function(...args) {
    this.ok(realDeepEqual(...args));
};

describe('looppa the looper', () => {
    it('nomalize null and undefined values into arrays', () => {
        const nullIter = looppa(null)();
        assert.ok(nullIter.map);
        assert.equal(nullIter.length, 0);

        const undefinedIter = looppa(undefined)(); // eslint-disable-line
        assert.ok(undefinedIter.map);
        assert.equal(undefinedIter.length, 0);
    });

    it('convert arrays into ranges untouched', () => {
        const iter = looppa([1, 2, 3])();
        assert.ok(iter.map);
        assert.equal(iter.length, 3);
        assert.realDeepEqual(iter, [[1, 0], [2, 1], [3, 2]]);
    });

    it('parse properly arrays arguments', () => {
        const iter = looppa([1, 2, 3])(serializeArgs);
        assert.ok(iter.map);
        assert.equal(iter.length, 3);
        assert.realDeepEqual(iter, [[1, 0, 0], [2, 1, 1], [3, 2, 2]]);
    });

    it('convert numbers into arrays', () => {
        const iter = looppa(1, 3)();
        assert.ok(iter.map);
        assert.equal(iter.length, 3);
        assert.realDeepEqual(iter, [[1, 0], [2, 1], [3, 2]]);
    });

    it('parse properly numbers arguments', () => {
        const iter = looppa(0, 3)(serializeArgs);
        assert.ok(iter.map);
        assert.equal(iter.length, 4);
        assert.realDeepEqual(iter, [[0, 0, 0], [1, 1, 1], [2, 2, 2], [3, 3, 3]]);
    });

    it('convert a range of numbers into arrays', () => {
        const iter = looppa(0, 3)();
        assert.ok(iter.map);
        assert.equal(iter.length, 4);
        assert.realDeepEqual(iter, [[0, 0], [1, 1], [2, 2], [3, 3]]);
    });

    it('throw TypeError if second argument is not a number', () => {
        assert.throws(looppa(0, 'a'), TypeError);
        assert.throws(looppa(0, null), TypeError);
        assert.throws(looppa(0, '1').bind(null, serializeArgs), TypeError);
    });

    it('convert strings into arrays', () => {
        const iter = looppa('ciao')();
        assert.ok(iter.map);
        assert.equal(iter.length, 4);
        assert.realDeepEqual(iter, [['c', 0], ['i', 1], ['a', 2], ['o', 3]]);
    });

    it('parse properly strings arguments', () => {
        const iter = looppa('ciao')(serializeArgs);
        assert.ok(iter.map);
        assert.equal(iter.length, 4);
        assert.realDeepEqual(iter, [['c', 0, 0], ['i', 1, 1], ['a', 2, 2], ['o', 3, 3]]);
    });

    it('convert objects into arrays', () => {
        const iter = looppa({ foo: 'bar', baz: 'buz' })();
        assert.ok(iter.map);
        assert.equal(iter.length, 2);
        assert.realDeepEqual(iter, [['bar', 'foo'], ['buz', 'baz']]);
    });

    it('parse properly object arguments', () => {
        const iter = looppa({ foo: 'bar', baz: 'buz' })(serializeArgs);
        assert.ok(iter.map);
        assert.equal(iter.length, 2);
        assert.realDeepEqual(iter, [['bar', 'foo', 0], ['buz', 'baz', 1]]);
    });

    it('convert Maps into arrays', () => {
        const iter = looppa(new Map().set({}, 'foo'))();
        assert.ok(iter.map);
        assert.equal(iter.length, 1);
        assert.realDeepEqual(iter, [['foo', {}]]);
    });

    it('parse properly Maps arguments', () => {
        const iter = looppa(new Map().set({}, 'foo'))(serializeArgs);
        assert.ok(iter.map);
        assert.equal(iter.length, 1);
        assert.realDeepEqual(iter, [['foo', {}, 0]]);
    });

    it('convert Sets into arrays', () => {
        const set = new Set();
        set.add('foo');
        set.add('bar');
        const iter = looppa(set)();
        assert.ok(iter.map);
        assert.equal(iter.length, 2);
        assert.realDeepEqual(iter, [['foo', 'foo'], ['bar', 'bar']]);
    });

    it('parse properly Sets arguments', () => {
        const set = new Set();
        set.add('foo');
        set.add('bar');
        const iter = looppa(set)(serializeArgs);
        assert.ok(iter.map);
        assert.equal(iter.length, 2);
        assert.realDeepEqual(iter, [['foo', 'foo', 0], ['bar', 'bar', 1]]);
    });
});
