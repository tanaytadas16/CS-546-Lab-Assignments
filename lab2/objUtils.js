commonKeys = (obj1, obj2) => {
    if (obj1 === undefined || obj2 === undefined) throw 'Object undefined';
    if (obj1.length === 0 || obj2.length === 0) throw 'empty';
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object')
        throw 'Input type is not object';

    let ans = {};
    for (let k in obj1) {
        if (obj1[k] === obj2[k]) ans[k] = obj1[k];
        else if (typeof obj1[k] === 'object') {
            ans[k] = commonKeys(obj1[k], obj2[k]);
        }
    }
    return ans;
};

flipObject = (object) => {
    let flip = {},
        flipin = {};
    if (typeof object !== 'object') throw 'Invalid data type';
    if (object === undefined) throw 'Object is undefined';
    if (Object.entries(object).length === 0) throw 'Object is empty';
    for (let j in object) {
        if (j === undefined || j.length === 0) throw 'Input Object is invalid ';
    }

    for (let [x, y] of Object.entries(object)) {
        if (x === null || y === null) throw 'Null cannot be key or value';
        if (typeof y === 'object') {
            if (Object.entries(y).length === 0) throw 'Value object is empty';
            // console.log(y);
            if (Array.isArray(y)) {
                for (let u of y) {
                    flipin[u] = x;
                }
                flip = flipin;
            } else {
                for (let [w, r] of Object.entries(y)) {
                    flipin[r] = w;
                    flip[x] = flipin;
                }
            }
        } else {
            flip[y] = x;
        }
    }
    return flip;
};

computeObjects = (array, func) => {
    if (array === undefined) throw 'array undefined';
    if (array.length === 0) throw 'empty';

    for (let q of array) {
        if (q.length === 0) throw 'Input object is empty';
        if (typeof q !== 'object') throw 'Only objects allowed inside array';
    }
    let obj = {};
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            for (let k in array[i]) {
                if (k in array[j]) {
                    sum = array[i][k] + array[j][k];
                    obj[k] = func(sum);
                } else {
                    obj[k] = func(array[i][k]);
                }
            }
            for (let k in array[j]) {
                if (k in array[i]) {
                    sum = array[i][k] + array[j][k];
                    obj[k] = func(sum);
                } else {
                    obj[k] = func(array[j][k]);
                }
            }
        }
    }
    return obj;
};
module.exports = {
    firstName: 'TANAY',
    lastName: 'TADAS',
    studentId: '10478620',
    commonKeys,
    computeObjects,
    flipObject,
};
