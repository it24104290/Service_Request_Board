const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');

// GET /api/jobs - list all jobs; support optional filters
router.get('/', async (req, res, next) => {
  try {
    const { category, status } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

// GET /api/jobs/:id - fetch a single job
router.get('/:id', async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    next(error);
  }
});

// POST /api/jobs - create a new job
router.post('/', async (req, res, next) => {
  try {
    const newJob = new JobRequest(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

// PATCH /api/jobs/:id - update status only
router.patch('/:id', async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required for update' });
    }
    
    // Validate status enum
    if (!['Open', 'In Progress', 'Closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedJob = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json(updatedJob);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/jobs/:id - delete a job
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedJob = await JobRequest.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
