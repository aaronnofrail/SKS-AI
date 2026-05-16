const { extractText } = require('../services/extraction.service');
const { generateContent } = require('../services/ai.service');
const AppError = require('../utils/AppError');

/**
 * Controller to handle POST /api/generate
 */
const handleGenerate = async (req, res, next) => {
  try {
    // 1. Verify file exists
    if (!req.file) {
      return next(new AppError('No document uploaded. Please provide a file.', 400));
    }

    // 2. Extract options from body
    const { mode, difficulty, count } = req.body;

    // 3. Extract text from the uploaded file
    const rawText = await extractText(req.file);

    // 4. Pass the text and settings to the AI Integration Module (Task 3)
    const result = await generateContent(rawText, { mode, difficulty, count });

    // 5. Send formatted JSON response back
    res.status(200).json({
      status: 'success',
      data: result.data
    });

  } catch (error) {
    next(error); // Pass to centralized error handler
  }
};

module.exports = {
  handleGenerate
};
