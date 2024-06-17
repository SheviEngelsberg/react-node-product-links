const mongoose = require('mongoose');
const UserType = require('./UserType');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, enum: Object.values(UserType), required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
