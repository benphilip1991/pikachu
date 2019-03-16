var mongoose = require('mongoose');
var schema = mongoose.Schema
// define Schema
var userActivitySchema = new schema({
    deviceId: String,
    beaconId: String,
    timestamp: Date
});

// compile schema to model
const userActivityModel = mongoose.model('USER-ACTIVITY', userActivitySchema, 'useractivity');


module.exports = userActivityModel;