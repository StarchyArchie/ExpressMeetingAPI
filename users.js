var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },   
    address: {
        type: String,
    },

}, {
    timestamps: true
});

var users = mongoose.model('user', userSchema);

module.exports = users;