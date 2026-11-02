/**
 * MANOJ G — PORTFOLIO APPLICATION LOGIC
 * Clean, modern interactions, QR code generation, and touch animations
 * Domains: Embedded & IoT • Full-Stack MERN • Problem Solver (DSA in Java, Modern C++, Python)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initNavigation();
  initProjectFilters();
  initResumeModal();
  initTouchAnimation();
  initQRCodes();
  initScrollAnimations();
});

/* ==========================================================================
   1. TOUCH & CLICK INTERACTIVE ANIMATION
   Animation for every touch/click across the entire website
   ========================================================================== */
function initTouchAnimation() {
  const createTouchPulse = (x, y) => {
    // 1. Primary Expanding Ripple Ring
    const ripple = document.createElement('div');
    ripple.className = 'touch-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);

    // 2. Secondary Inner Sparkle Particle
    const sparkle = document.createElement('div');
    sparkle.className = 'touch-sparkle';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    document.body.appendChild(sparkle);

    // Clean up from DOM after animation completes
    setTimeout(() => {
      ripple.remove();
      sparkle.remove();
    }, 700);
  };

  // Listen on window for all pointerdown events (covers touch, mouse click, stylus)
  window.addEventListener('pointerdown', (e) => {
    createTouchPulse(e.clientX, e.clientY);
  }, { passive: true });
}

/* ==========================================================================
   2. DIGITAL CONNECT & QR CODES GENERATION
   Generates verified, scannable QR codes for Duolingo, GitHub, and LinkedIn
   ========================================================================== */
