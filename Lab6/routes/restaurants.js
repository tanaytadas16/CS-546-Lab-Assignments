const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const data = require('../data');
const restData = data.restaurants;

router.get('/', async (req, res) => {
    try {
        const restlist = await restData.getAll();
        res.status(200).json(restlist);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
router.get('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            error: 'Provide an id, id cannot be empty',
        });
        return;
    }
    if (typeof req.params.id !== 'string') {
        res.status(400).json({
            error: 'Id datatype is invalid, Only strings allowed',
        });
        return;
    }
    if (req.params.id.trim().length == 0) {
        res.status(400).json({
            error: 'Id cannot contain be empty',
        });
        return;
    }
    if (req.params.id.includes('%20') == true) {
        res.status(400).json({
            error: 'Id cannot contain empty spaces',
        });
        return;
    }
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({
            error: 'The id is not a valid objectID',
        });
        return;
    }
    try {
        const restid = await restData.get(req.params.id);
        if (!restid) res.status(404).json({ error: 'Restaurant not found' });
        res.status(200).json(restid);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
router.post('/', async (req, res) => {
    let restinfo = req.body;
    const {
        name,
        location,
        phoneNumber,
        website,
        priceRange,
        cuisines,
        serviceOptions,
    } = restinfo;
    if (name === undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (location === undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (phoneNumber === undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (website === undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (priceRange === undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (cuisines === undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (serviceOptions === undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }

    if (typeof name !== 'string') {
        res.status(400).json({ error: 'Name value is not of string type' });
        return;
    }
    if (typeof location !== 'string') {
        res.status(400).json({ error: 'location value is not of string type' });
        return;
    }
    if (typeof phoneNumber !== 'string') {
        res.status(400).json({
            error: 'PhoneNumber value is not of string type',
        });
        return;
    }
    if (typeof website !== 'string') {
        res.status(400).json({ error: 'Website value is not of string type' });
        return;
    }
    if (typeof priceRange !== 'string') {
        res.status(400).json({
            error: 'PriceRange is not of string type',
        });
        return;
    }
    if (name.trim().length === 0) {
        res.status(400).json({ error: 'Empty space not allowed in name' });
        return;
    }
    if (location.trim().length === 0) {
        res.status(400).json({ error: 'Empty space not allowed in location' });
        return;
    }
    if (phoneNumber.trim().length === 0) {
        res.status(400).json({ error: 'Empty space not allowed in location' });
        return;
    }

    if (website.trim().length === 0) {
        res.status(400).json({ error: 'Empty space not allowed in location' });
        return;
    }
    let num = /^[0-9]{3}[-\s][0-9]{3}[-\s][0-9]{4}$/im;
    if (!phoneNumber.match(num)) {
        res.status(400).json({ error: 'Phone number is of invalid format' });
        return;
    }
    let validateurl = /http:\/\/?www\.[a-zA-Z1-9.]{5,}\.com$/;
    if (!website.match(validateurl)) {
        res.status(400).json({ error: 'Website input format is not valid' });
        return;
    }
    let range = ['$', '$$', '$$$', '$$$$'];
    if (!range.includes(priceRange)) {
        res.status(400).json({ error: 'Range can only be between $ and $$$$' });
        return;
    }
    if (typeof cuisines !== 'object') {
        res.status(400).json({
            error: 'Cuisines datatype is invalid, Only Arrays allowed',
        });
        return;
    }
    cuisines.forEach((element) => {
        if (typeof element !== 'string') {
            res.status(400).json({ error: 'Cuisines Name should be strings' });
            return;
        }
        if (element.length === 0) {
            res.status(400).json({ error: 'Cuisines Name cant be empty' });
            return;
        }
        if (element.trim().length === 0) {
            res.status(400).json({ error: 'Empty space not allowed in input' });
            return;
        }
    });
    if (typeof serviceOptions !== 'object') {
        res.status(400).json({
            error: 'ServiceOption datatype is invalid, Only Objects allowed',
        });
        return;
    }
    if (
        typeof serviceOptions.dineIn !== 'boolean' ||
        typeof serviceOptions.takeOut !== 'boolean' ||
        typeof serviceOptions.delivery !== 'boolean'
    ) {
        res.status(400).json({
            error: 'Service options values needs to be in boolean',
        });
        return;
    }

    //Actual Functioning starts from here
    try {
        const createrest = await restData.create(
            name,
            location,
            phoneNumber,
            website,
            priceRange,
            cuisines,
            serviceOptions
        );
        if (!createrest)
            res.status(404).json({ error: 'Could not create Restaurant' });
        res.status(200).json(createrest);
    } catch (e) {
        res.status(500).json({ error: e });
    }
    // ends here , So funny how much logic is small :D
});
router.put('/:id', async (req, res) => {
    let insertinfo = req.body;
    const {
        name,
        location,
        phoneNumber,
        website,
        priceRange,
        cuisines,
        serviceOptions,
    } = insertinfo;

    if (name == undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (location == undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (phoneNumber == undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (website == undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (priceRange == undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (cuisines == undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (serviceOptions == undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (typeof name !== 'string') {
        res.status(400).json({ error: 'Name value is not of string type' });
        return;
    }
    if (typeof location !== 'string') {
        res.status(400).json({ error: 'location value is not of string type' });
        return;
    }
    if (typeof phoneNumber !== 'string') {
        res.status(400).json({
            error: 'PhoneNumber value is not of string type',
        });
        return;
    }
    if (typeof website !== 'string') {
        res.status(400).json({ error: 'Website value is not of string type' });
        return;
    }
    if (typeof priceRange !== 'string') {
        res.status(400).json({
            error: 'PriceRange is not of string type',
        });
        return;
    }

    if (name.trim().length === 0) {
        res.status(400).json({ error: 'Empty space not allowed in name' });
        return;
    }
    if (location.trim().length === 0) {
        res.status(400).json({ error: 'Empty space not allowed in location' });
        return;
    }
    if (phoneNumber.trim().length === 0) {
        res.status(400).json({ error: 'Empty space not allowed in location' });
        return;
    }

    if (website.trim().length === 0) {
        res.status(400).json({ error: 'Empty space not allowed in location' });
        return;
    }
    let num = /^[0-9]{3}[-\s][0-9]{3}[-\s][0-9]{4}$/im;
    if (!phoneNumber.match(num)) {
        res.status(400).json({ error: 'Phone number is of invalid format' });
        return;
    }
    let validateurl = /http:\/\/?www\.[a-zA-Z1-9.]{5,}\.com$/;
    if (!website.match(validateurl)) {
        res.status(400).json({ error: 'Website input format is not valid' });
        return;
    }
    let range = ['$', '$$', '$$$', '$$$$'];
    if (!range.includes(priceRange)) {
        res.status(400).json({ error: 'Range can only be between $ and $$$$' });
        return;
    }
    if (typeof cuisines !== 'object') {
        res.status(400).json({
            error: 'Cuisines datatype is invalid, Only Arrays allowed',
        });
        return;
    }
    cuisines.forEach((element) => {
        if (typeof element !== 'string') {
            res.status(400).json({ error: 'Cuisines Name should be strings' });
            return;
        }
        if (element.length === 0) {
            res.status(400).json({ error: 'Cuisines Name cant be empty' });
            return;
        }
        if (element.trim().length === 0) {
            res.status(400).json({ error: 'Empty space not allowed in input' });
            return;
        }
    });
    if (typeof serviceOptions !== 'object') {
        res.status(400).json({
            error: 'ServiceOption datatype is invalid, Only Objects allowed',
        });
        return;
    }
    if (!serviceOptions.hasOwnProperty('dineIn'))
        res.status(400).json({
            error: 'Service options must include dineIn option',
        });
    if (!serviceOptions.hasOwnProperty('takeOut'))
        res.status(400).json({
            error: 'Service options must include takeout option',
        });
    if (!serviceOptions.hasOwnProperty('delivery'))
        res.status(400).json({
            error: 'Service options must include delivery option',
        });
    if (
        typeof serviceOptions.dineIn !== 'boolean' ||
        typeof serviceOptions.takeOut !== 'boolean' ||
        typeof serviceOptions.delivery !== 'boolean'
    ) {
        res.status(400).json({
            error: 'Service options values needs to be in boolean',
        });
        return;
    }
    try {
        const updatedata = await restData.update(
            req.params.id,
            name,
            location,
            phoneNumber,
            website,
            priceRange,
            cuisines,
            serviceOptions
        );
        res.status(200).json(updatedata);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
router.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).json({
            error: 'Provide an id, id cannot be empty',
        });
        return;
    }
    if (typeof req.params.id !== 'string') {
        res.status(400).json({
            error: 'Id datatype is invalid, Only strings allowed',
        });
        return;
    }
    if (req.params.id.trim().length == 0) {
        res.status(400).json({
            error: 'Id cannot contain be empty',
        });
        return;
    }
    if (req.params.id.includes('%20') == true) {
        res.status(400).json({
            error: 'Id cannot contain empty spaces',
        });
        return;
    }
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({
            error: 'The id is not a valid objectID',
        });
        return;
    }
    try {
        const deleterest = await restData.remove(req.params.id);
        if (!deleterest)
            res.status(404).json({ error: 'No restaurant found with id' });
        res.status(200).json(deleterest);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
module.exports = router;
