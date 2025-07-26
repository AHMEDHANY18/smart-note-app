var express = require('express');
const { registerController, verifyOtp, loginController, forgetPassword, resetPassword, logoutController } = require('../../controllers/user');
var router = express.Router();
const {userAuthorization} = require('../../middlewares/authorization.middlewares/authorization.middlewares');
const checkRevoked = require('../../middlewares/authorization.middlewares/checkRevoked');
router.post("/verify-otp", userAuthorization, verifyOtp);
router.post("/", registerController);
router.post("/login", loginController);
router.post("/forget-password", forgetPassword);
router.post("/reset-password",userAuthorization, resetPassword);
router.get("/logout", userAuthorization, checkRevoked, logoutController);


module.exports = router;