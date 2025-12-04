/**
 * GUNSAK DU TRAIL ULTRA - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.trail-header');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(8, 38, 28, 0.98)';
                navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            } else {
                navbar.style.backgroundColor = 'rgba(11, 61, 46, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Distance cards animation
    const distanceCards = document.querySelectorAll('.distance-card');
    distanceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Quick link cards animation
    const quickLinks = document.querySelectorAll('.quick-link-card');
    quickLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Language switcher functionality
    const languageSwitcher = document.querySelector('.language-switcher');
    if (languageSwitcher) {
        const currentLang = window.location.pathname.includes('/en/') ? 'EN' : 'ID';
        languageSwitcher.innerHTML = `<i class="fas fa-globe"></i> ${currentLang}`;
    }

    // Form validation for registration page
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        // Additional validation for age
        const ageInput = document.getElementById('age');
        if (ageInput) {
            ageInput.addEventListener('input', function() {
                const age = parseInt(this.value);
                if (age < 10 || age > 80) {
                    this.setCustomValidity('Umur harus antara 10 dan 80 tahun');
                } else {
                    this.setCustomValidity('');
                }
            });
        }

        // File upload validation
        const identityInput = document.getElementById('identity');
        if (identityInput) {
            identityInput.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
                    const maxSize = 5 * 1024 * 1024; // 5MB
                    
                    if (!validTypes.includes(file.type)) {
                        this.setCustomValidity('Hanya file JPG, PNG, atau PDF yang diperbolehkan');
                    } else if (file.size > maxSize) {
                        this.setCustomValidity('File terlalu besar. Maksimal 5MB');
                    } else {
                        this.setCustomValidity('');
                    }
                }
            });
        }
    }

    // Instagram feed simulation (placeholder)
    const instagramLinks = document.querySelectorAll('a[href*="instagram"]');
    instagramLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.getAttribute('target') || this.getAttribute('target') !== '_blank') {
                e.preventDefault();
                window.open(this.href, '_blank');
            }
        });
    });

    // Countdown timer (for future implementation)
    function initCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            // Set event date: October 1, 2026
            const eventDate = new Date('October 1, 2026 00:00:00').getTime();
            
            function updateCountdown() {
                const now = new Date().getTime();
                const distance = eventDate - now;
                
                if (distance < 0) {
                    countdownElement.innerHTML = "Event telah dimulai!";
                    return;
                }
                
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                countdownElement.innerHTML = `
                    <div class="countdown-item">
                        <span class="countdown-number">${days}</span>
                        <span class="countdown-label">Hari</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${hours}</span>
                        <span class="countdown-label">Jam</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${minutes}</span>
                        <span class="countdown-label">Menit</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${seconds}</span>
                        <span class="countdown-label">Detik</span>
                    </div>
                `;
            }
            
            updateCountdown();
            setInterval(updateCountdown, 1000);
        }
    }
    
    // Initialize countdown if element exists
    initCountdown();

    // Mobile menu close on click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
});

// Utility function for form submission
function submitForm(formId, successCallback, errorCallback) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual Formspree/Getform endpoint)
        setTimeout(() => {
            // For demo purposes, simulate success
            const isSuccess = Math.random() > 0.2; // 80% success rate for demo
            
            if (isSuccess && successCallback) {
                successCallback();
            } else if (errorCallback) {
                errorCallback();
            }
            
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}