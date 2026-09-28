// Algarve Painter — the only script on the site. Everything works without it;
// this adds the mobile menu, dropdown toggles, the before/after sliders and
// the homepage header behaviour.
(function () {
  'use strict';
  var doc = document.documentElement;

  // Mobile menu.
  var burger = document.querySelector('[data-nav-toggle]');
  function setNav(open) {
    doc.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', String(open));
  }
  if (burger) {
    burger.addEventListener('click', function () {
      setNav(!doc.classList.contains('nav-open'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && doc.classList.contains('nav-open')) {
        setNav(false);
        burger.focus();
      }
    });
    // Close the panel when an in-page link (e.g. #quote) is followed.
    document.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
  }

  // Desktop dropdown toggles (menus also open on hover and focus via CSS).
  document.querySelectorAll('.nav__toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      document.querySelectorAll('.nav__toggle').forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
      });
      btn.setAttribute('aria-expanded', String(open));
      btn.classList.toggle('is-closed', !open);
    });
    // A menu dismissed with Escape stays shut until the pointer leaves it.
    btn.parentNode.addEventListener('mouseleave', function () { btn.classList.remove('is-closed'); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.nav__toggle[aria-expanded="true"]').forEach(function (b) {
      b.setAttribute('aria-expanded', 'false');
      b.classList.add('is-closed');
      b.focus();
    });
  });
  document.addEventListener('click', function (e) {
    if (e.target.closest('.nav__item--menu')) return;
    document.querySelectorAll('.nav__toggle[aria-expanded="true"]').forEach(function (b) {
      b.setAttribute('aria-expanded', 'false');
    });
  });

  // Homepage: the transparent header becomes a fixed solid bar once the hero
  // has scrolled away, so phone and quote stay one click away on desktop.
  var header = document.querySelector('.site-header--over');
  var hero = document.querySelector('.hero--home');
  if (header && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-fixed', !entries[0].isIntersecting);
    }, { rootMargin: '-120px 0px 0px 0px' }).observe(hero);
  }

  // Before/after comparison sliders.
  document.querySelectorAll('[data-ba]').forEach(function (el) {
    var range = el.querySelector('.ba__range');
    if (!range) return;
    var update = function () { el.style.setProperty('--pos', range.value + '%'); };
    range.addEventListener('input', update);
    update();
  });

})();
