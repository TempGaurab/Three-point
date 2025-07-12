// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeModals();
    initializeAnimations();
    initializeResearch();
});

// Navigation Functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });

        // Navbar scroll effect
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects and Animations
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.about-card, .timeline-item, .module, .team-member, .news-item, .resource-category'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero icons
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroIcons = document.querySelectorAll('.hero-icon');
        
        heroIcons.forEach((icon, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            icon.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Modal Functionality
function initializeModals() {
    // Get all modals
    const modals = document.querySelectorAll('.modal');
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Form submissions
    const forms = document.querySelectorAll('.modal-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
}

// Open Modal Function
function openModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        const firstInput = modal.querySelector('input, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

// Close Modal Function
function closeModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Form Submission Handler
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Thank you! Your submission has been received.', 'success');
        form.reset();
        
        // Close modal
        const modal = form.closest('.modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Animation System
function initializeAnimations() {
    // Counter animation for statistics (if needed)
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Typing animation for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const start = performance.now();
    
    const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * target);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
}

// Research Section Dynamic Updates
function initializeResearch() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Mock data for research progress updates
    const researchUpdates = {
        'cyber-risk': {
            progress: 75,
            lastUpdate: '2025-06-20',
            status: 'In Progress'
        },
        'ai-cybersecurity': {
            progress: 45,
            lastUpdate: '2025-06-15',
            status: 'In Progress'
        },
        'ai-benefits-risks': {
            progress: 15,
            lastUpdate: '2025-06-10',
            status: 'Planning'
        }
    };
    
    // Add progress indicators
    timelineItems.forEach((item, index) => {
        const keys = Object.keys(researchUpdates);
        if (keys[index]) {
            const update = researchUpdates[keys[index]];
            const progressBar = createProgressBar(update.progress);
            const statusBadge = createStatusBadge(update.status);
            
            item.appendChild(progressBar);
            item.appendChild(statusBadge);
        }
    });
}

// Create Progress Bar
function createProgressBar(progress) {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    progressContainer.style.cssText = `
        margin-top: 15px;
        background: #ecf0f1;
        border-radius: 10px;
        height: 8px;
        overflow: hidden;
    `;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        height: 100%;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        width: ${progress}%;
        border-radius: 10px;
        transition: width 1s ease;
    `;
    
    const progressText = document.createElement('div');
    progressText.className = 'progress-text';
    progressText.textContent = `${progress}% Complete`;
    progressText.style.cssText = `
        font-size: 0.8rem;
        color: var(--text-light);
        margin-top: 5px;
    `;
    
    progressContainer.appendChild(progressBar);
    progressContainer.parentNode?.appendChild(progressText);
    
    return progressContainer;
}

// Create Status Badge
function createStatusBadge(status) {
    const badge = document.createElement('span');
    badge.className = 'status-badge';
    badge.textContent = status;
    
    const colors = {
        'Planning': '#f39c12',
        'In Progress': '#3498db',
        'Completed': '#27ae60',
        'On Hold': '#e74c3c'
    };
    
    badge.style.cssText = `
        display: inline-block;
        background: ${colors[status] || '#95a5a6'};
        color: white;
        padding: 4px 12px;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
        margin-top: 10px;
    `;
    
    return badge;
}

// News Section Dynamic Loading
function loadMoreNews() {
    // Mock function for loading more news items
    const newsGrid = document.querySelector('.news-grid');
    const moreNewsItems = [
        {
            date: 'May 15, 2025',
            title: 'Industry Partnership Discussions',
            content: 'Initial conversations with healthcare organizations about curriculum validation and internship opportunities.'
        },
        {
            date: 'May 10, 2025',
            title: 'Research Methodology Finalized',
            content: 'Completed systematic review protocol design and received institutional review approvals.'
        }
    ];
    
    moreNewsItems.forEach(item => {
        const newsItem = document.createElement('article');
        newsItem.className = 'news-item fade-in-up';
        newsItem.innerHTML = `
            <div class="news-date">${item.date}</div>
            <h3>${item.title}</h3>
            <p>${item.content}</p>
            <a href="#" class="read-more">Read More</a>
        `;
        newsGrid.appendChild(newsItem);
    });
}

// Search Functionality (if needed)
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const searchableElements = document.querySelectorAll('[data-searchable]');
            
            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                const isVisible = text.includes(query);
                element.style.display = isVisible ? 'block' : 'none';
            });
        });
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}