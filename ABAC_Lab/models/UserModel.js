const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'dev', 'test', 'intern', 'employee'],
        default: 'employee',
        required: true,
    },
    department: {
        type: String,
        enum: ['hr','finance','admin'],
        required: true,
    }
});

module.exports = mongoose.model("UserModel", userSchema);