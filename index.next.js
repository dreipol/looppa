/**
 * Try to make loopable any kind of javascript primitive
 * @param   {array|number|string|object|Map|Set} collection - hopefully something that we can loop
 * @returns {Array} it will return always an array
 */
export default function looppa(collection) {
    // handle falsy values
    if (!collection) {
        return [];
    }

    // handle objects with an 'entries' function
    // such as: Arrays, Maps, Sets, NodeLists...
    if (typeof collection.entries === 'function') {
        return [...collection.entries()];
    }

    // handle numbers and strings
    switch (typeof collection) {
        case 'number':
            return Array.from({ length: collection }, (v, key) => key);
        case 'string':
            return collection.split('');
        default:
            // Default for all other object types, booleans and symbols
            return Object
                .keys(collection)
                .map((key) => {
                    return [key, collection[key]];
                });
    }
}
