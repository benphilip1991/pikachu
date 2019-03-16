var mongoose = require('mongoose');
var schema = mongoose.Schema

// define Schema
var userSchema = new schema({
    firstName: String,
    lastName: String,
    userId: String,
    deleteFlag: Boolean
});

// compile schema to model
const userModel = mongoose.model('USERS', userSchema, 'users');


module.exports = userModel;