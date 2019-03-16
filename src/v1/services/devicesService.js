'use strict';

//const dbhelper = require('../helper');

var devicesList = [{
    deviceId: "1234",
    roomId: "Room1"
},
{
    deviceId: "5678",
    roomId: "Room2"
}]

/**
 * Get all devices and room map
 */
const getAllDevices = async () => {
    try {
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
    devicesList.push({
        deviceId: deviceId,
        roomId: roomId
    })
}

/**
 * 
 * @param {*} deviceId 
 */
const deleteDevice = async (deviceId) => {

    try {
        let deviceIndex = devicesList.map((e) => {
            return e.deviceId
        }).indexOf(deviceId);

        devicesList.splice(deviceIndex, 1);
    } catch (e) {

    }
}

module.exports = {
    getAllDevices: getAllDevices,
    createDeviceMap: createDeviceMap,
    deleteDevice: deleteDevice
}