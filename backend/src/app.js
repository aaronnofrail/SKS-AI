const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const apiRoutes = require('./routes/api.routes');
const globalErrorHandler = require('./middlewares/error.middleware');
const AppError = require('./utils/AppError');

const app = express();

// 1. GLOBAL MIDDLEWARES
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Setup request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 2. ROUTES
app.use('/api', apiRoutes);

// Handle undefined routes
app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 3. GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
