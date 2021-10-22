average = (array) => {
    if (typeof array == 'string') throw 'Enter valid data type';
    let total = 0;
    if (array === undefined) throw 'Enter a Valid Input';
    if (array.length == 0) throw 'Enter a valid number in Input';
    if (array.includes('[]')) throw 'Enter a valid number in Input';
    for (let r of array) {
        if (r.length === 0 || r === '[]') throw 'Input Value is invalid';
    }

    return calc_avg(array);
    function calc_avg(a) {
        flatvalue = a.flat();
        for (let i = 0; i < flatvalue.length; i++) {
            total += flatvalue[i];
        }
        return (avg = Math.round(total / flatvalue.length));
    }
};

modeSquared = (array) => {
    if (array === undefined) throw 'Provide an input';
    if (array.length === 0) throw 'Provide an input,array is empty';
    if (typeof array !== 'object') throw 'Provide a valid input';
    array.forEach((item) => {
        if (typeof item !== 'number')
            throw 'Provide a valid input, only numbers allowed';
    });
    let count = {};
    array.forEach((element) => {
        if (count[element]) count[element]++;
        else count[element] = 1;
    });
    let result = [];
    let highvalue = 1;
    let maxkey = 0;
    for (let key in count) {
        let value = count[key];
        //console.log(value);
        if (value > highvalue) {
            highvalue = value;
            result.push(Number([key]));
            maxkey = key;
        } else if (count[key] > 1) {
            result.push(Number([key]));
        }
    }

    let res = result.flat();
    //console.log(res);
    let add = 0;
    res.forEach((i) => {
        add += Math.pow(i, 2);
    });
    return add;
};

medianElement = (array) => {
    org = [...array];
    array.sort(function (a, b) {
        return a - b;
    });
    if (array === undefined) throw 'Provide an input';
    if (array.length === 0) throw 'Provide an input,array is empty';
    if (typeof array !== 'object') throw 'Provide a valid input';
    array.forEach((item) => {
        if (typeof item !== 'number')
            throw 'Provide a valid input, only numbers allowed';
    });

    let obj = {};
    if (array.length % 2 !== 0) {
        let res = array[Math.floor(array.length / 2)];
        obj[res] = org.indexOf(Math.floor(res));
    } else {
        let mid1 = array[array.length / 2];
        let mid2 = array[array.length / 2 - 1];
        if (mid1 === mid2)
            obj[(mid1 + mid2) / 2] = org.indexOf(Math.floor((mid1 + mid2) / 2));
        else
            obj[(mid1 + mid2) / 2] = org.indexOf(Math.round((mid1 + mid2) / 2));
    }
    return obj;
};

merge = (arrayOne, arrayTwo) => {
    if (arrayOne === undefined || arrayTwo === undefined)
        throw 'Provide an input';
    if (arrayOne.length === 0 || arrayTwo.length === 0)
        throw 'Enter a valid input, array cannot be empty';
    if (typeof arrayOne !== 'object' || typeof arrayTwo !== 'object')
        throw 'Provide a valid type of input';
    for (let r of arrayOne) {
        if (
            typeof r === 'null' ||
            r === null ||
            typeof r === undefined ||
            typeof r === 'boolean'
        )
            throw 'Input type is invalid';
    }
    for (let r of arrayTwo) {
        if (
            typeof r === 'null' ||
            r === null ||
            typeof r === undefined ||
            typeof r === 'boolean'
        )
            throw 'Input type is invalid';
    }
    let conc = arrayOne.concat(arrayTwo);
    conc.sort();
    let a1 = [],
        a2 = [],
        a3 = [];
    conc.forEach((item) => {
        if (typeof item === 'string' && item === item.toLowerCase()) {
            a1.push(item);
        } else if (typeof item === 'string' && item === item.toUpperCase())
            a2.push(item);
        else a3.push(item);
    });
    return a1.concat(a2, a3);
};

module.exports = {
    firstName: 'TANAY',
    lastName: 'TADAS',
    studentId: '10478620',
    average,
    modeSquared,
    medianElement,
    merge,
};
