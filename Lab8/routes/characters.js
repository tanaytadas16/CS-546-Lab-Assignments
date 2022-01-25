const express = require('express');
const router = express.Router();
const data = require('../data');
const chardata = data.characters;

router.get('/', async (req, res) => {
    let input = req.body;
    res.render('char_hand/form', { char: input, title: 'Character Finder' });
});
router.post('/search', async (req, res) => {
    let input = req.body;
    if (!input.searchTerm || input.searchTerm == ' ') {
        res.status(400).render('char_hand/error', {
            errorDescription:
                'You should input text into form for searching and the text cannot just be spaces.',
            title: 'Error',
        });
        return;
    }
    try {
        alldata = await chardata.getCharacterBySearchTerm(input.searchTerm);
    } catch (e) {
        res.status(404).render('char_hand/search', {
            searchTerm: input.searchTerm,
            errorDescription: 'Could not found character with given text',
            hasErrors: true,
            error: e,
            title: 'Error',
        });
        return;
    }
    res.render('char_hand/search', {
        searchTerm: input.searchTerm,
        result: alldata.data.results,
        title: 'Character Found',
    });
});
router.get('/characters/:id', async (req, res) => {
    let eachId = req.params.id;

    // res.json(eachId);
    try {
        eachdata = await chardata.getCharacterById(eachId);
    } catch (e) {
        res.status(404).render('char_hand/error', {
            errorDescription: 'No character found with given Id',
            hasErrors: true,
            error: e,
            title: 'Error',
        });
    }
    let rendername, renderdescription, path, comics;
    eachdata.data.results.forEach((element) => {
        rendername = element.name;
        renderdescription = element.description;
        path = element.thumbnail.path + '/portrait_incredible.jpg';
        comics = element.comics.items;
    });

    res.render('char_hand/EachCharacter', {
        name: rendername,
        title: rendername,
        description: renderdescription,
        path: path,
        comics: comics,
    });
});
module.exports = router;
