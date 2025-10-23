const express = require("express");
const {
  ivrMenuController,
  handleChoiceController,
  handleRecordingController,
  testing,
} = require("../controllers/IVR/handleChoice");

const router = express.Router();

router.post("/menu", ivrMenuController);
router.post("/handle-choice", handleChoiceController);
router.post("/handle-recording", handleRecordingController);
router.post("/handle", testing);

module.exports = router;
