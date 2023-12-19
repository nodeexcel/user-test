const express = require('express');
let router = express.Router();

const UserController = require("../controllers/userController");

router.post("/signup", UserController.userSignUp);
router.post("/login", UserController.loginUser);
module.exports = router;