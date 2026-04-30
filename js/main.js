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
  //
  // Fallback email — used when the primary form endpoint is unreachable
  // (network down, endpoint dead, CORS issue). User sees a clear error
  // message and a one-click mailto link with their data pre-filled, so
  // submissions never disappear silently the way they did with the
  // earlier "show success anyway" fallback.
  const FALLBACK_EMAIL = 'hello@finflowx.io';
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  // Build a human-readable email body from the form fields so the
  // mailto fallback carries the same information the API would have.
  function buildMailtoFromForm(f) {
    const data = new FormData(f);
    const lines = [];
    const fields = ['fullName', 'email', 'phone', 'company', 'role'];
    for (const k of fields) {
      const v = data.get(k);
      if (v) lines.push(`${k}: ${v}`);
    }
    const software = data.getAll('software');
    if (software.length) lines.push(`software: ${software.join(', ')}`);
    const message = data.get('message');
    if (message) lines.push(`\nmessage:\n${message}`);
    const subject = encodeURIComponent('FinFlowX — Early Access Request');
    const body = encodeURIComponent(lines.join('\n'));
    return `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
  }

  // Render an inline error block above the submit button with a
  // mailto: rescue link. Replaces any prior error so re-tries clear it.
  function showSubmissionError(f, mailtoUrl) {
    let err = f.querySelector('#formErrorBlock');
    if (!err) {
      err = document.createElement('div');
      err.id = 'formErrorBlock';
      err.style.cssText =
        'margin: 12px 0; padding: 12px 16px; border: 1px solid #c0392b; ' +
        'background: rgba(192, 57, 43, 0.06); border-radius: 8px; ' +
        'color: #1A1A1A; font-size: 14px;';
      const beforeEl = submitBtn.parentElement || submitBtn;
      beforeEl.parentElement.insertBefore(err, beforeEl);
    }
    err.innerHTML =
      '<strong>We couldn’t submit your request right now.</strong><br>' +
      'Please <a href="' + mailtoUrl + '" style="color:#1A5C6B;text-decoration:underline;">' +
      'email us directly at ' + FALLBACK_EMAIL + '</a> — ' +
      'we’ve pre-filled the message with your details.';
  }

  function clearSubmissionError(f) {
    const err = f.querySelector('#formErrorBlock');
    if (err) err.remove();
  }

  // Set or clear an inline error message + aria-invalid on a single field.
  // Sibling .form__error element appears under the input; styled by CSS.
  function setFieldError(input, msg) {
    if (!input) return;
    input.setAttribute('aria-invalid', 'true');
    const parent = input.parentElement;
    if (!parent) return;
    let errEl = parent.querySelector('.form__error');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'form__error';
      errEl.setAttribute('role', 'alert');
      input.insertAdjacentElement('afterend', errEl);
    }
    errEl.textContent = msg;
  }

  function clearFieldError(input) {
    if (!input) return;
    input.removeAttribute('aria-invalid');
    const parent = input.parentElement;
    if (!parent) return;
    const errEl = parent.querySelector('.form__error');
    if (errEl) errEl.remove();
  }

  if (form) {
    // Live-clear errors as the user types.
    form.addEventListener('input', (e) => {
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA')) {
        clearFieldError(t);
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearSubmissionError(form);

      // Basic validation — required fields and email shape.
      const required = form.querySelectorAll('[required]');
      let valid = true;
      let firstInvalid = null;
      required.forEach((input) => {
        if (!input.value.trim()) {
          valid = false;
          setFieldError(input, 'This field is required.');
          firstInvalid = firstInvalid || input;
        } else {
          clearFieldError(input);
        }
      });

      const emailInput = form.querySelector('#email');
      if (emailInput && emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        valid = false;
        setFieldError(emailInput, 'Enter a valid business email.');
        firstInvalid = firstInvalid || emailInput;
      }

      if (!valid) {
        if (firstInvalid && typeof firstInvalid.focus === 'function') firstInvalid.focus();
        return;
      }

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
          // Endpoint reached but rejected the submission (e.g. dead
          // Formspree key returns 404 FORM_NOT_FOUND). Surface clearly
          // and offer the mailto rescue.
          throw new Error('Form endpoint rejected the submission (HTTP ' + response.status + ').');
        }
      } catch (err) {
        // Loud failure — show a real error with the mailto fallback link.
        // No more silent "show success anyway" — that's how every prior
        // submission has disappeared.
        // eslint-disable-next-line no-console
        console.error('FinFlowX form submission failed:', err);
        showSubmissionError(form, buildMailtoFromForm(form));
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get Early Access';
      }
    });
  }
  // -- TODO: replace the Formspree endpoint in index.html (id=contactForm,
  //          action attribute). The current id `xpzvqpjl` returns 404
  //          FORM_NOT_FOUND. Three working options:
  //   1. Sign up at https://formspree.io and replace the id with the new
  //      one issued for the FinFlowX inbox.
  //   2. Use https://formsubmit.co — change the action to
  //      `https://formsubmit.co/<destination@email>`. No signup; first
  //      submission triggers an email-confirmation handshake.
  //   3. Use https://web3forms.com — free, requires a per-form access_key
  //      that maps to a destination email; no signup beyond that.
  // Until one of those is wired, the mailto fallback above keeps users
  // from disappearing into the void.

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
