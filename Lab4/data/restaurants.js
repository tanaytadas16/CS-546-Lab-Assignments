const { ObjectId, Collection } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const resto = mongoCollections.restoo;
module.exports = {
    firstName: 'TANAY',
    lastName: 'TADAS',
    studentId: '10478620',
    async create(
        name,
        location,
        phoneNumber,
        website,
        priceRange,
        cuisines,
        overallRating,
        serviceOptions
    ) {
        //Error Handling
        if (
            !name ||
            !location ||
            !phoneNumber ||
            !website ||
            !priceRange ||
            !cuisines ||
            !overallRating ||
            !serviceOptions
        )
            throw 'All fields need to have valid values';
        if (
            (typeof name ||
                typeof location ||
                typeof phoneNumber ||
                typeof website ||
                typeof priceRange) !== 'string'
        )
            throw 'Input value is not of string type';
        if (name.trim().length === 0) throw 'Empty space not allowed in name';
        if (location.trim().length === 0)
            throw 'Empty space not allowed in location';
        if (phoneNumber.trim().length === 0)
            throw 'Empty space not allowed in number';
        if (website.trim().length === 0)
            throw 'Empty space not allowed in website';
        let num = /^[0-9]{3}[-\s][0-9]{3}[-\s][0-9]{4}$/im;
        if (!phoneNumber.match(num)) throw 'Phone number is of invalid format';
        let validateurl = /http:\/\/?www\.[a-z]{5,}\.com$/;
        if (!website.match(validateurl))
            throw 'Website input format is not valid';
        let range = ['$', '$$', '$$$', '$$$$'];
        if (!range.includes(priceRange))
            throw 'Range can only be between $ and $$$$';
        if (typeof cuisines !== 'object')
            throw 'Cuisines datatype is invalid, Only Arrays allowed';
        cuisines.forEach((element) => {
            if (typeof element !== 'string')
                throw 'Cuisines Name should be strings';
            if (element.length === 0) throw 'Cuisines Name cant be empty';
            if (element.trim().length === 0)
                throw 'Empty space not allowed in input';
        });
        if (typeof serviceOptions !== 'object')
            throw 'ServiceOption datatype is invalid, Only Objects allowed';
        if (
            typeof serviceOptions.dineIn !== 'boolean' ||
            typeof serviceOptions.takeOut !== 'boolean' ||
            typeof serviceOptions.delivery !== 'boolean'
        )
            throw 'Service options values needs to be in boolean';
        //Logic
        const restCollection = await resto();
        let newrestaurant = {
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            overallRating: overallRating,
            serviceOptions: serviceOptions,
        };
        const insertinfo = await restCollection.insertOne(newrestaurant);
        if (insertinfo.insertedCount === 0) throw 'Could not add restaurant';
        const newid = insertinfo.insertedId;
        const result = await this.get(newid.toString());
        return result;
    },
    async getAll() {
        if (arguments.length > 0)
            throw 'No input parameters are required for this function';
        const restCollection = await resto();
        const reslist = await restCollection.find({}).toArray();
        if (reslist.length === 0) return '[]';
        reslist.forEach((element) => {
            element._id = element._id.toString();
        });
        return reslist;
    },
    async get(id) {
        id = id.toString();
        //Error Handling
        if (!id) throw 'Provide an id, id cannot be empty';
        if (typeof id !== 'string')
            throw 'Id datatype is invalid, Only strings are allowed';
        if (id.includes(' ') == true) throw 'Id cannot contain empty spaces';
        if (ObjectId(id).toString() !== id)
            throw 'The id is not a valid objectID';
        if (id.length === 0) throw 'Id length cannot be zero';
        //logic
        let parse = ObjectId(id);
        const restCollection = await resto();
        let rest = await restCollection.findOne({ _id: parse });
        if (rest === null) throw `No restaurant exists with that id: ${id}`;
        rest._id = rest._id.toString();
        return rest;
    },
    async remove(id) {
        //Error Handling
        if (!id) throw 'Provide an id, id cannot be empty';
        if (typeof id !== 'string')
            throw 'Id datatype is invalid, Only strings allowed';
        if (id.includes(' ') == true) throw 'Id cannot contain empty spaces';
        if (id.length === 0) throw 'Id length cannot be zero';
        if (ObjectId(id).toString() !== id)
            throw 'The id is not a valid objectID';

        //logic
        id = ObjectId(id);
        let restCollection = await resto();
        const deleterest = await restCollection.findOne({ _id: ObjectId(id) });
        const deleted = await restCollection.deleteOne({ _id: id });
        if (deleted.deletedCount === 0)
            throw `Could not delete restaurant with id ${id}`;
        return `${deleterest.name} has been successfully deleted!`;
    },
    async rename(id, newWebsite) {
        //Error Handling

        if (!id) throw 'Provide an id, id cannot be empty';
        if (!newWebsite) throw 'Provide a website, id cannot be empty';
        if (typeof id !== 'string')
            throw 'Id datatype is invalid, strings allowed';
        let validateurl = /https?:\/\/?www\.[a-zA-Z]{5,}\.com$/;
        if (!newWebsite.match(validateurl))
            throw 'Website input format is not valid';
        if (id.includes(' ') == true) throw 'Id cannot contain empty spaces';
        if (newWebsite.includes(' ') == true)
            throw 'websites cannot contain empty spaces';
        //Logic
        id = ObjectId(id);
        const restCollection = await resto();
        let updateweb = {
            website: newWebsite,
        };
        if ((await restCollection.findOne(id)) === null)
            throw 'No restaurant match with given id';
        let updateinfo = await restCollection.updateOne(
            {
                _id: id,
            },
            { $set: updateweb }
        );
        //for (let i of restCollection) return await i.website;
        if (updateinfo.modifiedCount < 1)
            throw `cannot update the website ${newWebsite}`;
        return await this.get(id);
    },
};
