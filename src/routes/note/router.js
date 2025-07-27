var express = require("express");

var router = express.Router();
const {
  userAuthorization,
} = require("../../middlewares/authorization.middlewares/authorization.middlewares");
const { createNoteController, deleteNoteController, getMyNoteController, updateNoteController } = require("../../controllers/note");


router.post("/", userAuthorization, createNoteController);
router.put("/:id", userAuthorization, deleteNoteController);
router.get("/", userAuthorization, getMyNoteController);
router.post("/update/:id", userAuthorization, updateNoteController);



module.exports = router;
