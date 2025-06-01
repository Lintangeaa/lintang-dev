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

// Initialize all DOM elements after document loads
document.addEventListener('DOMContentLoaded', () => {
  // Initialize hoverable text
  makeTextHoverable();

  // Chat Pop-up Functionality
  const chatButton = document.querySelector('.chat-button');
  const chatPopup = document.querySelector('.chat-popup');
  const closeChatButton = document.querySelector('.close-chat');

  if (chatButton && chatPopup && closeChatButton) {
    chatButton.addEventListener('click', () => {
      chatPopup.classList.add('show');
    });

    closeChatButton.addEventListener('click', () => {
      chatPopup.classList.remove('show');
    });

    // Close pop-up when clicking outside (optional)
    window.addEventListener('click', (e) => {
      if (!chatPopup.contains(e.target) && !chatButton.contains(e.target)) {
        chatPopup.classList.remove('show');
      }
    });
  }

  // Initialize navigation functionality
  initializeNavigation();

  // Initial call to set active nav
  setActiveNav();

  // Initialize AOS
  reinitializeAOS();
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (navbar && window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else if (navbar) {
    navbar.classList.remove('scrolled');
  }
});

// Navigation functionality
function initializeNavigation() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  // Handle active navigation state
  window.setActiveNav = function () {
    let currentSection = '';
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach((section) => {
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          currentSection = section.getAttribute('id');
        }
      }
    });

    navLinks.forEach((link) => {
      if (link && link.classList) {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.slice(1) === currentSection) {
          link.classList.add('active');
        }
      }
    });

    // Trigger AOS refresh when section changes
    reinitializeAOS();
  };

  // Smooth scroll with offset
  navLinks.forEach((link) => {
    if (link) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offset = 0; // Adjust if needed

          window.scrollTo({
            top: targetSection.offsetTop - offset,
            behavior: 'smooth',
          });

          // Ensure animations are triggered after scroll
          setTimeout(reinitializeAOS, 300);
        }
      });
    }
  });
}

// Reinitialize AOS on window resize
window.addEventListener('resize', reinitializeAOS);

// Initialize active state on scroll
window.addEventListener('scroll', () => {
  if (window.setActiveNav) {
    window.setActiveNav();
  }
});
