const Tesseract = require("tesseract.js");
const pdf2img = require("pdf2img");
const path = require("path");

// Helper: Convert PDF to images
function pdfToImages(pdfPath) {
  return new Promise((resolve, reject) => {
    pdf2img.setOptions({
      type: "png",
      size: 1024,
      density: 300,
      outputdir: path.dirname(pdfPath),
      outputname: "page",
      page: null,
    });
    pdf2img.convert(pdfPath, (err, info) => {
      if (err) return reject(err);
      const imagePaths = info.images.map((img) => img.path);
      resolve(imagePaths);
    });
  });
}

// Example parser: Extract key-value pairs (customize for patta format)
function parsePattaText(text) {
  // Simple regex-based extraction (customize as needed)
  const info = {};
  const lines = text.split("\n");
  lines.forEach((line) => {
    const match = line.match(/([A-Za-z ]+):\s*(.+)/);
    if (match) {
      info[match[1].trim()] = match[2].trim();
    }
  });
  info["rawText"] = text; // For debugging
  return info;
}

async function extractTextFromImage(imagePath) {
  const {
    data: { text },
  } = await Tesseract.recognize(imagePath, "eng");
  return text;
}

module.exports = { pdfToImages, parsePattaText, extractTextFromImage };
