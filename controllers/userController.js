
const bcrypt = require('bcryptjs');
const userServices = require('../services/userServices')
async function userSignUp(req, res) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const UserData = {
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword
        };
        const response = await userServices.userSignUp(UserData);
        return res
            .status(response.status)
            .json({ message: response.message, data: response.data });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message, data: {} });
    }
}



async function loginUser(req, res) {
    try {
        const { email, password } = req.body
        const response = await userServices.loginUser(email, password);
        res
            .status(response.status)
            .json({ message: response.message, data: response.data });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ status: "error", message: error.message, data: {} });
    }
}

module.exports = {
    userSignUp,
    loginUser
}

