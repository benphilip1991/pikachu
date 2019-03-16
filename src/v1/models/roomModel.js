var mongoose = require('mongoose');
var schema = mongoose.Schema

// define Schema
var roomSchema = new schema({
    roomId: String,
    deviceId: String
});

// compile schema to model
const roomModel = mongoose.model('BEACON-ROOM-MAP', roomSchema, 'room');


module.exports = roomModel;