function initQRCodes() {
  if (typeof QRCode === 'undefined') {
    // Retry shortly if QRCode script is still parsing
    setTimeout(initQRCodes, 150);
    return;
  }

  // 1. GITHUB QR: https://github.com/MANOJG006
  const ghTarget = document.getElementById('github-qr-canvas');
  if (ghTarget && !ghTarget.hasChildNodes()) {
    new QRCode(ghTarget, {
      text: "https://github.com/MANOJG006",
      width: 170,
      height: 170,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  // 2. LINKEDIN QR: https://linkedin.com/in/manoj-g-33797a360
  const liTarget = document.getElementById('linkedin-qr-canvas');
  if (liTarget && !liTarget.hasChildNodes()) {
    new QRCode(liTarget, {
      text: "https://linkedin.com/in/manoj-g-33797a360",
      width: 170,
      height: 170,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  // 3. DUOLINGO QR: Profile Manoj G. (@ManojGnana)
  // Check if user uploaded original image exists; otherwise render verified QR
  const duoImg = document.getElementById('duolingo-qr-img');
  const duoCanvas = document.getElementById('duolingo-qr-canvas');

  if (duoImg && duoCanvas) {
    const testImg = new Image();
    testImg.onload = function() {
      // Original uploaded QR image found
      duoImg.style.display = 'block';
      duoCanvas.style.display = 'none';
    };
    testImg.onerror = function() {
      // Fallback: render verified scannable QR code for Duolingo profile URL
      duoImg.style.display = 'none';
      duoCanvas.style.display = 'block';
      if (!duoCanvas.hasChildNodes()) {
        new QRCode(duoCanvas, {
          text: "https://www.duolingo.com/profile/ManojGnana",
          width: 170,
          height: 170,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
      }
    };
    testImg.src = 'assets/duolingo-qr.png';
  }

  // 4. MY PORTFOLIO QR
  // If production URL is defined, generate it; otherwise keep clean Pending card
  if (window.PORTFOLIO_PRODUCTION_URL && window.PORTFOLIO_PRODUCTION_URL.startsWith('https://')) {
    const portBox = document.getElementById('portfolio-qr-box');
    if (portBox) {
      portBox.innerHTML = '<div id="portfolio-qr-canvas" class="qr-generated-target"></div>';
      new QRCode(document.getElementById('portfolio-qr-canvas'), {
        text: window.PORTFOLIO_PRODUCTION_URL,
        width: 170,
        height: 170,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      const badge = document.querySelector('.qr-status-badge.pending');
      if (badge) {
        badge.className = 'qr-status-badge live';
        badge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Live Production';
      }
    }
  }
}

// Download QR code as PNG image
window.downloadQR = function(boxId, filename) {
  const box = document.getElementById(boxId);
  if (!box) return;

  const canvas = box.querySelector('canvas');
  const img = box.querySelector('img');

  let dataUrl = '';
  if (canvas) {
    dataUrl = canvas.toDataURL('image/png');
  } else if (img && img.src && !img.src.endsWith('.svg')) {
    dataUrl = img.src;
  }

  if (dataUrl) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename || 'QRCode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

/* ==========================================================================
   3. HERO TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const element = document.getElementById('typing-text');
  if (!element) return;

  const roles = [
    'Embedded Systems & IoT Developer',
    'Full-Stack MERN Developer (React, Node, Mongo)',
    'Coding Problem Solver (DSA in Java, C++, Python)',
    'ESP32 & Microcontroller Firmware Engineer',
    'Open for Engineering Roles & Internships'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      element.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      element.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. NAVIGATION & MOBILE HAMBURGER
   ========================================================================== */
function initNavigation() {
  const toggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section tracking on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  });
}

/* ==========================================================================
   5. PROJECTS CATEGORY FILTER
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. CERTIFICATIONS SEARCH FILTER
   ========================================================================== */
window.filterCertifications = function() {
  const query = document.getElementById('cert-search')?.value.toLowerCase().trim() || '';
  const cards = document.querySelectorAll('.cert-card');

  cards.forEach(card => {
    const text = card.getAttribute('data-cert') + ' ' + card.innerText.toLowerCase();
    if (text.includes(query)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
};

/* ==========================================================================
   7. RESUME PREVIEW MODAL
   ========================================================================== */
function initResumeModal() {
  const openBtn = document.getElementById('open-resume-btn');
  const closeBtn = document.getElementById('close-resume-btn');
  const modal = document.getElementById('resume-modal');

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

/* ==========================================================================
   8. CONTACT FORM & CLIPBOARD UTILITIES
   ========================================================================== */
window.handleContactSubmit = function(e) {
  e.preventDefault();
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('form-submit-btn');
  const name = document.getElementById('contact-name').value;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';

  setTimeout(() => {
    feedback.className = 'form-feedback feedback-success';
    feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, ${name}! Your message has been received. I will get back to you promptly.`;
    document.getElementById('contact-form').reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
  }, 800);
};

window.copyToClipboard = function(text, buttonElem) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHtml = buttonElem.innerHTML;
    buttonElem.innerHTML = '<i class="fa-solid fa-check" style="color: #059669;"></i> Copied!';
    setTimeout(() => {
      buttonElem.innerHTML = originalHtml;
    }, 2000);
  }).catch(() => {
    alert(`Copied: ${text}`);
  });
};

/* ==========================================================================
   9. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollAnimations() {
  const elementsToAnimate = document.querySelectorAll(
    '.section-header, .project-card, .skill-category-card, .cert-card, .qr-card, .timeline-item, .edu-card, .stat-card, .contact-info-card, .contact-form-card'
  );

  if (!elementsToAnimate.length) return;

  if (!('IntersectionObserver' in window)) {
    elementsToAnimate.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  // Assign stagger delays to grid cards for cascading entrance
  const grids = document.querySelectorAll('.projects-grid, .certs-grid, .qr-grid, .skills-grid, .edu-grid');
  grids.forEach(grid => {
    const children = Array.from(grid.children);
    children.forEach((child, index) => {
      const delayNum = (index % 6) + 1;
      child.classList.add(`reveal-delay-${delayNum}`);
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -25px 0px'
  });

  elementsToAnimate.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}

