(function () {
  'use strict';

  var youtubeApiCallbacks = [];
  var youtubeApiRequested = false;

  function init() {
    initThemeToggle();
    initSongCardEffects();
    initSongPageRays();
    initMobileMiniPlayer();
    initDelayedEffects();
    markCurrentPage();
    initBlogPagination();
    initVideoFacades();
    initVideoExpansion();
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
      if (!mobileViewport.matches || !player.classList.contains('is-playing') || document.body.classList.contains('is-video-expanded')) {
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
    var cards = document.querySelectorAll('.song-card, .related-song');
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
        var activeCard = document.querySelector('.song-card:hover, .song-card:focus-within, .related-song:hover, .related-song:focus-within');
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
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(videoId) +
          '?autoplay=1&controls=0&disablekb=0&enablejsapi=1&iv_load_policy=3&modestbranding=1&origin=' +
          encodeURIComponent(window.location.origin) + '&playsinline=1&rel=0';
        iframe.id = 'youtube-player-' + Date.now();
        iframe.title = title;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.loading = 'eager';
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        var player = facade.closest('.video-player');
        var songDetail = player.closest('.song-detail');
        var slot = player.closest('.song-video-slot');
        var controls = player.querySelector('.video-controls');
        var playbackControl = player.querySelector('.video-playback');
        var captionsControl = player.querySelector('.video-captions');
        var progressControl = player.querySelector('.video-progress');
        var currentTimeLabel = player.querySelector('.video-current-time');
        var durationLabel = player.querySelector('.video-duration');
        var expandControl = slot.querySelector('.video-expand');
        var errorMessage = player.querySelector('.video-error');
        var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var initialHeight = slot.getBoundingClientRect().height;
        var firstColumnWidth = parseFloat(window.getComputedStyle(songDetail).gridTemplateColumns.split(' ')[0]) || songDetail.getBoundingClientRect().width;
        facade.replaceWith(iframe);
        controls.hidden = false;
        expandControl.disabled = false;
        if (reducedMotion) {
          player.classList.add('is-playing');
          slot.classList.add('is-playing');
        } else {
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
        }

        loadYouTubeIframeApi(function (apiReady) {
          if (!apiReady) {
            console.error('YouTube player controls could not be loaded.');
            errorMessage.textContent = 'A videó vezérlői nem tölthetők be. A YouTube-hivatkozás a lejátszó alatt érhető el.';
            errorMessage.hidden = false;
            return;
          }

          var progressTimer = null;
          var youtubePlayer = new window.YT.Player(iframe, {
            events: {
              onReady: function () {
                captionsControl.disabled = false;
                playbackControl.setAttribute('aria-label', 'Videó lejátszása');
                playbackControl.disabled = false;
                updateTimeline();
              },
              onStateChange: function (event) {
                var isPlaying = event.data === window.YT.PlayerState.PLAYING;
                playbackControl.setAttribute('aria-label', isPlaying ? 'Videó szüneteltetése' : 'Videó lejátszása');
                updateTimeline();
                if (isPlaying) {
                  if (!progressTimer) {
                    progressTimer = window.setInterval(updateTimeline, 500);
                  }
                } else if (progressTimer) {
                  window.clearInterval(progressTimer);
                  progressTimer = null;
                }
              },
              onError: function (event) {
                console.error('YouTube player reported an error:', event.data);
                errorMessage.textContent = 'A YouTube-videó nem tölthető be ezen az oldalon.';
                errorMessage.hidden = false;
                if (progressTimer) {
                  window.clearInterval(progressTimer);
                  progressTimer = null;
                }
              }
            }
          });

          function updateTimeline() {
            var duration = youtubePlayer.getDuration();
            var currentTime = youtubePlayer.getCurrentTime();
            if (!Number.isFinite(duration) || duration <= 0 || !Number.isFinite(currentTime)) {
              return;
            }
            progressControl.disabled = false;
            progressControl.value = String(Math.round((currentTime / duration) * 1000));
            currentTimeLabel.textContent = formatVideoTime(currentTime);
            durationLabel.textContent = formatVideoTime(duration);
          }

          playbackControl.addEventListener('click', function () {
            if (playbackControl.getAttribute('aria-label') === 'Videó lejátszása') {
              youtubePlayer.playVideo();
            } else {
              youtubePlayer.pauseVideo();
            }
          });

          captionsControl.addEventListener('click', function () {
            var enabled = captionsControl.getAttribute('aria-pressed') !== 'true';
            try {
              youtubePlayer.setOption('captions', 'track', { languageCode: enabled ? 'hu' : '' });
              captionsControl.setAttribute('aria-pressed', String(enabled));
              captionsControl.setAttribute('aria-label', enabled ? 'Magyar felirat kikapcsolása' : 'Magyar felirat bekapcsolása');
            } catch (error) {
              console.error('Could not change YouTube caption settings:', error);
            }
          });

          progressControl.addEventListener('input', function () {
            var duration = youtubePlayer.getDuration();
            if (Number.isFinite(duration) && duration > 0) {
              currentTimeLabel.textContent = formatVideoTime((Number(progressControl.value) / 1000) * duration);
            }
          });

          progressControl.addEventListener('change', function () {
            var duration = youtubePlayer.getDuration();
            if (Number.isFinite(duration) && duration > 0) {
              youtubePlayer.seekTo((Number(progressControl.value) / 1000) * duration, true);
            }
          });
        });
      });
    });
  }

  function formatVideoTime(seconds) {
    var totalSeconds = Math.floor(seconds);
    var minutes = Math.floor(totalSeconds / 60);
    var remainingSeconds = String(totalSeconds % 60).padStart(2, '0');
    if (minutes >= 60) {
      return Math.floor(minutes / 60) + ':' + String(minutes % 60).padStart(2, '0') + ':' + remainingSeconds;
    }
    return minutes + ':' + remainingSeconds;
  }

  function loadYouTubeIframeApi(callback) {
    if (window.YT && window.YT.Player) {
      callback(true);
      return;
    }

    youtubeApiCallbacks.push(callback);
    if (youtubeApiRequested) {
      return;
    }
    youtubeApiRequested = true;

    var previousReadyHandler = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof previousReadyHandler === 'function') {
        previousReadyHandler();
      }
      youtubeApiCallbacks.splice(0).forEach(function (onReady) {
        onReady(true);
      });
    };

    var script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.onerror = function () {
      console.error('Failed to load the YouTube IFrame API.');
      youtubeApiCallbacks.splice(0).forEach(function (onReady) {
        onReady(false);
      });
      youtubeApiRequested = false;
    };
    document.head.appendChild(script);
  }

  function initVideoExpansion() {
    var slot = document.querySelector('.song-detail-page .song-video-slot');
    var player = slot && slot.querySelector('.video-player');
    var toggle = slot && slot.querySelector('.video-expand');
    if (!slot || !player || !toggle) {
      return;
    }

    var previousFocus;
    var previousBodyOverflow;
    var expansionAnimation;
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function setExpandedState(expanded) {
      document.body.classList.toggle('is-video-expanded', expanded);
      slot.classList.toggle('is-expanded', expanded);
      slot.setAttribute('aria-modal', String(expanded));
      slot.setAttribute('role', expanded ? 'dialog' : 'region');
      toggle.setAttribute('aria-pressed', String(expanded));
      toggle.setAttribute('aria-label', expanded ? 'Videó bezárása' : 'Videó kinagyítása');
      player.classList.remove('is-mini');
    }

    function setFixedGeometry(bounds) {
      slot.style.position = 'fixed';
      slot.style.top = bounds.top + 'px';
      slot.style.left = bounds.left + 'px';
      slot.style.width = bounds.width + 'px';
      slot.style.height = bounds.height + 'px';
      slot.style.maxHeight = 'none';
      slot.style.aspectRatio = 'auto';
      slot.style.transform = 'none';
      slot.style.transformOrigin = 'top left';
    }

    function clearFixedGeometry() {
      ['position', 'top', 'left', 'width', 'height', 'max-height', 'aspect-ratio', 'transform', 'transform-origin'].forEach(function (property) {
        slot.style.removeProperty(property);
      });
    }

    function clearAnimationStyles() {
      clearFixedGeometry();
      slot.style.removeProperty('transition');
    }

    function getFlipTransform(from, to) {
      var scaleX = from.width / to.width;
      var scaleY = from.height / to.height;
      var translateX = from.left - to.left;
      var translateY = from.top - to.top;
      return 'translate(' + translateX + 'px, ' + translateY + 'px) scale(' + scaleX + ', ' + scaleY + ')';
    }

    function animateTransform(from, to, reverse, onFinish) {
      if (reducedMotion || typeof slot.animate !== 'function') {
        onFinish();
        return;
      }

      var flipTransform = reverse ? getFlipTransform(to, from) : getFlipTransform(from, to);
      var keyframes = reverse
        ? [{ transform: 'none' }, { transform: flipTransform }]
        : [{ transform: flipTransform }, { transform: 'none' }];
      expansionAnimation = slot.animate(keyframes, {
        duration: 520,
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
      });
      expansionAnimation.onfinish = function () {
        expansionAnimation.cancel();
        expansionAnimation = null;
        onFinish();
      };
    }

    function setExpanded(expanded) {
      if (expanded) {
        previousFocus = document.activeElement;
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        var from = slot.getBoundingClientRect();
        slot.style.transition = 'none';
        slot.getBoundingClientRect();
        setExpandedState(true);
        var to = slot.getBoundingClientRect();
        setFixedGeometry(to);
        slot.getBoundingClientRect();
        animateTransform(from, to, false, function () {
          clearAnimationStyles();
        });
        slot.querySelector('.video-expand').focus();
        return;
      }

      var from = slot.getBoundingClientRect();
      if (expansionAnimation) {
        expansionAnimation.cancel();
        expansionAnimation = null;
      }
      slot.style.transition = 'none';
      setFixedGeometry(from);
      setExpandedState(false);
      clearFixedGeometry();
      var to = slot.getBoundingClientRect();
      setExpandedState(true);
      setFixedGeometry(from);
      slot.getBoundingClientRect();
      animateTransform(from, to, true, function () {
        setExpandedState(false);
        clearAnimationStyles();
        document.body.style.overflow = previousBodyOverflow || '';
        if (previousFocus && typeof previousFocus.focus === 'function') {
          previousFocus.focus();
        }
        window.dispatchEvent(new Event('scroll'));
      });
    }

    toggle.addEventListener('click', function () {
      setExpanded(!slot.classList.contains('is-expanded'));
    });

    document.addEventListener('keydown', function (event) {
      if (!slot.classList.contains('is-expanded')) {
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        setExpanded(false);
        return;
      }
      if (event.key !== 'Tab') {
        return;
      }

      var focusable = Array.prototype.slice.call(slot.querySelectorAll('button:not([disabled]), a[href]'))
        .filter(function (element) {
          return !element.closest('[hidden]');
        });
      if (!focusable.length) {
        event.preventDefault();
        slot.focus();
        return;
      }

      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
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