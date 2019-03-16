'use strict';

const HTTP_CONSTANTS = require('../helper/constants');
const service = require('../services');

/**
 * Get all registered users
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getAllUser = async (req, res, next) => {
    try {
        console.log("Getting all users");
        let users = service.UserService.getAllUsers();
        res.status(HTTP_CONSTANTS.HTTP_OK);
        res.send(users);
        next();
    } catch (e) {
        res.sendStatus(HTTP_CONSTANTS.HTTP_INTERNAL_ERROR) && next(error);
    }
}

/**
 * Create a new user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const createUser = async (req, res, next) => {
    const { firstName, lastName } = req.body;

    try {
        console.log("Creating User");
        service.UserService.createUser(firstName, lastName);
        res.sendStatus(HTTP_CONSTANTS.HTTP_CREATED);
    } catch (e) {
        res.sendStatus(HTTP_CONSTANTS.HTTP_INTERNAL_ERROR) && next(error);
    }
}

/**
 * Soft delete user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const softDeleteUser = async (req, res, next) => {

    const userId = req.params.userId;

    try {
        console.log("Deleting User");
        service.UserService.softDeleteUser(userId);
        res.sendStatus(HTTP_CONSTANTS.HTTP_OK);
    } catch (e) {
        res.sendStatus(HTTP_CONSTANTS.HTTP_INTERNAL_ERROR) && next(error);
    }
}

const hardDeleteUser = async (req, res, next) => {
    try {
        ;
    } catch (e) {
        res.sendStatus(HTTP_CONSTANTS.HTTP_INTERNAL_ERROR) && next(error);
    }
}

module.exports = {
    getAllUser,
    createUser,
    softDeleteUser,
    hardDeleteUser
}