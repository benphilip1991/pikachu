/**
 * DB helper
 */
const mongoose = require('mongoose');
const CONSTANTS = require('./constants');
const model = require('../models');
mongoose.Promise = global.Promise;

//Connection to DB
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

//Close the connection
var closeConnection = () => {
    mongoose.Connection.close();
}

//Fetch Room data
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


//Insert in room data
/* 
@params data 
data = {
    roomId,
    deviceId
}
*/
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

//Delete data from room
var deleteDataFromRoom = (deviceId) => {
    model.roomModel.deleteOne({ deviceId: deviceId })
        .then(res => {
            return CONSTANTS.HTTP_OK;
        })
        .catch(error => {
            return error;
        })
}

//Fetch from user activity
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

//Insert to user activity

/* 
@params data 
data = {
    userId,
    deviceId
}
*/
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

//Delete from user activity
var deleteDataFromUserActivity = (userId) => {
    model.userActivityModel.deleteOne({ userId: userId })
        .then(res => {
            return CONSTANTS.HTTP_OK;
        })
        .catch(error => {
            return error;
        })
}

//Update the user Activity for soft delete

/* 
    @params data

    data ={
    userId: String,
    deviceId: String,
    timestamp: Date,
    deleteFlag: Boolean
    }
*/
var updateUserActivity = (data) => {
    model.userActivityModel.updateOne({ userId: data.userId }, { deleteFlag: data.deleteFlag }, { runValidators: true })
        .then(() => {
            return CONSTANTS.HTTP_OK;
        })
        .catch(err => {
            return error
        })
}

//create user in DB
var createUser = (data) => {
    var userModel = model.userModel;
    var user = new userModel({
        firstName: data.firstName,
        lastName: data.lastName,
        userId: data.userId
    })
    user.save(function (err) {
        if (err) return CONSTANTS.HTTP_INTERNAL_ERROR;
        else return CONSTANTS.HTTP_CREATED;
    });

}


//Update the user Activity for soft delete

/* 
    @params data

    data ={
    firstName: String,
    lastName: String,
    userId: String,
    deleteFlag: Boolean
    }
*/
var updateUser = (data) => {
    model.userModel.updateOne({ userId: data.userId }, { deleteFlag: data.deleteFlag }, { runValidators: true })
        .then(() => {
            return CONSTANTS.HTTP_OK;
        })
        .catch(err => {
            return error
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
    updateUserActivity: updateUserActivity,
    getuserActvity: getuserActvity,
    createUser: createUser,
    updateUser: updateUser
}

module.exports = DBHELPER