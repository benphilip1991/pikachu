'use strict';
const dbhelper = require('../helper')

const getAllUserActivity = async () => {
    var useractivity = await dbhelper.DbHelper.getAlluserActvity()
    return useractivity
}

/**
 * Get single user activity
 * @param {*} userId 
 */
const getUserActivity = async (userId) => {
    var userActivity = await dbhelper.DbHelper.getUserActivity(userId);
    return userActivity;
}

/**
 * Create a new user activity - entering hotspot
 * @param {*} userID 
 * @param {*} deviceId 
 */
const userEntersHotspot = async (userId, deviceId) => {
    try {
        var userEntry = {
            userId: userId,
            deviceId: deviceId,
            timestamp: new Date()
        }
        var results = await dbhelper.DbHelper.insertDataToUserActivity(userEntry);
        return results;

    } catch (e) {
        console.log(`User activity enter hotspot failed : ${e.message}`);
    }
}

/**
 * User leaves a region
 * @param {*} userId 
 * @param {*} deviceId 
 */
const userExitsHotspot = async (userId) => {
    console.log('[userID]', userId)
    try {
        var result = await dbhelper.DbHelper.updateUserActivity(userId);
        return result;

    } catch (e) {
        console.log(`Exit hotspot failed : ${e.message}`);
    }
}

module.exports = {
    getAllUserActivity: getAllUserActivity,
    getUserActivity: getUserActivity,
    userEntersHotspot: userEntersHotspot,
    userExitsHotspot: userExitsHotspot
}