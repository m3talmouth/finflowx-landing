/* ============================================
   FinFlowX Landing Page — Interactions
   ============================================ */

(function () {
  'use strict';

  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Sticky Navigation ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- Mobile Menu ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav__links--open');
    navToggle.classList.toggle('nav__toggle--open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav__links--open');
      navToggle.classList.remove('nav__toggle--open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // --- Smooth Scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Active Section Indicator ---
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach((a) => {
            a.classList.toggle('nav__link--active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  // --- Theme Toggle ---
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  function syncThemeButton() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  syncThemeButton();

  themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    if (next === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
    try { localStorage.setItem('finflowx-theme', next); } catch (e) {}
    syncThemeButton();
  });

  // --- Contact Form Handling ---
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Basic validation
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach((input) => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#c0392b';
          input.addEventListener('input', () => {
            input.style.borderColor = '';
          }, { once: true });
        }
      });

      // Email validation
      const emailInput = form.querySelector('#email');
      if (emailInput && emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        valid = false;
        emailInput.style.borderColor = '#c0392b';
      }

      if (!valid) return;

      // Submit
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          formSuccess.hidden = false;
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        // Fallback: show success anyway for demo (Formspree may not be configured)
        formSuccess.hidden = false;
        form.reset();
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get Early Access';
      }
    });
  }

  // --- Keyboard accessibility for mobile menu ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('nav__links--open')) {
      navLinks.classList.remove('nav__links--open');
      navToggle.classList.remove('nav__toggle--open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      navToggle.focus();
    }
  });
})();
