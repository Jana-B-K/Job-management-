const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// The full list of 8 jobs for two rows
let jobs = [
    { id: 1, title: 'Full Stack Developer', company: 'Amazon', logo: 'images/amazon.png', location: 'Bengaluru', experience: '1-3 yr Exp', workplace: 'Onsite', jobType: 'Full-time', salary: '12LPA', posted: '24h Ago', description: ['A user-friendly interface lets you browse stunning photos and videos.', 'Filter destinations based on interests and travel style.'] },
    { id: 2, title: 'Node Js Developer', company: 'Tesla', logo: 'images/tesla.png', location: 'Pune', experience: '1-3 yr Exp', workplace: 'Onsite', jobType: 'Full-time', salary: '12LPA', posted: '24h Ago', description: ['A user-friendly interface lets you browse stunning photos and videos.', 'Filter destinations based on interests and travel style.'] },
    { id: 3, title: 'UX/UI Designer', company: 'Swiggy', logo: 'images/swigy.png', location: 'Mumbai', experience: '1-3 yr Exp', workplace: 'Onsite', jobType: 'Contract', salary: '12LPA', posted: '24h Ago', description: ['A user-friendly interface lets you browse stunning photos and videos.', 'Filter destinations based on interests and travel style.'] },
    { id: 4, title: 'Full Stack Developer', company: 'Amazon', logo: 'images/amazon.png', location: 'Bengaluru', experience: '1-3 yr Exp', workplace: 'Onsite', jobType: 'Full-time', salary: '12LPA', posted: '24h Ago', description: ['A user-friendly interface lets you browse stunning photos and videos.', 'Filter destinations based on interests and travel style.'] },
    { id: 5, title: 'Node Js Developer', company: 'Tesla', logo: 'images/tesla.png', location: 'Pune', experience: '1-3 yr Exp', workplace: 'Onsite', jobType: 'Full-time', salary: '12LPA', posted: '24h Ago', description: ['A user-friendly interface lets you browse stunning photos and videos.', 'Filter destinations based on interests and travel style.'] },
    { id: 6, title: 'UX/UI Designer', company: 'Swiggy', logo: 'images/swigy.png', location: 'Mumbai', experience: '1-3 yr Exp', workplace: 'Onsite', jobType: 'Contract', salary: '12LPA', posted: '24h Ago', description: ['A user-friendly interface lets you browse stunning photos and videos.', 'Filter destinations based on interests and travel style.'] },
    { id: 7, title: 'Full Stack Developer', company: 'Amazon', logo: 'images/amazon.png', location: 'Bengaluru', experience: '1-3 yr Exp', workplace: 'Onsite', jobType: 'Full-time', salary: '12LPA', posted: '24h Ago', description: ['A user-friendly interface lets you browse stunning photos and videos.', 'Filter destinations based on interests and travel style.'] },
    { id: 8, title: 'Node Js Developer', company: 'Tesla', logo: 'images/tesla.png', location: 'Pune', experience: '1-3 yr Exp', workplace: 'Onsite', jobType: 'Full-time', salary: '12LPA', posted: '24h Ago', description: ['A user-friendly interface lets you browse stunning photos and videos.', 'Filter destinations based on interests and travel style.'] }
];
let nextJobId = 9;

// Route to render the main page with all jobs initially
app.get('/', (req, res) => {
    res.render('index', { jobs: jobs });
});

// API endpoint for fetching/filtering jobs
app.get('/jobs', (req, res) => {
    let filteredJobs = [...jobs];
    const { title, location, type } = req.query;

    if (title) {
        filteredJobs = filteredJobs.filter(job => job.title.toLowerCase().includes(title.toLowerCase()));
    }
    if (location) {
        filteredJobs = filteredJobs.filter(job => job.location === location);
    }
    if (type) {
        filteredJobs = filteredJobs.filter(job => job.jobType === type);
    }
    res.json(filteredJobs);
});

// Route for creating a new job from the modal
app.post('/jobs', (req, res) => {
    const newJob = {
        id: nextJobId++, title: req.body.title, company: req.body.companyName, logo: 'https://i.imgur.com/J3WHp4A.png',
        location: req.body.location, experience: '0-1 yr Exp', workplace: 'Onsite', jobType: req.body.jobType,
        salary: req.body.salaryRange, posted: 'Just Now',
        description: req.body.jobDescription ? req.body.jobDescription.split('\n') : []
    };
    jobs.push(newJob);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
