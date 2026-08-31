/**
 * scroll-reveal.mjs
 * Lightweight IntersectionObserver-based scroll reveal system.
 * Adds `.revealed` class to elements with `data-reveal` attribute when they
 * enter the viewport. Supports staggered children via `data-reveal-stagger`.
 *
 * Usage:
 *   <div data-reveal="fade-up">       → fades up on scroll
 *   <div data-reveal="fade-in">       → fades in on scroll
 *   <div data-reveal="slide-left">    → slides in from left
 *   <div data-reveal="slide-right">   → slides in from right
 *   <div data-reveal-stagger="100">   → parent: children stagger by 100ms
 *
 * Respects `prefers-reduced-motion: reduce` - skips all animations.
 */

/**
 * Initializes the scroll reveal system by observing all `[data-reveal]` elements.
 * Called once on DOMContentLoaded.
 */
function initScrollReveal() {
  /* Respect user motion preferences */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    /* Immediately reveal everything without animation */
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('revealed');
    });
    return;
  }

  /* IntersectionObserver configuration */
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px', // trigger slightly before element is fully visible
    threshold: 0.08,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const staggerDelay = el.getAttribute('data-reveal-stagger');

      if (staggerDelay) {
        /* Stagger children: apply incremental delay to each child with data-reveal */
        const children = el.querySelectorAll('[data-reveal]');
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * parseInt(staggerDelay, 10)}ms`;
          child.classList.add('revealed');
        });
      }

      el.classList.add('revealed');
      observer.unobserve(el); // reveal only once
    });
  }, observerOptions);

  /* Observe all reveal targets */
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    observer.observe(el);
  });
}

/* Initialize on DOM ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}
