var express = require('express');
const { registerController, verifyOtp } = require('../../controllers/user');
const { userAuthorization } = require('../../middlewares/authorization.middlewares');
var router = express.Router();

/* GET users listing. */
router.post('/', registerController);
router.post("/verify-otp", userAuthorization, verifyOtp);

/* GET users listing. */

module.exports = router;