require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobsRouter = require('./routes/jobs');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-service-request-board';

// Middleware
app.use(cors()); // Allow all origins for local development
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit if DB connection fails
  });

// Routes
app.use('/api/jobs', jobsRouter);

// Global Error Handler for 404
app.use((req, res, next) => {
  res.status(404).json({ error: 'Resource not found' });
});

// Global Error Handler for 500s
app.use((err, req, res, next) => {
  console.error(err.stack);
  // Distinguish Mongoose CastErrors (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
});
