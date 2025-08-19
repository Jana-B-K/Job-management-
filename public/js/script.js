document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.querySelector('.filter-bar');
    const jobListingsContainer = document.getElementById('job-listings');
    const titleInput = document.getElementById('title-search');
    const locationInput = document.getElementById('location-search');
    const typeInput = document.getElementById('type-filter');

    const renderJobs = (jobs) => {
        jobListingsContainer.innerHTML = '';
        if (jobs.length === 0) {
            jobListingsContainer.innerHTML = '<p class="text-center w-100">No jobs found matching your criteria.</p>';
            return;
        }

        jobs.forEach(job => {
            const descriptionItems = Array.isArray(job.description) 
                ? job.description.map(point => `<li>${point}</li>`).join('')
                : `<li>${job.description || ''}</li>`;

            const jobColumn = document.createElement('div');
            jobColumn.className = 'col-lg-3 col-md-6';
            jobColumn.innerHTML = `
                <div class="job-card">
                    <div class="job-card-header">
                        <div class="company-logo"><img src="${job.logo}" alt="${job.company} Logo"></div>
                        <span class="time-tag">${job.posted}</span>
                    </div>
                    <h5 class="job-title">${job.title}</h5>
                    <div class="job-meta">
                        <span><i class="fas fa-user-friends"></i> ${job.experience}</span>
                        <span><i class="fas fa-briefcase"></i> ${job.jobType}</span>
                        <span><i class="fas fa-rupee-sign"></i> ${job.salary}</span>
                    </div>
                    <ul class="job-description">${descriptionItems}</ul>
                    <a href="#" class="btn btn-apply">Apply Now</a>
                </div>
            `;
            jobListingsContainer.appendChild(jobColumn);
        });
    };

    const fetchJobs = async () => {
        const params = new URLSearchParams();
        if (titleInput.value) params.append('title', titleInput.value);
        if (locationInput.value) params.append('location', locationInput.value);
        if (typeInput.value) params.append('type', typeInput.value);

        try {
            const response = await axios.get(`/jobs?${params.toString()}`);
            renderJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    if (filterForm) {
        let debounceTimer;
        filterForm.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(fetchJobs, 300);
        });
    }
});
