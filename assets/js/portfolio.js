(() => {
  'use strict';

  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let hasThemePreference = false;

  try {
    hasThemePreference = ['light', 'dark'].includes(localStorage.getItem('sumit-theme'));
  } catch (_) {
    // Theme switching still works when storage is unavailable.
  }

  const updateThemeButton = () => {
    const dark = root.dataset.theme === 'dark';
    themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    themeButton.setAttribute('title', `Switch to ${dark ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]').content = dark ? '#1b1e1c' : '#f8f7f4';
  };

  if (themeButton) {
    themeButton.hidden = false;
    updateThemeButton();
    themeButton.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      hasThemePreference = true;
      try { localStorage.setItem('sumit-theme', root.dataset.theme); } catch (_) {}
      updateThemeButton();
    });
    systemTheme.addEventListener('change', event => {
      if (!hasThemePreference) {
        root.dataset.theme = event.matches ? 'dark' : 'light';
        updateThemeButton();
      }
    });
  }

  const filterGroup = document.querySelector('.project-filters');
  const projects = [...document.querySelectorAll('.project')];
  const filterStatus = document.querySelector('.filter-status');
  if (filterGroup) {
    const applyProjectFilter = (button, announce = true) => {
      filterGroup.querySelectorAll('button').forEach(item => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      projects.forEach(project => {
        project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
      });
      const count = projects.filter(project => !project.hidden).length;
      if (announce && filterStatus) filterStatus.textContent = `${count} ${count === 1 ? 'entry' : 'entries'} shown.`;
    };
    const initialFilter = filterGroup.querySelector('button[aria-pressed="true"]');
    if (initialFilter) applyProjectFilter(initialFilter, false);
    filterGroup.hidden = false;
    filterGroup.addEventListener('click', event => {
      const button = event.target.closest('button[data-filter]');
      if (button) applyProjectFilter(button);
    });
  }

  const copyButton = document.querySelector('.copy-email');
  const copyStatus = document.querySelector('.copy-status');
  let copyTimeout;
  if (copyButton && navigator.clipboard && window.isSecureContext) {
    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      clearTimeout(copyTimeout);
      try {
        await navigator.clipboard.writeText(copyButton.dataset.email);
        copyStatus.textContent = 'Email copied. Say hello!';
      } catch (_) {
        copyStatus.textContent = 'Please select the email address to copy it.';
      }
      copyTimeout = setTimeout(() => { copyStatus.textContent = ''; }, 4500);
    });
  }

  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const navSections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if (navSections.length) {
    const setActiveLink = () => {
      let activeSection = null;
      const trigger = Math.min(window.innerHeight * .35, 230);
      navSections.forEach(section => {
        if (section.getBoundingClientRect().top <= trigger) activeSection = section;
      });
      navLinks.forEach(link => {
        if (activeSection && link.hash === `#${activeSection.id}`) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };
    let scheduled = false;
    window.addEventListener('scroll', () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => { setActiveLink(); scheduled = false; });
    }, { passive: true });
    setActiveLink();
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
