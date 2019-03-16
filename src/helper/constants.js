/**
 * Constants file
 */

/**
* Constants used in the app
*/

// HTTP constants
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_ERROR = 500;
const DB_URL = 'mongodb://team_rocket:pikachu6@ds125932.mlab.com:25932/pikachu'


// Export to users
module.exports = {
    HTTP_OK: HTTP_OK,
    HTTP_CREATED: HTTP_CREATED,
    HTTP_BAD_REQUEST: HTTP_BAD_REQUEST,
    HTTP_NOT_FOUND: HTTP_NOT_FOUND,
    HTTP_INTERNAL_ERROR: HTTP_INTERNAL_ERROR,
    DB_URL
}