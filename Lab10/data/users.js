const { object } = require('mongodb');
const bcrypt = require('bcryptjs');
const saltRounds = 16;

const mongoCollections = require('../config/mongoCollections');
const usercollection = mongoCollections.users;

async function createUser(username, password) {
    try {
        if (!username) throw [400, 'Username not provided'];
        if (!password) throw [400, 'Password not provided'];
        if (typeof username !== 'string')
            throw [400, 'Username not in string type'];
        if (typeof password !== 'string')
            throw [400, 'Password not in string type'];
        let checkspace = /(\s)/g;
        let checkvaliduser = /[A-Za-z0-9]{4,}/g;
        let checkvalidpass = /[A-Za-z0-9\W]{6,}/g;
        if (!username.match(checkvaliduser)) {
            throw [400, 'You did not provide Valid username or Password'];
        }
        if (!password.match(checkvalidpass)) {
            throw [400, 'You did not provide Valid username or Password'];
        }
        if (username.match(checkspace) || password.match(checkspace)) {
            throw [400, 'You cannot provide spaces in username or password'];
        }

        let usernameLower = username.trim.toLowerCase();
        const userColl = await usercollection();
        const finduser = await userColl.findOne({ username: usernameLower });

        if (finduser === null) {
            const hashPass = await bcrypt.hash(password, saltRounds);
            const newUser = {
                username: usernameLower,
                password: hashPass,
            };
            const insertuser = await userColl.insertOne(newUser);
            if (insertuser) return { userInserted: true };
            else {
                throw [500, 'Could not signup'];
            }
            //
        } else {
            throw [400, 'User already exist with username'];
        }
    } catch (e) {
        throw e;
    }
}

async function checkUser(username, password) {
    let comparePass = false;
    try {
        if (!username) throw [400, 'Username not provided'];
        if (!password) throw [400, 'Password not provided'];
        if (typeof username !== 'string')
            throw [400, 'Username not in string type'];
        if (typeof password !== 'string')
            throw [400, 'Password not in string type'];

        let checkspace = /(\s)/g;
        let checkvaliduser = /[A-Za-z0-9]{4,}/g;
        let checkvalidpass = /[A-Za-z0-9\W]{6,}/g;
        if (!username.match(checkvaliduser)) {
            throw [400, 'You did not provide Valid username or Password'];
        }
        if (!password.match(checkvalidpass)) {
            throw [400, 'You did not provide Valid username or Password'];
        }
        if (username.match(checkspace) || password.match(checkspace)) {
            throw [400, 'You cannot provide spaces in username or password'];
        }

        let usernameLower = username.toLowerCase();
        const userColl = await usercollection();
        const finduser = await userColl.findOne({ username: usernameLower });
        if (finduser) {
            comparePass = await bcrypt.compare(password, finduser.password);
            if (comparePass) {
                return { authenticated: true };
            } else {
                throw [404, 'Either the username or password is invalid'];
            }
        } else {
            throw [404, 'Either the username or password is invalid'];
        }
    } catch (e) {
        throw e;
    }
}

module.exports = { createUser, checkUser };
