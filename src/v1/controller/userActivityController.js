'use strict';

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
        res.status(200);
        res.send(activityList);
    } catch (e) {
        console.log(`Get failed`);
        res.sendStatus(500) && next(error)
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

        res.status(201);
        res.send(`User ${userId} is near ${deviceId}`)
        next();
    } catch (e) {
        console.log(`Create User Activity failed : ${e.message}`);
        res.sendStatus(500) && next(error);
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
        res.status(200);
        res.send(`${userId} cleared the area`)
    } catch (e) {
        res.sendStatus(500) && next(error);
    }
}

module.exports = {
    getUserActivity: getUserActivity,
    createUserActivity: createUserActivity,
    deleteUserActivity: deleteUserActivity
}