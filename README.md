# looppa

[![Build Status][travis-image]][travis-url]

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

Simple functional script to loop array, strings, numbers, objects, Map and Set.

Always returns an Array of `[value, key]`.

# Installation

```sh
npm i looppa -S
```

# Usage
```js
import looppa from 'looppa';

// normalize null and undefined
const nullCollection = looppa(null) // []
const undefinedCollection = looppa(undefined) // []

// arrays will be left untouched
const array = looppa(['foo', null, undefined]); // [['foo', 0], [null, 1], [undefined, 2]]

// numbers to array
const numbers = looppa(0, 4); // [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]]
const square = numbers.map(([n]) => n * 2); // [2, 4, 6, 8]

// strings to array
const string = looppa('ciao'); // [['c', 0], ['i', 1], ['a', 2], ['o', 3]]

// objects to array
const obj = looppa({ foo: 'bar', buz: 'baz' }); // [['foo', 'bar'], ['buz', 'baz']]

// Map to array
const myMap = new Map();
myMap.set('foo', 'bar');
myMap.set('buz', 'baz');
const map = looppa(myMap) // [['foo', 'bar'], ['buz', 'baz']]

// Set to array
const mySet = new Set();
mySet.add('foo');
mySet.add('bar');
const map = looppa(mySet); // [['foo', 'foo'], ['bar', 'bar']]
```

# With React.js

This script is really handy if you need to deal with React loops

```jsx
<div>
  <h1>Array</h1>
  <ul>
    {looppa([1, 2, 3])(number => (
      <li>{number}</li>
    ))}
  </ul>

  <h1>Numbers</h1>
  <ul>
    {looppa(0, 5)(number => (
      <li>{number}</li>
    ))}
  </ul>

  <h1>Letters</h1>
  <ul>
    {looppa('ciao')(letter => (
      <li>{letter}</li>
    ))}
  </ul>

  <h1>Object</h1>
  <ul>
    {looppa({ foo: 'bar', baz: 'buz' })((value, key) => (
      <li>{key}, {value}</li>
    ))}
  </ul>

  <h1>Map</h1>
  <ul>
    {looppa(new Map().set(1, 'bar'))((value, key) => (
      <li>{key}, {value}</li>
    ))}
  </ul>

  <h1>Set</h1>
  <ul>
    {looppa(new Set().add('foo').add('bar'))(value => (
      <li>{value}</li>
    ))}
  </ul>
</div>
```

[check the demo](https://plnkr.co/edit/1DHUkr1mCUafiwz68f62?p=preview)


[travis-image]:https://img.shields.io/travis/dreipol/looppa.svg?style=flat-square
[travis-url]:https://travis-ci.org/dreipol/looppa

[license-image]:http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:LICENSE.txt

[npm-version-image]:http://img.shields.io/npm/v/looppa.svg?style=flat-square
[npm-downloads-image]:http://img.shields.io/npm/dm/looppa.svg?style=flat-square
[npm-url]:https://npmjs.org/package/looppa
