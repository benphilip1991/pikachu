/**
 * DB helper
 */
const mongoose = require('mongoose');
const CONSTANTS = require('./constants')
var dbConnection = async () => {
    // get reference to database
    var db = mongoose.connection;
    console.log('In db connection');

    // make a connection
    await mongoose.connection.openUri(CONSTANTS.DB_URL);
    db.on('error', console.error.bind(console, 'connection error:' + CONSTANTS.HTTP_INTERNAL_ERROR));

    db.once('open', function () {
        console.log("Connection Successful!" + CONSTANTS.HTTP_OK);
    });

}
var closeConnection = () => {
    mongoose.Connection.close();
}
var DBHELPER = {
    dbConnection: dbConnection,
    closeConnection: closeConnection
}

module.exports = DBHELPER