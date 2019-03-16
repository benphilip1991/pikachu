'use strict';

const dbhelper = require('../helper');

// var devicesList = [{
//     deviceId: "1234",
//     roomId: "Room1"
// },
// {
//     deviceId: "5678",
//     roomId: "Room2"
// }]

/**
 * Get all devices and room map
 */
const getAllDevices = async () => {
    try {
        var devicesList = await dbhelper.DbHelper.getRoomData();
        console.log('[SERVICES]', devicesList)
        return devicesList;
    } catch (e) {
        throw new Error(e);
    }
}

/**
 * Create a device map
 * @param {*} roomId 
 * @param {*} deviceId 
 */
const createDeviceMap = async (roomId, deviceId) => {
    var result = dbhelper.DbHelper.insertDataToRoom(roomId, deviceId);
    return result;
}

/**
 * 
 * @param {*} deviceId 
 */
const deleteDevice = async (deviceId) => {

    try {
        var result = dbhelper.DbHelper.deleteDataFromRoom(deviceId);
        return result;
    } catch (e) {
        throw new Error(e)
    }
}

module.exports = {
    getAllDevices: getAllDevices,
    createDeviceMap: createDeviceMap,
    deleteDevice: deleteDevice
}