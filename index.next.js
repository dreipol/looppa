/**
 * Try to make loopable any kind of javascript primitive
 * @param   {array|number|string|object|Map|Set} collection - hopefully something that we can loop
 * @returns {Array} it will return always an array
 */
export default function looppa(collection) {
    // don't touch arrays
    if (Array.isArray(collection)) {
        return collection;
    }

    // handle numbers and strings
    switch (typeof collection) {
        case 'number':
            return Array.from(Array(collection).keys());
        case 'string':
            return collection.split('');
        default:
            //noop
    }

    // get the object entries
    if (Object.prototype.toString.call(collection) === '[object Object]') {
        return Object.entries(collection);
    }

    // loop Map and Set
    return Array.from(collection);
}
