const userActivityModel = require('./userActivityModel');
const userModel = require('./userModel')

const model = {
    roomModel: require('./roomModel'),
    userActivityModel: userActivityModel,
    userModel: userModel
}

module.exports = model;