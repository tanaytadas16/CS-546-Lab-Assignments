const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils');

try {
    console.log(
        arrayUtils.average([
            [1, 3],
            [2, 4, 5],
        ])
    );
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayUtils.average([[1, 3], []]));
} catch (e) {
    console.log(e);
}

try {
    console.log(arrayUtils.modeSquared([1, 2, 3, 3, 4]));
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayUtils.modeSquared([]));
} catch (e) {
    console.log(e);
}

try {
    console.log(arrayUtils.medianElement([5, 6, 9, 2]));
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayUtils.medianElement([]));
} catch (e) {
    console.log(e);
}

try {
    console.log(arrayUtils.merge(['b', 'a', 'c'], [3, 'a', 20, 1]));
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayUtils.merge([null, null, null], [null, null, null]));
} catch (e) {
    console.log(e);
}

try {
    console.log(stringUtils.sortString('123 FOO BAR!'));
} catch (e) {
    console.log(e);
}
try {
    console.log(stringUtils.sortString(''));
} catch (e) {
    console.log(e);
}

try {
    console.log(stringUtils.replaceChar('long song', 1));
} catch (e) {
    console.log(e);
}
try {
    console.log(stringUtils.replaceChar(''));
} catch (e) {
    console.log(e);
}

try {
    console.log(stringUtils.mashUp('Patrick', 'Hill', '$'));
} catch (e) {
    console.log(e);
}
try {
    console.log(stringUtils.mashUp('h', 'Hello', 4));
} catch (e) {
    console.log(e);
}

try {
    console.log(objUtils.commonKeys({ a: 2, b: 4 }, { a: 5, b: 4 }));
} catch (e) {
    console.log(e);
}
try {
    console.log(objUtils.commonKeys(1, { a: 5, b: 4 }));
} catch (e) {
    console.log(e);
}

try {
    console.log(
        objUtils.computeObjects(
            [
                { x: 2, y: 3 },
                { a: 70, x: 4, z: 5 },
            ],
            (x) => x * 2
        )
    );
} catch (e) {
    console.log(e);
}
try {
    console.log(objUtils.computeObjects());
} catch (e) {
    console.log(e);
}

try {
    console.log(objUtils.flipObject({ a: 3, b: 7, c: 5 }));
} catch (e) {
    console.log(e);
}
try {
    console.log(objUtils.flipObject('str'));
} catch (e) {
    console.log(e);
}
