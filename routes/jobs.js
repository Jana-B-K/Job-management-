const express = require('express');
const router = express.Router();
const { jobs } = require('../data');

// GET all jobs with optional filters
router.get('/', (req, res) => {
  const { title, location, type, minSalary, maxSalary } = req.query;
  
  let filteredJobs = [...jobs];
  
  if (title) {
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  
  if (location) {
    filteredJobs = filteredJobs.filter(job => 
      job.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  if (type) {
    filteredJobs = filteredJobs.filter(job => job.type === type);
  }
  
  if (minSalary && maxSalary) {
    filteredJobs = filteredJobs.filter(job => 
      job.salary >= parseInt(minSalary) && job.salary <= parseInt(maxSalary)
    );
  }
  
  res.render('index', { jobs: filteredJobs });
});

// GET job creation page
router.get('/create', (req, res) => {
  res.render('create-job');
});

// POST create new job
router.post('/jobs', (req, res) => {
  const {
    title,
    company,
    location,
    type,
    salary,
    description,
    requirements,
    responsibilities,
    deadline
  } = req.body;
  
  const newJob = {
    id: jobs.length + 1,
    title,
    company,
    location,
    type,
    salary: parseInt(salary),
    description,
    requirements,
    responsibilities,
    deadline
  };
  
  jobs.push(newJob);
  
  res.redirect('/');
});

// PUT update job
router.put('/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const jobIndex = jobs.findIndex(job => job.id === id);
  
  if (jobIndex === -1) {
    return res.status(404).json({ message: 'Job not found' });
  }
  
  const updatedJob = {
    ...jobs[jobIndex],
    ...req.body
  };
  
  jobs[jobIndex] = updatedJob;
  
  res.json(updatedJob);
});

// DELETE job
router.delete('/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const jobIndex = jobs.findIndex(job => job.id === id);
  
  if (jobIndex === -1) {
    return res.status(404).json({ message: 'Job not found' });
  }
  
  jobs.splice(jobIndex, 1);
  
  res.json({ message: 'Job deleted successfully' });
});

module.exports = router;
