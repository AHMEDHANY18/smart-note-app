var express = require('express');
const { registerController, verifyOtp, loginController } = require('../../controllers/user');
var router = express.Router();
const {userAuthorization} = require('../../middlewares/authorization.middlewares/authorization.middlewares');
router.post("/verify-otp", userAuthorization, verifyOtp);
router.post("/", registerController);
router.post("/login", loginController);


module.exports = router;