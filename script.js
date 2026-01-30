// --- SELECTORS ---
const items = document.querySelectorAll('.t-item');
const orbitContainer = document.getElementById('orbitContainer');
const prevBtn = document.getElementById('orbitPrev');
const nextBtn = document.getElementById('orbitNext');
const dotsContainer = document.getElementById('orbitDots');
const counterElement = document.getElementById('orbitCounter');

let currentIndex = 0;
let startX = 0;
let isDragging = false;
const CHAR_LIMIT = 250; // Text length before "Read More" appears

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
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        btn.innerHTML = 'Sending...';
        setTimeout(() => {
            btn.innerHTML = 'Message Sent!';
            btn.style.background = '#10b981';
            this.reset();
        }, 1500);
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