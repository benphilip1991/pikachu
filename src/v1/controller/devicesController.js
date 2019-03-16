'use strict';

const services = require('../services');

/**
 * GET All devices controller
 */
const getAllDevices = async (req, res, next) => {
    try {
        console.log("Inside Get all devices");
        let devicesList = await services.DevicesService.getAllDevices();
        res.status(200);
        res.send(devicesList);
        next();
    } catch (e) {
        console.log(`Get error : ${e.message}`);
        res.sendStatus(500) && next(error);
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
        res.sendStatus(201)
        next();
    } catch (e) {
        console.log(`Create map error : ${e.message}`);
        res.sendStatus(500) && next(error)
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
        res.sendStatus(200);
    } catch (e) {
        console.log(`Device deletion failed : ${e.message}`);
        res.send(500) && next(error);
    }
}


module.exports = {
    getAllDevices: getAllDevices,
    createDeviceMap: createDeviceMap,
    deleteDevice: deleteDevice
}