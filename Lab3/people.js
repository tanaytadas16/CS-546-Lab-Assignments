const axios = require('axios');
async function getPeople() {
    const { data } = await axios.get(
        'https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json'
    );
    return data;
}
async function getPersonById(inp) {
    bool = false;
    if (inp === undefined) throw `Input is undefined`;
    if (inp.length === 0) throw 'Input is empty';
    if (typeof inp !== 'string')
        throw `(${inp}) datatype is wrong, only strings allowed`;

    let people = await getPeople();

    for (let i = 0; i < people.length; i++) {
        for (let k in people[i]) {
            if (people[i][k] === inp) {
                bool = true;
                return people[i];
            }
        }
    }
    if (bool === false) throw 'Person not found';
}
async function sameStreet(streetName, streetSuffix) {
    if (streetName === undefined && streetSuffix === undefined)
        throw `Both Input parameters are undefined`;
    if (streetName === undefined) throw `streetName parameter is undefined`;
    if (streetSuffix === undefined) throw `streetSuffix parameter is undefined`;
    if (streetName.length === 0)
        throw `Input length of parameter is equal to zero `;
    if (streetSuffix.length === 0)
        throw `Input length of parameter is equal to zero `;
    if (typeof streetName !== 'string')
        throw `${streetName} is not of string type`;
    if (typeof streetSuffix !== 'string')
        throw `${streetSuffix} is not of string type`;
    let data = await getPeople();
    let res = [];

    for (let ele of data) {
        if (
            (streetName.toUpperCase() ===
                ele.address.home.street_name.toUpperCase() &&
                streetSuffix.toUpperCase() ===
                    ele.address.home.street_suffix.toUpperCase()) ||
            (streetName.toUpperCase() ===
                ele.address.work.street_name.toUpperCase() &&
                streetSuffix.toUpperCase() ===
                    ele.address.work.street_suffix.toUpperCase())
        ) {
            res.push(ele);
        }
    }
    if (res.length <= 1)
        throw `${streetName} ${streetSuffix} doesnt match with anyone living on same home or work address`;

    return res;
}
async function manipulateSsn() {
    if (arguments.length !== 0) throw 'Cannot pass arguments';
    let res_min = {};
    let max;
    let result = {};
    let sum = 0;
    let x = [];
    let main = {};
    data = await getPeople();

    data = await getPeople();
    for (let element of data) {
        x.push(Number(element.ssn.replace(/-/g, '').split('').sort().join('')));
    }

    x.forEach((element) => {
        sum += element;
    });
    //console.log(sum);

    let avg = Math.floor(sum / x.length);
    if (typeof avg !== 'number')
        throw `${avg} datatype is wrong, only numbers are allowed`;
    max = Math.max.apply(null, x);
    //console.log(max);
    let min = Math.min.apply(null, x);
    //console.log(min);
    for (let ele of data) {
        let x1 = Number(ele.ssn.replace(/-/g, '').split('').sort().join(''));
        if (x1 === max) {
            result.firstName = ele.first_name;
            result.lastName = ele.last_name;
            main['highest'] = result;
        }
        if (x1 === min) {
            res_min.firstName = ele.first_name;
            res_min.lastName = ele.last_name;
            main['lowest'] = res_min;
        }
    }
    main['average'] = avg;
    return main;
}
async function sameBirthday(month, day) {
    if (typeof month === 'string' || typeof day === 'string') {
        month = month.trim();
        day = day.trim();
    }
    if (month === undefined || day === undefined) throw 'Input is not defined';
    if (month.length === 0 || day.length === 0) throw 'Input is empty';

    month = parseInt(month, 10);
    day = parseInt(day, 10);
    if (day > 31 || day < 01)
        throw `${day} day is out of bounds, It must be in range of 01-31`;
    if (month > 12 || month < 01)
        throw `${month} Month is out of bounds, It must be in range of 01-12`;
    if (month == 2 && day > 28) throw `There are not ${day} days in Feb `;
    if (month == 4 && day > 30) throw `There are not ${day} days in April `;
    if (month == 6 && day > 30) throw `There are not ${day} days in June `;
    if (month == 9 && day > 30) throw `There are not ${day} days in Sept `;
    if (month == 11 && day > 30) throw `There are not ${day} days in Nov `;
    let mon, dat;
    let arr = [];
    let temp = false;

    data = await getPeople();
    for (let k of data) {
        mon = k.date_of_birth.slice(0, 2);
        dat = k.date_of_birth.slice(3, 5);
        if (mon == month && day == dat) {
            arr.push(`${k.first_name} ${k.last_name}`);
            temp = true;
        }
    }
    if (temp == false)
        throw `There are no people matching with dates on ${month.replace(
            '0',
            ''
        )}/${day.replace('0', '')}`;
    return arr;
}
module.exports = {
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday,
};
