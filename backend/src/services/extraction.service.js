const pdfParse = require('pdf-parse');
const AppError = require('../utils/AppError');

/**
 * Extracts text from an uploaded file buffer based on MIME type
 * @param {Object} file - The file object from multer (req.file)
 * @returns {Promise<string>} - Extracted text
 */
const extractText = async (file) => {
  if (!file || !file.buffer) {
    throw new AppError('File buffer is missing.', 400);
  }

  const mimeType = file.mimetype;

  try {
    if (mimeType === 'text/plain') {
      // Extract text from TXT
      return file.buffer.toString('utf-8');
    } else if (mimeType === 'application/pdf') {
      // Extract text from PDF
      const pdfData = await pdfParse(file.buffer);
      return pdfData.text;
    } else {
      // For future extension (e.g. DOCX)
      throw new AppError('Unsupported file type for text extraction.', 400);
    }
  } catch (error) {
    throw new AppError(`Failed to extract text from file: ${error.message}`, 500);
  }
};

module.exports = {
  extractText
};
