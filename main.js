/* ===========================
   SHAKTI SECURITY AGENCY
   Main JavaScript
   =========================== */

// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) preloader.classList.add('loaded');
  }, 1800);
});

// ===== HEADER SCROLL =====
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Back to top
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});

// ===== HAMBURGER MENU =====
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== BACK TO TOP =====
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animationObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-in, .animate-in-left, .animate-in-right').forEach(el => {
  animationObserver.observe(el);
});

// ===== COUNTER OBSERVER =====
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => {
  counterObserver.observe(el);
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
    });

    // Open clicked if it wasn't open
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm && contactForm.dataset.submitMode !== 'whatsapp') {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✅ Message Sent!';
      const successMsg = document.querySelector('.success-message');
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.textContent = '✅ Thank you! We will contact you within 24 hours.';
      }
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        if (successMsg) successMsg.style.display = 'none';
      }, 4000);
    }, 1500);
  });
}

// ===== CAREERS FORM =====
const careerForm = document.getElementById('careerForm');
if (careerForm) {
  careerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = careerForm.querySelector('button[type="submit"]');
    btn.textContent = 'Submitting...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✅ Application Submitted!';
      const successMsg = careerForm.querySelector('.success-message');
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.textContent = '✅ Application received! Our HR team will contact you soon.';
      }
      careerForm.reset();
      setTimeout(() => {
        btn.textContent = 'Submit Application';
        btn.disabled = false;
        if (successMsg) successMsg.style.display = 'none';
      }, 4000);
    }, 1500);
  });
}

// ===== ACTIVE NAV LINK =====
const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (!href) return;

  try {
    const linkUrl = new URL(href, window.location.origin);
    const linkPath = linkUrl.pathname.replace(/\/+$/, '') || '/';
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  } catch (error) {
    // Ignore non-URL nav items such as hash links.
  }
});

// ===== SMOOTH HOVER ON SERVICE CARDS =====
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== TICKER DUPLICATE =====
const tickerTrack = document.querySelector('.ticker-track');
if (tickerTrack) {
  const clone = tickerTrack.cloneNode(true);
  tickerTrack.parentElement.appendChild(clone);
}

// ===== PARTICLES CANVAS (HERO) =====
const canvas = document.getElementById('particlesCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const count = 60;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.7 ? '#C8960C' : '#FFFFFF'
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();

      // Connect nearby particles
      particles.slice(i + 1).forEach(p2 => {
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = '#FFFFFF';
          ctx.globalAlpha = (1 - dist / 120) * 0.06;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(drawParticles);
  }

  drawParticles();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ===== 3D TILT ON VALUE CARDS =====
document.querySelectorAll('.benefit-card, .team-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== STAT COUNTER HERO =====
document.querySelectorAll('.hero-stat-num[data-target]').forEach(el => {
  const counterObserverHero = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserverHero.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counterObserverHero.observe(el);
});

// ===== JOB APPLICATION MODAL =====
document.querySelectorAll('.apply-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const jobTitle = btn.closest('.job-card')?.querySelector('.job-title')?.textContent;
    const careerFormSection = document.getElementById('apply-section');
    if (careerFormSection) {
      careerFormSection.scrollIntoView({ behavior: 'smooth' });
      const positionSelect = document.getElementById('position');
      if (positionSelect && jobTitle) {
        Array.from(positionSelect.options).forEach(opt => {
          if (opt.text.includes(jobTitle.split(' ')[0])) {
            positionSelect.value = opt.value;
          }
        });
      }
    }
  });
});

// ===== TYPED TEXT EFFECT (HERO) =====
const typedEl = document.getElementById('typed-text');
if (typedEl) {
  const phrases = ['Your Safety', 'Your Business', 'Your Property', 'Your Future'];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeText() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeText, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeText, 400);
    } else {
      setTimeout(typeText, isDeleting ? 60 : 90);
    }
  }

  setTimeout(typeText, 1000);
}

// ===== GSAP-LIKE ENTRANCE (Pure CSS triggers) =====
function initDelayedAnimations() {
  document.querySelectorAll('[data-delay]').forEach(el => {
    const delay = el.getAttribute('data-delay');
    el.style.transitionDelay = delay + 'ms';
  });
}

initDelayedAnimations();

console.log('%c🛡️ SHAKTI SECURITY AGENCY', 'color: #C8960C; font-size: 18px; font-weight: bold; font-family: serif;');
console.log('%cProtecting What Matters Most', 'color: #1A56DB; font-size: 12px;');
