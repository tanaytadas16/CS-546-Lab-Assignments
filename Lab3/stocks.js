const axios = require('axios');
async function getPeople() {
    const { data } = await axios.get(
        'https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json'
    );
    return data;
}
async function getStocks() {
    const { data } = await axios.get(
        'https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json'
    );
    return data;
}
async function listShareholders() {
    if (arguments.length > 0) throw ' Cannot pass parameters to this function';
    let res = {};
    let result = {};
    let obj = {};
    let array = [];
    let firstname;
    let lastname;
    data = await getStocks();
    ppl = await getPeople();

    for (let i of data) {
        for (let j of i.shareholders) {
            ppl.find((x) => {
                if (x.id === j.userId) {
                    firstname = x.first_name;
                    lastname = x.last_name;

                    j['firstName'] = firstname;
                    j['lastName'] = lastname;
                    delete j.userId;
                }
            });
        }
        array.push(i);
    }

    return array;
}
async function getStockById(id) {
    if (id === undefined) throw `Input is undefined`;
    if (typeof id !== 'string')
        throw `${id} is not of Proper datatype, Only strings allowed`;
    if (id.length === 0) throw `Input string length is zero`;
    if (id.includes(' '))
        throw `Input contains empty spaces, Id cannot have spaces`;
    if (id.includes('{}')) throw `Input cannot contain  brackets`;
    if (id.includes('[]')) throw `Input cannot contain  brackets`;
    if (id.includes('()')) throw `Input cannot contain  brackets`;
    let bool = false;
    data = await getStocks();
    for (let u of data) {
        if (id === u.id) {
            bool = true;
            return u;
        }
    }
    if (bool == false) {
        throw `Stock not Found with the given id`;
    }
}
async function listStocks(firstName, lastName) {
    if (firstName === undefined && lastName === undefined)
        throw 'Whole input is undefined';
    if (firstName === undefined || lastName === undefined)
        throw 'One of the input is undefined';
    if (typeof firstName !== 'string')
        throw `${firstName} is not of proper datatype, only strings allowed`;
    if (typeof lastName !== 'string')
        throw `${lastName} is not of proper datatype, only strings allowed`;
    if (firstName.trim().length === 0) throw 'FirstName length is zero';
    if (lastName.trim().length === 0) throw 'lastName length is zero';
    let resarray = [];
    let returned_id;
    let bool = false;
    data = await getPeople();
    stock_data = await getStocks();
    for (let y of data) {
        if (y.first_name == firstName && y.last_name === lastName) {
            returned_id = y.id;
        }
    }
    for (let z of stock_data) {
        for (let a of z.shareholders) {
            if (a.userId == returned_id) {
                let resobj = {};
                resobj['stock_name'] = z.stock_name;
                resobj['number_of_shares'] = a.number_of_shares;
                resarray.push(resobj);
                bool = true;
            }
        }
    }
    if (bool === false)
        throw `${firstName} ${lastName} doesnt have stocks in any company `;
    return resarray;
}
async function topShareholder(stockName) {
    if (stockName === undefined) throw 'Input is undefined';
    if (typeof stockName !== 'string')
        throw `${stockName} is of invalid datatype, only strings allowed `;
    if (stockName.length === 0) throw 'Input is empty';
    if (stockName.trim().length === 0) throw 'Input is empty';
    let bool = false;
    let name;
    let countshare = [];
    let maxshare;
    data = await getStocks();
    ppldata = await getPeople();
    function matchid(id) {
        for (let e of ppldata) {
            if (id === e.id) {
                return `${e.first_name} ${e.last_name}`;
            }
        }
    }
    for (let c of data) {
        if (stockName === c.stock_name) {
            for (var d of c.shareholders) {
                countshare.push(d.number_of_shares);
            }
            maxshare = Math.max.apply(null, countshare);
            for (let e of c.shareholders) {
                if (e.number_of_shares == maxshare) {
                    name = matchid(e.userId);
                    bool = true;
                }
            }
        }
    }
    if (bool === false) {
        return `${stockName} currently has no shareholders.`;
    }
    return `With ${maxshare} shares in ${stockName}, ${name} is the top shareholder.`;
}
module.exports = {
    listShareholders,
    getStockById,
    listStocks,
    topShareholder,
};
