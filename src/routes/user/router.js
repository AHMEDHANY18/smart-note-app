var express = require('express');
const { registerController, verifyOtp, loginController, forgetPassword, resetPassword, logoutController, uploadProfilePicController } = require('../../controllers/user');
var router = express.Router();
const {userAuthorization} = require('../../middlewares/authorization.middlewares/authorization.middlewares');
const checkRevoked = require('../../middlewares/authorization.middlewares/checkRevoked');
const registerValidation = require('../../controllers/user/userValidatons/registerValidation');
const validate = require("../../middlewares/validation.middleware");
const upload = require('../../middlewares/upload.middleware');

router.post("/verify-otp", userAuthorization, verifyOtp);
router.post("/", validate(registerValidation),registerController);
router.post("/login", loginController);
router.post("/forget-password", forgetPassword);
router.post("/reset-password",userAuthorization, resetPassword);
router.get("/logout", userAuthorization, checkRevoked, logoutController);
router.patch(
  "/upload-profile-pic",
  userAuthorization,
  upload.single("avatar"),
  uploadProfilePicController
);


module.exports = router;