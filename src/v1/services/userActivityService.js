'use strict';

var useractivity = [{
    userId: "user1",
    deviceId: "1234",
    timestamp: new Date()
}]

const getAllUsers = async () => {
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
        useractivity.push(userEntry);

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
    try {
        let userIdIndex = useractivity.map((e) => {
            return e.userId
        }).indexOf(userId);

        useractivity.splice(userIdIndex);
    } catch (e) {
        console.log(`Exit hotspot failed : ${e.message}`);
    }
}

module.exports = {
    getAllUsers: getAllUsers,
    userEntersHotspot: userEntersHotspot,
    userExitsHotspot: userExitsHotspot
}