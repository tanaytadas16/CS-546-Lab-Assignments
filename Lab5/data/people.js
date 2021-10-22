const axios = require('axios');
//const mongoCollection = require('../config/mongoCollections');
//const people = mongoCollection.people;

async function getPeople() {
    const { data } = await axios.get(
        'https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json'
    );
    return data;
}

async function getPersonById(id) {
    if (typeof id !== 'string') res.status(400).json('Id is not string type');
    id = id.trim();
    if (typeof id !== 'string') throw 'Input is not string';
    let bool = false;
    let people = await getPeople();
    for (let i = 0; i < people.length; i++) {
        for (let k in people[i]) {
            if (people[i][k] === id) {
                bool = true;
                return people[i];
            }
        }
    }
    if (bool === false) throw 'Person not found';
}
module.exports = {
    getPeople,
    getPersonById,
};
