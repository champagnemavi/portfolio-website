/**
 * ========================================================
 * MAVI MELEGRITO - PORTFOLIO JAVASCRIPT (VANILLA JS)
 * Handles:
 *  1. Sticky Navigation & Scroll Header Effects
 *  2. Mobile Hamburger Navigation Menu
 *  3. Dynamic Typewriter Animation in Hero
 *  4. Scroll Reveal Animations (Intersection Observer)
 *  5. Active Navigation Link Highlighting on Scroll
 *  6. Interactive Skill Bar Animation
 *  7. Email Copy to Clipboard with Toast Notification
 *  8. Quick Contact Form mailto Generator
 *  9. Project Overview Modal Interaction
 * 10. Dynamic Current Year in Footer
 * ========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------
     1. STICKY NAVBAR SCROLL EFFECT
     -------------------------------------------------------- */
  const header = document.getElementById('header');

  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Run once on load


  /* --------------------------------------------------------
     2. MOBILE NAVIGATION MENU (HAMBURGER)
     -------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileMenu = () => {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const openMobileMenu = () => {
    navMenu.classList.add('open');
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    menuBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeMobileMenu = () => {
    navMenu.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    menuBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  if (menuBackdrop) {
    menuBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close menu when any nav link or mobile button is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  const mobileOnlyConnect = document.querySelector('.mobile-only-item a');
  if (mobileOnlyConnect) {
    mobileOnlyConnect.addEventListener('click', () => {
      closeMobileMenu();
    });
  }


  /* --------------------------------------------------------
     3. TYPEWRITER ANIMATION (HERO SECTION)
     -------------------------------------------------------- */
  const typewriterElement = document.getElementById('typewriterText');
  
  if (typewriterElement) {
    const phrases = [
      'Computer Engineering Student',
      'C++ & Python Developer',
      'Object-Oriented Programmer',
      'Tech Enthusiast at Aura College'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const eraseSpeed = 45;
    const delayBetweenWords = 1800;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        // Remove one character
        charIndex--;
        typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      } else {
        // Add one character
        charIndex++;
        typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      }

      let timeoutDuration = isDeleting ? eraseSpeed : typeSpeed;

      // When word is fully typed
      if (!isDeleting && charIndex === currentPhrase.length) {
        timeoutDuration = delayBetweenWords;
        isDeleting = true;
      } 
      // When word is completely erased
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timeoutDuration = 400; // Small pause before typing next
      }

      setTimeout(typeLoop, timeoutDuration);
    }

    // Start typing loop
    typeLoop();
  }


  /* --------------------------------------------------------
     4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     -------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once animated, optionally unobserve
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }


  /* --------------------------------------------------------
     5. INTERACTIVE SKILL BAR ANIMATION
     -------------------------------------------------------- */
  const skillCards = document.querySelectorAll('.skill-card');

  if ('IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const meterFill = entry.target.querySelector('.meter-bar-fill');
          if (meterFill) {
            const targetLevel = meterFill.style.getPropertyValue('--level') || '70%';
            meterFill.style.width = targetLevel;
          }
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.25
    });

    skillCards.forEach(card => skillObserver.observe(card));
  } else {
    skillCards.forEach(card => {
      const meterFill = card.querySelector('.meter-bar-fill');
      if (meterFill) {
        meterFill.style.width = meterFill.style.getPropertyValue('--level') || '70%';
      }
    });
  }


  /* --------------------------------------------------------
     6. ACTIVE NAVIGATION LINK ON SCROLL
     -------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id], header[id]');

  const highlightNavOnScroll = () => {
    const scrollPosition = window.scrollY + 180; // Offset for header view line

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });


  /* --------------------------------------------------------
     7. EMAIL COPY TO CLIPBOARD & TOAST NOTIFICATION
     -------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  const toastMessage = document.getElementById('toastMessage');
  const studentEmail = 'maviray_melegrito@aura.edu.ph';

  const showToast = (text) => {
    if (!toastMessage) return;
    toastMessage.textContent = text;
    toastMessage.classList.add('show');
    setTimeout(() => {
      toastMessage.classList.remove('show');
    }, 2800);
  };

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(studentEmail);
        } else {
          // Fallback method
          const tempInput = document.createElement('input');
          tempInput.value = studentEmail;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        if (copyBtnText) copyBtnText.textContent = 'Copied!';
        showToast('Email copied to clipboard!');

        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = 'Copy Email';
        }, 2200);
      } catch (err) {
        showToast('Failed to copy. Email: ' + studentEmail);
      }
    });
  }


  /* --------------------------------------------------------
     8. QUICK CONTACT FORM (MAILTO GENERATION)
     -------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const senderName = document.getElementById('senderName').value.trim();
      const senderSubject = document.getElementById('senderSubject').value.trim();
      const senderMessage = document.getElementById('senderMessage').value.trim();

      if (!senderName || !senderSubject || !senderMessage) {
        showToast('Please fill out all fields.');
        return;
      }

      // Format mailto link
      const emailRecipient = 'maviray_melegrito@aura.edu.ph';
      const encodedSubject = encodeURIComponent(`[Portfolio Inquiry] ${senderSubject} - from ${senderName}`);
      const encodedBody = encodeURIComponent(`Hi Mavi,\n\n${senderMessage}\n\nFrom,\n${senderName}`);
      
      const mailtoUrl = `mailto:${emailRecipient}?subject=${encodedSubject}&body=${encodedBody}`;

      // Open email client
      window.location.href = mailtoUrl;

      showToast('Opening default email client...');
      contactForm.reset();
    });
  }


  /* --------------------------------------------------------
     9. PROJECT OVERVIEW MODAL
     -------------------------------------------------------- */
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalOkBtn = document.getElementById('modalOkBtn');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalDesc = document.getElementById('modalProjectDesc');
  const projectButtons = document.querySelectorAll('.project-link-btn');

  const projectDetailsMap = {
    'Student Programming Projects': {
      title: 'Student Programming Projects',
      desc: 'This repository contains foundational C++ and OOP coursework exercises completed during 2nd year at Aura College. Topics include standard templates, console input/output parsing, custom class inheritance hierarchies, and memory management basics.'
    },
    'Python Projects': {
      title: 'Python Projects & Problem Solving',
      desc: 'A collection of Python scripts developed for algorithmic logic practice and computational exercises. Features problem-solving scripts, basic text parsing algorithms, and mathematical logic modules.'
    },
    'Web Development Projects': {
      title: 'Web Development Projects',
      desc: 'Hands-on frontend and backend projects created with HTML5, CSS3, Vanilla JavaScript, and PHP. Highlights responsive layouts, semantic DOM structures, and elementary server-side request processing.'
    }
  };

  const openProjectModal = (projectName) => {
    const data = projectDetailsMap[projectName] || {
      title: projectName,
      desc: 'Academic project repository in progress. Real repository links and demonstrations will be updated as coursework progresses.'
    };

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (projectModal) projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (projectModal) projectModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  projectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projName = btn.getAttribute('data-project') || 'Academic Project';
      openProjectModal(projName);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalOkBtn) modalOkBtn.addEventListener('click', closeProjectModal);

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeMobileMenu();
    }
  });


  /* --------------------------------------------------------
     10. DYNAMIC CURRENT YEAR IN FOOTER
     -------------------------------------------------------- */
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    // Default to at least 2026 as per user specification
    yearElement.textContent = currentYear >= 2026 ? currentYear : 2026;
  }

});
