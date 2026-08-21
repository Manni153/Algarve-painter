(function () {
  'use strict';

  var hamburger = document.querySelector('[data-nav-open]');
  var closeBtn = document.querySelector('[data-nav-close]');
  var drawer = document.querySelector('[data-nav-drawer]');

  function openNav() {
    if (!drawer) return;
    drawer.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }

  function closeNav() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  if (hamburger && drawer) {
    hamburger.addEventListener('click', function () {
      var isOpen = drawer.classList.contains('is-open');
      if (isOpen) { closeNav(); } else { openNav(); }
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (drawer) {
    drawer.addEventListener('click', function (e) {
      if (e.target === drawer) closeNav();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  // Homepage desktop header: Services dropdown. Hover is handled entirely
  // in CSS (see .home-header-dropdown); this only adds click-to-toggle
  // (for touch/keyboard use) plus close-on-outside-click and Escape.
  var dropdownTrigger = document.querySelector('[data-dropdown-trigger]');
  if (dropdownTrigger) {
    var dropdownItem = dropdownTrigger.closest('.home-header-nav-item');
    var closeDropdown = function () {
      dropdownItem.classList.remove('is-open');
      dropdownTrigger.setAttribute('aria-expanded', 'false');
    };
    dropdownTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = dropdownItem.classList.contains('is-open');
      if (isOpen) {
        closeDropdown();
      } else {
        dropdownItem.classList.add('is-open');
        dropdownTrigger.setAttribute('aria-expanded', 'true');
      }
    });
    document.addEventListener('click', function (e) {
      if (!dropdownItem.contains(e.target)) closeDropdown();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDropdown();
    });
  }

  // Mobile services carousel (max-width:767px, see main.css): the scroll
  // itself is native (CSS overflow-x + scroll-snap, no JS drag library) —
  // this only reads scrollLeft on scroll to drive the progress bar's fill
  // width. Harmless on desktop/tablet too: the carousel CSS never applies
  // there, so the track never scrolls horizontally, scrollLeft stays 0,
  // and the (display:none there) progress bar's width never becomes
  // visible either way.
  var carouselTrack = document.querySelector('#services .card-grid.cols-3');
  var carouselFill = document.querySelector('#services .carousel-progress-fill');
  if (carouselTrack && carouselFill) {
    var cardCount = carouselTrack.children.length;
    var updateCarouselProgress = function () {
      // Step = the actual on-screen distance between two consecutive
      // cards' left edges (card width + the gap between them), read from
      // the rendered layout rather than assumed — was carouselTrack.
      // clientWidth back when each card filled the whole track (flex:0 0
      // 100%, no gap), so "one trackful" and "one card" were the same
      // distance. Cards are narrower than the track now (peeking-next-
      // card carousel, see main.css), so that's no longer true; measuring
      // real offsetLeft here keeps this correct without hardcoding the
      // CSS's width/gap values into JS.
      var cards = carouselTrack.children;
      var step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : carouselTrack.clientWidth;
      if (!step || !cardCount) return;
      var index = Math.round(carouselTrack.scrollLeft / step);
      index = Math.max(0, Math.min(cardCount - 1, index));
      carouselFill.style.width = ((index + 1) / cardCount) * 100 + '%';
    };
    carouselTrack.addEventListener('scroll', updateCarouselProgress, { passive: true });
    updateCarouselProgress();
  }

  // Full-bleed hero (originally desktop-only, branch: claude/hero-
  // fullbleed-desktop; now every breakpoint has a full-bleed hero, see
  // claude/hero-fullbleed-mobile-tablet): the header sits transparent
  // (white text) over the hero image while its own box still overlaps
  // the top of the viewport, then switches back to the normal solid
  // .site-header--home treatment once scrolled past it — otherwise
  // transparent+white text would stay stuck on top of the plain page
  // background further down the page, unreadable. Used to be gated to
  // desktop only (both here via matchMedia and in the CSS via a
  // min-width:1025px wrapper on .site-header--home-transparent) — both
  // guards removed once mobile/tablet grew their own full-bleed hero,
  // since .hero-stack--split is now full-bleed at every width.
  // .page-lagos-rs added alongside .page-home: the Lagos town page opts
  // into this same full-bleed/transparent-header mechanism as a one-page
  // pilot of the homepage's design system (see town.js/main.css) — every
  // other page still has no element this selector can match.
  var homeHeader = document.querySelector('.site-header--home');
  var heroStackSplit = document.querySelector('.page-home .hero-stack--split, .page-lagos-rs .hero-stack--split');
  if (homeHeader && heroStackSplit) {
    var updateHeaderTransparency = function () {
      var stillOverHero = heroStackSplit.getBoundingClientRect().bottom > 0;
      homeHeader.classList.toggle('site-header--home-transparent', stillOverHero);
    };
    updateHeaderTransparency();
    window.addEventListener('scroll', updateHeaderTransparency, { passive: true });
    window.addEventListener('resize', updateHeaderTransparency);
  }
})();
