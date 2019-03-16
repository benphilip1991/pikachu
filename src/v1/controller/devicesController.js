'use strict';

const HTTP_CONSTANTS = require('../helper/constants');
const services = require('../services');
const utils = require('../utils/utils');

/**
 * GET All devices controller
 */
const getAllDevices = async (req, res, next) => {
    try {
        console.log("Inside Get all devices");
        let devicesList = await services.DevicesService.getAllDevices();
        console.log('[DEVICE LIST]', devicesList);
        utils.sendResponseOk(res, 'OK', devicesList);
        next();
    } catch (e) {
        console.log(`Get error : ${e.message}`);
        utils.sendResponseServerError(res, 'Internal Server Error');
    }
}

/**
 * Create new device to room map
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const createDeviceMap = async (req, res, next) => {
    const { roomId, deviceId } = req.body

    try {
        console.log("Inside Create new device");
        console.log(`Request body : ${JSON.stringify(req.body)}`);
        var results = await services.DevicesService.createDeviceMap(roomId, deviceId);
        utils.sendResponseOk(res, 'Created', results)
        next();
    } catch (e) {
        console.log(`Create map error : ${e.message}`);
        utils.sendResponseServerError(res, 'Internal Server Error')
    }
}

/**
 * Delete a registered device
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteDevice = async (req, res, next) => {
    const deviceId = req.params.deviceId;

    console.log("Inside Delete Device");
    try {
        var results = await services.DevicesService.deleteDevice(deviceId);

        utils.sendResponseOk(res, 'OK', results);
    } catch (e) {
        console.log(`Device deletion failed : ${e.message}`);
        utils.sendResponseServerError(res, 'Internal Server Error');
    }
}


module.exports = {
    getAllDevices: getAllDevices,
    createDeviceMap: createDeviceMap,
    deleteDevice: deleteDevice
}