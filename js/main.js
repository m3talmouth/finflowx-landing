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
  // -- Formspree endpoint live at https://formspree.io/f/mjglbljl (wired
  //    2026-04-30). If submissions stop landing in the FinFlowX inbox,
  //    check (a) the Formspree dashboard for plan limits, (b) the
  //    `index.html` action attribute on #contactForm. The mailto fallback
  //    above stays in place so users never disappear silently if the
  //    endpoint goes down.

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

// ── S4: Matching demo walkthrough widget — full interactive ─────────────────

(function initDemoWidget() {
  'use strict';

  const steps = Array.from(document.querySelectorAll('.demo-widget__step'));
  const verdict = document.getElementById('demo-verdict');
  const restartBtn = document.getElementById('demo-restart');
  const pauseBtn = document.getElementById('demo-pause');
  const progressBar = document.getElementById('demo-progress-bar');
  const scrubDots = Array.from(document.querySelectorAll('.demo-widget__dot'));
  const widget = document.getElementById('matching-demo');

  if (!steps.length || !verdict || !restartBtn) return;

  const STEP_DELAY = 2200;   // ms between steps auto-advancing
  const TICK_MS = 50;        // progress bar animation tick

  let currentStep = -1;      // -1 = not started
  let paused = false;
  let timers = [];
  let progressInterval = null;
  let progressStart = null;
  let autoPlayed = false;

  // ── state helpers ──────────────────────────────────────────────────────────

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
    if (progressInterval) { clearInterval(progressInterval); progressInterval = null; }
  }

  function setStep(idx) {
    currentStep = idx;

    // Reveal steps up to and including idx
    steps.forEach((s, i) => {
      if (i <= idx) s.classList.add('active');
      else s.classList.remove('active');
    });

    // Update scrub dots
    scrubDots.forEach((dot, i) => {
      dot.classList.toggle('demo-widget__dot--active', i <= idx);
      dot.classList.toggle('demo-widget__dot--current', i === idx);
    });

    // Show verdict when last step reached
    if (idx === steps.length - 1) {
      setTimeout(() => verdict.classList.add('visible'), STEP_DELAY / 3);
    } else {
      verdict.classList.remove('visible');
    }
  }

  function resetVisuals() {
    steps.forEach((s) => s.classList.remove('active'));
    verdict.classList.remove('visible');
    scrubDots.forEach((d) => {
      d.classList.remove('demo-widget__dot--active', 'demo-widget__dot--current');
    });
    if (progressBar) { progressBar.style.width = '0%'; }
    currentStep = -1;
  }

  // ── progress bar ───────────────────────────────────────────────────────────

  function startProgress(targetPct, durationMs, onDone) {
    if (progressInterval) clearInterval(progressInterval);
    const startPct = parseFloat(progressBar ? progressBar.style.width : '0') || 0;
    const range = targetPct - startPct;
    const ticks = durationMs / TICK_MS;
    let tick = 0;
    progressStart = Date.now();
    progressInterval = setInterval(() => {
      if (paused) return;
      tick++;
      const pct = startPct + (range * Math.min(tick / ticks, 1));
      if (progressBar) progressBar.style.width = pct + '%';
      if (tick >= ticks) {
        clearInterval(progressInterval);
        progressInterval = null;
        if (onDone) onDone();
      }
    }, TICK_MS);
  }

  // ── playback engine ────────────────────────────────────────────────────────

  function scheduleStep(idx, delay) {
    const t = setTimeout(() => {
      if (paused) return;   // step fires but is ignored when paused; restart resumes from here
      setStep(idx);
      const totalSteps = steps.length;
      const pctEnd = ((idx + 1) / totalSteps) * 100;
      startProgress(pctEnd, STEP_DELAY * 0.85, () => {
        if (idx < totalSteps - 1) scheduleStep(idx + 1, 0);
      });
    }, delay);
    timers.push(t);
  }

  function startFrom(fromIdx) {
    clearTimers();
    paused = false;
    if (pauseBtn) { pauseBtn.textContent = '⏸ Pause'; }

    if (fromIdx === 0) resetVisuals();

    const totalSteps = steps.length;
    const startPct = fromIdx === 0 ? 0 : ((fromIdx) / totalSteps) * 100;
    if (progressBar) progressBar.style.width = startPct + '%';

    scheduleStep(fromIdx, fromIdx === 0 ? 300 : 0);
  }

  function runDemo() { startFrom(0); }

  // ── pause / resume ─────────────────────────────────────────────────────────

  let pausedAtStep = -1;

  function pause() {
    paused = true;
    pausedAtStep = currentStep;
    clearTimers();
    if (pauseBtn) { pauseBtn.textContent = '▶ Resume'; }
  }

  function resume() {
    paused = false;
    if (pauseBtn) { pauseBtn.textContent = '⏸ Pause'; }
    const nextStep = pausedAtStep < steps.length - 1 ? pausedAtStep + 1 : 0;
    if (pausedAtStep >= steps.length - 1) {
      runDemo();
    } else {
      startFrom(nextStep);
    }
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      if (paused) resume(); else pause();
    });
  }

  // ── restart ─────────────────────────────────────────────────────────────────

  restartBtn.addEventListener('click', runDemo);

  // ── scrub dots ─────────────────────────────────────────────────────────────

  scrubDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = parseInt(dot.dataset.goto, 10);
      clearTimers();
      paused = false;
      if (pauseBtn) { pauseBtn.textContent = '⏸ Pause'; }
      setStep(target);
      const totalSteps = steps.length;
      if (progressBar) progressBar.style.width = ((target + 1) / totalSteps * 100) + '%';
      // Continue auto-playing from next step
      if (target < totalSteps - 1) {
        scheduleStep(target + 1, STEP_DELAY);
      }
    });
  });

  // ── keyboard ─────────────────────────────────────────────────────────────────

  document.addEventListener('keydown', (e) => {
    if (!widget || !widget.getBoundingClientRect) return;
    const rect = widget.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === ' ' || e.key === 'k') { e.preventDefault(); paused ? resume() : pause(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); if (currentStep < steps.length - 1) { clearTimers(); setStep(currentStep + 1); scheduleStep(currentStep + 1, 0); } }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); if (currentStep > 0) { clearTimers(); setStep(currentStep - 1); scheduleStep(currentStep, STEP_DELAY); } }
    if (e.key === 'r') runDemo();
  });

  // ── auto-play on scroll ─────────────────────────────────────────────────────

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !autoPlayed) {
        autoPlayed = true;
        runDemo();
        observer.disconnect();
      }
    });
  }, { threshold: 0.35 });

  if (widget) observer.observe(widget);
})();
