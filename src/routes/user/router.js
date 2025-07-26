var express = require('express');
const { registerController, verifyOtp } = require('../../controllers/user');
var router = express.Router();
const {userAuthorization} = require('../../middlewares/authorization.middlewares/authorization.middlewares');
/* GET users listing. */
router.post("/verify-otp", userAuthorization, verifyOtp);
router.post('/', registerController);

/* GET users listing. */

module.exports = router;