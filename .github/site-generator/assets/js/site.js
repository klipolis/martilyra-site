(function () {
  'use strict';

  function init() {
    initThemeToggle();
    initSongTower();
    initSongCardEffects();
    initDelayedEffects();
    markCurrentPage();
    initBlogPagination();
    initVideoFacades();
  }

  function initSongTower() {
    var tower = document.querySelector('[data-song-tower]');
    if (!tower) {
      return;
    }

    var cards = Array.prototype.slice.call(tower.querySelectorAll('.song-card'));
    var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var collapseTimer;
    var hoveredCard = null;

    function setExpanded(expanded) {
      tower.classList.toggle('is-expanded', expanded);
      tower.classList.toggle('is-collapsed', !expanded);
      tower.setAttribute('aria-expanded', String(expanded));
    }

    function clearCollapseTimer() {
      window.clearTimeout(collapseTimer);
    }

    function scheduleCollapse() {
      clearCollapseTimer();
      collapseTimer = window.setTimeout(function () {
        var focusedCard = cards.some(function (card) {
          return card.contains(document.activeElement);
        });
        if (!hoveredCard && !focusedCard) {
          setExpanded(false);
        }
      }, 1000);
    }

    tower.addEventListener('pointermove', function (event) {
      if (prefersReducedMotion || tower.classList.contains('is-expanded')) {
        return;
      }

      var bounds = tower.getBoundingClientRect();
      var pointerX = (event.clientX - bounds.left) / bounds.width * 2 - 1;
      var pointerY = (event.clientY - bounds.top) / bounds.height * 2 - 1;
      tower.style.setProperty('--tower-tilt-x', (-pointerY * 18) + 'deg');
      tower.style.setProperty('--tower-tilt-y', (-pointerX * 24) + 'deg');
    });

    tower.addEventListener('pointerleave', function () {
      hoveredCard = null;
      tower.style.setProperty('--tower-tilt-x', '0deg');
      tower.style.setProperty('--tower-tilt-y', '0deg');
      if (tower.classList.contains('is-expanded')) {
        scheduleCollapse();
      }
    });

    tower.addEventListener('click', function (event) {
      if (tower.classList.contains('is-expanded')) {
        return;
      }

      if (event.target.closest('.song-card')) {
        event.preventDefault();
      }
      setExpanded(true);
      scheduleCollapse();
    });

    tower.addEventListener('keydown', function (event) {
      if (event.target !== tower || (event.key !== 'Enter' && event.key !== ' ')) {
        return;
      }

      event.preventDefault();
      setExpanded(!tower.classList.contains('is-expanded'));
      if (tower.classList.contains('is-expanded')) {
        scheduleCollapse();
      } else {
        clearCollapseTimer();
      }
    });

    cards.forEach(function (card) {
      card.addEventListener('pointerenter', function () {
        hoveredCard = card;
        clearCollapseTimer();
      });
      card.addEventListener('pointerleave', function () {
        hoveredCard = null;
        if (tower.classList.contains('is-expanded')) {
          scheduleCollapse();
        }
      });
      card.addEventListener('focusin', function () {
        clearCollapseTimer();
        setExpanded(true);
      });
      card.addEventListener('focusout', scheduleCollapse);
    });

    window.addEventListener('hashchange', function () {
      if (window.location.hash === '#dalok-archive') {
        setExpanded(true);
      }
    });

    setExpanded(window.location.hash === '#dalok-archive');
  }

  function initSongCardEffects() {
    var cards = document.querySelectorAll('.song-card');
    if (!cards.length) {
      return;
    }

    var hideTimer;
    var resetTimer;

    function activate(card) {
      window.clearTimeout(hideTimer);
      window.clearTimeout(resetTimer);
      var bounds = card.getBoundingClientRect();
      document.body.style.setProperty('--disco-x', ((bounds.left + bounds.width / 2) / window.innerWidth * 100) + '%');
      document.body.style.setProperty('--disco-y', ((bounds.top + bounds.height / 2) / window.innerHeight * 100) + '%');
      document.body.classList.add('is-disco-active');
    }

    function deactivate() {
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(function () {
        var activeCard = document.querySelector('.song-card:hover, .song-card:focus-within');
        if (activeCard) {
          activate(activeCard);
          return;
        }

        document.body.classList.remove('is-disco-active');
        resetTimer = window.setTimeout(function () {
          document.body.style.removeProperty('--disco-x');
          document.body.style.removeProperty('--disco-y');
        }, 700);
      }, 650);
    }

    cards.forEach(function (card) {
      card.addEventListener('pointerenter', function () {
        activate(card);
      });
      card.addEventListener('pointermove', function (event) {
        var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          return;
        }
        var bounds = card.getBoundingClientRect();
        var pointerX = (event.clientX - bounds.left) / bounds.width * 2 - 1;
        var pointerY = (event.clientY - bounds.top) / bounds.height * 2 - 1;
        card.style.setProperty('--card-tilt-x', (-pointerY * 16) + 'deg');
        card.style.setProperty('--card-tilt-y', (pointerX * 16) + 'deg');
      });
      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--card-tilt-x', '0deg');
        card.style.setProperty('--card-tilt-y', '0deg');
        deactivate(card);
      });
      card.addEventListener('focusin', function () {
        activate(card);
      });
      card.addEventListener('focusout', function (event) {
        card.style.setProperty('--card-tilt-x', '0deg');
        card.style.setProperty('--card-tilt-y', '0deg');
        if (!event.relatedTarget || !card.contains(event.relatedTarget)) {
          deactivate(card);
        }
      });
    });
  }

  function initDelayedEffects() {
    var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(function () {
      document.body.classList.add('site-effects-ready');
    }, prefersReducedMotion ? 0 : 5000);
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
    var facades = document.querySelectorAll('.youtube-facade[data-video-url]');
    facades.forEach(function (facade) {
      facade.addEventListener('click', function () {
        var videoUrl = facade.getAttribute('data-video-url');
        var videoId = getYouTubeVideoId(videoUrl);
        if (!videoId) {
          console.error('Invalid YouTube URL for video facade:', videoUrl);
          return;
        }
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

  function getYouTubeVideoId(videoUrl) {
    try {
      var url = new URL(videoUrl);
      var host = url.hostname.toLowerCase().replace(/^www\./, '');
      var videoId;

      if (host === 'youtu.be') {
        videoId = url.pathname.split('/').filter(Boolean)[0];
      } else if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
        videoId = url.searchParams.get('v');
        if (!videoId) {
          var pathMatch = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/);
          videoId = pathMatch && pathMatch[1];
        }
      }

      return videoId && /^[A-Za-z0-9_-]{11}$/.test(videoId) ? videoId : null;
    } catch (error) {
      return null;
    }
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