document.addEventListener('DOMContentLoaded', () => {
  // Mark JavaScript as enabled
  document.body.classList.add('js');

  // Header scroll detection
  const header = document.querySelector('[data-header]');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile navigation menu toggle
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('[data-navigation]');
  if (menuToggle && navigation) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navigation.classList.toggle('is-open');

      if (!isExpanded) {
        // Focus first link when opening
        const firstLink = navigation.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // Close menu when pressing Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navigation.classList.contains('is-open')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('is-open');
        menuToggle.focus();
      }
    });

    // Close menu when clicking navigation link
    navigation.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('is-open');
      });
    });
  }

  // Scroll reveal animation using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('is-visible'));
  }
});
