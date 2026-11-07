(function () {
  'use strict';

  function init() {
    initThemeToggle();
    initSongCardEffects();
    initSongPageRays();
    initMobileMiniPlayer();
    initDelayedEffects();
    markCurrentPage();
    initBlogPagination();
    initVideoFacades();
  }

  function initSongPageRays() {
    var player = document.querySelector('.song-detail-page .video-player');
    if (!player) {
      return;
    }

    function updateRays() {
      var bounds = player.getBoundingClientRect();
      document.body.style.setProperty('--disco-x', ((bounds.left + bounds.width / 2) / window.innerWidth * 100) + '%');
      document.body.style.setProperty('--disco-y', ((bounds.top + bounds.height / 2) / window.innerHeight * 100) + '%');
    }

    updateRays();
    window.addEventListener('resize', updateRays);
    window.addEventListener('scroll', updateRays, { passive: true });
    player.addEventListener('transitionend', updateRays);
  }

  function initMobileMiniPlayer() {
    var player = document.querySelector('.song-detail-page .video-player');
    var slot = document.querySelector('.song-detail-page .song-video-slot');
    if (!player || !slot) {
      return;
    }

    var mobileViewport = window.matchMedia('(max-width: 720px)');

    function updateMiniPlayer() {
      if (!mobileViewport.matches) {
        player.classList.remove('is-mini');
        return;
      }

      player.classList.toggle('is-mini', slot.getBoundingClientRect().bottom < 12);
    }

    window.addEventListener('scroll', updateMiniPlayer, { passive: true });
    window.addEventListener('resize', updateMiniPlayer);
    if (mobileViewport.addEventListener) {
      mobileViewport.addEventListener('change', updateMiniPlayer);
    } else if (mobileViewport.addListener) {
      mobileViewport.addListener(updateMiniPlayer);
    }
    updateMiniPlayer();
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
        card.style.setProperty('--card-tilt-x', (-pointerY * 24) + 'deg');
        card.style.setProperty('--card-tilt-y', (pointerX * 24) + 'deg');
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
        var player = facade.closest('.video-player');
        var songDetail = player.closest('.song-detail');
        var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var slot = player.closest('.song-video-slot');
        var initialHeight = slot.getBoundingClientRect().height;
        var firstColumnWidth = parseFloat(window.getComputedStyle(songDetail).gridTemplateColumns.split(' ')[0]) || songDetail.getBoundingClientRect().width;
        facade.replaceWith(iframe);
        if (reducedMotion) {
          player.classList.add('is-playing');
          slot.classList.add('is-playing');
          return;
        }

        slot.style.height = initialHeight + 'px';
        window.requestAnimationFrame(function () {
          player.classList.add('is-playing');
          slot.classList.add('is-playing');
          slot.style.height = (firstColumnWidth * 9 / 16) + 'px';
        });
        slot.addEventListener('transitionend', function onPlayerTransitionEnd(event) {
          if (event.propertyName !== 'height') {
            return;
          }
          slot.style.removeProperty('height');
          slot.removeEventListener('transitionend', onPlayerTransitionEnd);
        });
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
    var homeLink = document.querySelector('.sidebar-home');
    var siteRoot = homeLink ? normalizePath(new URL(homeLink.href, window.location.href).pathname) : '/';
    var links = document.querySelectorAll('.primary-nav a, .sidebar-home');
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