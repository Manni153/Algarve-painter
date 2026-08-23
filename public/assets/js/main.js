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
  // .hero-atelier is the ground-up homepage hero (no .hero-stack* classes
  // — it deliberately does not inherit the ~2000 lines of legacy
  // .hero-stack/.hero-stack--split card/scrim machinery built for three
  // earlier hero designs, so it is listed here explicitly rather than
  // folded into the .hero-stack--split selector above).
  var heroStackSplit = document.querySelector('.page-home .hero-stack--split, .page-lagos-rs .hero-stack--split, .page-home .hero-atelier');
  if (homeHeader && heroStackSplit) {
    // The v2 homepage hero carries its own WhatsApp button, so the floating
    // bubble is suppressed while that hero is on screen — four contact
    // affordances in one viewport split attention, and the bubble's green is
    // the loudest colour on the page. It fades back in once the visitor
    // scrolls past, where it earns its keep on the long content below.
    var fab = document.querySelector('.whatsapp-float');
    var heroHasOwnWhatsApp = !!document.querySelector('.hero-atelier');
    var updateHeaderTransparency = function () {
      var stillOverHero = heroStackSplit.getBoundingClientRect().bottom > 0;
      homeHeader.classList.toggle('site-header--home-transparent', stillOverHero);
      if (fab && heroHasOwnWhatsApp) fab.classList.toggle('whatsapp-float--suppressed', stillOverHero);
    };
    updateHeaderTransparency();
    window.addEventListener('scroll', updateHeaderTransparency, { passive: true });
    window.addEventListener('resize', updateHeaderTransparency);
  }
})();

  // ---- Colour visualiser -------------------------------------------------
  // The villa's repaintable surfaces are driven by five CSS custom properties
  // on the wrapper, not by touching the SVG's own fills. That means a scheme
  // change is one style write instead of a walk over several hundred nodes,
  // and it keeps the artwork file free of state.
  var viz = document.querySelector('[data-viz]');
  if (viz) {
    var vizCaption = viz.querySelector('[data-viz-caption]');
    var vizCta = viz.querySelector('[data-viz-cta]');
    var vizWa = vizCta ? vizCta.getAttribute('href').split('?')[0] : '';
    var chosen = {};

    function vizName(surface, id) {
      var btn = viz.querySelector('.swatch[data-surface="' + surface + '"][data-colour="' + id + '"]');
      return btn ? btn.querySelector('.swatch-name').textContent.trim() : id;
    }

    function vizSync() {
      if (!vizCta || !vizWa) return;
      var parts = [];
      ['wall', 'trim', 'shutter', 'door', 'roof'].forEach(function (k) {
        if (chosen[k]) parts.push(k.charAt(0).toUpperCase() + k.slice(1) + ': ' + chosen[k]);
      });
      var msg = 'Hello — I have picked colours on your website and would like a quote.\n\n' +
                parts.join('\n') + '\n\nMy property is in: ';
      vizCta.setAttribute('href', vizWa + '?text=' + encodeURIComponent(msg));
    }

    function vizSet(surface, id, hex) {
      viz.style.setProperty('--v-' + surface, hex);
      chosen[surface] = vizName(surface, id);
      viz.querySelectorAll('.swatch[data-surface="' + surface + '"]').forEach(function (b) {
        b.setAttribute('aria-checked', String(b.getAttribute('data-colour') === id));
      });
      vizSync();
    }

    viz.querySelectorAll('.swatch').forEach(function (b) {
      b.addEventListener('click', function () {
        vizSet(b.getAttribute('data-surface'), b.getAttribute('data-colour'), b.getAttribute('data-hex'));
        viz.querySelectorAll('.scheme').forEach(function (s) { s.setAttribute('aria-pressed', 'false'); });
        if (vizCaption) vizCaption.innerHTML = '<strong>Your own scheme</strong> — mixed from the Algarve palette';
      });
    });

    viz.querySelectorAll('.scheme').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var s;
        try { s = JSON.parse(btn.getAttribute('data-scheme')); } catch (e) { return; }
        ['wall', 'trim', 'shutter', 'door', 'roof'].forEach(function (k) { vizSet(k, s.ids[k], s[k]); });
        viz.querySelectorAll('.scheme').forEach(function (o) { o.setAttribute('aria-pressed', String(o === btn)); });
        if (vizCaption) vizCaption.innerHTML = '<strong>' + s.name + '</strong> — ' + s.note;
      });
    });

    // Seed `chosen` from whatever is checked at load, so the WhatsApp message
    // is already correct before anyone touches a swatch.
    viz.querySelectorAll('.scheme[aria-pressed="true"]').forEach(function (btn) {
      try {
        var s = JSON.parse(btn.getAttribute('data-scheme'));
        ['wall', 'trim', 'shutter', 'door', 'roof'].forEach(function (k) { chosen[k] = vizName(k, s.ids[k]); });
      } catch (e) {}
    });
    vizSync();
  }

  // ---- Instant estimate --------------------------------------------------
  var est = document.querySelector('[data-est]');
  if (est) {
    var euro = function (n) {
      return '€' + Math.round(n / 50) * 50 + '';
    };
    var lo = est.querySelector('[data-est-lo]');
    var hi = est.querySelector('[data-est-hi]');
    var working = est.querySelector('[data-est-working]');
    var wa = est.querySelector('[data-est-wa]');
    var waBase = wa ? wa.getAttribute('href').split('?')[0] : '';

    function pick(name) {
      return est.querySelector('input[name="' + name + '"]:checked');
    }

    function estimate() {
      var job = pick('job'), size = pick('size'), cond = pick('cond'), prop = pick('prop');
      if (!job || !size || !cond || !prop) return;
      var m2 = parseFloat(size.getAttribute('data-m2'));
      var f = parseFloat(cond.getAttribute('data-factor'));
      var a = parseFloat(job.getAttribute('data-lo')) * m2 * f;
      var b = parseFloat(job.getAttribute('data-hi')) * m2 * f;
      lo.textContent = euro(a);
      hi.textContent = euro(b);
      var label = function (el) { return el.parentNode.querySelector('.opt-label').textContent.trim(); };
      working.textContent = label(job) + ' on a ' + label(size).toLowerCase() + ' ' +
        label(prop).toLowerCase() + ', around ' + m2 + ' m² of painted surface, in ' +
        label(cond).toLowerCase() + ' condition.';
      if (wa && waBase) {
        wa.setAttribute('href', waBase + '?text=' + encodeURIComponent(
          'Hello — your website estimated ' + euro(a) + '–' + euro(b) + ' for:\n\n' +
          working.textContent + '\n\nCould we arrange a proper look? My property is in: '));
      }
    }

    est.addEventListener('change', estimate);
    estimate();
  }
