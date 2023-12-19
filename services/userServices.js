const User = require('../models/personTriggers');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
async function userSignUp(UserData) {
    try {
        const user = new User(UserData);
        const savedUser = await user.save();
        let response = {
            status: 200,
            message: "User sign successfully",
            data: savedUser,
        };
        return response;
    } catch (error) {
        throw new Error(error)
    }
}

async function loginUser(email, password) {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        let response = {
            status: 200,
            message: "User login successfully",
            data: token,
        };
        return response;
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    userSignUp,
    loginUser
}