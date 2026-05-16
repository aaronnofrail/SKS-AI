const AppError = require('../utils/AppError');

/**
 * Placeholder for AI Integration (Task 3)
 * Currently returns mock generated data based on inputs.
 * @param {string} text - The extracted text
 * @param {Object} options - mode, difficulty, count
 * @returns {Promise<Object>} - Mock generated content
 */
const generateContent = async (text, options) => {
  const { mode, difficulty, count } = options;
  
  if (!text) {
    throw new AppError('No text provided for generation.', 400);
  }

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return a mock response structure
  return {
    success: true,
    data: {
      mode,
      difficulty,
      count,
      generatedResults: `MOCK DATA: Generated ${count} items of type '${mode}' with '${difficulty}' difficulty based on text starting with: "${text.substring(0, 50)}..."`
    }
  };
};

module.exports = {
  generateContent
};
