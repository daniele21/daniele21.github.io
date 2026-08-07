/**
 * Client-side interactive script.
 * Handles sticky header shadow, theme toggle, mobile menu toggle, and scroll reveal animations.
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

  // Theme toggle logic
  const themeToggle = document.querySelector('[data-theme-toggle]');
  if (themeToggle) {
    const updateToggleState = (theme: string) => {
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      themeToggle.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    };

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateToggleState(currentTheme);

    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', activeTheme);
      try {
        localStorage.setItem('theme', activeTheme);
      } catch (e) {}
      updateToggleState(activeTheme);
    });
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

    navigation.querySelectorAll('a:not(.dropdown-toggle)').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('is-open');
      });
    });
  }

  // Dropdown interactivity (touch devices, keyboard, outside click)
  const dropdowns = document.querySelectorAll<HTMLElement>('[data-dropdown]');
  if (dropdowns.length > 0) {
    const closeAllDropdowns = () => {
      dropdowns.forEach((dropdown) => {
        dropdown.removeAttribute('data-open');
        const toggle = dropdown.querySelector('[data-dropdown-toggle]');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    };

    dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector<HTMLElement>('[data-dropdown-toggle]');
      if (!toggle) return;

      toggle.addEventListener('click', (e) => {
        // On mobile screen sizes (<=820px), prevent default to toggle accordion sub-menu
        if (window.innerWidth <= 820) {
          e.preventDefault();
          const isOpen = dropdown.getAttribute('data-open') === 'true';
          closeAllDropdowns();
          if (!isOpen) {
            dropdown.setAttribute('data-open', 'true');
            toggle.setAttribute('aria-expanded', 'true');
          }
        }
      });
    });

    document.addEventListener('click', (e) => {
      const target = e.target as Node;
      let insideDropdown = false;
      dropdowns.forEach((dropdown) => {
        if (dropdown.contains(target)) insideDropdown = true;
      });
      if (!insideDropdown) {
        closeAllDropdowns();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllDropdowns();
      }
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
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }
});

