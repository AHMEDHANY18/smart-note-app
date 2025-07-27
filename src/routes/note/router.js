var express = require("express");

var router = express.Router();
const {
  userAuthorization,
} = require("../../middlewares/authorization.middlewares/authorization.middlewares");
const { createNoteController } = require("../../controllers/note");


router.post("/", userAuthorization, createNoteController);



module.exports = router;
