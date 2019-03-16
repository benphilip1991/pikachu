'use strict';

const uuidv1 = require('uuid/v1');
const dbHelper = require('../helper')
var user = [{
    _id: "1234",
    firstName: "Sanchit",
    lastName: "Dang",
    deleted: false
}]

/**
 * Get all users on the system
 */
const getAllUsers = async () => {
    try {
        var users = await dbHelper.DbHelper.getAllUsers();
        return users;
    } catch (e) {
        throw new Error(e);
    }
}

/**
 * Create a new user
 * @param {*} firstName 
 * @param {*} lastName 
 */
const createUser = async (firstName, lastName) => {
    try {
        var newUser = {
            userId: uuidv1(),
            firstName: firstName,
            lastName: lastName,
            deleted: false
        }

        var result = await dbHelper.DbHelper.createUser(newUser)
        return result;
    } catch (e) {
        throw new Error(e);
    }
}

/**
 * Mark a user as deleted
 * @param {*} userId 
 */
const softDeleteUser = async (userId) => {
    try {
        var results = dbHelper.DbHelper.updateUser(userId);
        console.log('[USERS]', results);
        return results;
    } catch (e) {
        throw new Error(e)
    }
}

module.exports = {
    getAllUsers,
    createUser,
    softDeleteUser
}