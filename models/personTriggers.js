const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    }

}, { collection: 'Users' });

module.exports = mongoose.model('Users', userSchema);