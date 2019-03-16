/**
 * DB helper
 */
const mongoose = require('mongoose');
const CONSTANTS = require('./constants');
const model = require('../models');
mongoose.Promise = global.Promise;
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

var getRoomData = () => {
    var devices = [];
    model.roomModel.find({})
        .then(res => {
            res.forEach(element => {
                devices.push(element)
            })
        })
        .then(() => {
            return devices;
        })
        .catch(error => {
            return error;
        })
}
var insertDataToRoom = (data) => {
    const roomModel = model.roomModel;
    const room = new roomModel({
        roomId: data.roomId,
        deviceId: data.deviceId
    })

    room.save(function (err) {
        if (err) return CONSTANTS.HTTP_INTERNAL_ERROR;
        else return CONSTANTS.HTTP_CREATED;
    });
}
var deleteDataFromRoom = (deviceId) => {
    model.roomModel.deleteOne({ deviceId: deviceId })
        .then(res => {
            return CONSTANTS.HTTP_OK;
        })
        .catch(error => {
            return error;
        })
}

var getuserActvity = () => {
    var userActivity = [];
    model.userActivityModel.find({})
        .then(res => {
            res.forEach(element => {
                userActivity.push(element)
            })
        })
        .then(() => {
            return userActivity
        })
        .catch(error => {
            return error;
        })
}
var insertDataToUserActivity = (data) => {
    const userActivityModel = model.userActivityModel;
    const userActivity = new userActivityModel({
        userId: data.userId,
        deviceId: data.deviceId,
        timestamp: data.timestamp
    })
    userActivity.save(function (err) {
        if (err) return CONSTANTS.HTTP_INTERNAL_ERROR;
        else return CONSTANTS.HTTP_CREATED;
    });
}
var deleteDataFromUserActivity = (userId) => {
    model.userActivityModel.deleteOne({ userId: userId })
        .then(res => {
            return CONSTANTS.HTTP_OK;
        })
        .catch(error => {
            return error;
        })
}
var DBHELPER = {
    dbConnection: dbConnection,
    closeConnection: closeConnection,
    getRoomData: getRoomData,
    insertDataToRoom: insertDataToRoom,
    deleteDataFromRoom: deleteDataFromRoom,
    insertDataToUserActivity: insertDataToUserActivity,
    deleteDataFromUserActivity: deleteDataFromUserActivity,
    getuserActvity: getuserActvity
}

module.exports = DBHELPER