# looppa
Simple functional script to loop array, strings, numbers, objects, Map and Set

# Installation

```sh
npm i looppa -S
```

# Usage
```js
import looppa from 'looppa';

// arrays will be left untouched
const array = looppa(['foo', null, undefined]); // ['foo', null, undefined]

// numbers to array
const numbers = looppa(4); // [1, 2, 3, 4]
const square = numbers.map(n => n * 2); // [2, 4, 6, 8]

// strings to array
const string = looppa('ciao'); // ['c', 'i', 'a', 'o']

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
const map = looppa(mySet); // ['foo' 'bar']
```

# With React.js

This script is really handy if you need to deal with React loops

```jsx
<div>

  <h1>Array</h1>
  <ul>
    {looppa([1, 2, 3]).map(number => (
      <li>{number}</li>
    ))}
  </ul>

  <h1>Numbers</h1>
  <ul>
    {looppa(5).map(number => (
      <li>{number}</li>
    ))}
  </ul>

  <h1>Letters</h1>
  <ul>
    {looppa('ciao').map(letter => (
      <li>{letter}</li>
    ))}
  </ul>

  <h1>Object</h1>
  <ul>
    {looppa({ foo: 'bar', baz: 'buz' }).map(([key, value]) => (
      <li>{key}, {value}</li>
    ))}
  </ul>

  <h1>Map</h1>
  <ul>
    {looppa(new Map().set(NaN, 'bar')).map(([key, value]) => (
      <li>{key}, {value}</li>
    ))}
  </ul>

  <h1>Set</h1>
  <ul>
    {looppa(new Set('bar', 'foo')).map(value => (
      <li>{value}</li>
    ))}
  </ul>
</div>
```

[check the demo](https://plnkr.co/edit/uobOWoWS8EpG9kgtwpwL?p=preview)
