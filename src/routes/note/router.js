var express = require("express");

var router = express.Router();
const {
  userAuthorization,
} = require("../../middlewares/authorization.middlewares/authorization.middlewares");
const { createNoteController, deleteNoteController, getMyNoteController } = require("../../controllers/note");


router.post("/", userAuthorization, createNoteController);
router.put("/:id", userAuthorization, deleteNoteController);
router.get("/", userAuthorization, getMyNoteController);



module.exports = router;
