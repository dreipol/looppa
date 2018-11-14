/**
 * Try to convert to array any kind of javascript primitive
 * @param   {any} collection - hopefully something that we can loop
 * @param   {number} to - the end of a number range
 * @return {arrya} it will return always an array
 */
function toArray(collection, to) {
    // Special case: handle numbers
    if (typeof to !== 'undefined') {
        if (isNumber(collection) && isNumber(to)) {
            return Array.from({ length: (to - collection + 1) }, (v, key) => [collection + key, collection + key]);
        }

        throw new TypeError('Both arguments need to be a number when creating a number range.');
    }

    // handle falsy values
    if (!collection) {
        return [];
    }

    // Make sure that strings will be always parsed as arrays
    const items = typeof collection === 'string' ? Array.from(collection) : collection;

    /*
     * handle objects with an 'entries' function
     * such as: Arrays, Maps, Sets, NodeLists...
     */
    if (typeof items.entries === 'function') {
        return [...items.entries()].map(entry => entry.reverse());
    }

    // Default for all other object types, strings, booleans and symbols
    return Object
        .keys(items)
        .map((key) => {
            return [items[key], key];
        });
}

/**
 * Helper function to determine if number is a Number
 *
 * @param  {number}  number - the value to check
 * @return {boolean} is it a number?
 */
function isNumber(number) {
    return typeof number === 'number' && !isNaN(number);
}

/**
 * Transform the collecition into an array and return a function that can be looped
 * @param   {any} collection
 * @param   {number} to
 * @return {function} function that will receive (value, key, index) always
 */
export default function looppa(collection, to) {
    return function(fn) {
        let arr = toArray(collection, to);

        if (fn) {
            arr = arr.map(([value, key], index) => fn(value, key, index));
        }

        return arr;
    };
}


