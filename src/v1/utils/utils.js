'use strict';

const CONFIG = require('../config');

const returnResponse = (response, message, data) => {
    response.send({
        message: message,
        data: data || {}
    });
}

/**
 * Check null or undefined
 * @param {*} data 
 */
const isNullOrUndefined = (data) => {
    if (data)
        return false;
    else
        return true;
}

/**
 * Send OK response
 * @param {*} response 
 * @param {*} message 
 * @param {*} data 
 */
const sendResponseOk = (response, message, data) => {

    var message = message || CONFIG.appConstants.DEFAULT_MESSAGES.DEFAULT_SUCCESS_MESSAGE;

    response.status(CONFIG.appConstants.HTTP_CONSTANTS.HTTP_OK);
    returnResponse(response, message, data);
}

/**
 * Send CREATED response
 * @param {*} response 
 * @param {*} message 
 * @param {*} data 
 */
const sendResponseCreated = (response, message, data) => {
    var message = message || CONFIG.appConstants.DEFAULT_MESSAGES.DEFAULT_SUCCESS_MESSAGE;

    response.status(CONFIG.appConstants.HTTP_CONSTANTS.HTTP_CREATED);
    returnResponse(response, message, data);
}

/**
 * Send SERVER ERROR response
 * @param {*} response 
 * @param {*} message 
 */
const sendResponseServerError = (response, message) => {
    var message = message || CONFIG.appConstants.DEFAULT_MESSAGES.DEFAULT_ERROR_MESSAGE;

    response.status(CONFIG.appConstants.HTTP_CONSTANTS.HTTP_INTERNAL_ERROR);
    returnResponse(response, message);
}

/**
 * Send BAD REQUEST response
 * @param {*} response 
 * @param {*} message 
 */
const sendResponseBadRequest = (response, message) => {
    var message = message || CONFIG.appConstants.DEFAULT_MESSAGES.DEFAULT_BAD_REQUEST_MESSAGE;

    response.status(CONFIG.appConstants.HTTP_CONSTANTS.HTTP_BAD_REQUEST);
    returnResponse(response, message);
}

module.exports = {
    sendResponseOk: sendResponseOk,
    sendResponseCreated: sendResponseCreated,
    sendResponseServerError: sendResponseServerError,
    sendResponseBadRequest: sendResponseBadRequest,
    isNullOrUndefined: isNullOrUndefined
}