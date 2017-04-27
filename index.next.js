/**
 * Try to make loopable any kind of javascript primitive
 * @param   {any} collection - hopefully something that we can loop
 * @param   {number} to - the end of a number range
 * @returns {Array} it will return always an array
 */
export default function looppa(collection, to) {
    // Special case: handle numbers
    if (isNumber(collection) && isNumber(to)) {
        return Array.from({ length: (to - collection + 1) }, (v, key) => [collection + key, collection + key]);
    } else if (to) {
        throw new TypeError('Both arguments need to be a number when creating a number range.');
    }

    // handle falsy values
    if (!collection) {
        return [];
    }

    // handle objects with an 'entries' function
    // such as: Arrays, Maps, Sets, NodeLists...
    if (typeof collection.entries === 'function') {
        return [...collection.entries()].map(entry => entry.reverse());
    }

    // Default for all other object types, strings, booleans and symbols
    return Object
        .keys(collection)
        .map((key) => {
            return [collection[key], key];
        });
}

/**
 * Helper function to determine if number is a Number
 *
 * @param  {number}  number - the value to check
 * @return {Boolean} is it a number?
 */
function isNumber(number) {
    return typeof number === 'number' && !isNaN(number);
}
