'use strict';

const HTTP_CONSTANTS = require('../helper/constants');
const services = require('../services');

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
        res.status(HTTP_CONSTANTS.HTTP_OK);
        res.send(activityList);
    } catch (e) {
        console.log(`Get failed`);
        res.sendStatus(HTTP_CONSTANTS.HTTP_INTERNAL_ERROR) && next(error)
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
        await services.UserActivityService.userEntersHotspot(userId, deviceId);

        res.status(HTTP_CONSTANTS.HTTP_CREATED);
        res.send(`User ${userId} is near ${deviceId}`)
        next();
    } catch (e) {
        console.log(`Create User Activity failed : ${e.message}`);
        res.sendStatus(HTTP_CONSTANTS.HTTP_INTERNAL_ERROR) && next(error);
    }
}

/**
 * Handle events for users leaving hotspots
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteUserActivity = async (req, res, next) => {
    const { userId } = req.body;

    try {
        await services.UserActivityService.userExitsHotspot(userId);
        res.status(HTTP_CONSTANTS.HTTP_OK);
        res.send(`${userId} cleared the area`)
    } catch (e) {
        res.sendStatus(HTTP_CONSTANTS.HTTP_INTERNAL_ERROR) && next(error);
    }
}

module.exports = {
    getUserActivity: getUserActivity,
    createUserActivity: createUserActivity,
    deleteUserActivity: deleteUserActivity
}