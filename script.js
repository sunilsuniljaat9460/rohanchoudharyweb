// ==============================
// Rohan Choudhary Coaching Website – script.js
// ==============================

// ✅ 1. Mobile Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu ul');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active'); // Close menu on link click
    });
  });
}

// ✅ 2. Smooth Scrolling for In-Page Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href.length > 1 && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ✅ 3. Fade-in Animation on Scroll (using Intersection Observer)
const fadeEls = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => observer.observe(el));
}

// ✅ 4. Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

if (backToTopBtn) {
  window.addEventListener('scroll', debounce(() => {
    backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  }, 200)); // delay in ms

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ✅ Debounce Function (Missing earlier)
function debounce(func, wait = 200) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}



  question.addEventListener('click', toggleAnswer);
  question.addEventListener('keypress', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleAnswer();
    }
  });
});

// ✅ 5. FAQ Accordion (Final Clean)
document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach(question => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector(".faq-icon");

    question.setAttribute("tabindex", "0");

    const toggleFAQ = () => {
      const isOpen = answer.style.maxHeight && answer.style.maxHeight !== "0px";

      // Close all others
      document.querySelectorAll(".faq-answer").forEach(a => {
        a.style.maxHeight = "0px";
        a.style.padding = "0 1rem";
      });
      document.querySelectorAll(".faq-icon").forEach(i => {
        i.style.transform = "rotate(0deg)";
      });

      // Open current
      if (!isOpen) {
        answer.style.maxHeight = "300px";
        answer.style.padding = "1rem";
        icon.style.transform = "rotate(45deg)";
      }
    };

    question.addEventListener("click", toggleFAQ);
    question.addEventListener("keypress", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFAQ();
      }
    });
  });
});



// ✅ 6. Testimonial Auto Slider
const testimonials = document.querySelectorAll('.testimonial');
const dotsContainer = document.querySelector('.slider-dots');
let currentTestimonial = 0;
let sliderPaused = false;

function showTestimonial(index) {
  testimonials.forEach(t => t.classList.remove('active'));
  testimonials[index].classList.add('active');
  updateDots(index);
}

function updateDots(index) {
  const dots = document.querySelectorAll('.slider-dots .dot');
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
}

function nextTestimonial() {
  if (!sliderPaused && testimonials.length > 0) {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }
}

// Initialize dots (if container exists)
if (dotsContainer && testimonials.length > 0) {
  testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentTestimonial = index;
      showTestimonial(index);
    });
    dotsContainer.appendChild(dot);
  });

  // Start auto-slide
  showTestimonial(currentTestimonial);
  setInterval(nextTestimonial, 3000);

  // Pause on hover
  testimonials.forEach(t => {
    t.addEventListener('mouseenter', () => sliderPaused = true);
    t.addEventListener('mouseleave', () => sliderPaused = false);
  });
}


// ✅ 7. Dark Mode Toggle
const toggleBtn = document.querySelector('#dark-toggle');
const body = document.body;

const enableDarkMode = () => {
  body.classList.add('dark');
  localStorage.setItem('theme', 'dark');
};

const disableDarkMode = () => {
  body.classList.remove('dark');
  localStorage.setItem('theme', 'light');
};

// On page load, check saved theme
if (localStorage.getItem('theme') === 'dark') {
  enableDarkMode();
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    body.classList.contains('dark') ? disableDarkMode() : enableDarkMode();
  });
}

// ✅ 8. Preloader Removal on Page Load
window.addEventListener('load', () => {
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 500); // Optional: remove from DOM
  }
});

// 9. ScrollSpy Navigation (Without debounce)
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// 10. Gallery Zoom Modal
const galleryImages = document.querySelectorAll('.gallery img');

if (galleryImages.length > 0) {
  const modal = document.createElement('div');
  modal.id = 'image-modal';
  modal.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.8);
    display: none; align-items: center;
    justify-content: center; z-index: 3000;
  `;

  const modalImg = document.createElement('img');
  modalImg.style.maxWidth = '90%';
  modalImg.style.maxHeight = '90%';
  modal.appendChild(modalImg);
  document.body.appendChild(modal);

  galleryImages.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  modal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
}

// 11. Contact Form Validation
const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", e => {
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');
    let hasError = false;

    [name, email, message].forEach(field => {
      const error = field.nextElementSibling;
      if (!field.value.trim()) {
        field.classList.add("error");
        if (error) error.textContent = "This field is required.";
        hasError = true;
      } else {
        field.classList.remove("error");
        if (error) error.textContent = "";
      }
    });

    if (hasError) e.preventDefault();
  });
}

// 12. About Section Scroll Animation
const animatedItems = document.querySelectorAll('.animate');

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  animatedItems.forEach(item => {
    const boxTop = item.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      item.classList.add('visible');
      const delay = item.getAttribute('data-delay');
      if (delay) {
        item.style.setProperty('--delay', delay);
      }
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

