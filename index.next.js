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

    // don't touch arrays
    if (Array.isArray(collection)) {
        return collection;
    }

    // handle numbers and strings
    switch (typeof collection) {
        case 'number':
            return Object.keys(Array.from(Array(collection)));
        case 'string':
            return collection.split('');
        default:
            //noop
    }

    // get the object entries
    if (Object.prototype.toString.call(collection) === '[object Object]') {
        return Object
            .keys(collection)
            .reduce(function(acc, key) {
                acc.push([key, collection[key]]);
                return acc;
            }, []);
    }

    // loop Map and Set
    return Array.from(collection);
}
