'use strict';

const HTTP_CONSTANTS = require('../helper/constants');
const services = require('../services');
const utils = require('../utils/utils')

/**
 * Get all users activity - test API
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getUserActivity = async (req, res, next) => {
    try {
        let activityList = await services.UserActivityService.getAllUsers();
        utils.sendResponseOk(res, 'OK', activityList)
    } catch (e) {
        console.log(`Get failed`);
        utils.sendResponseServerError(res, 'Internal Server Error');
    }
}

/**
 * Handle events for users entering a hotspot
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const createUserActivity = async (req, res, next) => {
    const { userId, deviceId } = req.body

    try {
        console.log("Inside create user activity");
        if (!utils.isNullOrUndefined(userId) && !utils.isNullOrUndefined(deviceId)) {
            var results = await services.UserActivityService.userEntersHotspot(userId, deviceId);
            utils.sendResponseOk(res, 'OK', results);
        } else {
            utils.sendResponseBadRequest(res, 'Bad Request');
        }
        next();
    } catch (e) {
        utils.sendResponseServerError(res, 'Internal Server Error')

    }
}

/**
 * Handle events for users leaving hotspots
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteUserActivity = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        var results = await services.UserActivityService.userExitsHotspot(userId);
        utils.sendResponseOk(res, 'OK', results)
    } catch (e) {
        res.sendStatus(HTTP_CONSTANTS.HTTP_INTERNAL_ERROR) && next(error);
    }
}

module.exports = {
    getUserActivity: getUserActivity,
    createUserActivity: createUserActivity,
    deleteUserActivity: deleteUserActivity
}