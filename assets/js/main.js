// Initialize AOS with configuration to repeat animations
AOS.init({
  duration: 1000,
  once: false, // Change to false to repeat animations
  mirror: true, // Animate elements when scrolling up and down
  offset: 100, // Trigger animation slightly before element enters view
  disable: false, // Ensure animations are not disabled
});

// Function to reinitialize AOS on dynamic content or page revisit
function reinitializeAOS() {
  AOS.refresh();
}

// Function to make text hoverable word by word
function makeTextHoverable() {
  const hoverableElements = document.querySelectorAll('.hoverable-text');

  hoverableElements.forEach((element) => {
    const text = element.innerHTML;
    const words = text.split(/(\s+)/);

    const wrappedWords = words
      .map((word) => {
        if (word.trim() === '') {
          return word; // Keep spaces as they are
        }
        return `<span class="word">${word}</span>`;
      })
      .join('');

    element.innerHTML = wrappedWords;
  });
}

// Navbar scroll effect
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Handle active navigation state
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav() {
  let currentSection = '';
  const scrollPosition = window.scrollY + window.innerHeight / 3;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === currentSection) {
      link.classList.add('active');
    }
  });

  // Trigger AOS refresh when section changes
  reinitializeAOS();
}

// Smooth scroll with offset
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    const offset = 0; // Adjust if needed

    window.scrollTo({
      top: targetSection.offsetTop - offset,
      behavior: 'smooth',
    });

    // Ensure animations are triggered after scroll
    setTimeout(reinitializeAOS, 300);
  });
});

// Reinitialize AOS on window resize
window.addEventListener('resize', reinitializeAOS);

// Initialize active state
document.addEventListener('DOMContentLoaded', () => {
  makeTextHoverable();
  setActiveNav();
  reinitializeAOS();
});

window.addEventListener('scroll', setActiveNav);
