const { ObjectId, Collection, Db } = require('mongodb');
const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;

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
            error: 'The id cannot contain empty spaces',
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
        const reviewid = await reviewData.getAll(req.params.id);
        if (reviewid == '[]') res.status(404).json([]);
        if (!reviewid)
            res.status(404).json({
                error: 'No restaurant found with given Id',
            });
        res.status(200).json(reviewid);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
router.post('/:id', async (req, res) => {
    let insertinfo = req.body;
    let { title, reviewer, rating, dateOfReview, review } = insertinfo;
    if (title == undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (reviewer == undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (rating == undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (dateOfReview == undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }
    if (review == undefined) {
        res.status(400).json({ error: 'All fields need to have valid values' });
        return;
    }

    if (typeof title !== 'string') {
        res.status(400).json({ error: 'title must be in string type' });
        return;
    }
    if (typeof reviewer !== 'string') {
        res.status(400).json({ error: 'reviewer must be in string type' });
        return;
    }
    if (typeof rating !== 'number') {
        res.status(400).json({ error: 'rating must be in number type' });
        return;
    }
    if (typeof dateOfReview !== 'string') {
        res.status(400).json({ error: 'dateOfReview must be in string type' });
        return;
    }
    if (typeof review !== 'string') {
        res.status(400).json({ error: 'review must be in string type' });
        return;
    }

    if (title.trim().length === 0) {
        res.status(400).json({ error: 'Empty space not allowed in title' });
        return;
    }
    if (reviewer.trim().length === 0) {
        res.status(400).json({ error: 'Empty space not allowed in reviewer' });
        return;
    }
    if (dateOfReview.trim().length === 0) {
        res.status(400).json({
            error: 'Empty space not allowed in dateOfReview',
        });
        return;
    }
    if (review.trim().length === 0) {
        res.status(400).json({ error: 'Empty space not allowed in review' });
        return;
    }
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({
            error: 'The id is not a valid objectID',
        });
        return;
    }
    if (rating > 5 || rating < 1) {
        res.status(400).json({ error: 'Range can be only between 1-5' });
    }
    let regex = /(((0[1-9]|1[0-2])\/([01][1-9]|10|2[0-8]))|((0[13-9]|1[0-2])\/(29|3[01]29|30))|((0[13578]|1[0,2])\/31))\/[0-9]{4}/gim;
    if (!dateOfReview.match(regex)) {
        res.status(400).json({
            error: 'dateofReview is not in proper format, check month and date',
        });
    }
    var GivenDate = dateOfReview;
    var CurrentDate = new Date();
    CurrentDate.setHours(0, 0, 0, 0);
    GivenDate = new Date(GivenDate);
    if (GivenDate > CurrentDate) {
        res.status(400).json({
            error: 'Given date is greater than the current date.',
        });
    } else if (GivenDate < CurrentDate) {
        res.status(400).json({
            error: 'Given date is prior to the current date.',
        });
    }
    try {
        const createreview = await reviewData.create(
            req.params.id,
            title,
            reviewer,
            rating,
            dateOfReview,
            review
        );
        res.status(200).json(createreview);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
router.get('/review/:id', async (req, res) => {
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
        const particularReview = await reviewData.get(req.params.id);

        if (!particularReview)
            res.status(404).json({
                error: 'No review Found with given id',
            });

        res.status(200).json(particularReview);
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
    if (req.params.id.trim().length === 0) {
        res.status(400).json({ error: 'Id cannot contain empty spaces' });
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
        const deletereview = await reviewData.remove(req.params.id);
        if (!deletereview)
            res.status(404).json({
                error: 'No review Found with given reviewid',
            });
        res.status(200).json(deletereview);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
module.exports = router;
