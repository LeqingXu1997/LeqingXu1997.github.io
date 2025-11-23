// Language Toggle Functionality
let currentLang = 'en'; // Default language is English

const translations = {
    zh: {},
    en: {}
};

// Initialize language system
function initLanguage() {
    // Collect all elements with data-zh and data-en attributes
    const elements = document.querySelectorAll('[data-zh][data-en]');
    
    elements.forEach(element => {
        const zhText = element.getAttribute('data-zh');
        const enText = element.getAttribute('data-en');
        
        // Store original texts
        if (!translations.zh[element]) {
            translations.zh[element] = zhText;
            translations.en[element] = enText;
        }
    });
}

// Toggle language
function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    updateLanguage();
}

// Update all text based on current language
function updateLanguage() {
    const elements = document.querySelectorAll('[data-zh][data-en]');
    const langBtn = document.getElementById('langToggle');
    
    elements.forEach(element => {
        if (currentLang === 'zh') {
            element.textContent = element.getAttribute('data-zh');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
    
    // Update language button text
    if (langBtn) {
        langBtn.querySelector('.lang-text').textContent = currentLang === 'zh' ? 'EN' : '中文';
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
}

// Load profile photo with fallback
function loadProfilePhoto() {
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        // Check if image is already loaded (cached)
        if (profileImg.complete && profileImg.naturalHeight !== 0) {
            profileImg.classList.add('loaded');
        } else {
            profileImg.onload = function() {
                this.classList.add('loaded');
            };
            profileImg.onerror = function() {
                // Keep placeholder visible if image fails to load
                console.log('Profile photo not found, using placeholder');
            };
        }
    }
}

// WeChat QR Code Modal Functions
function openWeChatQR() {
    const modal = document.getElementById('wechatModal');
    if (modal) {
        modal.classList.add('active');
        // Try to load QR code image
        const qrImg = document.getElementById('wechatQRImg');
        if (qrImg && !qrImg.classList.contains('loaded')) {
            // Check if image is already loaded (cached)
            if (qrImg.complete && qrImg.naturalHeight !== 0) {
                qrImg.classList.add('loaded');
            } else {
                qrImg.onload = function() {
                    this.classList.add('loaded');
                };
                qrImg.onerror = function() {
                    console.log('WeChat QR code image not found, showing placeholder');
                };
            }
        }
    }
}

function closeWeChatQR() {
    const modal = document.getElementById('wechatModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('wechatModal');
    if (event.target === modal) {
        closeWeChatQR();
    }
});

// Close modal with Escape key
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeWeChatQR();
    }
});

// Mobile Navigation Toggle
function toggleMobileNav() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Close mobile nav when clicking on a link
function closeMobileNav() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}

// Smooth scroll with offset for fixed navbar
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Navbar scroll effect - minimal
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.borderBottom = '1px solid #000';
    } else {
        navbar.style.borderBottom = '1px solid #ddd';
    }
}

// Simplified scroll animations - minimal style
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe elements with minimal fade-in only
    const animatedElements = document.querySelectorAll(
        '.pub-item, .hobby-card, .book-card, .blog-post, .edu-item'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.3s ease';
        observer.observe(element);
    });
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add CSS for active nav link
function addActiveNavStyle() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--primary-color);
        }
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language system
    initLanguage();
    
    // Set default language to English
    updateLanguage();
    
    // Load profile photo
    loadProfilePhoto();
    
    // Add active nav style
    addActiveNavStyle();
    
    // Language toggle button
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
    
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }
    
    // Close mobile nav when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            closeMobileNav();
            
            // Handle smooth scroll
            const target = link.getAttribute('href');
            if (target.startsWith('#')) {
                e.preventDefault();
                smoothScroll(target);
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
    });
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            closeMobileNav();
        }
    });
});

// Minimal scroll effects for programmer style
// No parallax needed

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Lazy loading for images (if you add images later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Form validation (for future contact form)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility: Debounce function for scroll events
function debounce(func, wait = 20) {
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

// Apply debounce to scroll handler
const debouncedScroll = debounce(() => {
    handleNavbarScroll();
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Print friendly styles
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// Add print styles
const printStyle = document.createElement('style');
printStyle.textContent = `
    @media print {
        .navbar, .footer, .hero-buttons, .scroll-indicator {
            display: none !important;
        }
        
        .section {
            page-break-inside: avoid;
        }
        
        body {
            font-size: 12pt;
        }
    }
`;
document.head.appendChild(printStyle);
