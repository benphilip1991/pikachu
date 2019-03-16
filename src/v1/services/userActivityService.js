'use strict';
const dbhelper = require('../helper')
var useractivity = [{
    userId: "user1",
    deviceId: "1234",
    timestamp: new Date()
}]

const getAllUsers = async () => {
    var useractivity = await dbhelper.DbHelper.getAlluserActvity()
    return useractivity
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
    getAllUsers: getAllUsers,
    userEntersHotspot: userEntersHotspot,
    userExitsHotspot: userExitsHotspot
}