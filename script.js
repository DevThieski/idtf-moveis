document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    let slideTimer;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Start auto slide
    startSlideTimer();
    
    function startSlideTimer() {
        slideTimer = setInterval(nextSlide, slideInterval);
    }
    
    function resetSlideTimer() {
        clearInterval(slideTimer);
        startSlideTimer();
    }
    
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        resetSlideTimer();
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlideTimer();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlideTimer();
    });
    
    // Animate stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-count');
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-container')) {
                    animateStats();
                }
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.stats-container, .product-card, .gallery-item, .info-item');
    animateElements.forEach(el => observer.observe(el));
    
    // Smooth scrolling for sidebar links
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Update active link
            document.querySelectorAll('.sidebar-nav a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            
            // Scroll to section
            window.scrollTo({
                top: targetSection.offsetTop - 20,
                behavior: 'smooth'
            });
        });
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('mobile-open');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.remove('mobile-open');
        });
    });
    
    // Add mobile menu styles dynamically
    const mobileMenuStyles = `
        @media (max-width: 768px) {
            .sidebar {
                position: fixed;
                width: 280px;
                height: 100vh;
                left: -280px;
                top: 0;
                transition: all 0.3s ease;
                z-index: 1000;
            }
            
            .sidebar.mobile-open {
                left: 0;
            }
            
            .mobile-menu-btn {
                position: fixed;
                top: 20px;
                left: 20px;
                background-color: var(--accent-color);
                color: white;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                z-index: 1100;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                cursor: pointer;
            }
            
            .sidebar-nav ul {
                flex-direction: column;
            }
            
            .sidebar-nav span {
                display: inline !important;
            }
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.innerHTML = mobileMenuStyles;
    document.head.appendChild(styleElement);
});