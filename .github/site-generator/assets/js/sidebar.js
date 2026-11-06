(function () {
  'use strict';

  function init() {
    initThemeToggle();
    initHomeSongSlider();
    initSongCardEffects();
    markCurrentPage();
    initBlogPagination();
    initVideoFacades();
  }

  function initSongCardEffects() {
    var cards = document.querySelectorAll('.song-card');
    if (!cards.length) {
      return;
    }

    function activate(card) {
      var bounds = card.getBoundingClientRect();
      document.body.style.setProperty('--disco-x', ((bounds.left + bounds.width / 2) / window.innerWidth * 100) + '%');
      document.body.style.setProperty('--disco-y', ((bounds.top + bounds.height / 2) / window.innerHeight * 100) + '%');
      document.body.classList.add('is-disco-active');
    }

    function deactivate() {
      var activeCard = document.querySelector('.song-card:hover, .song-card:focus-within');
      if (activeCard) {
        activate(activeCard);
        return;
      }

      document.body.classList.remove('is-disco-active');
      document.body.style.removeProperty('--disco-x');
      document.body.style.removeProperty('--disco-y');
    }

    cards.forEach(function (card) {
      card.addEventListener('pointerenter', function () {
        activate(card);
      });
      card.addEventListener('pointerleave', function () {
        deactivate(card);
      });
      card.addEventListener('focusin', function () {
        activate(card);
      });
      card.addEventListener('focusout', function (event) {
        if (!event.relatedTarget || !card.contains(event.relatedTarget)) {
          deactivate(card);
        }
      });
    });
  }

  function initHomeSongSlider() {
    var slider = document.querySelector('[data-home-song-slider]');
    if (!slider || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      return;
    }

    var slides = Array.prototype.slice.call(slider.querySelectorAll('.home-song-slide'));
    if (slides.length < 2) {
      return;
    }

    var activeIndex = slides.findIndex(function (slide) {
      return slide.classList.contains('is-active');
    });
    if (activeIndex < 0) {
      activeIndex = 0;
      slides[activeIndex].classList.add('is-active');
    }

    window.setInterval(function () {
      slides[activeIndex].classList.remove('is-active');
      slides[activeIndex].setAttribute('aria-hidden', 'true');
      activeIndex = (activeIndex + 1) % slides.length;
      slides[activeIndex].classList.add('is-active');
      slides[activeIndex].setAttribute('aria-hidden', 'false');
    }, 5000);
  }

  function initThemeToggle() {
    var toggle = document.querySelector('.theme-toggle');
    if (!toggle) {
      return;
    }

    function updateToggle(theme) {
      var enableDarkMode = theme !== 'dark';
      var label = enableDarkMode ? 'Sötét mód bekapcsolása' : 'Világos mód bekapcsolása';
      toggle.classList.toggle('is-dark', !enableDarkMode);
      toggle.setAttribute('aria-label', label);
      toggle.setAttribute('title', label);
      toggle.querySelector('.visually-hidden').textContent = label;
    }

    var currentTheme = document.documentElement.dataset.theme;
    updateToggle(currentTheme);
    toggle.addEventListener('click', function () {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = currentTheme;
      localStorage.setItem('martilyra-theme', currentTheme);
      updateToggle(currentTheme);
    });
  }

  function initBlogPagination() {
    var list = document.querySelector('.blog-post-list');
    var pagination = document.querySelector('.blog-pagination');
    if (!list || !pagination) {
      return;
    }

    var posts = Array.prototype.slice.call(list.querySelectorAll('.blog-post'));
    var pageSize = parseInt(list.getAttribute('data-page-size'), 10) || 20;
    var pageCount = Math.ceil(posts.length / pageSize);
    if (pageCount <= 1) {
      return;
    }

    function showPage(pageIndex) {
      var firstPost = pageIndex * pageSize;
      posts.forEach(function (post, index) {
        post.hidden = index < firstPost || index >= firstPost + pageSize;
      });

      var buttons = pagination.querySelectorAll('button[data-page]');
      buttons.forEach(function (button) {
        if (parseInt(button.getAttribute('data-page'), 10) === pageIndex) {
          button.setAttribute('aria-current', 'page');
        } else {
          button.removeAttribute('aria-current');
        }
      });
    }

    for (var pageIndex = 0; pageIndex < pageCount; pageIndex++) {
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = String(pageIndex + 1);
      button.setAttribute('data-page', String(pageIndex));
      button.setAttribute('aria-label', 'Blog ' + (pageIndex + 1) + '. oldal');
      button.addEventListener('click', function () {
        showPage(parseInt(this.getAttribute('data-page'), 10));
      });
      pagination.appendChild(button);
    }

    pagination.hidden = false;
    showPage(0);
  }

  function initVideoFacades() {
    var facades = document.querySelectorAll('.youtube-facade[data-video-id]');
    facades.forEach(function (facade) {
      facade.addEventListener('click', function () {
        var videoId = facade.getAttribute('data-video-id');
        var title = facade.getAttribute('data-video-title');
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(videoId) + '?autoplay=1';
        iframe.title = title;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.loading = 'eager';
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        facade.replaceWith(iframe);
      });
    });
  }

  function markCurrentPage() {
    var currentPath = normalizePath(window.location.pathname);
    var homeLink = document.querySelector('.site-title');
    var siteRoot = homeLink ? normalizePath(new URL(homeLink.href, window.location.href).pathname) : '/';
    var links = document.querySelectorAll('.primary-nav a');
    links.forEach(function(link) {
      var linkPath = normalizePath(new URL(link.href, window.location.href).pathname);
      var isHome = linkPath === siteRoot;
      var isCurrentPage = linkPath === currentPath;
      var isCurrentSection = !isHome && currentPath.indexOf(linkPath + '/') === 0;
      var isActive = isCurrentPage || isCurrentSection;

      link.classList.toggle('nav-current', isActive);
      if (isActive) {
        link.setAttribute('aria-current', isCurrentPage ? 'page' : 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function normalizePath(path) {
    return path.length > 1 ? path.replace(/\/+$/, '') : path;
  }

  init();
})();