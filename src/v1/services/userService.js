'use strict';

const uuidv1 = require('uuid/v1');

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
        return user;
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

        user.push()
    } catch(e) {
        throw new Error(e);
    }
}

/**
 * Mark a user as deleted
 * @param {*} userId 
 */
const softDeleteUser = async (userId) => {
    try {
        ;
    } catch(e) {
        throw new Error(e)
    }
}

module.exports = {
    getAllUsers,
    createUser,
    softDeleteUser
}