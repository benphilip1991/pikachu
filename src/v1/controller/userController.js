'use strict';

const HTTP_CONSTANTS = require('../helper/constants');
const service = require('../services');
const utils = require('../utils/utils')
/**
 * Get all registered users
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getAllUser = async (req, res, next) => {
    try {
        console.log("Getting all users");
        let users = await service.UserService.getAllUsers();
        // res.status(HTTP_CONSTANTS.HTTP_OK);
        // res.send(users);
        utils.sendResponseOk(res, 'OK', users);
        next();
    } catch (e) {
        utils.sendResponseServerError(res, 'Internal Server Error');
    }
}

/**
 * Create a new user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const createUser = async (req, res, next) => {
    const { firstName, lastName, userId } = req.body;
    try {
        console.log("Creating User");
        if (!utils.isNullOrUndefined(firstName) && !utils.isNullOrUndefined(lastName)
            && !utils.isNullOrUndefined(userId)) {

            let user = service.UserService.createUser(firstName, lastName, userId);
            utils.sendResponseCreated(res, 'OK', user);
        } else {
            utils.sendResponseBadRequest(res, 'Bad Request');
        }

        next();
    } catch (e) {
        utils.sendResponseServerError(res, 'Internal Server Error');
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
        var results = await service.UserService.softDeleteUser(userId);
        utils.sendResponseOk(res, 'OK', results)
        next();
    } catch (e) {
        utils.sendResponseServerError(res, 'Internal Server Error')
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