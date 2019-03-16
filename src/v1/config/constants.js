/**
* Constants used in the app
*/

// HTTP constants
const HTTP_CONSTANTS = {
    HTTP_OK: 200,
    HTTP_CREATED: 201,
    HTTP_BAD_REQUEST: 400,
    HTTP_NOT_FOUND: 404,
    HTTP_INTERNAL_ERROR: 500
}

// Database Constants
const DB_CONSTANTS = {
    DB_URL: 'mongodb://team_rocket:pikachu6@ds125932.mlab.com:25932/pikachu'
}

// Default Messages
const DEFAULT_MESSAGES = {
    DEFAULT_SUCCESS_MESSAGE: "Request completed successfully.",
    DEFAULT_ERROR_MESSAGE: "Request failed.",
    DEFAULT_BAD_REQUEST_MESSAGE: "Request failed due to bad request."
}

// Export to users
module.exports = {
    HTTP_CONSTANTS: HTTP_CONSTANTS,
    DEFAULT_MESSAGES: DEFAULT_MESSAGES,
    DB_CONSTANTS: DB_CONSTANTS,
    DB_URL: DB_URL
}