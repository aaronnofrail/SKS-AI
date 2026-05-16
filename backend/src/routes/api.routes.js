const express = require('express');
const { body } = require('express-validator');
const upload = require('../middlewares/upload.middleware');
const { validateRequest } = require('../middlewares/validator.middleware');
const { handleGenerate } = require('../controllers/generate.controller');

const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Health check endpoint
 * @access  Public
 */
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running' });
});

/**
 * @route   POST /api/generate
 * @desc    Upload file and generate AI content
 * @access  Public
 */
router.post(
  '/generate',
  upload.single('file'),
  [
    body('mode').isIn(['summary', 'flashcard', 'quiz']).withMessage('Mode must be summary, flashcard, or quiz'),
    body('difficulty').optional().isIn(['easy', 'medium', 'hard']).withMessage('Difficulty must be easy, medium, or hard'),
    body('count').optional().isInt({ min: 1, max: 50 }).withMessage('Count must be an integer between 1 and 50'),
  ],
  validateRequest,
  handleGenerate
);

module.exports = router;
