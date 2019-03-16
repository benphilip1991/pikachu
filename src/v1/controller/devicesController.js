'use strict';

const HTTP_CONSTANTS = require('../helper/constants');
const services = require('../services');

/**
 * GET All devices controller
 */
const getAllDevices = async (req, res, next) => {
    try {
        console.log("Inside Get all devices");
        let devicesList = await services.DevicesService.getAllDevices();
        res.status(HTTP_CONSTANTS.HTTP_OK);
        res.send(devicesList);
        next();
    } catch (e) {
        console.log(`Get error : ${e.message}`);
        res.sendStatus(HTTP_CONSTANTS.HTTP_INTERNAL_ERROR) && next(error);
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
        await services.DevicesService.createDeviceMap(roomId, deviceId);
        res.sendStatus(HTTP_CONSTANTS.HTTP_CREATED)
        next();
    } catch (e) {
        console.log(`Create map error : ${e.message}`);
        res.sendStatus(HTTP_CONSTANTS.HTTP_INTERNAL_ERROR) && next(error)
    }
}

/**
 * Delete a registered device
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteDevice = async (req, res, next) => {
    const { deviceId } = req.body;

    console.log("Inside Delete Device");
    try {
        await services.DevicesService.deleteDevice(deviceId);
        res.sendStatus(HTTP_CONSTANTS.HTTP_OK);
    } catch (e) {
        console.log(`Device deletion failed : ${e.message}`);
        res.send(HTTP_CONSTANTS.HTTP_INTERNAL_ERROR) && next(error);
    }
}


module.exports = {
    getAllDevices: getAllDevices,
    createDeviceMap: createDeviceMap,
    deleteDevice: deleteDevice
}