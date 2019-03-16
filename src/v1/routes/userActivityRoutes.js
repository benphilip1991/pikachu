'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controller');

/**
 * Routes for handling user activities
 */
router.get('/useractivity', controller.UserActivityController.getUserActivity);
router.get('/useractivity/:userId', controller.UserActivityController.getSingleUserActivity);
router.post('/useractivity', controller.UserActivityController.createUserActivity);
router.delete('/useractivity/:userId', controller.UserActivityController.deleteUserActivity);

module.exports = router;