const express = require("express");
const multer = require("multer");
const ocrController = require("../controllers/OCR/handleOcr");

const router = express.Router();
const storage = multer.memoryStorage(); // store in memory
const upload = multer({ storage });

// POST /api/ocr/image-upload
router.post(
  "/image-upload",
  upload.single("file"), // frontend must use field name "file"
  ocrController.handleOcrImageUpload
);

module.exports = router;
