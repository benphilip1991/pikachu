'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controller');

/**
 * Define user routes
 */
router.get('/user', controller.UserController.getAllUser);
router.post('/user', controller.UserController.createUser);
router.delete('/user/:userId', controller.UserController.softDeleteUser);

module.exports = router;