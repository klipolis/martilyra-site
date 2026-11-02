(function () {
  'use strict';

  var MOBILE_BREAKPOINT = 720;

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + ';path=/';
  }

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function collapseSidebar() {
    document.querySelector('.layout-wrapper').classList.add('sidebar-expanded');
    setCookie('sidebarState', 'collapsed', 365);
  }

  function expandSidebar() {
    document.querySelector('.layout-wrapper').classList.remove('sidebar-expanded');
    setCookie('sidebarState', 'expanded', 365);
  }

  window.toggleSidebar = function () {
    var wrapper = document.querySelector('.layout-wrapper');
    var isCollapsed = wrapper.classList.toggle('sidebar-expanded');
    setCookie('sidebarState', isCollapsed ? 'collapsed' : 'expanded', 365);
  };

  function init() {
    var wrapper = document.querySelector('.layout-wrapper');
    var savedState = getCookie('sidebarState');
    var startCollapsed = isMobile() ? true : (savedState === 'collapsed');

    if (startCollapsed) {
      wrapper.classList.add('sidebar-expanded');
    } else {
      wrapper.classList.remove('sidebar-expanded');
    }

    var sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.addEventListener('click', function() {
        // Keep click handling if needed
      });
    }

    if (isMobile()) {
      var navLinks = wrapper.querySelectorAll('.sidebar-nav a[href]');
      for (var i = 0; i < navLinks.length; i++) {
        (function (link) {
          link.addEventListener('click', function () {
            collapseSidebar();
          });
        })(navLinks[i]);
      }
    }

    markCurrentPage();
  }

  function markCurrentPage() {
    var path = window.location.pathname;
    var links = document.querySelectorAll('.sidebar-nav a');
    links.forEach(function(link) {
      if (link.getAttribute('href') === path || (path === '/' && link.getAttribute('href') === '/')) {
        link.classList.add('nav-current');
      } else {
        link.classList.remove('nav-current');
      }
    });
  }

  init();
})();