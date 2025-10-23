const fs = require("fs");

const {
  pdfToImages,
  extractTextFromImage,
  parsePattaText,
} = require("../../utils/ocr");

// Main: Extract patta info from PDF
exports.extractPattaInfo = async (pdfPath) => {
  try {
    // 1. Convert PDF to images
    const imagePaths = await pdfToImages(pdfPath);
    let fullText = "";
    // 2. OCR each image
    for (const imgPath of imagePaths) {
      fullText += (await extractTextFromImage(imgPath)) + "\n";
      // Optionally delete image after OCR
      fs.unlinkSync(imgPath);
    }
    // 3. Parse patta info from text
    const pattaInfo = parsePattaText(fullText);
    return pattaInfo;
  } catch (error) {
    console.log("Error in OCR : ", error);
    return null;
  }
};
