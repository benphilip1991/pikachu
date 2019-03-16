'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controller');

/**
 * Routes for handling estimote registration
 */
router.get('/devices', controller.DevicesController.getAllDevices);
router.post('/devices', controller.DevicesController.createDeviceMap);
router.delete('/devices/:deviceId', controller.DevicesController.deleteDevice);

module.exports = router;