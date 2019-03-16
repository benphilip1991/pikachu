const roomModel = require('./roomModel');
const userActivityModel = require('./userActivityModel');
const userModel = require('./userModel')

const model = {
    roomModel: roomModel,
    userActivityModel: userActivityModel,
    userModel: userModel
}

module.exports = model;