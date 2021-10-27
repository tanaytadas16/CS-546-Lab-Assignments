const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const resto = mongoCollections.restoo;
module.exports = {
    async create(
        name,
        location,
        phoneNumber,
        website,
        priceRange,
        cuisines,
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
            !serviceOptions
        )
            throw 'All fields need to have valid values';
        if (typeof name !== 'string') throw 'Name is not in string';
        if (typeof location !== 'string') throw 'Location is not in string';
        if (typeof phoneNumber !== 'string')
            throw 'Phone number is not in string';
        if (typeof website !== 'string') throw 'Website is not in string';
        if (typeof priceRange !== 'string') throw 'priceRange is not in string';

        if (name.trim().length === 0) throw 'Empty space not allowed in name';
        if (location.trim().length === 0)
            throw 'Empty space not allowed in location';
        if (phoneNumber.trim().length === 0)
            throw 'Empty space not allowed in number';
        if (website.trim().length === 0)
            throw 'Empty space not allowed in website';
        let num = /^[0-9]{3}[-\s][0-9]{3}[-\s][0-9]{4}$/im;
        if (!phoneNumber.match(num)) throw 'Phone number is of invalid format';
        let validateurl = /http:\/\/?www\.[a-zA-Z1-9.]{5,}\.com$/;
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
            overallRating: 0,
            serviceOptions: serviceOptions,
            reviews: [],
        };
        const insertinfo = await restCollection.insertOne(newrestaurant);
        if (insertinfo.insertedCount === 0) return;
        const newid = insertinfo.insertedId;
        const result = await this.get(newid.toString());
        return result;
    },
    async getAll() {
        if (arguments.length > 0)
            throw 'No input parameters are required for this function';
        const restCollection = await resto();
        let reslist = await restCollection.find({}).toArray();
        let result = [];
        reslist.forEach((element) => {
            let final = {};
            final._id = element._id;
            final.name = element.name;
            result.push(final);
        });
        result.forEach((element) => {
            element._id = element._id.toString();
        });
        return result;
    },
    async get(id) {
        //Error Handling
        if (!id) throw 'Provide an id, id cannot be empty';
        if (typeof id !== 'string')
            throw 'Id datatype is invalid, Only strings are allowed';
        if (id.includes(' ') == true) throw 'Id cannot contain empty spaces';
        if (!ObjectId.isValid(id)) throw 'The id is not a valid objectID';

        //logic
        let parse = ObjectId(id);
        const restCollection = await resto();
        let rest = await restCollection.findOne({ _id: parse });
        if (rest === null) return;
        rest._id = rest._id.toString();
        rest.reviews.forEach((element) => {
            element._id = element._id.toString();
        });

        return rest;
    },
    async remove(id) {
        //Error Handling
        if (id == undefined) throw 'Provide an id, id cannot be empty';
        if (typeof id !== 'string')
            throw 'Id datatype is invalid, Only strings allowed';
        if (id.includes(' ') == true) throw 'Id cannot contain empty spaces';
        if (id.length === 0) throw 'Id length cannot be zero';
        if (!ObjectId.isValid(id)) throw 'The id is not a valid objectID';

        //logic
        id = ObjectId(id);
        let deletejson = { restaurantId: id, deleted: true };
        let restCollection = await resto();
        const deleterest = await restCollection.findOne({ _id: ObjectId(id) });
        const deleted = await restCollection.deleteOne({ _id: id });
        if (!deleterest) return;
        if (deleted.deletedCount === 0) throw 'Cannot Delete the restaurant';
        if (deleted.deletedCount > 0) return deletejson;
    },
    async update(
        id,
        name,
        location,
        phoneNumber,
        website,
        priceRange,
        cuisines,
        serviceOptions
    ) {
        ///Error Handling           //Actually Error Handeling is larger than logic itself :)
        if (name === undefined) throw 'Name is not defined';
        if (location === undefined) throw 'location is not defined';
        if (phoneNumber === undefined) throw 'phoneNumber is not defined';
        if (website === undefined) throw 'website is not defined';
        if (cuisines === undefined) throw 'cuisines is not defined';
        if (serviceOptions === undefined) throw 'serviceOptions is not defined';
        if (typeof id !== 'string') throw 'Id is not of string type';
        if (typeof name !== 'string') throw 'Name is not in string';
        if (typeof location !== 'string') throw 'Location is not in string';
        if (typeof phoneNumber !== 'string')
            throw 'Phone number is not in string';
        if (typeof website !== 'string') throw 'Website is not in string';
        if (typeof priceRange !== 'string') throw 'priceRange is not in string';
        if (!ObjectId.isValid(id)) throw 'The id is not a valid objectID';
        if (name.trim().length === 0) throw 'Empty space not allowed in name';
        if (location.trim().length === 0)
            throw 'Empty space not allowed in location';
        if (phoneNumber.trim().length === 0)
            throw 'Empty space not allowed in number';
        if (website.trim().length === 0)
            throw 'Empty space not allowed in website';
        let num = /^[0-9]{3}[-\s][0-9]{3}[-\s][0-9]{4}$/im;
        if (!phoneNumber.match(num)) throw 'Phone number is of invalid format';
        let validateurl = /http:\/\/?www\.[a-zA-Z1-9.]{5,}\.com$/;
        if (!website.match(validateurl))
            throw 'Website input format is not valid';
        let range = ['$', '$$', '$$$', '$$$$'];
        if (!range.includes(priceRange))
            throw 'Range can only be between $ and $$$$';
        if (!Array.isArray(cuisines)) throw 'Cusinines should be in array';

        cuisines.forEach((element) => {
            if (typeof element !== 'string')
                throw 'Cuisines Name should be strings';
            if (element.length === 0) throw 'Cuisines Name cant be empty';
            if (element.trim().length === 0)
                throw 'Empty space not allowed in input';
        });
        if (typeof serviceOptions !== 'object')
            throw 'ServiceOption datatype is invalid, Only Objects allowed';
        if (!serviceOptions.hasOwnProperty('dineIn'))
            throw 'Service options must include dineIn option';
        if (!serviceOptions.hasOwnProperty('takeOut'))
            throw 'Service options must include takeout option';
        if (!serviceOptions.hasOwnProperty('delivery'))
            throw 'Service options must include delivery option';
        if (
            typeof serviceOptions.dineIn !== 'boolean' ||
            typeof serviceOptions.takeOut !== 'boolean' ||
            typeof serviceOptions.delivery !== 'boolean'
        )
            throw 'Service options values needs to be in boolean';

        //Logic
        let rest = await this.get(id);
        const restCollection = await resto();
        const updatedRest = {
            name: name,
            location: location,
            phoneNumber: phoneNumber,
            website: website,
            priceRange: priceRange,
            cuisines: cuisines,
            overallRating: rest.overallRating,
            serviceOptions: serviceOptions,
            reviews: rest.reviews,
        };

        const updatedInfo = await restCollection.updateOne(
            { _id: ObjectId(id) },
            { $set: updatedRest }
        );
        if (updatedInfo.modifiedCount < 1)
            throw 'Cannot update the Restaurant,because there are no changes';
        return await this.get(id);
    },
};
