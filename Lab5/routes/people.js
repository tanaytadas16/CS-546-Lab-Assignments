const express = require('express');
const router = express.Router();
const data = require('../data');
const peopledata = data.people;

router.get('/:id', async (req, res) => {
    try {
        const person = await peopledata.getPersonById(req.params.id);
        res.json(person);
    } catch (e) {
        res.status(404).json({ message: 'person not found' });
    }
});

router.get('/', async (req, res) => {
    try {
        const peoplelist = await peopledata.getPeople();
        res.json(peoplelist);
    } catch (e) {
        res.status(500).send();
    }
});
module.exports = router;
