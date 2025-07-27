var express = require("express");

var router = express.Router();
const {
  userAuthorization,
} = require("../../middlewares/authorization.middlewares/authorization.middlewares");
const { createNoteController, deleteNoteController, getMyNoteController, updateNoteController } = require("../../controllers/note");
const validate = require("../../middlewares/validation.middleware");
const createNoteValidation = require("../../controllers/note/noteValidations.js/createNote.validation");
const summarizeNoteController = require("../../controllers/note/summarizeNote");


router.post("/", userAuthorization,validate(createNoteValidation),createNoteController);
router.put("/:id", userAuthorization, deleteNoteController);
router.get("/", userAuthorization, getMyNoteController);
router.post("/update/:id", userAuthorization, updateNoteController);
router.post("/:id/summarize", userAuthorization, summarizeNoteController);




module.exports = router;
