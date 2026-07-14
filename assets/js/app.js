(function () {
  const root = document.documentElement;
  const drawer = document.querySelector('.theme-drawer');
  const toggle = document.querySelector('[data-theme-toggle]');

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const open = drawer.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && e.target !== toggle && drawer.classList.contains('is-open')) {
        drawer.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { drawer.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  document.querySelectorAll('[data-set-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.setTheme;
      root.dataset.theme = theme;
      try { localStorage.setItem('lmml-theme', theme); } catch (e) {}
      if (drawer) drawer.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal: tag animatable blocks, then observe them.
  function tagRevealTargets(scope) {
    const selectors = ['.card', '.doc-card', '.itinerary-stop', '.section > .section-head', '.hero-ticket'];
    scope.querySelectorAll(selectors.join(',')).forEach(el => {
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
    });
  }

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 }) : null;

  function reveal(scope) {
    scope = scope || document;
    tagRevealTargets(scope);
    if (!observer) {
      scope.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
      return;
    }
    scope.querySelectorAll('[data-reveal]:not(.is-visible)').forEach(el => observer.observe(el));
  }

  function dissolve(el) {
    if (!el) return;
    el.classList.remove('dissolve-refresh');
    // force reflow so the animation can restart
    void el.offsetWidth;
    el.classList.add('dissolve-refresh');
  }

  window.LMML = { reveal, dissolve };
  document.addEventListener('DOMContentLoaded', () => reveal(document));
})();
