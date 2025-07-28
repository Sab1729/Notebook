document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Light Mode';
    } else {
        themeToggle.textContent = 'Dark Mode';
    }
    
    themeToggle.addEventListener('click', function() {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = 'Dark Mode';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = 'Light Mode';
        }
    });
    
    // Mobile sidebar toggle
    const sidebarToggles = document.querySelectorAll('.sidebar-toggle');
    sidebarToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const sidebarContent = this.nextElementSibling;
            sidebarContent.classList.toggle('active');
        });
    });
    
    // Work filtering functionality (for home page)
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    const dateFilter = document.getElementById('date-filter');
    const works = document.querySelectorAll('.work');
    
    if (searchInput && filterSelect && dateFilter) {
        function filterWorks() {
            const searchTerm = searchInput.value.toLowerCase();
            const filterValue = filterSelect.value;
            const dateValue = dateFilter.value;
            
            works.forEach(work => {
                const title = work.querySelector('h3').textContent.toLowerCase();
                const description = work.querySelector('p').textContent.toLowerCase();
                const tags = work.getAttribute('data-tags');
                const date = work.getAttribute('data-date');
                
                const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
                const matchesFilter = filterValue === 'all' || tags.includes(filterValue);
                
                work.style.display = matchesSearch && matchesFilter ? 'block' : 'none';
            });
            
            // Sort by date if needed
            if (dateValue !== 'all') {
                const worksContainer = document.querySelector('.works-list');
                const worksArray = Array.from(worksContainer.querySelectorAll('.work'));
                
                worksArray.sort((a, b) => {
                    const dateA = new Date(a.getAttribute('data-date'));
                    const dateB = new Date(b.getAttribute('data-date'));
                    return dateValue === 'recent' ? dateB - dateA : dateA - dateB;
                });
                
                worksArray.forEach(work => worksContainer.appendChild(work));
            }
        }
        
        searchInput.addEventListener('input', filterWorks);
        filterSelect.addEventListener('change', filterWorks);
        dateFilter.addEventListener('change', filterWorks);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // MathJax configuration (for chapter pages)
    if (typeof MathJax !== 'undefined') {
        MathJax = {
            tex: {
                inlineMath: [['$', '$'], ['\\(', '\\)']]
            },
            svg: {
                fontCache: 'global'
            }
        };
    }
});

