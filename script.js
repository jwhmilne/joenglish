// --- SELECTORS ---
const items = document.querySelectorAll('.t-item');
const orbitContainer = document.getElementById('orbitContainer');
const prevBtn = document.getElementById('orbitPrev');
const nextBtn = document.getElementById('orbitNext');
const dotsContainer = document.getElementById('orbitDots');
const counterElement = document.getElementById('orbitCounter');

// New UI elements
const hamburger = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const scrollTopBtn = document.getElementById('scrollTop');

let currentIndex = 0;
let startX = 0;
let isDragging = false;
const CHAR_LIMIT = 250; // Text length before "Read More" appears

// --- HAMBURGER MENU TOGGLE ---
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.focus();
        }
    });
}

// --- SCROLL TO TOP BUTTON ---
if (scrollTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- 1. INITIALIZE DOTS & READ MORE ---
items.forEach((item, i) => {
    // Create Dots
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        currentIndex = i;
        updateOrbit();
    });
    dotsContainer.appendChild(dot);

    // Setup Read More logic
    const textEl = item.querySelector('.t-text');
    const fullText = textEl.innerText;

    if (fullText.length > CHAR_LIMIT) {
        const truncatedText = fullText.substring(0, CHAR_LIMIT) + "...";
        textEl.setAttribute('data-fulltext', fullText);
        textEl.setAttribute('data-truncated', truncatedText);
        textEl.innerText = truncatedText;

        const link = document.createElement('span');
        link.innerText = " Read More";
        link.classList.add('read-more-btn');
        link.onclick = (e) => {
            e.stopPropagation(); 
            const isExpanded = textEl.classList.contains('expanded');
            if (isExpanded) {
                textEl.innerText = truncatedText;
                link.innerText = " Read More";
                textEl.classList.remove('expanded');
            } else {
                textEl.innerText = fullText;
                link.innerText = " Show Less";
                textEl.classList.add('expanded');
            }
            textEl.appendChild(link);
        };
        textEl.appendChild(link);
    }
});

// --- 2. CORE UPDATE FUNCTION ---
function updateOrbit() {
    items.forEach((item, i) => {
        item.classList.remove('active', 'prev', 'next');
        
        if (i === currentIndex) {
            item.classList.add('active');
        } else if (i === (currentIndex - 1 + items.length) % items.length) {
            item.classList.add('prev');
        } else if (i === (currentIndex + 1) % items.length) {
            item.classList.add('next');
        }
    });

    // Update Dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });

    // Update Counter
    if (counterElement) {
        counterElement.innerText = `${currentIndex + 1} of ${items.length}`;
    }
}

// --- 3. NAVIGATION HANDLERS ---
const handleNext = () => {
    currentIndex = (currentIndex + 1) % items.length;
    updateOrbit();
};

const handlePrev = () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateOrbit();
};

nextBtn.addEventListener('click', handleNext);
prevBtn.addEventListener('click', handlePrev);

// --- KEYBOARD NAVIGATION FOR CAROUSEL ---
document.addEventListener('keydown', (e) => {
    // Only handle arrow keys when carousel is in view or focused
    const testimonialsSection = document.getElementById('testimonials');
    if (!testimonialsSection) return;
    
    const rect = testimonialsSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    
    // Check if carousel or its children have focus, or if carousel is in view
    const carouselHasFocus = orbitContainer && orbitContainer.contains(document.activeElement);
    
    if (isInView || carouselHasFocus) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            handlePrev();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            handleNext();
        }
    }
});

// --- 4. DRAG & SWIPE LOGIC ---
orbitContainer.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('read-more-btn')) return;
    startX = e.pageX;
    isDragging = true;
});

orbitContainer.addEventListener('touchstart', (e) => {
    if (e.target.classList.contains('read-more-btn')) return;
    startX = e.touches[0].pageX;
    isDragging = true;
});

window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    handleGesture(e.pageX);
    isDragging = false;
});

window.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    handleGesture(e.changedTouches[0].pageX);
    isDragging = false;
});

function handleGesture(endX) {
    const threshold = 50; 
    if (startX - endX > threshold) {
        handleNext();
    } else if (endX - startX > threshold) {
        handlePrev();
    }
}

// --- 5. INITIALIZATION & OTHER ---
updateOrbit();

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button');
        const originalBtnText = btn.innerHTML;
        btn.innerHTML = 'Sending...';
        btn.disabled = true;

        const formData = new FormData(this);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                // Redirect to thank you page
                window.location.href = 'thank-you.html';
            } else {
                throw new Error(result.message || 'Form submission failed');
            }
        } catch (error) {
            console.error('Form error:', error);
            btn.innerHTML = 'Error! Try Again';
            btn.style.background = '#ef4444';
            btn.disabled = false;
            
            // Reset button after 3 seconds
            setTimeout(() => {
                btn.innerHTML = originalBtnText;
                btn.style.background = '';
            }, 3000);
        }
    });
}

setInterval(() => {
    document.querySelectorAll('.pulse').forEach(el => {
        el.classList.add('animate__animated', 'animate__pulse');
        el.addEventListener('animationend', () => {
            el.classList.remove('animate__animated', 'animate__pulse');
        }, {once: true});
    });
}, 5000);