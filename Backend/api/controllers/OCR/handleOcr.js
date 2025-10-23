const Tesseract = require("tesseract.js");

exports.handleOcrImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "No file uploaded" });
    }

    // OCR on the uploaded image buffer
    const {
      data: { text },
    } = await Tesseract.recognize(req.file.buffer, "eng+hin"); // English + Hindi

    const formattedText = text
      .replace(/\r\n|\r/g, "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join("\n");

    res.json({ success: true, text: formattedText });
  } catch (err) {
    console.error("OCR Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
