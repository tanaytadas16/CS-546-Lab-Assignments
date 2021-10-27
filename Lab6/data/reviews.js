const { ObjectId, Collection, Db } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const restCollection = mongoCollections.restoo;
const restaurant = require('./restaurants');

module.exports = {
    async create(restaurantId, title, reviewer, rating, dateOfReview, review) {
        if (restaurantId == undefined)
            throw 'All fields need to have valid values';
        if (title == undefined) throw 'All fields need to have valid values';
        if (reviewer == undefined) throw 'All fields need to have valid values';
        if (rating == undefined) throw 'All fields need to have valid values';
        if (dateOfReview == undefined)
            throw 'All fields need to have valid values';
        if (review == undefined) throw 'All fields need to have valid values';

        if (typeof restaurantId !== 'string')
            throw 'restaurantId is not in string type';
        if (typeof title !== 'string') throw 'title is not in string type';
        if (typeof reviewer !== 'string')
            throw 'reviewer is not in string type';
        if (typeof rating !== 'number') throw 'rating is not in number type';
        if (typeof dateOfReview !== 'string')
            throw 'dateOfReview is not in string type';
        if (typeof review !== 'string') throw 'review is not in string type';

        if (restaurantId.trim().length === 0)
            throw 'Empty space not allowed in restaurantId';
        if (title.trim().length === 0) throw 'Empty space not allowed in title';
        if (reviewer.trim().length === 0)
            throw 'Empty space not allowed in reviewer';
        if (dateOfReview.trim().length === 0)
            throw 'Empty space not allowed in dateOfReview';
        if (review.trim().length === 0)
            throw 'Empty space not allowed in review';

        if (!ObjectId.isValid(restaurantId))
            throw 'The id is not a valid objectID';
        if (rating > 5 || rating < 1) throw 'Range can be only between 1-5';
        let regex = /(((0[1-9]|1[0-2])\/([01][1-9]|10|2[0-8]))|((0[13-9]|1[0-2])\/(29|3[01]29|30))|((0[13578]|1[0,2])\/31))\/[0-9]{4}/gim;
        if (!dateOfReview.match(regex))
            throw `dateofReview is not in proper format, check month and date`;
        var GivenDate = dateOfReview;
        var CurrentDate = new Date();
        CurrentDate.setHours(0, 0, 0, 0);
        GivenDate = new Date(GivenDate);
        if (GivenDate > CurrentDate) {
            throw 'Given date is greater than the current date.';
        } else if (GivenDate < CurrentDate) {
            throw 'Given date is prior to the current date.';
        }
        const newReview = {
            _id: ObjectId(),
            title: title,
            reviewer: reviewer,
            rating: rating,
            dateOfReview: dateOfReview,
            review: review,
        };
        const restColl = await restCollection();
        const insertinfo = await restColl.updateOne(
            { _id: ObjectId(restaurantId) },
            { $push: { reviews: newReview } }
        );
        let sum = 0,
            avg = 0;
        const revdata = await this.getAll(restaurantId);
        for (let eachrest of revdata) {
            sum += eachrest.rating;
        }
        avg = sum / revdata.length;
        const updateRating = await restColl.updateOne(
            { _id: ObjectId(restaurantId) },
            { $set: { overallRating: Number(avg.toFixed(1)) } }
        );
        const getrest = await restaurant.get(restaurantId.toString());
        getrest._id = getrest._id.toString();
        return getrest;
    },
    async getAll(restaurantId) {
        if (!restaurantId) throw 'Provide restaurant Id ';
        if (typeof restaurantId !== 'string')
            throw 'restuarant id is not string';
        if (restaurantId.includes(' ')) throw 'Id cannot contain empty space ';
        if (!ObjectId.isValid(restaurantId))
            throw 'The id is not a valid objectID';

        const restColl = await restCollection();
        const getrestaurant = await restColl.findOne({
            _id: ObjectId(restaurantId),
        });
        if (!getrestaurant) return; //error throw if restaurant not found
        getrestaurant.reviews.forEach((element) => {
            element._id.toString();
        });
        if (getrestaurant.reviews.length == 0) return '[]';
        let result = getrestaurant.reviews;
        result.forEach((element) => {
            element._id = element._id.toString();
        });
        return result;
    },
    async get(reviewId) {
        if (!reviewId) throw 'Provide restaurant Id ';
        if (typeof reviewId !== 'string') throw 'restuarant id is not string';
        if (reviewId.includes(' ')) throw 'Id cannot contain empty space ';
        if (!ObjectId.isValid(reviewId)) throw 'The id is not a valid objectID';

        let revresult,
            bool = false;
        const restColl = await restCollection();
        const revdata = await restColl.find({}).toArray();
        for (let eachrest of revdata)
            for (let eachrev of eachrest.reviews)
                if (eachrev._id == reviewId.toString()) {
                    bool = true;
                    eachrev._id = eachrev._id.toString();
                    return eachrev;
                }
        if (bool === false) return; //throw 'No review found with the given id';
    },
    async remove(reviewId) {
        let sum = 0,
            avg = 0;
        if (reviewId == undefined) throw 'Provide restaurant Id ';
        if (typeof reviewId !== 'string') throw 'restuarant id is not string';
        if (reviewId.includes(' ')) throw 'Id cannot contain empty space ';
        if (!ObjectId.isValid(reviewId)) throw 'The id is not a valid objectID';
        const restColl = await restCollection();
        const size = await restColl.find().count();

        const findrest = await restColl.findOne({
            'reviews._id': ObjectId(reviewId),
        });
        if (!findrest) return;

        const deleterev = await restColl.updateMany(
            {},
            { $pull: { reviews: { _id: ObjectId(reviewId) } } }
        );
        //Update the review rating

        const ratingdelete = await this.getAll(findrest._id.toString());
        for (let eachrest of ratingdelete) {
            sum += eachrest.rating;
        }
        avg = sum / ratingdelete.length;

        const updateRating = await restColl.updateOne(
            { _id: ObjectId(findrest._id) },
            { $set: { overallRating: Number(avg.toFixed(1)) } }
        );

        let result = { reviewId: reviewId, deleted: true };
        if (deleterev.modifiedCount > 0) return result;
        else throw 'Could not delete review';
    },
};
