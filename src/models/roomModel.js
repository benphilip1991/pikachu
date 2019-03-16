var mongoose = require('mongoose');
var schema = mongoose.Schema
// define Schema
var roomSchema = new schema({
    room_id: String,
    beacon_id: String
});

// compile schema to model
const roomModel = mongoose.model('BEACON-ROOM-MAP', roomSchema, 'room');


module.exports = roomModel;