const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        requierd: true
    },
    password: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: 'images/xyz'
    },
    maxSpeed: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);