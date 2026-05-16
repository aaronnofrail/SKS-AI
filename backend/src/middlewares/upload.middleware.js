const multer = require('multer');
const AppError = require('../utils/AppError');

// Use memory storage to process file buffer directly without writing to disk
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Allow only PDF and TXT files for now as per TASK2
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'text/plain' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    cb(null, true);
  } else {
    cb(new AppError('Unsupported file format. Please upload a PDF, TXT, or DOCX file.', 400), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = upload;
