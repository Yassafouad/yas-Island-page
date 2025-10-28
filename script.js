/* ==========================================
   YAS ISLAND LANDING PAGE - JAVASCRIPT
   ========================================== */

'use strict';

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initLanguageToggle();
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    initBackToTop();
    initScrollAnimations();
    initActiveNavigation();
    initCTATracking();
    initLazyLoading();
    
    console.log('%c🏝️ Yas Island Landing Page - Ready!', 'color: #0066FF; font-size: 16px; font-weight: bold;');
});

// ========== LANGUAGE TOGGLE ==========
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    if (!langToggle) return;
    
    langToggle.addEventListener('click', function() {
        const isArabic = bodyElement.classList.contains('lang-ar');
        
        if (isArabic) {
            // Switch to English
            bodyElement.classList.remove('lang-ar');
            bodyElement.classList.add('lang-en');
            htmlElement.setAttribute('lang', 'en');
            htmlElement.setAttribute('dir', 'ltr');
            localStorage.setItem('language', 'en');
        } else {
            // Switch to Arabic
            bodyElement.classList.remove('lang-en');
            bodyElement.classList.add('lang-ar');
            htmlElement.setAttribute('lang', 'ar');
            htmlElement.setAttribute('dir', 'rtl');
            localStorage.setItem('language', 'ar');
        }
        
        // Track language change
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'language_change',
                language: isArabic ? 'en' : 'ar'
            });
        }
    });
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'en') {
        bodyElement.classList.remove('lang-ar');
        bodyElement.classList.add('lang-en');
        htmlElement.setAttribute('lang', 'en');
        htmlElement.setAttribute('dir', 'ltr');
    }
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu ? navMenu.querySelectorAll('.nav-link') : [];
    
    if (!mobileMenuToggle || !navMenu) return;
    
    // Toggle menu
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========== NAVBAR SCROLL EFFECT ==========
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    // Throttle scroll event
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== BACK TO TOP BUTTON ==========
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    function toggleBackToTop() {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    // Throttle scroll event
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                toggleBackToTop();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Track back to top click
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'back_to_top_click'
            });
        }
    });
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    if (!animatedElements.length) return;
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = entry.target.getAttribute('data-aos-delay');
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, parseInt(delay));
                } else {
                    entry.target.classList.add('aos-animate');
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ========== ACTIVE NAVIGATION HIGHLIGHT ==========
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!sections.length || !navLinks.length) return;
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Throttle scroll event
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                highlightNavigation();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ========== CTA TRACKING (GTM) ==========
function initCTATracking() {
    // Track primary CTA clicks (Book Now buttons)
    const ctaButtons = document.querySelectorAll('.cta-main, .cta-offer');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventType = this.getAttribute('data-event') || 'cta_click';
            const buttonText = this.textContent.trim();
            
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'lp_click',
                    action: 'book_now',
                    label: eventType,
                    button_text: buttonText
                });
            }
            
            console.log('CTA Click tracked:', eventType);
        });
    });
    
    // Track hotel view links
    const hotelLinks = document.querySelectorAll('.hotel-link');
    hotelLinks.forEach(link => {
        link.addEventListener('click', function() {
            const hotelName = this.getAttribute('data-hotel') || 'Unknown Hotel';
            
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'hotel_view',
                    hotel_name: hotelName
                });
            }
            
            console.log('Hotel view tracked:', hotelName);
        });
    });
    
    // Track attraction links
    const attractionLinks = document.querySelectorAll('.attraction-card a');
    attractionLinks.forEach(link => {
        link.addEventListener('click', function() {
            const attractionName = this.closest('.attraction-card')?.querySelector('.attraction-title')?.textContent.trim() || 'Unknown Attraction';
            
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'attraction_click',
                    attraction_name: attractionName
                });
            }
            
            console.log('Attraction click tracked:', attractionName);
        });
    });
    
    // Track payment partner clicks
    const paymentCards = document.querySelectorAll('.payment-card');
    paymentCards.forEach(card => {
        card.addEventListener('click', function() {
            const partnerName = this.getAttribute('data-payment') || 'Unknown Partner';
            const partnerTitle = this.querySelector('.payment-title')?.textContent.trim() || partnerName;
            
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'payment_partner_click',
                    partner_name: partnerName,
                    partner_title: partnerTitle
                });
            }
            
            console.log('Payment partner click tracked:', partnerName);
        });
    });
}

// ========== LAZY LOADING IMAGES ==========
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // If image has data-src, use that (for progressive enhancement)
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
}

// ========== FORM SUBMISSION TRACKING ==========
// Listen for Zoho form submissions
window.addEventListener('message', function(event) {
    try {
        // Check if message is from Zoho form
        if (event.origin.includes('zohopublic.com')) {
            const data = event.data;
            
            // Track form submission
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'form_submit',
                    form_name: 'yas_island_booking'
                });
            }
            
            console.log('Form submission tracked');
        }
    } catch (error) {
        console.error('Form tracking error:', error);
    }
}, false);

// ========== PERFORMANCE MONITORING ==========
window.addEventListener('load', function() {
    // Log page load performance
    if ('performance' in window) {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`⚡ Page loaded in ${(pageLoadTime / 1000).toFixed(2)}s`);
        
        // Track page load time in GTM
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'page_performance',
                load_time: pageLoadTime
            });
        }
    }
});

// ========== ERROR HANDLING ==========
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.message);
    
    // Track errors in GTM (optional)
    if (window.dataLayer) {
        window.dataLayer.push({
            event: 'js_error',
            error_message: e.message,
            error_source: e.filename,
            error_line: e.lineno
        });
    }
});

// ========== UTILITY FUNCTIONS ==========

// Throttle function for performance
function throttle(func, wait) {
    let waiting = false;
    return function() {
        if (!waiting) {
            func.apply(this, arguments);
            waiting = true;
            setTimeout(() => {
                waiting = false;
            }, wait);
        }
    };
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========== EXPORT FOR TESTING ==========
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        throttle,
        debounce,
        isInViewport
    };
}
