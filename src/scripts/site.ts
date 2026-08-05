/**
 * Client-side interactive script.
 * Handles sticky header shadow, mobile menu toggle, and scroll reveal animations.
 */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('js');

  // Sticky header scroll detection
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
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      navigation.classList.toggle('is-open');

      if (!isExpanded) {
        const firstLink = navigation.querySelector<HTMLAnchorElement>('a');
        if (firstLink) firstLink.focus();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navigation.classList.contains('is-open')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('is-open');
        (menuToggle as HTMLButtonElement).focus();
      }
    });

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('is-open');
      });
    });
  }

  // Scroll reveal animation using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }
});
