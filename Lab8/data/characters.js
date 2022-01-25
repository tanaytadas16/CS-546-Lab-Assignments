const axios = require('axios');
const md5 = require('md5');
const publickey = '0ecac5d6b17a21f2c833ae9bf42214fa';
const privatekey = 'a4c3d3f6cafca2b24870e3a088669a0fb9622935';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

async function getcharacters() {
    const { data } = await axios.get(url);
    return data;
}
async function getCharacterBySearchTerm(searchTerm) {
    if (!searchTerm) throw [400, 'Provide a input'];
    if (typeof searchTerm !== 'string') throw [400, 'Provide string value'];
    if (searchTerm.trim().length == 0)
        throw [400, 'Search value cannot be empty spaces'];
    const baseUrlEach =
        'https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=' +
        searchTerm;
    const Searchurl =
        baseUrlEach +
        '&ts=' +
        ts +
        '&apikey=' +
        publickey +
        '&hash=' +
        hash +
        '&limit=20';

    const { data } = await axios.get(Searchurl);

    if (data.data.count == 0)
        throw 'Could not found any character with given text ';
    return data;
}

async function getCharacterById(Id) {
    if (Id < 0)
        throw [
            400,
            'The input cannot be negative \nPlease enter a positive value',
        ];
    else if (Id === undefined)
        throw [
            400,
            'The input cannot be empty \nPlease enter a positive number',
        ];
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/' + Id;
    const url =
        baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
    const { data } = await axios.get(url);
    return data;
}

module.exports = { getcharacters, getCharacterBySearchTerm, getCharacterById };
