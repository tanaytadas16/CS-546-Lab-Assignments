const sortString = function sortString(string) {
    if (string === undefined) throw 'Input is undefined';
    if (string.length === 0) throw 'string is empty';
    if (typeof string !== 'string') throw 'Only srings are accepted';
    let res = string.split('').sort();
    let strup = [],
        strlow = [],
        strnum = [],
        strspecial = [],
        strspace = [];
    special = '@_!#$%^&*()<>?/|}{~:';
    res.forEach((element) => {
        if (
            element === element.toUpperCase() &&
            isNaN(element) &&
            !special.includes(element.split(''))
        )
            strup.push(element);
        else if (
            element === element.toLowerCase() &&
            isNaN(element) &&
            !special.includes(element.split(''))
        )
            strlow.push(element);
        else if (element === ' ') strspace.push(element);
        else if (
            typeof Number(element) === 'number' &&
            !special.includes(element.split(''))
        )
            strnum.push(element);
        else if (special.includes(element)) strspecial.push(element);
    });

    ans = strup.concat(strlow, strspecial, strnum, strspace);
    return ans.join('');
};

const replaceChar = function replaceChar(string, idx) {
    if (typeof string !== 'string') throw 'Input Invalid';
    if (string === undefined) throw 'Input is undefined';
    if (string.length === 0 || string === ' ') throw 'String cannot be empty';
    if (idx < 1 || idx > string.length - 2 || typeof idx !== 'number')
        throw 'Index Parameter is invalid';

    let replace = string.charAt(idx);
    let count = idx;
    let result;
    res = string.split('');
    let charbefore = string.charAt(idx - 1);
    let charafter = string.charAt(idx + 1);

    for (let i = 0; i < string.length; i++) {
        if (i === idx) continue;
        else if (string[i] === replace) {
            if (count % 2 == 0) {
                res[i] = charbefore;
                result = res.join('');
                count++;
            } else {
                res[i] = charafter;
                result = res.join('');
                count++;
            }
        }
    }
    return result;
};

const mashUp = function mashUp(string1, string2, char) {
    if ((string1, string2, char) === undefined)
        throw 'Input Parameter is undefined';
    if (char.length > 1) throw 'Char length exceeds';
    if (string1.length === 0 || string2.length === 0)
        throw 'Input String is empty';
    if (typeof char != 'string') throw 'Input type for Char is invalid';
    let s1 = string1.split('');
    let s2 = string2.split('');
    let lengthdiff = Math.abs(s1.length - s2.length);
    let restr = [];
    if (s1.length !== s2.length) {
        if (s1.length <= s2.length) {
            for (let i = 0; i < lengthdiff; i++) {
                s1.push(char);
            }
            for (let y in (s1, s2)) {
                restr.push(s1[y], s2[y]);
            }
            return restr.join('');
        } else {
            for (let i = 0; i < lengthdiff; i++) {
                s2.push(char);
            }
            for (let y in (s1, s2)) {
                restr.push(s1[y], s2[y]);
            }
            return restr.join('');
        }
    }
    if (s1.length === s2.length) {
        for (let y in (s1, s2)) {
            restr.push(s1[y], s2[y]);
        }
        return restr.join('');
    }
};

module.exports = {
    firstName: 'TANAY',
    lastName: 'TADAS',
    studentId: '10478620',
    sortString,
    replaceChar,
    mashUp,
};
