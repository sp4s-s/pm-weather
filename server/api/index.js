const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const { initDB } = require('../db'); // adjust path if needed
const routes = require('../routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', routes);

// Initialize DB once globally
let dbInitialized = false;
app.use(async (req, res, next) => {
  if (!dbInitialized) {
    try {
      await initDB();
      dbInitialized = true;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = serverless(app);
