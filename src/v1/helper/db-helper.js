/**
 * DB helper
 */
const mongoose = require('mongoose');
const CONSTANTS = require('../config/constants');
const model = require('../models');
mongoose.Promise = global.Promise;

//Connection to DB
var dbConnection = async () => {
    // get reference to database
    var db = mongoose.connection;
    console.log('In db connection');

    // make a connection
    await mongoose.connection.openUri(CONSTANTS.DB_CONSTANTS.DB_URL);
    db.on('error', console.error.bind(console, 'connection error:' + CONSTANTS.HTTP_CONSTANTS.HTTP_INTERNAL_ERROR));

    db.once('open', function () {
        console.log("Connection Successful!" + CONSTANTS.HTTP_CONSTANTS.HTTP_OK);
    });

}

//Close the connection
var closeConnection = () => {
    mongoose.Connection.close();
}

//Fetch Room data
var getRoomData = () => {
    var deviceArray = model.roomModel.find({}).then((res) => {
        return res
    }).catch((error) => {
        throw new Error(error);
    })

    return deviceArray;
}


//Insert in room data
/* 
@params data 
data = {
    roomId,
    deviceId
}
*/
var insertDataToRoom = async (roomId, deviceId) => {
    var statusCode;
    const roomModel = model.roomModel;
    const room = new roomModel({
        roomId: roomId,
        deviceId: deviceId
    });
    console.log('[ROOM]', JSON.stringify(room.deviceId));
    await room.save(function (err) {
        if (err) statusCode = CONSTANTS.HTTP_CONSTANTS.HTTP_INTERNAL_ERROR;
        else {
            console.log('[Created]')
            statusCode = CONSTANTS.HTTP_CONSTANTS.HTTP_CREATED;
        }
    });

    return statusCode;
}

//Delete data from room
var deleteDataFromRoom = (deviceId) => {
    model.roomModel.deleteOne({ deviceId: deviceId })
        .then(res => {
            return CONSTANTS.HTTP_CONSTANTS.HTTP_OK;
        })
        .catch(error => {
            throw new Error(error);
        })
}

//Fetch from user activity
var getAlluserActvity = () => {
    var userActivity = model.userActivityModel.find({})
        .then(res => {
            return res;
        })
        .catch(error => {
            return error;
        })
    return userActivity;
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
        timestamp: data.timestamp,
        deleteFlag: false
    })
    userActivity.save(function (err) {
        if (err) return CONSTANTS.HTTP_CONSTANTS.HTTP_INTERNAL_ERROR;
        else return CONSTANTS.HTTP_CONSTANTS.HTTP_CREATED;
    });
}

//Delete from user activity
var deleteDataFromUserActivity = (userId) => {
    model.userActivityModel.deleteOne({ userId: userId })
        .then(res => {
            return CONSTANTS.HTTP_CONSTANTS.HTTP_OK;
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
var updateUserActivity = (userId) => {
    console.log('[UserId]', userId);
    model.userActivityModel.findOneAndUpdate({ userId: userId, deleteFlag: false }, { deleteFlag: true })
        .then(() => {
            return CONSTANTS.HTTP_CONSTANTS.HTTP_OK;
        })
        .catch(err => {
            return error
        })
}


var getUserActivity = (userId) => {
    var users = model.userModel.find({ userId: userId }).then(res => {
        return res;
    })
        .catch(error => {
            return error
        })

    return users;
}
//Get all users
var getAllUsers = () => {
    var users = model.userModel.find({}).then(res => {
        return res;
    })
        .catch(error => {
            return error
        })

    return users;
}

var getUser = (userId) => {
    var _id = model.userModel.find({ userId: userId }).then(res => {
        return res[0]._id;
    })
        .catch(error => {
            return error
        })

    return _id;
}


//create user in DB
var createUser = (data) => {
    console.log('[DB]', data)
    var _id;
    var userModel = model.userModel;
    var user = new userModel({
        firstName: data.firstName,
        lastName: data.lastName,
        userId: data.userId,
        deleteFlag: false
    })
    _id = userModel.find({ userId: data.userId }).then(res => {
        if (res.length > 0)
            return res[0]._id;
        else {
            user.save(function (err) {
                if (err) return CONSTANTS.HTTP_CONSTANTS.HTTP_INTERNAL_ERROR;
                else {
                    return getUser(data.userId);
                };
            });
        }
    })
        .catch(error => {
            return error;
        })

    return _id;

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
var updateUser = (userId) => {
    var result = model.userModel.find({ userId: userId }).then(() => {
        model.userModel.updateOne({ userId: userId }, { deleteFlag: true }, { runValidators: true })
            .then((res) => {
                return res;
            })
            .catch(error => {
                return error
            })
    })
        .catch(error => {
            return error;
        })
    return result;
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
    getUserActivity: getUserActivity,
    getAlluserActvity: getAlluserActvity,
    getAllUsers: getAllUsers,
    createUser: createUser,
    updateUser: updateUser
}

module.exports = DBHELPER